// import firestore from "@react-native-firebase/firestore"
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultScreen } from '../styles/general';
import { mapStyle, customMap } from '../styles/map';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';


const MapRealTime = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      
        const { status } = await requestForegroundPermissionsAsync();
        
        if(status == "granted"){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    })();
  }, []);

  useEffect(() => {
    (async () => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response);
             mapRef.current?.animateCamera({
                 //pitch: 70,
                 center: response.coords
             })
        });
    })();
  }, []);

  function newMarker(e) {
    let dados = {
        key: markers.length,
        coords:{
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        },
        pinColor: '#7878F5'
    }

    mapRef.current?.animateCamera({
        center: {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
         },
         zoom: 16
    })

    setMarkers(oldArray => [...oldArray, dados])
  }

  return (
    <View style={defaultScreen.container}>

        {
        location &&    
        <MapView 
            ref={mapRef}
            style={mapStyle.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={customMap}
            initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            initialCamera={{
                center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                 },
                zoom: 16
            }}
            minZoomLevel={12}
            onPress={ (e) => newMarker(e) }
            showsUserLocation={true}
            loadingEnabled={true}
        >
            {
            markers.map(marker => {
                return(<Marker key={marker.key} coordinate={marker.coords} pinColor={marker.pinColor}/>)
            })
            }
        </MapView>
        }


    </View>
  );
}

export default MapRealTime;