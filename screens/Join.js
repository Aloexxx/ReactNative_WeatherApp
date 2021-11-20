import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 85%;
`;

const NameText = styled.TextInput`
    border: solid 1px black;
    border-radius: 12px;
    width:80%;
    height:8%;
    margin-bottom: 13px;
    padding: 5px;
    background-color: #efefde;
`;

const SubmitButton = styled.TouchableOpacity`
    border: solid 1px black;
    border-radius: 12px;
    padding:10px;
    margin-bottom: 13px;
    width:35%;
    align-items: center;
`;

const Join = () =>{
    const [nameText,setNameText] = useState("");
    const [idText,setIdText] = useState("");
    const [passwordText,setPasswordText] = useState("");
    const navigation = useNavigation();

    const formInformation =() =>{
        return(
            AsyncStorage.setItem("USERNAME",nameText),
            AsyncStorage.setItem("USERID",idText),
            AsyncStorage.setItem("USERPS",passwordText),
            AsyncStorage.setItem("TIME",String(new Date())),
            AsyncStorage.getItem("USERNAME").then(a=>console.log(a)),
            navigation.navigate("Drawer",{
                screen:"Login",
            })
        )
    }
    return(
    <Container>
        <NameText placeholder="name" onChangeText={(text)=>setNameText(text)}/>
        <NameText placeholder="id" onChangeText={(text)=>setIdText(text)}/>
        <NameText placeholder="password" onChangeText={(text)=>setPasswordText(text)}/>
        <SubmitButton onPress={formInformation}><Text>제출</Text></SubmitButton>
    </Container>
    )
};

export default Join;