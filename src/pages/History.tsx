import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { motion } from "framer-motion";
interface Run {
  run_id: string;
  repo_url: string;
  user_id: string;
  created_at: string;
}

const History = () => {
  const [recentRuns, setRecentRuns] = useState<Run[]>([]);

  useEffect(() => {
    async function fetchRuns() {
      try {
        const res = await fetch("https://vibesecure-backend.onrender.com/scan/runs", {
          credentials: "include",
        });
        const data = await res.json();
        setRecentRuns(data);
      } catch (err) {
        console.error("Failed to fetch runs:", err);
      }
    }

    fetchRuns();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Scan History
        </h1>

        {recentRuns.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No previous scans found.
          </div>
        ) : (
          <div className="space-y-4">
            {recentRuns.map((run, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 border border-gray-100"
              >
                <p className="text-sm text-gray-500">
                  Scanned on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(run.created_at).toDateString()}
                  </span>
                </p>
                <p className="text-blue-600 font-mono truncate">
                  {run.repo_url}
                </p>
                <Link
                  to={`/dashboard/${run.run_id}`}
                  className="inline-block mt-2 text-indigo-600 hover:underline text-sm"
                >
                  View Scan →
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            to="/submit"
            className="inline-block bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Scan Again
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default History;
