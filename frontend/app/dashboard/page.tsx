"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import type {
  SkillGapAnalysis,
  CareerRoadmap,
  HackerNewsResponse,
} from "@/lib/types";

export default function Dashboard() {
  const router = useRouter();
  const [skillGap, setSkillGap] = useState<SkillGapAnalysis | null>(null);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [hackerNews, setHackerNews] = useState<HackerNewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const targetRole = sessionStorage.getItem("targetRole");
        const currentSkillsStr = sessionStorage.getItem("currentSkills");

        if (!targetRole || !currentSkillsStr) {
          router.push("/");
          return;
        }

        const currentSkills = JSON.parse(currentSkillsStr);

        // Fetch all data in parallel with individual error handling
        const [skillGapResult, roadmapResult, newsResult] =
          await Promise.allSettled([
            apiClient.analyzeSkillGap({ targetRole, currentSkills }),
            apiClient.generateRoadmap({ targetRole, currentSkills }),
            apiClient.getHackerNews(),
          ]);

        // Handle skill gap data
        if (skillGapResult.status === "fulfilled") {
          setSkillGap(skillGapResult.value);
        } else {
          console.error("Skill gap analysis failed:", skillGapResult.reason);
          setError("Failed to load skill gap analysis");
        }

        // Handle roadmap data
        if (roadmapResult.status === "fulfilled") {
          setRoadmap(roadmapResult.value);
        } else {
          console.error("Roadmap generation failed:", roadmapResult.reason);
        }

        // Handle news data
        if (newsResult.status === "fulfilled") {
          setHackerNews(newsResult.value);
        } else {
          console.error("HackerNews fetch failed:", newsResult.reason);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleStartOver = () => {
    sessionStorage.clear();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-700">Analyzing your career path...</p>
        </div>
      </div>
    );
  }

  // Only show error page if critical data (skill gap) is missing
  if (error && !skillGap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={handleStartOver}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Career Analysis Dashboard
            </h1>
            <button
              onClick={handleStartOver}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              ← Start Over
            </button>
          </div>
          {(error || !roadmap || !hackerNews) && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Some features are temporarily unavailable. Your skill gap
                    analysis loaded successfully.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📊 Skill Gap Analysis
            </h2>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Target Role</p>
              <p className="text-xl font-semibold text-blue-600">
                {skillGap?.targetRole}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Match Rate</p>
                <p className="text-3xl font-bold text-green-600">
                  {skillGap?.analysis.statistics.matchPercentage}%
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Readiness</p>
                <p className="text-lg font-semibold text-blue-600">
                  {skillGap?.analysis.statistics.readinessLevel}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                ✅ Matched Skills ({skillGap?.analysis.matchedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGap?.analysis.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                ❌ Missing Skills ({skillGap?.analysis.missingSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGap?.analysis.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                🤖 AI Recommendation
                <span className="text-xs text-gray-500 font-normal">
                  ({skillGap?.analysis.recommendations.source})
                </span>
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {skillGap?.analysis.recommendations.text}
              </p>
            </div>
          </div>

          {roadmap ? (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🗺️ Career Roadmap
              </h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Total Duration</p>
                <p className="text-xl font-semibold text-indigo-600">
                  {roadmap?.totalDuration}
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {roadmap?.roadmap.phase1.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {roadmap?.roadmap.phase1.duration}
                      </p>
                    </div>
                  </div>
                  {roadmap?.roadmap.phase1.aiTip && (
                    <p className="text-sm text-blue-600 italic mb-2">
                      💡 {roadmap.roadmap.phase1.aiTip}
                    </p>
                  )}
                  <ul className="text-sm text-gray-700 space-y-1 ml-10">
                    {roadmap?.roadmap.phase1.skills
                      .slice(0, 3)
                      .map((skill, idx) => (
                        <li key={idx}>• {skill}</li>
                      ))}
                    {roadmap && roadmap.roadmap.phase1.skills.length > 3 && (
                      <li className="text-gray-500">
                        ...and {roadmap.roadmap.phase1.skills.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {roadmap?.roadmap.phase2.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {roadmap?.roadmap.phase2.duration}
                      </p>
                    </div>
                  </div>
                  {roadmap?.roadmap.phase2.aiTip && (
                    <p className="text-sm text-indigo-600 italic mb-2">
                      💡 {roadmap.roadmap.phase2.aiTip}
                    </p>
                  )}
                  <ul className="text-sm text-gray-700 space-y-1 ml-10">
                    {roadmap?.roadmap.phase2.skills
                      .slice(0, 3)
                      .map((skill, idx) => (
                        <li key={idx}>• {skill}</li>
                      ))}
                    {roadmap && roadmap.roadmap.phase2.skills.length > 3 && (
                      <li className="text-gray-500">
                        ...and {roadmap.roadmap.phase2.skills.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {roadmap?.roadmap.phase3.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {roadmap?.roadmap.phase3.duration}
                      </p>
                    </div>
                  </div>
                  {roadmap?.roadmap.phase3.aiTip && (
                    <p className="text-sm text-purple-600 italic mb-2">
                      💡 {roadmap.roadmap.phase3.aiTip}
                    </p>
                  )}
                  <ul className="text-sm text-gray-700 space-y-1 ml-10">
                    {roadmap?.roadmap.phase3.skills
                      .slice(0, 3)
                      .map((skill, idx) => (
                        <li key={idx}>• {skill}</li>
                      ))}
                    {roadmap && roadmap.roadmap.phase3.skills.length > 3 && (
                      <li className="text-gray-500">
                        ...and {roadmap.roadmap.phase3.skills.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🗺️ Career Roadmap
              </h2>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-gray-700">
                  Roadmap temporarily unavailable. Please try again in a moment.
                </p>
              </div>
            </div>
          )}
        </div>

        {hackerNews ? (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📰 Latest Tech News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hackerNews?.stories.slice(0, 5).map((story) => (
                <a
                  key={story.id}
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>⭐ {story.score}</span>
                    <span>💬 {story.descendants}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">by {story.by}</p>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📰 Latest Tech News
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-700">
                News feed temporarily unavailable.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
