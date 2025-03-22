import mongoose from "mongoose";
import Team from "../models/Team.js";
import dotenv from "dotenv";

dotenv.config();

const teams = [
    { name: "Arsenal", fans: [] },
    { name: "Aston Villa", fans: [] },
    { name: "Bournemouth", fans: [] },
    { name: "Brentford", fans: [] },
    { name: "Brighton", fans: [] },
    { name: "Chelsea", fans: [] },
    { name: "Crystal Palace", fans: [] },
    { name: "Everton", fans: [] },
    { name: "Fulham", fans: [] },
    { name: "Ipswich Town", fans: [] },
    { name: "Leicester City", fans: [] },
    { name: "Liverpool", fans: [] },
    { name: "Manchester City", fans: [] },
    { name: "Manchester United", fans: [] },
    { name: "Newcastle", fans: [] },
    { name: "Nottingham Forest", fans: [] },
    { name: "Southampton", fans: [] },
    { name: "Tottenham", fans: [] },
    { name: "West Ham", fans: [] },
    { name: "Wolves", fans: [] }
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
