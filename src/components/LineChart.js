import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [], 
        datasets: [
          {
            label: 'west',
            borderColor: 'pink',
            data: [],
            fill: false,
            gradientFill: true,
          }, 
          {
            label: 'national',
            borderColor:'blue', 
            data: [],
            fill: false
          },
          {
            label: 'east',
            borderColor: 'red', 
            data: [],
            fill: false
          },
          {
            label: 'central',
            borderColor: 'purple', 
            data: [],
            fill: false
        },
        {
          label: 'south',
          borderColor: 'green', 
          data: [],
          fill: false
        },
        {
          label: 'north',
          borderColor: 'yellow',
          data: [],
          fill: false
        }]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)'
        },
        responsive: true,
        maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems:function(){
      axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23').then(response=>{
        response.data.items.forEach((item) => {
          this.datacollection.labels.push(item.timestamp)
          this.datacollection.datasets[0].data.push(item.readings.psi_twenty_four_hourly.west)
          this.datacollection.datasets[1].data.push(item.readings.psi_twenty_four_hourly.national)
          this.datacollection.datasets[2].data.push(item.readings.psi_twenty_four_hourly.east)
          this.datacollection.datasets[3].data.push(item.readings.psi_twenty_four_hourly.central)
          this.datacollection.datasets[4].data.push(item.readings.psi_twenty_four_hourly.south)
          this.datacollection.datasets[5].data.push(item.readings.psi_twenty_four_hourly.north)

        })
        this.renderChart(this.datacollection, this.options)

      })
    

    }}
        ,
  mounted() {
    this.fetchItems()
  }
}