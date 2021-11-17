import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import Weather from "../screens/Weather";
import Note from "../screens/Note";
import Map from "../screens/Map";

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Weather" component={Weather} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <MaterialCommunityIcons name="weather-cloudy" color={color} size={size}/>
                }
            }}/>
            <Tab.Screen name="Maps" component={Map} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <Entypo name="map" color={color} size={size}/>
                }
            }}/>
            <Tab.Screen name="Note" component={Note} options={{
                tabBarIcon:({focused,color,size})=>{
                    return <MaterialCommunityIcons name="face-profile" color={color} size={size}/>
                }
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;