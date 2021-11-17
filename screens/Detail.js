import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text,Dimensions, View, Button, TouchableOpacity, Alert } from "react-native";
import { useQuery } from "react-query";
import {weatherApi} from "../api";
import WeatherChart from 'react-native-weather-chart';

const {height:SCREEN_HEIGHT} = Dimensions.get("window");

const icons={
    Clouds:"DayCloudy",
    Clear:"DaySunny",
    Atmosphere:"cloudy-gusts",
    Snow:"DaySnow",
    Rain:"DayRain",
    Drizzle:"rain",
    Thunderstorm:"DayLinghtening",
  };

const DayDetail = styled.View`
    justify-content: center;
    align-items:center;
    height: 100%;
    background-color:white;
`;
const TempBox = styled.View`
    flex-direction: column;
    margin-vertical:20px;
`;
const TempText = styled.Text`
    font-size: 18px;
    color:blue;
    padding:5px;
    font-weight: 300;
`;


const Detail = ({navigation:{setOptions},route:{params}})=>{

    const {isLoading,data,refetch} = useQuery(["getHours"],weatherApi.hourly);

    const [datas,setDatas] = useState([]);

    const TimeSave = (number) =>{
        return new Date(data.hourly[number].dt*1000)
    }
    const saveData=()=>( //data가 불러오기 전에 data.hourly가 언급되는걸 방지
        isLoading? console.log("Loading data.hourly") :setDatas(data.hourly.filter((a,index)=>
        params.dateSave===TimeSave(index).getDate()
            )
        )
    )

    useEffect(()=>{
      saveData();  
    },[isLoading]) //isLoading이 false될때 한번 더 로딩함으로써 화면에 띄운다.
    
    const Data = {
        values: datas.map((a,index)=>a.temp),
        textTop: datas.map((a,index)=>new Date(datas[index].dt*1000).getHours()!==0?`${new Date(datas[index].dt*1000).getHours()} 시`:"0 시"),
        textBottom: datas.map((a,index)=>a.temp),
        iconBottom: datas.map((a,index)=>icons[a.weather[0].main]),
    };
    const Settings = {
        showTextTop: true,
        showTextBottom: true,
        showIconTop: false,
        showIconBottom: true,

        fontSizeTop: 20,
        fontTopColor:"#3c40c6",
        fontSizeBottom: 20,
        // marginTop:SCREEN_HEIGHT/3.4,
        marginBottom:SCREEN_HEIGHT/6,
        iconBottomColor: "black",
        markerSize:7,
        markerFillColor:"#487eb0",
        lineColor:"#487eb0",
        vlineColor:"#487eb0",
    };
    
    useEffect(()=>{
        setOptions({
            title:`${(params.dateSave).toString()}일`
        })
    },[])
    return(
        isLoading?<Text>Loading...</Text>:
        <DayDetail>
            <TempBox>
                <View>
                    <TempText>평균 기온 : {params.eve}</TempText>
                </View>
                <View>
                    <TempText>최고 기온 : {params.max}</TempText>
                    <TempText>최저 기온 : {params.min}</TempText>
                </View>
            </TempBox>
            <WeatherChart data={Data} settings={Settings} />
        </DayDetail>
    )
}

export default Detail;

// "hourly": Array [
//     Object {
//       "clouds": 24,
//       "dew_point": -5.75,
//       "dt": 1636700400,
//       "feels_like": 4.65,
//       "humidity": 36,
//       "pop": 0,
//       "pressure": 1016,
//       "temp": 7.63,
//       "uvi": 0.49,
//       "visibility": 10000,
//       "weather": Array [
//         Object {
//           "description": "few clouds",
//           "icon": "02d",
//           "id": 801,
//           "main": "Clouds",
//         },
//       ],
//       "wind_deg": 296,
//       "wind_gust": 7.8,
//       "wind_speed": 4.94,
//     },