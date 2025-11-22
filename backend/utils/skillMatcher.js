function matchSkills(currentSkills, requiredSkills) {
  const normalizedCurrent = currentSkills.map(s => s.toLowerCase().trim());
  const normalizedRequired = requiredSkills.map(s => s.toLowerCase().trim());

  const matched = [];
  const missing = [];

  requiredSkills.forEach((skill, index) => {
    if (normalizedCurrent.includes(normalizedRequired[index])) {
      matched.push(skill);
    } else {
      missing.push(skill);
    }
  });

  return {
    matched,
    missing,
    matchPercentage: Math.round((matched.length / requiredSkills.length) * 100)
  };
}

function suggestLearningOrder(missingSkills, targetRole) {
  const foundationalSkills = [
    'html', 'css', 'javascript', 'python', 'java', 'git',
    'sql', 'linux', 'excel', 'statistics'
  ];

  const intermediateSkills = [
    'react', 'node.js', 'express', 'spring boot', 'typescript',
    'mongodb', 'rest apis', 'docker', 'pandas', 'numpy'
  ];

  const advancedSkills = [
    'kubernetes', 'microservices', 'system design', 'machine learning',
    'cloud platforms', 'ci/cd', 'deep learning', 'terraform'
  ];

  const categorized = {
    foundational: [],
    intermediate: [],
    advanced: []
  };

  missingSkills.forEach(skill => {
    const normalizedSkill = skill.toLowerCase();

    if (foundationalSkills.some(f => normalizedSkill.includes(f))) {
      categorized.foundational.push(skill);
    } else if (intermediateSkills.some(i => normalizedSkill.includes(i))) {
      categorized.intermediate.push(skill);
    } else {
      categorized.advanced.push(skill);
    }
  });

  return [
    ...categorized.foundational,
    ...categorized.intermediate,
    ...categorized.advanced
  ];
}


function calculateSkillGapStats(matchedSkills, missingSkills, requiredSkills) {
  const totalRequired = requiredSkills.length;
  const matched = matchedSkills.length;
  const missing = missingSkills.length;
  const matchPercentage = Math.round((matched / totalRequired) * 100);

  let readinessLevel = 'Beginner';
  if (matchPercentage >= 80) readinessLevel = 'Job Ready';
  else if (matchPercentage >= 60) readinessLevel = 'Advanced';
  else if (matchPercentage >= 40) readinessLevel = 'Intermediate';

  return {
    totalRequired,
    matched,
    missing,
    matchPercentage,
    readinessLevel
  };
}

module.exports = {
  matchSkills,
  suggestLearningOrder,
  calculateSkillGapStats
};
