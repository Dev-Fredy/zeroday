function calculateBurnRate(data) {
  let { income, expenses, savings, debt, interest } = data;

  const burnRate = (Number(expenses) / Number(income)) * 100;
  const net = Number(income) - Number(expenses);

  let monthsLeft = null;
  let daysLeft = null;
  let collapseDate = null;

  if (net < 0) {
    const dailyLoss = Math.abs(net) / 30.44;
    daysLeft = savings / dailyLoss;
    monthsLeft = daysLeft / 30.44;
  } else {
    daysLeft = "Stable";
    monthsLeft = "Stable";
  }

  if (typeof daysLeft === "number") {
    collapseDate = new Date();
    collapseDate.setDate(collapseDate.getDate() + Math.floor(daysLeft));
  }

  const r = Number(interest) / 100;

  const futureDebt = debt * Math.pow(1 + r, 12);

  let risk = "Low";

  if (burnRate > 90 || (monthsLeft !== null && monthsLeft < 3)) {
    risk = "High";
  } else if (burnRate > 75) {
    risk = "Medium";
  }

  let newBurnRate = burnRate.toFixed(2);
  let newFutureDebt = futureDebt.toFixed(2);

  return {
    burnRate: Number(newBurnRate),
    daysLeft,
    futureDebt: Number(newFutureDebt),
    collapseDate,
    net,
    risk,
  };
}

module.exports = calculateBurnRate;
