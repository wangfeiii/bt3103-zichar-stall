<template>
  <div id="app">
    <div id='counter'>
        <button id='sub' v-on:click='decrement()'> - </button> 
        <span style="font-size:30px; margin:10px">{{counter}}</span>
        <button id='add' v-on:click='increment()'> + </button>
    </div>
  </div>
</template>

<script>

export default {
    props: ['item'],
    data (){
        return {
            counter: 0
        }
    },
    methods: {
        decrement: function() {
            if (this.counter!=0) {
                this.counter--;
                this.$emit('counter', this.item, this.counter); 
            }
        },
        increment: function() {
            if (this.counter==10) {
                alert("You cannot buy more than 10 items.")
            } else {
                this.counter++;
                this.$emit('counter', this.item, this.counter);
                
            }  
            
        }
    } 
}
</script>

<style scoped>
#app {
    text-align: center;
}
button { 
    font-size: 30px;
    padding: 10px 20px;
    color:white;
    background-color:black;
}
</style>
