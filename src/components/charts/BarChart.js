import { Bar } from 'vue-chartjs'
import database from '/Users/admin/bt3103-week-4/src/firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Count",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","yellow"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods:{
    fetchItems: function () {
     database.collection('menu').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
          this.datacollection.labels.push(doc.data().name)
          var name = doc.data().name

          database.collection('orders').get().then(querySnapShot => {
            var count = 0
           
            querySnapShot.forEach(doc2 => {
              count = count + parseInt(doc2.data()[name])
            })
            this.datacollection.datasets[0].data.push(count)
            this.renderChart(this.datacollection, this.options)
            })
        })
      });
  

  }},
  created () {
    this.fetchItems()
  }
}