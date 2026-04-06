function generateRunway(data) {
  let { savings, income, expenses } = data;

  const net = Number(income) - Number(expenses);

  const dailyLoss = Math.abs(net) / 30.44;

  let runwaydata = [];

  let remaining = savings;

  let day = 0;

  while (remaining > 0 && day < 365) {
    runwaydata.push({
      x: day,
      y: Math.max(remaining, 0).toFixed(2),
    });

    remaining -= dailyLoss;
    day++;
  }

  return runwaydata;
}

module.exports = generateRunway;
