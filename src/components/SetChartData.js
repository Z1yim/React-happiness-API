export default function SetChartData(setChartData, chartDataRaw) {
  setChartData({
    labels: chartDataRaw.labels,
    datasets: [
      {
        data: chartDataRaw.data,
        backgroundColor: "rgba(98, 146, 158, 0.4)",
        borderColor: "#62929E",
      },
    ],
  });
}
