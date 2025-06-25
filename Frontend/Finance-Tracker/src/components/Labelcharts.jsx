import Chart from "react-apexcharts";
const Labelcharts = () => {
  const options = {
    xaxis: {
      show: true,
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    chart: {
      type: "area",
      height: "100%",
      width: "100%",
      sparkline: { enabled: false },
      fontFamily: "Inter, sans-serif",
      dropShadow: { enabled: false },
      toolbar: { show: false },
    },
    tooltip: {
      enabled: true,
      x: { show: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: "Developer Edition",
      data: [150, 141, 145, 152, 135, 125],
      color: "#1A56DB",
    },
    {
      name: "Designer Edition",
      data: [43, 13, 65, 12, 42, 73],
      color: "#7E3BF2",
    },
  ];

  return <Chart options={options} series={series} type="area" height={250} />;
};

export default Labelcharts;
