import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [allUrls, setAllUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const res = await axios.get(API);
      setAllUrls(res.data);
    } catch (err) {
      console.error('Failed to fetch URLs', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    try {
      const res = await axios.post(`${API}/shorten`, { originalUrl: url });
      setShortUrl(res.data.shortUrl);
      setUrl('');
      fetchUrls();
    } catch (err) {
      console.error('Failed to shorten URL', err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="max-w-3xl mx-auto bg-gray-950 p-8 rounded-xl shadow-xl border border-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400"> URL Shortener</h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md text-white font-medium"
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="bg-green-900/20 border border-green-600 text-green-300 p-4 rounded-md mb-6">
            <p className="text-sm">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-green-400 font-mono underline break-all hover:text-green-300 transition"
            >
              {shortUrl}
            </a>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4 text-blue-300">📃 Recently Shortened Links</h2>

        <div className="space-y-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {allUrls.map((u) => (
            <div
              key={u.shortId}
              className="p-3 bg-gray-800 border border-gray-700 rounded-md transition hover:border-blue-500"
            >
              <a
                href={`${API}/${u.shortId}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline break-all hover:text-blue-300"
              >
                {`${API}/${u.shortId}`}
              </a>
              <p className="text-sm text-gray-400 truncate">→ {u.originalUrl}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/admin"
            // className="inline-block text-sm text-gray-400 hover:text-white underline transition"
          >
            <span className="text-blue-400 hover:text-white">Go to Admin Dashboard</span> 
          </a>
        </div>
      </div>

      <footer className="text-center mt-10 text-sm text-gray-600">
        &copy; URL Shortener by <span className="text-blue-400">Santhosh</span>
      </footer>
    </div>
  );
}

export default App;
