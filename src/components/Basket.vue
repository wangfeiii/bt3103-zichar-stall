<template>
  <div id="app">
  <p>   Menu: </p>
  <ul>
  <li v-for="(item2,index) in itemsSelected" :key="index" >
  {{item2[0]}} x {{item2[1]}}
  </li>
  </ul>
  <button v-on:click='findTotal(); sendOrder()' > Add Order </button>
  <p v-show='show'> Subtotal: ${{ subtotal }}</p>  
  <p v-show='show'> Grand Total: ${{ total }}</p>
  </div>
</template>

<script>
import db from '../firebase.js'

export default {
    props: ['itemsSelected'],
    methods: {
        findTotal: function() {
            this.show=true;
        },
        sendOrder: function(){
            var ref = db.collection("orders").doc();

            var data = new Object();
            db.collection('menu').get().then((querySnapShot)=>{
                let item={}
                querySnapShot.forEach(doc=>{
                    item=doc.data()
                    var food = item.name;
                    data[food]=0;
                })
                ref.set(data).then(()=>{location.reload()});
                
                for (var items of this.itemsSelected) {
                var newItem = new Object();
                newItem[items[0]]=items[1];
                ref.update(newItem);
                }
            })
        }
    },
    data () {
        return {
            subtotal:0,
            total:0,
            show:false
        }
    },
    watch: {
      itemsSelected: function() {
        var item;
        this.subtotal=0;
        for (item of this.itemsSelected) {
            this.subtotal = this.subtotal+item[1]*item[2];
        }
      },
      subtotal: function() {
          this.total=(Math.round(this.subtotal*1.07*100)/100).toFixed(2);
      }
    }
}
</script>

<style scoped>
* {
    font-size:20px;
}
button {
    color:white;
    background-color:black;
    padding:5px;
}

</style>
