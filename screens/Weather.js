import React, {useEffect,useState} from "react";
import {FlatList} from "react-native";
import *as Location from "expo-location";
import {StatusBar} from "expo-status-bar";
import {Fontisto, Ionicons} from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "4330b6d4400fca28b02228bbeedf7879";
const icons={
  Clouds:"cloudy",
  Clear:"day-sunny",
  Atmosphere:"cloudy-gusts",
  Snow:"snow",
  Rain:"rains",
  Drizzle:"rain",
  Thunderstorm:"lightning",
};

const ListButton = styled.TouchableOpacity`
  padding-left: 3px;
`;

const Container = styled.View`

`;

const CityNameBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
`;
const CityName = styled.Text`
  font-size: 26px;
`;
const CityNameChangeBtn = styled.Text`
  position: absolute;
  right:20px;
`;

const WeatherComponentBox = styled.TouchableOpacity`
  border: black solid 2px;
  border-radius: 9px;
  align-items: center;
  margin-bottom:7px;
  margin-left: 3px;
  margin-right: 3px;
`;

const DateText = styled.Text`
  justify-content: center;
  font-size: 16px;
  padding-top: 8px;
`;
const WeatherComponent = styled.View`
  width: 100%;
  flex-direction:row;
  justify-content: space-between;
  padding:8px 10px;
`;
const TemparatureComponent = styled.View`
  
`;
const TemparatureText = styled.Text`
  font-size: 20px;
`;

const Weather=({navigation:{setOptions}})=>{
  const [city,setCity] = useState("Loading...");
  const [days,setDays] = useState([]);
  const [dataSave,setDataSave] = useState([]);
  
  const getWeather = async () =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    
    const{
      coords:{latitude,longitude}
    }=await Location.getCurrentPositionAsync({accuracy:5});
    
    const location = await Location.reverseGeocodeAsync(
      {latitude,longitude},
      {useGoogleMaps:false}                                               
      );
    setCity(location[0].city||location[0].region); //ex)대전광역시는 city가 null이다.
    const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`);
    const json = await data.json();
    setDays(json.daily)
  };
  
  useEffect(()=>{
    getWeather();
    AsyncStorage.setItem("ISLOGIN","false"); //로그인여부 확인cookie, 앱 시작시 생성
  },[]);

  setOptions({
    headerTitleAlign:"center",
    headerLeft:()=>(
      <ListButton onPress={navigation.openDrawer}>
        <Ionicons name="menu-outline" color="black" size={27} style={{marginLeft:10}} ></Ionicons>
      </ListButton>
    )
  })
  
  const timeSave = (Number) =>{
    return new Date(days[Number].dt*1000)
  }
  
  const navigation = useNavigation();

  const goToDetail = (index,max,min,eve) =>{
    const dateSave = timeSave(index).getDate();
    console.log(dateSave)
    navigation.navigate("Stack",{
      screen:"Detail",
      params:{
        dateSave,max,min,eve
      }
    })
  }
  
  return(
    <Container>
        <FlatList
          data={days}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <StatusBar style="dark"/>
              <CityNameBox>
                <CityName>{city}</CityName>
              </CityNameBox>
            </>
          }
          renderItem={({item,index})=>(
            <WeatherComponentBox onPress={index===1||index===0?()=>goToDetail(index,(item.temp.max),(item.temp.min),(item.temp.eve)):null}>
              <DateText>{timeSave(index).getMonth()+1}월{timeSave(index).getDate()}일</DateText>
              <WeatherComponent>
                <TemparatureComponent>
                  <TemparatureText>
                        max : {parseFloat(item.temp.max).toFixed(1)}
                  </TemparatureText>
                  <TemparatureText>
                        min : {parseFloat(item.temp.min).toFixed(1)}
                  </TemparatureText>
                </TemparatureComponent>
                <Fontisto
                      name={icons[item.weather[0].main]}
                      size={33}
                      color="black"
                />
              </WeatherComponent>
            </WeatherComponentBox>
            )}
          >
          </FlatList>
    </Container>
  );
}

export default Weather;