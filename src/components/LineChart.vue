
<template>
  <div id="app">
    <h1>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./LineChart.js";
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
