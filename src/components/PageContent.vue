<template>
  <div id="app">
  <ul>
    <li><router-link to="/" exact>Home</router-link></li>
    <li><router-link to="/orders" exact>Orders</router-link></li>
    <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
  </ul>
  <ul id='itemsList'>
  <li v-for="(item) in itemsList" v-bind:key="item.id">
  <header id='itemName'>{{item.name}} </header>
  <img :src=item.imageURL>
  <p id='price'> ${{item.price}}</p>
  <qtyCounter v-bind:item='item' v-on:counter="onCounter"></qtyCounter>
  </li>
  </ul> 

  <basket id='shoppingBasket' v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from '../firebase.js'

export default {
  
    data (){
        return {
            itemsSelected:[],
            itemsList:[]
        }
    },
    components: {
        'qtyCounter':QuantityCounter,
        'basket':Basket
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {

                // Loop through everything to check what is not in the basket
                var contain=false;
                for (let i = 0; i < this.itemsSelected.length; i++) {

                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    if(item_name==item.name && count>0) {   // if item_name==item.name and the count> 0, update this.itemsSelected

                        contain=true;
                        this.$set(this.itemsSelected[i],1,count);
                        break;
                    } else if(item_name==item.name && count==0){   // Next, item_name==item.name and the count== 0, remove it from itemsSelected.

                        contain=true;
                        this.$delete(this.itemsSelected,i);
                        break;
                    } else {
                        continue;
                    }                
                }
         // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                if (contain==false) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
        fetchItems: function() {
          database.collection('menu').get().then((querySnapShot)=>{ 
            let item={} 
            querySnapShot.forEach(doc=>{ //for each item, push their details to the itemlist as object
              item=doc.data() 
              item.show=false 
              this.itemsList.push(item)
              }) }) } },
        
        created(){
          this.fetchItems() 
        }
}
</script>

<style scoped>

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
  font-size: 30px;
}
img {
  width: 135px;
  height: 135px;
}
#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

</style>
