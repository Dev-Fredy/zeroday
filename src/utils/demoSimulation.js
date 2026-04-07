const STRATEGIES = {
  safe: { mean: 0.07, volatility: 0.08 },
  balanced: { mean: 0.1, volatility: 0.15 },
  aggressive: { mean: 0.14, volatility: 0.24 },
};

function randomNormal() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function percentile(sorted, p) {
  return sorted[Math.floor(sorted.length * p)];
}

async function runMonteCarlo({ income, expenses, savings, years, strategy }) {
  const config = STRATEGIES[strategy] || STRATEGIES.balanced;
  const contribution = Math.max(0, income - expenses) * 12;
  const runs = 1000;

  const yearlyBuckets = Array.from({ length: years }, () => []);

  for (let i = 0; i < runs; i++) {
    let wealth = savings;

    for (let y = 0; y < years; y++) {
      const shock = randomNormal() * config.volatility;
      wealth = wealth * (1 + config.mean + shock) + contribution;
      yearlyBuckets[y].push(Math.max(0, wealth));
    }
  }

  const median = [];
  const best = [];
  const worst = [];

  for (const bucket of yearlyBuckets) {
    bucket.sort((a, b) => a - b);
    median.push(Math.round(percentile(bucket, 0.5)));
    best.push(Math.round(percentile(bucket, 0.9)));
    worst.push(Math.round(percentile(bucket, 0.1)));
  }

  const finalMedian = median.at(-1);
  const finalBest = best.at(-1);
  const finalWorst = worst.at(-1);
  const successRate = Math.round(
    (yearlyBuckets.at(-1).filter((v) => v >= savings * 3).length / runs) * 100,
  );

  return {
    summary: {
      median: finalMedian,
      best: finalBest,
      worst: finalWorst,
      successRate,
    },
    chart: {
      median,
      best,
      worst,
    },
    advice: {
      simple:
        successRate > 70
          ? "You are on a strong path toward your financial future."
          : "Increase savings slightly to improve future confidence.",
      professional:
        successRate > 70
          ? "High confidence outcome with resilient long-term wealth accumulation."
          : "The simulation indicates moderate path fragility. Improve monthly contributions.",
    },
  };
}

module.exports = { runMonteCarlo };
