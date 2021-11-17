import React, { useState } from "react";
import Styled from 'styled-components/native';
import MapView from 'react-native-maps';

const Container = Styled.View`
    flex: 1;
`;
const Map =  ()=>{
   
   const [initialRegion,setInitialRegion] = useState({
      latitude: 35.91395373474155,
      longitude: 127.73829440215488,
      latitudeDelta: 5,
      longitudeDelta: 5,
   })

   return (
      <Container>
        <MapView 
        style={{flex: 1}}  
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        />
      </Container>
    );
}

export default Map; 