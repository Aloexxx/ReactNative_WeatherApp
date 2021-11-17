import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styled from "styled-components";

const LogoutText = styled.Text`

`;




const My =() =>{
    
    const [savedUserName,setSavedUserName] = useState("");
    const [savedUserId,setSavedUserId] = useState("");

    const navigation = useNavigation();

    const gotoLogout =() =>{
        return(
            AsyncStorage.getItem("ISLOGIN").then(a=>console.log(a)),
            AsyncStorage.setItem("ISLOGIN","false"),
            navigation.navigate("Weather")
        )
    }
    AsyncStorage.getAllKeys().then(a=>console.log(a));
    return(
        <View>
            <Text></Text>
            <TouchableOpacity onPress={gotoLogout}>
                <Text>log out</Text> 
            </TouchableOpacity>
        </View>
    )
}

export default My;