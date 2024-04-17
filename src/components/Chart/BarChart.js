import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartComponent = (props) => {

  console.log("props");

  console.log(props);

  function currencyFormat(num) {
    debugger;
    return (num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
}


  function getRandomColor(n) {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    var colors = [];
    for (var j = 0; j < n; j++) {
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        colors.push(color);
        color = '#';
    }
    return colors;
}

let tempLabel=["April","May","June","July","August","Sepetember","October","November","December","January","February","March"]
  const data = {
    labels:props.label.length<=0?tempLabel:props.label,
    datasets: [
      {
        label: 'Rs.'+currencyFormat(props.salesVal),
        data: props.values,
        backgroundColor:getRandomColor(props.values.length),
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
          xAxes: [{
              gridLines: {
                  drawOnChartArea: false
              }
          }],
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
  };
  

  return (
    <div>
      {/* <h2>{props.heading}</h2> */}
      <Bar data={data} />
    </div>
  );
};

export default ChartComponent;
