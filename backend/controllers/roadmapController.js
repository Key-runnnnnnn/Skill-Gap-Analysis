const roadmapsData = require('../data/roadmapsData.json');
const { enhanceRoadmapWithAI } = require('../utils/geminiHelper');


const generateRoadmap = async (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Please provide targetRole'
      });
    }

    const roadmap = roadmapsData[targetRole];
    if (!roadmap) {
      return res.status(404).json({
        error: 'Roadmap not found',
        message: `Roadmap for "${targetRole}" is not available`,
        availableRoles: Object.keys(roadmapsData)
      });
    }

    let roadmapResponse = {
      targetRole,
      roadmap: {
        phase1: {
          ...roadmap.phase1,
          order: 1
        },
        phase2: {
          ...roadmap.phase2,
          order: 2
        },
        phase3: {
          ...roadmap.phase3,
          order: 3
        }
      },
      totalDuration: calculateTotalDuration(roadmap),
      timestamp: new Date().toISOString()
    };

    if (currentSkills && Array.isArray(currentSkills) && currentSkills.length > 0) {
      try {
        const enhancedRoadmap = await enhanceRoadmapWithAI(targetRole, currentSkills, roadmap);
        roadmapResponse.roadmap = {
          phase1: {
            ...enhancedRoadmap.phase1,
            order: 1
          },
          phase2: {
            ...enhancedRoadmap.phase2,
            order: 2
          },
          phase3: {
            ...enhancedRoadmap.phase3,
            order: 3
          }
        };
        roadmapResponse.personalizedTips = true;
      } catch (aiError) {
        console.log('AI enhancement failed, returning base roadmap:', aiError.message);
        roadmapResponse.personalizedTips = false;
      }
    } else {
      roadmapResponse.personalizedTips = false;
    }

    res.json(roadmapResponse);

  } catch (error) {
    console.error('Roadmap Generation Error:', error);
    res.status(500).json({
      error: 'Roadmap generation failed',
      message: error.message
    });
  }
};

function calculateTotalDuration(roadmap) {
  const durations = [
    roadmap.phase1.duration,
    roadmap.phase2.duration,
    roadmap.phase3.duration
  ];

  const months = durations.map(d => {
    const match = d.match(/(\d+)[-–]?(\d+)?/);
    if (match) {
      const min = parseInt(match[1]);
      const max = match[2] ? parseInt(match[2]) : min;
      return { min, max };
    }
    return { min: 1, max: 2 };
  });

  const totalMin = months.reduce((sum, m) => sum + m.min, 0);
  const totalMax = months.reduce((sum, m) => sum + m.max, 0);

  return totalMin === totalMax ? `${totalMin} months` : `${totalMin}-${totalMax} months`;
}

module.exports = {
  generateRoadmap
};
