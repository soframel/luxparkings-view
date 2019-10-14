<template>
  <div class="hello">
    <h1>Average Full Time</h1>
    <div>Pick a parking: 
      <select v-model="selectedParking" @change="calulateAverageFullTime">
        <option v-for="parking in this.parkingNames" v-bind:key="parking" v-bind:value="parking">
          {{ parking }}
        </option>
      </select>
    </div>
    <div>Pick a day: <Datepicker v-model="date" name="date" :monday-first="true"
                        :disabledDates="disabledDates" @selected="calulateAverageFullTime"></datepicker>
    </div>
    
    <br/><br/>

    <div id="averageResult">
      <span class="resultMessage">{{message}}</span>
       <span class="resultValue">{{averageTime}}</span>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {getParkingNames, getAverageFullTime} from "../luxparkings-server.js";

export default {
  name: 'AverageFullTime',
  props: {
    msg: String
  }, 
  data() {
    return {
    today:new Date(),
    date:this.today,
    disabledDates:{from: this.today}, 
    parkingNames: [],
    selectedParking: null, 
    message: "", 
    averageTime: null
    }
  }, 
  mounted() {
    this.today.setHours(0, 0, 0, 0);
    this.date=this.today;
    this.disabledDates={to: this.today};
    getParkingNames().then(response => (this.parkingNames = response.data.parkings))
    .catch(error => console.log("error while fetching parking names: "+error));
  }, 
  components: {
            Datepicker
        }, 
  methods:  {
    calulateAverageFullTime: function(){
      if(this.selectedParking!=null && this.date!=null){
        console.log("calculating average full time for date "+this.date+" and "+this.selectedParking);
        getAverageFullTime(this.date, this.selectedParking)
        .then(response => {
          console.log("response="+JSON.stringify(response));
          const type=response.data.dayType;
          if(type==0){
            this.message ="Average full time for a weekend: "
          }
          else if(type==1){
            this.message ="Average full time for a holiday: "
          }
          else if(type==2){
            this.message ="Average full time for a normal week day: "
          }
          if(response.data.averageTime){
            this.averageTime=response.data.averageTime;
          }
          else{
            this.averageTime="unknown";
          }
        })
      .catch(error => console.log("error while calculating average full time: "+error));
      }
    }
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
