<template>
  <div id="app">
  <ul>
    <li><router-link to="/" exact>Home</router-link></li>
    <li><router-link to="/orders" exact>Orders</router-link></li>
    <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
  </ul>

  <ul id="orders">
      <li v-for="item in orders" :key="item">
          <div style="font-size:20px;" v-for="(count, name) in item[1]" :key="name">
           {{name}}: {{count}} 
         
          </div>
          <button style="font-size:15px;" v-bind:id=item[0] v-on:click="deleteItem($event)"> Delete </button>
          <button style="font-size:15px;" v-bind:id=item[0] v-on:click="route($event)">Modify</button>
        </li>
    </ul>  
  </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            orders:[],
            id:0
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot)=>{
            let item={}
            querySnapShot.forEach(doc=>{
              item=doc.data() 
  
              this.orders.push([doc.id,item])
              }) });
        },
        deleteItem: function(event) {
          let doc_id = event.target.getAttribute("id");
          database.collection("orders").doc(doc_id).delete().then(() => {location.reload()});
        },
        
        route: function(event) {
          let doc_id = event.target.getAttribute("id");
          this.$router.push({name: 'Modify', params:{id:doc_id}});
        }
    },
    created(){
      this.fetchItems()         
    } 
}

</script>

<style scoped>
ul {
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
  font-size: 30px;
}
button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  margin: 16px;
}
</style>