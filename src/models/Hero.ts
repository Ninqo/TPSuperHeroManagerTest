import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
    name: string;
    slug: string;
    powerstats: object;
    appearance: object;
    biography: object;
    work: object;
    connections: object;
    images: object;
    createdAt: Date;
}

const HeroSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        powerstats: Object,
        appearance: Object,
        biography: Object,
        work: Object,
        connections: Object,
        images: Object,
    },
    { timestamps: true }
);

export default mongoose.model<IHero>('Hero', HeroSchema);