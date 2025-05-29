import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint to get video info
app.post('/api/video-info', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const info = await ytdl.getInfo(url);
    const formats = info.formats.map(format => ({
      itag: format.itag,
      quality: format.qualityLabel,
      mimeType: format.mimeType,
      size: format.contentLength,
    }));

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      duration: info.videoDetails.lengthSeconds,
      formats: formats.filter(format => format.quality), // Only return formats with quality labels
    });
  } catch (error) {
    console.error('Error fetching video info:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to download video
app.get('/api/download', async (req, res) => {
  try {
    const { url, itag } = req.query;
    if (!url || !itag) {
      return res.status(400).json({ error: 'URL and itag are required' });
    }

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: itag });
    
    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 