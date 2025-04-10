import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Team from "../models/Team.js";
import User from "../models/User.js";

class ForumService {
    async getForums() {
        try {
            const teams = await Team.find();

            const forums = await Promise.all(teams.map(async (team) => {

                const lastPost = await Post.find({ team: team._id })
                    .sort({ createdAt: -1 })
                    .limit(1)
                    .populate('author', 'username');


                const postCount = await Post.countDocuments({ team: team._id });


                const commentCount = await Post.aggregate([
                    { $match: { team: team._id } },
                    { $unwind: "$comments" },
                    { $count: "commentCount" }
                ]);

                return {
                    team: team,
                    lastPost: lastPost[0],
                    postCount,
                    commentCount: commentCount.length > 0 ? commentCount[0].commentCount : 0
                };
            }));

            return forums;
        } catch (error) {
            throw new Error('Error fetching forums: ' + error.message);
        }
    }

    async getForumStats() {
        try {
            const postCount = await Post.countDocuments();
            const messageCount = await Comment.countDocuments();
            const memberCount = await User.countDocuments();
            const latestMember = await User.findOne().sort({ createdAt: -1 }).select('username _id');
    
            return {
                posts: postCount,
                messages: messageCount,
                members: memberCount,
                latestMember: latestMember ? latestMember.username : null,
                latestMemberId: latestMember ? latestMember._id : null
            };
        } catch (error) {
            throw new Error('Failed to retrieve forum stats');
        }
    }
    
    async getTrendingPosts() {
        try {
            const trendingPosts = await Post.aggregate([
                {
                    $lookup: {
                        from: "comments",
                        let: { postId: "$_id" },
                        pipeline: [
                            { 
                                $match: { 
                                    $expr: { 
                                        $eq: ["$postId", "$$postId"] 
                                    } 
                                } 
                            }
                        ],
                        as: "comments"
                    }
                },
                {
                    $addFields: {
                        commentCount: { $size: "$comments" }
                    }
                },
                {
                    $lookup: {
                        from: "teams",
                        localField: "team",
                        foreignField: "_id",
                        as: "team"
                    }
                },
                {
                    $unwind: "$team"
                },
                {
                    $sort: { commentCount: -1 }
                },
                {
                    $limit: 5
                },
                {
                    $project: {
                        title: 1,
                        commentCount: 1,
                        team: { _id: 1, name: 1 }
                    }
                }
            ]);
    
            return trendingPosts;
        } catch (error) {
            throw new Error('Failed to retrieve trending posts');
        }
    }    

}

export default new ForumService();