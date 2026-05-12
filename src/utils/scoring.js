// Scoring engine for Education & Eligibility Simulation

/**
 * Calculate score for a mini-game answer (MCQ format)
 */
export function scoreMiniGameAnswer(isCorrect, streak) {
  const basePoints = isCorrect ? 10 : 0;
  const streakBonus = isCorrect && streak >= 2 ? Math.min(streak, 5) : 0;
  return { points: basePoints + streakBonus, streakBonus };
}

/**
 * Calculate score for an audit scenario (Proceed/Reject)
 */
export function scoreAuditScenario({
  userDecision,
  correctDecision,
  userRisks,
  correctRisks,
  justification = '',
  strongKeywords = [],
  timeRemaining = 0,
  totalTime = 60,
  targetRole = 'sde' // Default to sde
}) {
  let points = 0;
  let riskImpact = 0;
  let isRoleConfusion = false;
  const breakdown = [];

  // 1. Decision scoring (Weight: ~60%)
  if (userDecision === correctDecision) {
    points += 20;
    breakdown.push({ label: 'Correct decision', points: 20 });
  } else {
    // Role Confusion Detection
    // "Applying CS rules to warehouse roles" - i.e., rejecting a valid warehouse candidate for stream/degree
    if (targetRole === 'warehouse-manager' && correctDecision === 'proceed' && userDecision === 'reject') {
      const isStreamError = userRisks.includes('stream') || userRisks.includes('degree');
      if (isStreamError) {
        isRoleConfusion = true;
      }
    }

    if (correctDecision === 'proceed' && userDecision === 'reject') {
      points -= 10;
      riskImpact += 15;
      breakdown.push({ 
        label: isRoleConfusion ? 'Role Confusion (Wrong Rejection)' : 'Wrong rejection (Delay)', 
        points: -10 
      });
    } else if (correctDecision === 'reject' && userDecision === 'proceed') {
      points -= 20;
      riskImpact += 40;
      breakdown.push({ label: 'Wrong approval (Risk)', points: -20 });
    } else {
      // Handle fallback for legacy 'timeout' data
      points -= 5;
      breakdown.push({ label: 'Incorrect decision', points: -5 });
    }
  }

  // 2. Risk tag scoring
  const userRiskSet = new Set(userRisks);
  const correctRiskSet = new Set(correctRisks);

  for (const tag of correctRisks) {
    if (userRiskSet.has(tag)) {
      points += 5;
      breakdown.push({ label: `Identified risk: ${tag}`, points: 5 });
    } else {
      points -= 5;
      riskImpact += 10;
      breakdown.push({ label: `Missed risk: ${tag}`, points: -5 });
    }
  }

  for (const tag of userRisks) {
    if (!correctRiskSet.has(tag)) {
      points -= 2;
      breakdown.push({ label: `Ghost risk: ${tag}`, points: -2 });
    }
  }

  // 3. Justification scoring (Weight: ~20% - Only for main game)
  if (justification && strongKeywords.length > 0) {
    const justLower = justification.toLowerCase();
    const keywordMatches = strongKeywords.filter(kw => justLower.includes(kw.toLowerCase()));
    
    if (keywordMatches.length >= 2) {
      points += 10;
      breakdown.push({ label: 'Strong justification', points: 10 });
    } else if (keywordMatches.length === 1) {
      points += 5;
      breakdown.push({ label: 'Partial justification', points: 5 });
    }
  }

  // 4. Speed bonus (Weight: ~20%)
  if (timeRemaining > 0 && userDecision === correctDecision) {
    const ratio = timeRemaining / totalTime;
    let speedPoints = 0;
    if (ratio > 0.5) speedPoints = 10;
    else if (ratio > 0.2) speedPoints = 5;
    
    if (speedPoints > 0) {
      points += speedPoints;
      breakdown.push({ label: 'Speed bonus', points: speedPoints });
    }
  }

  return { points, riskImpact, breakdown, isRoleConfusion, targetRole };
}

/**
 * Get risk meter level and color
 */
export function getRiskLevel(riskValue) {
  if (riskValue <= 20) return { level: 'Certified', color: 'green', emoji: '✅' };
  if (riskValue <= 50) return { level: 'Learning', color: 'yellow', emoji: '⚠️' };
  return { level: 'High Risk', color: 'red', emoji: '🚨' };
}

/**
 * Determine risk behavior type from audit results
 */
export function getRiskBehavior(results) {
  const roleConfusionCount = results.filter(r => r.isRoleConfusion).length;
  const wrongApprovals = results.filter(
    r => r.correctDecision === 'reject' && r.userDecision === 'proceed'
  ).length;
  const totalRisk = results.reduce((sum, r) => sum + r.riskImpact, 0);

  if (roleConfusionCount >= 2) {
    return {
      type: 'Role-Confused',
      icon: 'fa-shuffle',
      color: '#a855f7', // Purple
      detail: 'You are applying SDE technical rules to Warehouse roles. Remember: Warehouse roles accept ANY bachelor\'s degree.'
    };
  }

  if (totalRisk > 50 || wrongApprovals >= 1) {
    return { 
      type: 'Risk Prone', 
      icon: 'fa-triangle-exclamation', 
      color: '#ef4444', 
      detail: 'You approved high-risk candidates. Review the degree and university rules.' 
    };
  }
  
  const wrongRejections = results.filter(
    r => r.correctDecision === 'proceed' && r.userDecision === 'reject'
  ).length;

  if (wrongRejections >= 2) {
    return { 
      type: 'Over-Cautious', 
      icon: 'fa-shield-halved', 
      color: '#f59e0b', 
      detail: 'You rejected valid candidates. Ensure you don\'t flag legitimate satellite campuses.' 
    };
  }

  return { 
    type: 'Expert Auditor', 
    icon: 'fa-award', 
    color: '#22c55e', 
    detail: 'Outstanding judgment. You accurately balanced speed with policy compliance.' 
  };
}

/**
 * Get weak areas from audit results
 */
export function getWeakAreas(results) {
  const missedCounts = {};
  for (const r of results) {
    const userRiskSet = new Set(r.userRisks || []);
    for (const tag of (r.correctRisks || [])) {
      if (!userRiskSet.has(tag)) {
        missedCounts[tag] = (missedCounts[tag] || 0) + 1;
      }
    }
  }

  // Add Role Confusion as a potential weak area
  const roleConfusionCount = results.filter(r => r.isRoleConfusion).length;
  if (roleConfusionCount > 0) {
    missedCounts['Role Awareness'] = roleConfusionCount;
  }

  return Object.entries(missedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([tag, count]) => ({ tag, count }));
}

