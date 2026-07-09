import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CACHE_TTL_MS = 30 * 60 * 1000;

let cache = { expiresAt: 0, payload: null };

app.get('/api/instagram/profile', async (req, res) => {
  const now = Date.now();

  if (cache.payload && now < cache.expiresAt) {
    return res.json(cache.payload);
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return res.status(200).json({
      username: 'tibinfitness',
      name: 'Tibin Fitness',
      profile_picture_url: '/src/assets/coach.jpg',
      followers: 18400,
      following: 352,
      posts: 128,
      bio: 'Premium training, strength coaching, and performance strategy for ambitious clients.',
      website: 'tibinfitness.com',
      recentPosts: [],
      highlights: []
    });
  }

  try {
    const profileUrl = `https://graph.instagram.com/${userId}?fields=id,username,account_type,media_count,followers_count,follows_count,profile_picture_url,biography,website&access_token=${accessToken}`;
    const profileResponse = await fetch(profileUrl, { headers: { 'Accept': 'application/json' } });
    const profileData = await profileResponse.json();

    if (!profileResponse.ok || profileData.error) {
      throw new Error(profileData.error?.message || 'Instagram API request failed');
    }

    const mediaUrl = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&access_token=${accessToken}`;
    const mediaResponse = await fetch(mediaUrl, { headers: { 'Accept': 'application/json' } });
    const mediaData = await mediaResponse.json();

    if (!mediaResponse.ok || mediaData.error) {
      throw new Error(mediaData.error?.message || 'Instagram media request failed');
    }

    const recentPosts = (mediaData.data || [])
      .filter((item) => item.media_type !== 'VIDEO' || item.media_url)
      .slice(0, 6)
      .map((item) => ({
        id: item.id,
        media_url: item.media_url || item.thumbnail_url || '/src/assets/coach.jpg',
        permalink: item.permalink,
        caption: item.caption || 'Fresh fitness inspiration from the studio.',
        like_count: item.like_count,
        comments_count: item.comments_count,
        timestamp: new Date(item.timestamp).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      }));

    const payload = {
      username: profileData.username,
      name: profileData.username,
      profile_picture_url: profileData.profile_picture_url,
      followers: profileData.followers_count || 0,
      following: profileData.follows_count || 0,
      posts: profileData.media_count || 0,
      bio: profileData.biography || '',
      website: profileData.website || '',
      recentPosts,
      highlights: []
    };

    cache = { expiresAt: now + CACHE_TTL_MS, payload };
    return res.json(payload);
  } catch (error) {
    const fallbackPayload = {
      username: 'tibinfitness',
      name: 'Tibin Fitness',
      profile_picture_url: '/src/assets/coach.jpg',
      followers: 18400,
      following: 352,
      posts: 128,
      bio: 'Premium training, strength coaching, and performance strategy for ambitious clients.',
      website: 'tibinfitness.com',
      recentPosts: [],
      highlights: []
    };

    cache = { expiresAt: now + CACHE_TTL_MS, payload: fallbackPayload };
    return res.json(fallbackPayload);
  }
});

app.listen(PORT, () => {
  console.log(`Instagram API proxy listening on port ${PORT}`);
});
