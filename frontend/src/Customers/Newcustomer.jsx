import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Newcustomer = () => {
  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '60%',
        },
        track: {
          dropShadow: {
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            fontSize: '13px',
            color: '#ffff00',
            show: false,
          },
          value: {
            fontSize: '20px',
            show: true,
            color: '#000000',
            fontWeight: 'bold',
            marginTop:'-20px'
          },
        },
      },
    },
    fill: {
      type: 'color',
      colors: ['#22BB33'],
    },
    stroke: {
      lineCap: 'round',
      colors: ['#22BB33'], // Color of the stroke
      width: 15, // Adjust this value to control the thickness of the bar
    },
    labels: ['Progress'],
  };

  const series = [70];

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={200}
      />
    </div>
  );
};

export default Newcustomer;
