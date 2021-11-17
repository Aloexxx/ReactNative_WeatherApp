import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Join from "../screens/Join";

const NativeStack = createNativeStackNavigator();

const Stack = () =>{
    return(
        <NativeStack.Navigator>
            <NativeStack.Screen name="Detail" component={Detail}/>
            <NativeStack.Screen name="Join" component={Join}/>
        </NativeStack.Navigator>
    )
}

export default Stack;
