import axios from 'axios';

const serverUrl=process.env.VUE_APP_SERVER_URL;
console.log("loaded server URL="+serverUrl);

export async function getParkingNames () {
 //call luxparkings server to get parking names
  console.log("calling list of parkings");
  return axios.get(serverUrl+"/parkings");
}

export async function getAverageFullTime(date, parkingName){  
  const dateS=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  console.log("fetching average full time for "+dateS+" and "+parkingName);
  return axios.get(serverUrl+"/averageFullTime?date="+dateS+"&parking="+parkingName);
}