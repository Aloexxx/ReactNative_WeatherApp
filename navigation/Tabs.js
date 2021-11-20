import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Weather from "../screens/Weather";
import Note from "../screens/Note";

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return(
        <Tab.Navigator screenOptions={{tabBarActiveTintColor:"#000000",}}>
            <Tab.Screen name="Weather" component={Weather} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <MaterialCommunityIcons name="weather-cloudy" color={color} size={size}/>
                }
            }}/>
            <Tab.Screen name="Note" component={Note} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <MaterialCommunityIcons name="note-outline" color={color} size={size}/>
                }
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;