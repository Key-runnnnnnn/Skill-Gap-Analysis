const skillsData = require('../data/skillsData.json');
const { matchSkills, suggestLearningOrder, calculateSkillGapStats } = require('../utils/skillMatcher');
const { generateRecommendations } = require('../utils/geminiHelper');
const { saveUserInput } = require('../utils/fileStorage');

const analyzeSkillGap = async (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    if (!targetRole || !currentSkills) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Please provide targetRole and currentSkills'
      });
    }

    if (!Array.isArray(currentSkills)) {
      return res.status(400).json({
        error: 'Invalid format',
        message: 'currentSkills must be an array'
      });
    }

    const requiredSkills = skillsData[targetRole];
    if (!requiredSkills) {
      return res.status(404).json({
        error: 'Role not found',
        message: `Target role "${targetRole}" is not available`,
        availableRoles: Object.keys(skillsData)
      });
    }

    const { matched, missing } = matchSkills(currentSkills, requiredSkills);
    const stats = calculateSkillGapStats(matched, missing, requiredSkills);

    const learningOrder = suggestLearningOrder(missing, targetRole);

    const aiRecommendation = await generateRecommendations(targetRole, matched, missing);

    const result = {
      targetRole,
      analysis: {
        matchedSkills: matched,
        missingSkills: missing,
        statistics: stats,
        learningOrder,
        recommendations: {
          text: aiRecommendation.recommendation,
          source: aiRecommendation.source
        }
      },
      timestamp: new Date().toISOString()
    };

    try {
      await saveUserInput({
        targetRole,
        currentSkills,
        matchedCount: matched.length,
        missingCount: missing.length,
        matchPercentage: stats.matchPercentage
      });
    } catch (storageError) {
      console.log('Note: Could not save to file storage:', storageError.message);
    }

    res.json(result);

  } catch (error) {
    console.error('Skill Gap Analysis Error:', error);
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message
    });
  }
};

module.exports = {
  analyzeSkillGap
};
