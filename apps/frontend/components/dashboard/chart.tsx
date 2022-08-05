import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart: React.FC = () => {
  const state = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: 'Gradient Donut with custom Start-angle',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

    return (
      <div id="chart">
        <ReactApexChart
          option={state.options}
          series={state.series}
          type="donut"
          width={380}
        />
      </div>
    );
  
}

export default ApexChart
