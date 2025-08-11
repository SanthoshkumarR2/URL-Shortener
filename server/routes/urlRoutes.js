import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const BASE_URL = process.env.BASE_URL;

// Shorten a URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

  const shortId = nanoid(7);
  const newUrl = new Url({ originalUrl, shortId });
  await newUrl.save();

  res.json({ shortUrl: `${BASE_URL}/${shortId}` });
});

// Redirect
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const record = await Url.findOne({ shortId });

  if (record) {
    record.visitCount += 1;
    await record.save();
    return res.redirect(record.originalUrl);
  }

  res.status(404).send('URL not found');
});

// Get all shortened URLs
router.get('/', async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

// Admin stats
router.get('/admin/stats', async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  const totalUrls = urls.length;
  const totalVisits = urls.reduce((sum, url) => sum + (url.visitCount || 0), 0);

  res.json({ totalUrls, totalVisits, urls });
});

export default router;
