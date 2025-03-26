import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    fans: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    logo: { type: String, required: true }
}, { timestamps: true });

const Team = model('Team', teamSchema);

export default Team;
