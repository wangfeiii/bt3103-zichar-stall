<template>
    <div id="app">
        <div id='item' v-for="(count, name, index) in datapacket" :key="name" >
           {{name}}: {{count}}
           <br><input :id="index" placeholder=0 type="number"  min="0"><br>

      </div>
      <br>
      <button v-on:click="updateOrder()"> Update Order</button>

    </div>
</template>

<script>
import db from "../firebase";

export default {
    data () {
        return {
        datapacket:{},
        newData:{}
        }
    },
    methods: {
        fetchItems: function() {
            db.collection('orders').doc(this.$route.params.id).get().then((doc)=>{
            this.datapacket= doc.data();
         });
        },
        updateOrder: function() {
                     
            var k=0;
            for (var i in this.datapacket) {
                if (document.getElementById(k).value!="") {
                    this.newData[i]=document.getElementById(k).value;
                }
                k=k+1
            }
            db.collection('orders').doc(this.$route.params.id).update(this.newData).then(()=>{
                this.$router.push({path: '/orders'})
            
            });

        }
    },
    created(){
      this.fetchItems()     
    } 
}
</script>

<style scoped>
*{
    text-align: center;
}
#orders{
    text-align: center;
}
button {
    align-self: center;
    background-color: #f7cac9;
    font-size: 16px;
}
</style>
