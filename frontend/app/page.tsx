"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AVAILABLE_ROLES, COMMON_SKILLS } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const [targetRole, setTargetRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetRole) {
      setError("Please select a target role");
      return;
    }

    if (selectedSkills.length === 0) {
      setError("Please select at least one current skill");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Store data in sessionStorage to pass to results page
      sessionStorage.setItem("targetRole", targetRole);
      sessionStorage.setItem("currentSkills", JSON.stringify(selectedSkills));

      // Navigate to results page
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Skill Gap Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Discover your career path and bridge the skill gap
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Target Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select your target role</option>
                  {AVAILABLE_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Skills <span className="text-red-500">*</span>
                </label>

                {selectedSkills.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddCustomSkill())
                    }
                    placeholder="Add custom skill..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSkill}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Add
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50">
                  {COMMON_SKILLS.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded transition"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "Analyzing..." : "Analyze My Career Path →"}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Selected {selectedSkills.length} skill
              {selectedSkills.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
