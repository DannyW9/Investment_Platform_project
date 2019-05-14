export default {
  createChart(name, data, labels, data2){
    const ctx = name;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Stock Price',
            data: data,
            borderColor: '#FF6A00',
            borderWidth: 2
          },
          {
            label: 'Volume',
            data: data2,
            borderColor: 'black',
            borderWidth: 2,
            hidden: true
          }
      ]
      },
      options: {
        responsive: false,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
              padding: 25,
            }
          }]
        }
      }
    })
  }
  }
