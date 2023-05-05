import { useEffect, useState , useRef} from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';

import { defaultScreen } from './styles/general';
import { mapStyle, customMap } from './styles/map';

export default function App() {
    const [location, setLocation] = useState<LocationObject | null>(null);

    const mapRef = useRef<MapView>(null); // Referencia usada para pinar o marcador no mapa 

    async function requestLocationPermission(){ // Permissões do aparelho para rastrear localização
        const { granted } = await requestForegroundPermissionsAsync();
        
        if(granted){
            const currentPosition = await getCurrentPositionAsync();
            setLocation(currentPosition);
        }
    }

  useEffect(() => { // Pede permissão para o usuário 
    requestLocationPermission();
  },[]);

  useEffect(() => { // Atualiza a localização do usuário em tempo real
    watchPositionAsync({
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000, //De quanto em quanto tempo atualiza a localização
        distanceInterval: 1
    }, (response) => {
        setLocation(response); //Funcão que atualiza a localização
        mapRef.current?.animateCamera({ // Atualiza o mapa para centralizar no marcador
            //pitch: 70,
            center: response.coords
        })
    });
  },[]);
    
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
        >
            <Marker 
            coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }}
            />
        </MapView>
        }

    </View>
  );
}
