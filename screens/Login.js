import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import styled from "styled-components/native";


const LoginBox = styled.View`
    justify-content: center;
    align-items: center;
    width:100%;
    height:85%;
    
`;

const IdTextInput = styled.TextInput`
    border: solid 1px black;
    border-radius: 12px;
    width:80%;
    height:11%;
    margin-bottom: 13px;
    padding: 5px;
    background-color: #efefde;
`;
const LoginButton = styled.TouchableOpacity`
    border: solid 1px black;
    border-radius: 12px;
    padding:10px;
    margin-bottom: 13px;
    width:55%;
    align-items: center;
`;
const JoinButton = styled.TouchableOpacity`
     border: solid 1px black;
     border-radius: 13px;
    padding:10px;
    width:55%;
    align-items: center;
`;
const LoginText = styled.Text`

`;
const JoinText = styled.Text`
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
                <LoginText>Login</LoginText>
            </LoginButton>
            <JoinButton onPress={()=> navigation.navigate("Stack",{screen:"Join"})}>
                <JoinText>Join</JoinText>
            </JoinButton>
        </LoginBox>
    )
}

export default Login;