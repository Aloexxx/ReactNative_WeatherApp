import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

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
    <View>
        <TextInput placeholder="name" onChangeText={(text)=>setNameText(text)}/>
        <TextInput placeholder="id" onChangeText={(text)=>setIdText(text)}/>
        <TextInput placeholder="password" onChangeText={(text)=>setPasswordText(text)}/>
        <TouchableOpacity onPress={formInformation}><Text>제출</Text></TouchableOpacity>
    </View>
    )
};

export default Join;