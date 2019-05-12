export default {
  createChart(name, data, labels){
    const ctx = name;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Stock Price',
          data: data,
          borderColor: '#36495d',
          borderWidth: 2
        }]
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
