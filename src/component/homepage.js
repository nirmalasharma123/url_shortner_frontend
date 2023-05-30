import React, { useState } from 'react';
import './homepage.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  shortUrlContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  shortUrl: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    marginBottom: theme.spacing(2),
    fontSize: '18px',
    fontWeight: 'bold',
  },
}));

export default function Homepage() {
  const classes = useStyles();
  const [longUrl, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShortenUrl = () => {
    urlShortener();
  };

  const urlShortener = async () => {
    try {
      const response = await axios.post('https://url-shotner-8p96.onrender.com/url/shorten', {
        longUrl,
      });
      console.log(response.data);
      setShortUrl(response.data.data.shortUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopySuccess(true);
  };

  return (
    <div className="container">
      <h1 className="title">URL Shortener</h1>
      <div className="form-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter URL"
          value={longUrl}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="shorten-button" onClick={handleShortenUrl}>
          Shorten URL
        </button>
      </div>
      <div className="result-container">
        <p className="result-label">Shortened URL:</p>
        <div className={classes.shortUrlContainer}>
          <a className={classes.shortUrl} href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
          <div className="copy-container">
            <button className="copy-button" onClick={copyToClipboard}>
              {copySuccess ? 'Copied!' : 'Copy URL'}
            </button>
            {copySuccess && <p className="copy-success">URL copied to clipboard!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
