import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components/native";
import { useEffect } from "react/cjs/react.development";

const ProfileBox = styled.View`
    height: 80%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const InfoBox = styled.View`
    margin-top: 20px;
    background-color: beige;
    align-items: center;
    height: 60%;
    width:80%;
    elevation:2;
    border-radius: 13px;
`;
const LogBox = styled.View`
    height: 50%;
    width:80%;
    justify-content: space-between;
    margin-top: 20px;
`;
const TitleText = styled.Text`
    padding:13px;
    font-size:22px;
`;
const NameText = styled.Text`
    padding:5px;
    color:#676767;
`;
const IdText = styled.Text``;
const NoteText = styled.Text``;
const DateText = styled.Text``;
const LogoutBox = styled.TouchableOpacity`
    padding:14px;
    border-radius: 13px;
    align-items: center;
    elevation:2;
    background-color: beige;
`;
const LogoutText = styled.Text`
    font-size: 14px;
    color:#818181
`;
const RemoveText = styled.Text`
    color:#818181
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
            <InfoBox>
                <TitleText>{savedUserName}'s Profile</TitleText>
                <NameText>UserName: {savedUserName}</NameText>
                <NameText>UserId: {savedUserId}</NameText>
                <TouchableOpacity onPress={()=>navigation.navigate("Note")}>
                    <NameText>go to Note</NameText>
                </TouchableOpacity>
                <NameText>가입일: {(savedTime).slice(4,25)}</NameText>
            </InfoBox>
            <LogBox>
                <LogoutBox onPress={gotoLogout}>
                    <LogoutText>log out</LogoutText> 
                </LogoutBox>
                <TouchableOpacity onPress={gotoRemove}>
                    <RemoveText>회원 탈퇴</RemoveText> 
                </TouchableOpacity>
            </LogBox>
        </ProfileBox>
    )
}

export default My;