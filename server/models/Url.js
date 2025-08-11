import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortId: { type: String, unique: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 0 }
});

export default mongoose.model('Url', urlSchema);
