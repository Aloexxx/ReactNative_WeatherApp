import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Stack from "./Stack";
import Drawer from "./Drawer";

const Nav = createNativeStackNavigator();

const Root = () =>(
    <Nav.Navigator screenOptions={{presentation:"modal",headerShown:false}}>
        <Nav.Screen name="Drawer" component={Drawer} />   
        <Nav.Screen name="Stack" component={Stack}/>   
    </Nav.Navigator>
)
export default Root;