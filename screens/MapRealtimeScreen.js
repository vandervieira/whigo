// import firestore from "@react-native-firebase/firestore"
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import MapView, { Callout, CalloutSubview, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { mapStyle, customMap } from '../styles/map';
import Fire from "../Fire";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy
} from 'expo-location';


const markerIconByCategorie = {
    "Festa": require("../assets/icons/fest.png"),
    "Show": require("../assets/icons/show.png"),
    "Aniversário": require("../assets/icons/bday.png"),
    "Churrasco": require("../assets/icons/barbecue.png"),
    "Palestra": require("../assets/icons/talk.png"),
};


const MapRealTime = () => {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);
    const [allEvents, setAllEvents] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();


    handleCenterCamera = () => {
        mapRef.current.animateCamera({
            center: location.coords,
            zoom: 14.721086502075195
        })
    };

    handleNavigateToEventScreen = (eventID) => {
        navigation.navigate('Event', { eventID: eventID });
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
        if (isFocused) {
            fetchAllEvents();
        }
    }, [isFocused]);

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

    return (
        <View style={styles.container}>

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
                                title={event.id}
                                key={event.id}
                                coordinate={{
                                    latitude: event.latitude,
                                    longitude: event.longitude
                                }}
                                image={markerIconByCategorie[event.category]}
                            >
                                <Callout tooltip
                                >
                                    <View>
                                        <View style={styles.bubble}>
                                            <View style={styles.textView}>
                                                <Image
                                                    style={styles.image}
                                                    source={event.image ? { uri: event.image } : require('../assets/mocks/eventmock.jpg')}
                                                />
                                                <Text style={styles.title}>{event.name}</Text>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={styles.datatime}><Ionicons name="ios-calendar-outline" size={15} color="#7878F5" /> {event.startDateTime}</Text>
                                                    <Text style={styles.confirmed}><Ionicons name="people-sharp" size={15} color="#00a000" /> {event.peopleGoing}</Text>
                                                    <Text style={styles.interested}><Ionicons name="people-sharp" size={15} color="#bfbfbf" /> {event.peopleInterested}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <CalloutSubview style={styles.seeMoreButton} onPress={() => handleNavigateToEventScreen(event.id)}>
                                                        <Text style={styles.seeMore}>Ver mais</Text>
                                                    </CalloutSubview>
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
                        <MaterialIcons name="my-location" size={35} color="#7878F5" />
                    </TouchableOpacity>
                </MapView>
            }
        </View >
    );
}

export default MapRealTime;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centralizeCameraButton: {
        borderRadius: 50,
        zIndex: 1,
        width: 40,
        height: 40,
        position: "absolute",
        bottom: 16,
        right: 16,
        justifyContent: "center",
        alignItems: "center",
        top: "auto", // Adicione esta linha
    },
    bubble: {
        flexDirection: 'row',
        backgroundColor: '#141414',
        borderRadius: 6,
        padding: 8
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
        height: 160, //160 because another higher value the app crashes 
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
    },
    seeMoreButton: {
        width: 90,
        height: 30,
        backgroundColor: '#7878F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    seeMore: {
        color: '#fff',
        marginTop: 0,
        fontSize: 12,
        textAlign: 'right',
    },
    goLocationButton: {
        width: 90,
        height: 30,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
});
