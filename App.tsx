import { useEffect, useState , useRef} from 'react';
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';
import { defaultScreen } from './styles/general';
import { mapStyle, customMap } from './styles/map';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;

type Dados = {
    key: number,
    coords:{
        latitude: number,
        longitude: number
    },
    pinColor: string
}

export default function App() {
    const [location, setLocation] = useState<LocationObject | null>(null); 
    const mapRef = useRef<MapView>(null); // Referencia usada para pinar o marcador no mapa 
    const [markers, setMarkers] = useState<Dados[]>([]);

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
            //pitch: 70, //Perspective do mapa muda 100=2D
            center: response.coords
        })
    });
  },[]);

  function newMarker(e: MapPressEvent) {
    let newDados: Dados = {
        key: markers.length,
        coords:{
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
        },
        pinColor: '#5DB075'
    }

    mapRef.current?.animateCamera({
        center: {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
         },
         zoom: 16
    })

    setMarkers(oldArray => [...oldArray, newDados])
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
                latitudeDelta: 1,
                longitudeDelta: 1
            }}
            maxZoomLevel={19}
            minZoomLevel={15}
            onPress={ (e) => newMarker(e) }
        >
            <Marker 
            coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }}
            />
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
