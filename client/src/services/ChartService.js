export default {
  createChart(name, data, labels, data2, data3){
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
          },
          {
            label: 'Change',
            data: data3,
            borderColor: 'yellow',
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
          borderColor: '#FF6A00',
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
      },
      animation: {
        animateRotate: true,
        animateScale: true
      }
    }
})}


  }
