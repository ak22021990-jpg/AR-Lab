// Scoring engine for Academic Risk Lab

/**
 * Calculate score for a mini-game answer
 */
export function scoreMiniGameAnswer(isCorrect, streak) {
  const basePoints = isCorrect ? 10 : 0;
  const streakBonus = isCorrect && streak >= 2 ? Math.min(streak, 5) : 0;
  return { points: basePoints + streakBonus, streakBonus };
}

/**
 * Calculate score for an audit scenario
 */
export function scoreAuditScenario({
  userDecision,
  correctDecision,
  userRisks,
  correctRisks,
  justification,
  strongKeywords,
}) {
  let points = 0;
  let riskImpact = 0;
  const breakdown = [];

  // Decision scoring
  if (userDecision === correctDecision) {
    points += 10;
    breakdown.push({ label: 'Correct decision', points: 10 });
  } else {
    // Wrong decision penalties
    if (correctDecision === 'proceed' && userDecision === 'reject') {
      points -= 8;
      riskImpact += 10;
      breakdown.push({ label: 'Wrong rejection', points: -8 });
    } else if (correctDecision === 'proceed' && userDecision === 'escalate') {
      points -= 5;
      riskImpact += 8;
      breakdown.push({ label: 'Unnecessary escalation', points: -5 });
    } else if (correctDecision === 'escalate' && userDecision === 'proceed') {
      points -= 10;
      riskImpact += 30;
      breakdown.push({ label: 'Wrong approval (missed issue)', points: -10 });
    } else if (correctDecision === 'escalate' && userDecision === 'reject') {
      points -= 8;
      riskImpact += 10;
      breakdown.push({ label: 'Wrong rejection', points: -8 });
    } else if (correctDecision === 'reject' && userDecision === 'proceed') {
      points -= 10;
      riskImpact += 30;
      breakdown.push({ label: 'Wrong approval', points: -10 });
    } else if (correctDecision === 'reject' && userDecision === 'escalate') {
      points -= 5;
      riskImpact += 8;
      breakdown.push({ label: 'Unnecessary escalation', points: -5 });
    }
  }

  // Risk tag scoring
  const userRiskSet = new Set(userRisks);
  const correctRiskSet = new Set(correctRisks);

  // Correct tags
  for (const tag of correctRisks) {
    if (userRiskSet.has(tag)) {
      points += 5;
      breakdown.push({ label: `Correct risk: ${tag}`, points: 5 });
    } else {
      points -= 5;
      riskImpact += 20;
      breakdown.push({ label: `Missed risk: ${tag}`, points: -5 });
    }
  }

  // Wrong tags
  for (const tag of userRisks) {
    if (!correctRiskSet.has(tag)) {
      points -= 2;
      breakdown.push({ label: `Wrong risk: ${tag}`, points: -2 });
    }
  }

  // Justification scoring
  const justLower = justification.toLowerCase();
  const keywordMatches = strongKeywords.filter(kw => justLower.includes(kw.toLowerCase()));
  if (keywordMatches.length >= 2) {
    points += 5;
    breakdown.push({ label: 'Strong justification', points: 5 });
  }

  return { points, riskImpact, breakdown, keywordMatches };
}

/**
 * Get risk meter level and color
 */
export function getRiskLevel(riskValue) {
  if (riskValue <= 25) return { level: 'Safe', color: 'green', emoji: '🟢' };
  if (riskValue <= 60) return { level: 'Caution', color: 'yellow', emoji: '🟡' };
  return { level: 'Audit Risk', color: 'red', emoji: '🔴' };
}

/**
 * Determine risk behavior type from audit results
 */
export function getRiskBehavior(results) {
  const wrongApprovals = results.filter(
    r => r.correctDecision !== 'proceed' && r.userDecision === 'proceed'
  ).length;
  const unnecessaryEscalations = results.filter(
    r => r.correctDecision !== 'escalate' && r.userDecision === 'escalate'
  ).length;
  const totalRisk = results.reduce((sum, r) => sum + r.riskImpact, 0);

  if (totalRisk > 60 || wrongApprovals >= 2) {
    return { type: 'Risky', icon: 'fa-skull-crossbones', color: '#ef4444', detail: 'You approved cases that should have been flagged.' };
  }
  if (unnecessaryEscalations >= 2) {
    return { type: 'Over-Cautious', icon: 'fa-shield-halved', color: '#f59e0b', detail: 'You escalated too many cases that could have been resolved.' };
  }
  return { type: 'Balanced', icon: 'fa-scale-balanced', color: '#22c55e', detail: 'Great judgment — you balanced speed with accuracy.' };
}

/**
 * Get weak areas from audit results
 */
export function getWeakAreas(results) {
  const missedCounts = {};
  for (const r of results) {
    const userRiskSet = new Set(r.userRisks);
    for (const tag of r.correctRisks) {
      if (!userRiskSet.has(tag)) {
        missedCounts[tag] = (missedCounts[tag] || 0) + 1;
      }
    }
  }
  return Object.entries(missedCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([tag, count]) => ({ tag, count }));
}
