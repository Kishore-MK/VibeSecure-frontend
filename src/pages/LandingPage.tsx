import React, { useState, useEffect } from "react";
import {
  Github,
  Moon,
  Sun,
  Shield,
  Brain,
  Zap,
  Lock,
  BarChart3,
  GitPullRequest,
  ArrowRight,
  Upload,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LoginButton } from "../components/LoginButton";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {/* Header */}
        <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="font-bold">VibeSecure</span>
            </div>

            <div className="flex space-x-4 items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <img src={user.avatar} className="w-8 h-8 rounded-full" />
                  <span>{user.username}</span>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="">
                  <LoginButton />
                </div>
              )}
               <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            </div>
           
          </nav>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🔒 AI-Powered Code Security & Vulnerability Scanner
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Automatically find issues in your code before attackers do.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2" onClick={() => navigate("/submit")}>
                Start Scanning
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors">
                Learn How It Works
              </button>
            </div>
          </div>
        </section>

        {/* What Is This Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              What is this?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-12">
              This tool is your first line of defense — an AI-powered code
              quality and security scanner that analyzes your codebase, detects
              vulnerabilities, and highlights complexity or style violations in
              seconds.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Zap, text: "Fast and seamless scanning" },
                { icon: Lock, text: "Catches security vulnerabilities early" },
                { icon: Brain, text: "Smart AI-driven issue detection" },
                {
                  icon: BarChart3,
                  text: "Full summary in a developer-friendly dashboard",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
                >
                  <item.icon className="w-8 h-8 text-blue-600" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-16 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Github,
                  title: "Log in with GitHub",
                  description: "Connect your GitHub account securely",
                },
                {
                  icon: Upload,
                  title: "Submit a repo URL",
                  description: "Or upload your code directly",
                },
                {
                  icon: CheckCircle2,
                  title: "Get a full scan report",
                  description: "Receive detailed analysis in seconds",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-16 text-center">
              Powered by Smart Analysis Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Bandit",
                  description: "Security scanning for Python applications",
                },
                {
                  title: "Radon",
                  description: "Code complexity insights and metrics",
                },
                { title: "Flake8", description: "Style & syntax suggestions" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Our End Goal
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-8">
                <GitPullRequest className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We're building a full-fledged AI Agent for Codebases that can
                autonomously analyze PRs, suggest secure patches, and integrate
                into CI/CD workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-blue-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your code deserves security, speed, and simplicity.
            </h2>
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Try It Now
            </button>
            <p className="mt-4 text-blue-100">
              Start scanning in under a minute.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto">
            <div className="flex justify-center items-center space-x-6 text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                GitHub
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default LandingPage;
