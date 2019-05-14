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
  },




  portfolioChart(name, data, labels){
    const ctx = name;
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Portfolio',
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

  DivChart(name, data, labels){
    const diversification = name;
    var divChart = new Chart(diversification, {
      type: 'doughnut',
      data: {
      labels: labels,
      datasets: [
        {
          label: "sector",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: data,
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Diversification by Sector'
      }
    }
})}


  }
