function generateRandomData(points = 60, start = 100) {
  let data = [];
  let balance = 20000;
  let now = Date.now() - points * 1000;

  // const interestRate = 0.0005;
  // const avgIncome = 50;
  // const avgExpense = 120;

  for (let i = 0; i < points; i++) {
    // const interest = balance * interestRate;
    // const income = avgIncome + (Math.random() * 30 - 15);
    // const expense = avgExpense + (Math.random() * 40 - 20);

    // balance = balance + interest + income - expense;

    balance += balance * 0.0005;
    balance += 110 - 100;

    if (balance < 0) balance = 0;

    data.push([now + i * 1000, parseFloat(balance.toFixed(2))]);
  }
  console.log(data);
  return data;
}

const burnData = generateRandomData();
let lastBalance = burnData[burnData.length - 1][1];

const options = {
  chart: {
    type: "area",
    height: 400,
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimations: { speed: 800 },
    },
    toolbar: {
      show: false,
    },
    zoom: { enabled: false },
    background: "transparent",
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
  },
  dataLabels: { enabled: false },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  series: [
    {
      name: "Balance",
      data: burnData,
    },
  ],
  xaxis: {
    type: "datetime",
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: true },
  },
  yaxis: { labels: { show: false } },
  tooltip: { x: { format: "HH:mm:ss" } },
};

const chart = new ApexCharts(
  document.querySelector(".jsLifestyleChartPlay"),
  options
);

chart.render();

console.log(chart);

setInterval(() => {
  const interest = lastBalance * 0.0005;
  const income = 110 + Math.random() * 20;
  const expense = 100 + Math.random() * 20;

  lastBalance = lastBalance + interest + income - expense;

  if (lastBalance < 0) lastBalance = 0;

  const newPoint = [new Date().getTime(), parseFloat(lastBalance.toFixed(2))];

  chart.appendData([{ data: [newPoint] }]);
}, 100);
