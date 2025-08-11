import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://url-shortener-backend-757t.onrender.com';

function Admin() {
  const [stats, setStats] = useState({ totalUrls: 0, totalVisits: 0, urls: [] });

  const fetchStats = async () => {
    const res = await axios.get(`${API}/admin/stats`);
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>

        <div className="flex justify-between items-center mb-4">
          <p><strong>Total Shortened URLs:</strong> {stats.totalUrls}</p>
          <p><strong>Total Visits:</strong> {stats.totalVisits}</p>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left text-sm">Short URL</th>
                <th className="p-2 text-left text-sm">Original URL</th>
                <th className="p-2 text-sm">Visits</th>
                <th className="p-2 text-sm">Created</th>
              </tr>
            </thead>
            <tbody>
              {stats.urls.map((url) => (
                <tr key={url.shortId} className="border-t">
                  <td className="p-2">
                    <a
                      href={`${API}/${url.shortId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {`${API}/${url.shortId}`}
                    </a>
                  </td>
                  <td className="p-2 break-all text-gray-700">{url.originalUrl}</td>
                  <td className="p-2 text-center">{url.visitCount}</td>
                  <td className="p-2 text-sm text-gray-500">
                    {new Date(url.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-blue-400">
            ← Back to Shortener
          </a>
        </div>
      </div>
    </div>
  );
}

export default Admin;
