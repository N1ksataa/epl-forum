import mongoose from "mongoose";
import Team from "../models/Team.js";
import dotenv from "dotenv";

dotenv.config();

const teams = [
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6a7"), name: "Arsenal", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/800px-Arsenal_FC.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6a8"), name: "Aston Villa", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Aston_Villa_FC_new_crest.svg/800px-Aston_Villa_FC_new_crest.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6a9"), name: "Bournemouth", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/AFC_Bournemouth_%282013%29.svg/800px-AFC_Bournemouth_%282013%29.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6aa"), name: "Brentford", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Brentford_FC_crest.svg/1024px-Brentford_FC_crest.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6ab"), name: "Brighton", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Brighton_and_Hove_Albion_FC_crest.svg/1024px-Brighton_and_Hove_Albion_FC_crest.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6ac"), name: "Chelsea", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1024px-Chelsea_FC.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6ad"), name: "Crystal Palace", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Crystal_Palace_FC_logo_%282022%29.svg/800px-Crystal_Palace_FC_logo_%282022%29.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6ae"), name: "Everton", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Everton_FC_logo.svg/1024px-Everton_FC_logo.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6af"), name: "Fulham", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Fulham_FC_%28shield%29.svg/800px-Fulham_FC_%28shield%29.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b0"), name: "Ipswich Town", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Ipswich_Town.svg/800px-Ipswich_Town.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b1"), name: "Leicester City", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Leicester_City_crest.svg/1024px-Leicester_City_crest.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b2"), name: "Liverpool", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/800px-Liverpool_FC.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b3"), name: "Manchester City", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1024px-Manchester_City_FC_badge.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b4"), name: "Manchester United", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b5"), name: "Newcastle", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/1024px-Newcastle_United_Logo.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b6"), name: "Nottingham Forest", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Nottingham_Forest_F.C._logo.svg/800px-Nottingham_Forest_F.C._logo.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b7"), name: "Southampton", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/FC_Southampton.svg/800px-FC_Southampton.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b8"), name: "Tottenham", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/800px-Tottenham_Hotspur.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6b9"), name: "West Ham", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/800px-West_Ham_United_FC_logo.svg.png"},
    { _id: new mongoose.Types.ObjectId("60d5ecbb7fcf0a3f5c8bb6ba"), name: "Wolves", fans: [], logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Wolverhampton_Wanderers_FC_crest.svg/1024px-Wolverhampton_Wanderers_FC_crest.svg.png"},
];

async function seedTeams() {
    try {
        await mongoose.connect('mongodb://localhost:27017/footballForum');

        const existingTeams = await Team.countDocuments();
        if (existingTeams === 20) {
            console.log("Teams already exist, skipping seeding.");
            return;
        }

        await Team.deleteMany({});
        await Team.insertMany(teams);
        console.log("Teams seeded successfully!");
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedTeams();
