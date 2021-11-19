import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";
import { useEffect } from "react/cjs/react.development";

const ProfileBox = styled.View`
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const My =() =>{
    const [savedUserName,setSavedUserName] = useState("");
    const [savedUserId,setSavedUserId] = useState("");
    const [savedTime,setSavedTime] = useState("");

    
    const gotoLogout =() =>{
        return(
            AsyncStorage.setItem("ISLOGIN","false"),
            navigation.navigate("Weather")
        )
    }
    const gotoRemove = () =>{
        return(
            AsyncStorage.clear(),
            navigation.navigate("Weather")
        )
    }
    useEffect(()=>{
        AsyncStorage.getItem("USERID").then(a=>setSavedUserId(a));
        AsyncStorage.getItem("USERNAME").then(a=>setSavedUserName(a));
        AsyncStorage.getItem("TIME").then(a=>setSavedTime(a))
    },[])

    AsyncStorage.getAllKeys().then(a=>console.log(a));
        
    const navigation = useNavigation();
    return(
        <ProfileBox>
            <Text>{savedUserName}'s Profile</Text>
            <Text>UserName: {savedUserName}</Text>
            <Text>UserId: {savedUserId}</Text>
            <Text>회원가입일: {(savedTime).slice(4,25)}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Note")}>
                <Text>go to Note</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoLogout}>
                <Text>log out</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={gotoRemove}>
                <Text>회원 탈퇴</Text> 
            </TouchableOpacity>
        </ProfileBox>
    )
}

export default My;