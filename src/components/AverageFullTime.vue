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
                        :disabledDates="disabledDates" @selected="calulateAverageFullTimeForDate"></datepicker>
    </div>
    
    <br/><br/>

    <div id="averageResult" v-if="averageTime">
      <span class="resultMessage">{{message}}</span>
       <span class="resultValue">{{averageTime}}</span>
       <p class="resultWarning"> * based on statistics from the last weeks, taking into account day of the week and holidays, 
    but not weather nor specific events or train strikes. Good luck &#128519;
       </p>
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
    /**
     * this function was necessary because date picker seems to send events before changing v-model
     */
    calulateAverageFullTimeForDate: function(newDate){
      console.log("calulateAverageFullTimeForDate for "+newDate);
      this.date=newDate;
      this.calulateAverageFullTime();
    },
    
    calulateAverageFullTime: function(){
      if(this.selectedParking!=null && this.date!=null){
        console.log("calculating average full time for date "+this.date+" and "+this.selectedParking);
        const parkingEncoded=encodeURIComponent(this.selectedParking);
        getAverageFullTime(this.date, parkingEncoded)
        .then(response => {
          console.log("response="+JSON.stringify(response));
          const type=response.data.dayType;
          this.message="Average full time for a ";
          if(type==1){
            this.message =this.message+"holiday ";
          }
          else {
            this.message =this.message+"normal ";
          }
          this.message=this.message+this.getDayOfWeekString(response.data.dayOfWeek)+": ";
          if(response.data.averageTime){
            this.averageTime=response.data.averageTime;
          }
          else{
            this.averageTime="unknown";
          }
        })
      .catch(error => console.log("error while calculating average full time: "+error));
      }
    }, 

    getDayOfWeekString: function(day){
      switch(day){
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "<unknown day>";
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
