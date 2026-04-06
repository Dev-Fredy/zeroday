function generateMonteCarloData(numSeries, years) {
  const allSeries = [];

  for (let i = 0; i < numSeries; i++) {
    let balance = 1000;
    const dataPoints = [balance];

    for (let y = 1; y <= years; y++) {
      const change = Math.random() * 0.4 - 0.15;
      balance = Math.round(balance * (1 + change));
      dataPoints.push(balance);
    }

    allSeries.push({
      name: `Scenario ${i + 1}`,
      data: dataPoints,
    });
  }

  return allSeries;
}

module.exports = generateMonteCarloData;
