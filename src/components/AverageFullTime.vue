<template>
  <div class="hello">
    <h1>Average Full Time</h1>
    <div>Pick a parking: 
      <select v-model="selectedParking">
        <option v-for="parking in this.parkingNames" v-bind:key="parking" v-bind:value="parking">
          {{ parking }}
        </option>
      </select>
    </div>
    <div>Pick a day: <Datepicker v-model="date" name="date" :monday-first="true"
                                            :disabledDates="disabledDates"></datepicker>
    </div>
    <div id="averageResult"/>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }, 
  data() {
    return {
    today:new Date(),
    date:this.today,
    disabledDates:{from: this.today}, 
    parkingNames: [],
    selectedParking: null
    }
  }, 
  mounted() {
    this.today.setHours(0, 0, 0, 0);
    this.date=this.today;
    this.disabledDates={to: this.today};
  }, 
  components: {
            Datepicker
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
