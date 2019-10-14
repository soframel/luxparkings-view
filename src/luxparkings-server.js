import axios from 'axios';

export async function getParkingNames () {
 //call luxparkings server to get parking names
  console.log("calling list of parkings");
  return axios.get('http://localhost:3000/parkings');
}

export async function getAverageFullTime(date, parkingName){  
  const dateS=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  console.log("fetching average full time for "+dateS+" and "+parkingName);
  return axios.get("http://127.0.0.1:3000/averageFullTime?date="+dateS+"&parking="+parkingName);
}