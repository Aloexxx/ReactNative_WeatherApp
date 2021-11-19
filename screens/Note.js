import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Button, FlatList, Text ,TextInput,TouchableOpacityBase,View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { weatherApi } from "../api";
const icons={
    Clouds:"cloudy",
    Clear:"day-sunny",
    Atmosphere:"cloudy-gusts",
    Snow:"snow",
    Rain:"rains",
    Drizzle:"rain",
    Thunderstorm:"lightning",
  };

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const GoLoginBtn = styled.Text`
    font-size: 20px;
`;
const NoteList = styled.View`
    border: solid black 1px;
    border-radius: 8px;
    flex-direction: column;
    width: 80%;
    height:85%;
`;
const WeatherBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding:5px;
`;
const TextInputBox = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const TextBox = styled.TouchableOpacity`
`;
const SaveText = styled.Text`
    font-size: 17px;
    border:black solid 1px;
    border-radius: 7px;
    padding:4px;
    padding-left:8px;
    padding-right:8px;
    margin-bottom: -6px;
`;

const Note = ({navigation:{setOptions}}) =>{
    const navigation = useNavigation();
    const {isLoading,data,refetch} = useQuery(["getDaily"],weatherApi.daily);
    const [savedLogin,setSavedLogin] = useState("");
    const [days,setDays] = useState([]);
    const [changeText,setChangeText] = useState("");

    useEffect(()=>{
        setOptions({
            title:"Note",
            headerRight:()=>(
                <TouchableOpacity onPress={()=>AsyncStorage.getItem("ISLOGIN").then(a=>setSavedLogin(a))}>
                  <Ionicons name="refresh" color="black" size={27} style={{marginRight:10}} ></Ionicons>
                </TouchableOpacity>
            )
        })
        AsyncStorage.getItem("NOTE").then(a=>setChangeText(a));
    },[])

    useEffect(()=>{
        isLoading?<Text>Loading</Text>:setDays(data.daily)
    },[isLoading])

    const timeSave = (Number) =>{
        return new Date(days[Number].dt*1000)
    }
    const onChangeText = (Text) =>{
        setChangeText(Text)
    }
    const onEndEditing = () =>{
        AsyncStorage.setItem("NOTE",changeText);
        AsyncStorage.getItem("NOTE").then(a=>console.log(a));
    }
    return(
        <Container>
            {
            savedLogin==="true"?
                <NoteList>
                    <WeatherBox>
                        <Text>{timeSave(0).getMonth()+1}월{timeSave(0).getDate()}일</Text>
                        <Fontisto
                            name={icons[days[0].weather[0].main]}
                            size={33}
                            color="black"
                        />
                    </WeatherBox>
                    <TextInputBox>
                        <TextInput multiline value={changeText} placeholder="writing" onChangeText={onChangeText}/>
                        <TextBox onPress={onEndEditing}>
                            <SaveText>save</SaveText>
                        </TextBox>
                    </TextInputBox>
                </NoteList>
                :
                <TouchableOpacity onPress={()=>navigation.navigate(savedLogin==="true"?"Weather":"Login")}>
                    <GoLoginBtn>go to Login</GoLoginBtn>
                </TouchableOpacity> 
            }
        </Container>
    )
}

export default Note;