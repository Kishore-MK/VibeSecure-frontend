import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


interface Issue {
  tool: string;
  file: string;
  line: number;
  severity: "High" | "Medium" | "Low";
  message: string;
}

const toolIcons: Record<string, string> = {
  Bandit: "🐍",
  Flake8: "🎨",
  Radon: "📊",
};

const severityColors: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const DashboardPage = () => {
  const { runId } = useParams();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAuth();
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        console.log(runId);

        const response = await fetch(
          `https://vibesecure-backend.onrender.com/scan/issues/${runId}`,
         { method: "GET",
          credentials:"include"
         }

        );
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        setIssues(data);
      } catch (err) {
        setError("Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);
  const changeSeverity = (severity: string) => {
    setSelectedSeverity(severity);
    setCurrentPage(1);
  };
  const filteredIssues = selectedSeverity
    ? issues.filter((issue) => issue.severity.toLowerCase() === selectedSeverity.toLowerCase())
    : issues;
  const paginatedIssues = filteredIssues.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
    const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
    

  const severityCounts = {
    High: issues.filter((i) => i.severity.toLowerCase() === "high").length,
    Medium: issues.filter((i) => i.severity.toLowerCase() === "medium").length,
    Low: issues.filter((i) => i.severity.toLowerCase() === "low").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1>Welcome, {user?.name}</h1>
          <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Scan Results
          </h1>
          <button
            onClick={() => navigate("/submit")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all float-right"
          >
            Scan Again
          </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-red-700">High</span>
              </div>
              <p className="text-2xl font-bold text-red-700">
                {severityCounts.High}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-yellow-700">Medium</span>
              </div>
              <p className="text-2xl font-bold text-yellow-700">
                {severityCounts.Medium}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-700">Low</span>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {severityCounts.Low}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSeverity(null)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-colors",
                  !selectedSeverity
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                All
              </button>
              {Object.keys(severityCounts).map((severity) => (
                <button
                  key={severity}
                  onClick={() => changeSeverity(severity)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-colors",
                    selectedSeverity === severity
                      ? severityColors[severity]
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>

          {filteredIssues.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No issues found for the selected severity.
            </div>
          ) : (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div>
                {paginatedIssues.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tool
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Line
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Severity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedIssues.map((issue, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{toolIcons[issue.tool]}</span>
                              <span>{issue.tool}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                            {issue.file}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{issue.line}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={clsx(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                severityColors[issue.severity]
                              )}
                            >
                              {issue.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4">{issue.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    No issues found for the selected severity.
                  </div>
                )}
</div>
                
              )}
              <div className="flex justify-end mt-4 gap-2">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={clsx(
            "px-3 py-1 rounded-md",
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
