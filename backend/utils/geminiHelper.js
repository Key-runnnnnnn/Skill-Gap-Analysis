const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let genAI = null;
let model = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
}

async function generateRecommendations(targetRole, matchedSkills, missingSkills) {
  if (!model) {
    return generateMockRecommendations(targetRole, missingSkills);
  }

  try {
    const prompt = `You are a career advisor. A person wants to become a ${targetRole}.
They already have these skills: ${matchedSkills.join(', ')}.
They are missing these skills: ${missingSkills.join(', ')}.

Provide a concise recommendation (2-3 sentences) on:
1. Which missing skills to prioritize first
2. Brief learning approach
3. Encouragement

Keep it professional, actionable, and use plain text without markdown formatting (no bold, no asterisks).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiText = response.text();

    if (aiText) {
      aiText = aiText
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/\#\#\#/g, '')
        .replace(/\#\#/g, '')
        .replace(/\#/g, '')
        .trim();

      return {
        recommendation: aiText,
        source: 'gemini-ai'
      };
    }

    return generateMockRecommendations(targetRole, missingSkills);

  } catch (error) {
    console.error('Gemini API Error:', error.message);
    if (error.message && error.message.includes('429')) {
      return {
        recommendation: `AI recommendations are temporarily unavailable due to API rate limits. Based on your skill analysis, focus on learning the missing skills systematically, starting with foundational concepts before moving to advanced topics. The skill gap analysis above provides essential guidance for your learning path.`,
        source: 'rate-limited'
      };
    }

    return generateMockRecommendations(targetRole, missingSkills);
  }
}

function generateMockRecommendations(targetRole, missingSkills) {
  const prioritySkills = missingSkills.slice(0, 3);

  return {
    recommendation: `To become a ${targetRole}, start by focusing on ${prioritySkills.join(', ')}. These foundational skills will help you build a strong base. Consider taking online courses, building small projects, and practicing daily. You're on the right path—stay consistent and motivated!`,
    source: 'mock'
  };
}

async function enhanceRoadmapWithAI(targetRole, currentSkills, roadmap) {
  if (!model) {
    return roadmap;
  }

  try {
    const prompt = `A person wants to become a ${targetRole}. They currently have these skills: ${currentSkills.join(', ')}.
    
Here's their learning roadmap:
Phase 1: ${roadmap.phase1.title} (${roadmap.phase1.duration})
Phase 2: ${roadmap.phase2.title} (${roadmap.phase2.duration})
Phase 3: ${roadmap.phase3.title} (${roadmap.phase3.duration})

Provide one personalized tip for each phase (keep each tip to 1 sentence, max 15 words each). Format as:
Phase 1: [tip]
Phase 2: [tip]
Phase 3: [tip]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    if (aiText) {
      const lines = aiText.trim().split('\n').filter(line => line.includes('Phase'));

      const enhancedRoadmap = { ...roadmap };
      lines.forEach((line, index) => {
        const phaseKey = `phase${index + 1}`;
        if (enhancedRoadmap[phaseKey]) {
          const tip = line.split(':')[1]?.trim();
          if (tip) {
            enhancedRoadmap[phaseKey].aiTip = tip;
          }
        }
      });

      return enhancedRoadmap;
    }

    return roadmap;

  } catch (error) {
    console.error('Gemini API Error for roadmap:', error.message);

    if (error.message && error.message.includes('429')) {
      return {
        phase1: {
          ...roadmap.phase1,
          aiTip: 'AI tips temporarily unavailable. Focus on mastering fundamentals thoroughly.'
        },
        phase2: {
          ...roadmap.phase2,
          aiTip: 'AI tips temporarily unavailable. Build practical projects to solidify knowledge.'
        },
        phase3: {
          ...roadmap.phase3,
          aiTip: 'AI tips temporarily unavailable. Keep learning and stay current with trends.'
        }
      };
    }

    return roadmap;
  }
}

module.exports = {
  generateRecommendations,
  enhanceRoadmapWithAI
};
