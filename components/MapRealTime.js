// import firestore from "@react-native-firebase/firestore"
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { defaultScreen } from '../styles/general';
import { Ionicons } from "@expo/vector-icons";
import { mapStyle, customMap } from '../styles/map';
import Fire from "../Fire";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    LocationObject,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';


//Unisinos 
//-29,795288
//-51,154582



const MapRealTime = () => {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const [allEvents, setAllEvents] = useState([]);


    handleCenterCamera = () => {
        mapRef.current.animateCamera({
            // pitch: 70,
            center: location.coords,
            zoom: 14.721086502075195
        })
    };

    useEffect(() => {
        const fetchAllEvents = async () => {
            const eventsCollection = Fire.shared.firestore.collection("events");

            eventsCollection.get().then((querySnapshot) => {
                const eventsArray = [];
                querySnapshot.forEach((doc) => {
                    const eventData = doc.data();
                    eventData.id = doc.id;
                    eventsArray.push(eventData);
                });
                setAllEvents(eventsArray);
            }).catch((error) => {
                console.log('Erro ao buscar documentos:', error);
            });
        };
        fetchAllEvents();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await requestForegroundPermissionsAsync();
            if (status == "granted") {
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
            });
        })();
    }, []);

    function showModal(e) {
        // let dados = {
        //     key: markers.length + 1,
        //     coords: {
        //         latitude: e.nativeEvent.coordinate.latitude,
        //         longitude: e.nativeEvent.coordinate.longitude
        //     },
        //     pinColor: '#7878F5'
        // }
        // console.log(dados.coords, dados.key)
        mapRef.current?.animateCamera({
            center: {
                latitude: e.nativeEvent.coordinate.latitude + 0.003,
                longitude: e.nativeEvent.coordinate.longitude,
            },
            zoom: 16
        })

        // setMarkers(oldArray => [...oldArray, dados])
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
                        zoom: 14.721086502075195
                    }}
                    minZoomLevel={12}
                    showsUserLocation={true}
                    loadingEnabled={true}
                >
                    {
                        allEvents.map(event => {
                            return (<Marker
                                key={event.id}
                                coordinate={{
                                    latitude: event.latitude,
                                    longitude: event.longitude
                                }}
                                pinColor={'#7878F5'}
                                // icon={require('../assets/mocks/event1.png')}
                                onPress={(e) => showModal(e)}
                            >
                                <Callout tooltip>
                                    <View>
                                        <View style={styles.bubble}>
                                            <View style={styles.textView}>
                                                <Image
                                                    style={styles.image}
                                                    source={event.image ? { uri: event.image } : require('../assets/mocks/event1.png')}
                                                />
                                                <Text style={styles.title}>{event.name}</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={styles.datatime}>📅 {event.startDateTime}</Text>
                                                    <Text style={styles.confirmed}>✅ 212</Text>
                                                    <Text style={styles.interested}>👀 423</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.arrowBorder} />
                                        <View style={styles.arrow} />
                                    </View>
                                </Callout>
                            </Marker>)
                        })
                    }

                    <TouchableOpacity style={styles.centralizeCameraButton} onPress={handleCenterCamera}>
                        <Ionicons name="ios-scan-circle-outline" size={40} color="#7878F5" />
                    </TouchableOpacity>
                </MapView>
            }
        </View >
    );
}

export default MapRealTime;

const styles = StyleSheet.create({
    centralizeCameraButton: {
        borderRadius: 50,
        width: 50,
        height: 50,
        position: "absolute",
        bottom: 16,
        right: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    bubble: {
        flexDirection: 'row',
        backgroundColor: '#141414',
        borderRadius: 6,
        padding: 8,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#141414',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#141414',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 200,
    },
    title: {
        color: '#fff',
        width: 280,
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        textAlign: 'center',
    },
    datatime: {
        flex: 1,
        color: '#fff',
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10
    },
    confirmed: {
        flex: 1,
        color: '#fff',
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10
    },
    interested: {
        flex: 1,
        color: '#fff',
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10
    }
});
