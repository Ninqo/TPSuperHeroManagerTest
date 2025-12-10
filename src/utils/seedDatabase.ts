import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hero from '../models/Hero';
import fs from 'fs';
import path from 'path';

dotenv.config();

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI!);
    await Hero.deleteMany({});
    const raw = fs.readFileSync(path.join(__dirname, '../../SuperHerosComplet.json'), 'utf-8');
    const data = JSON.parse(raw);
    const mapped = data.superheros.map((h: any) => ({ ...h, images: { xs: `xs/${h.slug}.jpg`, sm: `sm/${h.slug}.jpg`, md: `md/${h.slug}.jpg`, lg: `lg/${h.slug}.jpg` } }));
    await Hero.insertMany(mapped);
    console.log('✅ Base importée');
    process.exit(0);
};

seed().catch(console.error);