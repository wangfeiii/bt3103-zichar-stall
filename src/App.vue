<template>
  <div id="app">
    <h1> Welcome to MyStore</h1>
    <router-view></router-view>
 
  </div>
</template>

<script>

</script>


<style scoped>
h1 {
  text-align: center;
  color:brown;
  font-family:Papyrus,sans-serif;
  font-size:50px;
}
ul {
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
  width: 100%;
  max-width: 70%;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

</style>
