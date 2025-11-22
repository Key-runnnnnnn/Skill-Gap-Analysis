const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiClient = {
  analyzeSkillGap: async (data: {
    targetRole: string;
    currentSkills: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/skill-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to analyze skill gap");
    return response.json();
  },

  generateRoadmap: async (data: {
    targetRole: string;
    currentSkills?: string[];
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to generate roadmap");
    return response.json();
  },

  getHackerNews: async () => {
    const response = await fetch(`${API_BASE_URL}/api/hackernews`);
    if (!response.ok) throw new Error("Failed to fetch HackerNews stories");
    return response.json();
  },
};
