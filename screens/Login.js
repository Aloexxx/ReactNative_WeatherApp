import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Button, Pressable, Text, TextInput, TouchableOpacity, View  } from "react-native";
import styled from "styled-components/native";


const LoginBox = styled.View`
    justify-content: center;
    align-items: center;
    width:100%;
    height:50%;
`;

const IdTextInput = styled.TextInput`
    border: solid 1px black;
    width:80%;
    margin-bottom: 15px;
    padding: 5px;
`;
const LoginButton = styled.TouchableOpacity`
    border: solid 1px black;
`;

const Login =()=>{
    const [conID,setConID] = useState("");
    const [conPS,setConPS] =useState("");

    
    const navigation = useNavigation();

    const onSubmitEditing =async ()=>{    
        if(conID === "" || conPS === ""){
            return console.log("userID,userPS Empty");
        }else{ //AsyncStorage.getItem("")은 문자열이 아닌 객체를 반환한다.
            if(conID.toString()==(await AsyncStorage.getItem("USERID")).toString() && conPS.toString()==(await AsyncStorage.getItem("USERPS")).toString()){
                AsyncStorage.getItem("USERNAME").then(a=>console.log("welcome!!",a));
                AsyncStorage.setItem("ISLOGIN","true");
                navigation.navigate("Home",{
                    screen:"Weather"
                });
            }else{
                console.log("not match");
            }
        }
    }

    return(
        <LoginBox>
            <IdTextInput placeholder="ID" onChangeText={(text)=>setConID(text)}/>
            <IdTextInput placeholder="PassWord" onChangeText={(text)=>setConPS(text)} />
            <LoginButton onPress={onSubmitEditing}>
                <Text>Login</Text>
            </LoginButton>
            <TouchableOpacity onPress={()=> navigation.navigate("Stack",{screen:"Join"})}>
                <Text>Join</Text>
            </TouchableOpacity>
        </LoginBox>
    )
}

export default Login;