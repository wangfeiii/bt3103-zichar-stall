<template>
  <div id="app">
    <h1>Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
h1{
  text-align: center;
  font-size: 50px;
}
</style>
