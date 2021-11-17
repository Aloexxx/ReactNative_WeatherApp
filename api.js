import *as Location from "expo-location";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "4330b6d4400fca28b02228bbeedf7879";

export const weatherApi = {
    
    hourly: async ()=>{
        const{
            coords:{latitude,longitude}
        }=await Location.getCurrentPositionAsync({accuracy:5});
        return fetch(`${BASE_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=metric`).then(async (res)=>await res.json());
    },
    daily: async ()=>{
        const{
            coords:{latitude,longitude}
        }=await Location.getCurrentPositionAsync({accuracy:5});
        return fetch(`${BASE_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`).then((res)=>res.json());
    },
}