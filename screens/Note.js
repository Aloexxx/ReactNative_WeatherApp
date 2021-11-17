import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text ,View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "4330b6d4400fca28b02228bbeedf7879";

const Note = ({navigation:{setOptions}}) =>{
    const [savedLogin,setSavedLogin] = useState("");
    AsyncStorage.getItem("ISLOGIN").then(a=>setSavedLogin(a))//getItem은 시간이걸리므로 then을 써야 오류 안남 
    useEffect(()=>{
        setOptions({
            title:"Note",
        }),
        console.log("1")
    },[])
    console.log(savedLogin)
    return( //문제점 : 로그아웃이나 로그인을 해도 Note가 rerender 되지 않아서 화면이 업뎃이 되지 않음.
            savedLogin==="true"?
            <View>
                <Text>Is Login!!</Text>
            </View>:<View>
                <Text>please Login</Text>
            </View>
    )
}

export default Note;