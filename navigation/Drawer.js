import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import Login from "../screens/Login";
import My from "../screens/My";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () =>{
    const [savedLogin,setSavedLogin] = useState("false");
    const [savedUserName,setSavedUserName] = useState("");

    AsyncStorage.getItem("ISLOGIN").then(a=>setSavedLogin(a));
    AsyncStorage.getItem("USERNAME").then(a=>setSavedUserName(a));

    return(
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="Home" component={Tabs} options={{
                headerTitleAlign:"center",
            }}/>
            {savedLogin==="true" ? <Drawer.Screen  name={`${savedUserName} profile`} component={My} options={{
                headerShown:true,
                headerTitleAlign:"center",     
            }}/>: <Drawer.Screen name="Login" component={Login} options={{
                headerShown:true,
                headerTitleAlign:"center",
            }}/>}
            
        </Drawer.Navigator>
    )
}

export default DrawerNavigator;
