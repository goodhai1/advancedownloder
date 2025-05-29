import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { Download, YouTube } from '@mui/icons-material';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/video-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setVideoInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!selectedFormat) return;
    window.location.href = `http://localhost:5000/api/download?url=${encodeURIComponent(url)}&itag=${selectedFormat}`;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Paste video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !url}
            startIcon={loading ? <CircularProgress size={20} /> : <YouTube />}
          >
            Get Info
          </Button>
        </Box>
      </form>

      {videoInfo && (
        <Card sx={{ mb: 4, bgcolor: 'background.paper' }}>
          <CardMedia
            component="img"
            height="200"
            image={videoInfo.thumbnail}
            alt={videoInfo.title}
            sx={{ objectFit: 'contain' }}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {videoInfo.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Duration: {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Select Quality</InputLabel>
                <Select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  label="Select Quality"
                >
                  {videoInfo.formats.map((format) => (
                    <MenuItem key={format.itag} value={format.itag}>
                      {format.quality} - {format.mimeType.split(';')[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                disabled={!selectedFormat}
                onClick={handleDownload}
                startIcon={<Download />}
              >
                Download
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Downloader; 