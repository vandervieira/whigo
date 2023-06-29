import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, Image, Touchable } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import Fire from "../Fire";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";


const EventScreen = () => {
    const route = useRoute();
    const eventID = route.params?.eventID;
    const [event, setEvent] = useState(null);
    moment.locale("pt-br");

    useFocusEffect(
        useCallback(() => {
            setEvent(null);
            const fetchEvent = async () => {
                try {
                    const documentSnapshot = await Fire.shared.firestore
                        .collection("events")
                        .doc(eventID)
                        .get();

                    if (documentSnapshot.exists) {
                        setEvent(documentSnapshot.data());
                        console.log("Evento encontrado:", eventID)
                    } else {
                        setEvent(null);
                    }
                } catch (error) {
                    console.log("Erro ao buscar documento:", error);
                    setEvent(null);
                }
            };

            fetchEvent();
        }, [eventID])
    );

    if (!event) {
        return (
            <View style={styles.container}>
                <View style={styles.eventStyle} >
                    <Text style={styles.description}>Carregando...</Text>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            {event &&
                <View style={styles.eventStyle} >
                    <Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" />
                    <Text style={styles.name}>{event.name}</Text>
                    <View style={{ marginLeft: 12, marginBottom: 12 }} >
                        <Text style={styles.address} ><Ionicons name="ios-location-sharp" size={22} color="#7878F5" /> {event.fullAddress}</Text>
                        <Text style={styles.datatime}><Ionicons name="ios-calendar-outline" size={20} color="#7878F5" />  {event.startDateTime}</Text>
                        <Text style={styles.confirmed}><Ionicons name="people-sharp" size={20} color="#00a000" />  {event.peopleGoing}</Text>
                        <Text style={styles.interested}><Ionicons name="people-sharp" size={20} color="#bfbfbf" />  {event.peopleInterested}</Text>
                    </View>
                    <View style={styles.descriptionArea}>
                        <Text style={styles.descriptionTitle} >Descrição</Text>
                        <Text style={styles.description} >{event.description}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity>
                            <View style={styles.confirmButton}>
                                <Text style={styles.buttonText}>Confirmar presença</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.interestedButton}>
                                <Text style={styles.buttonText}>Interessado</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2C2C2E",
        flex: 1
    },
    eventStyle: {
        justifyContent: "center",
        backgroundColor: "#2C2C2E",
        borderRadius: 10,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: 220,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 10,
        marginHorizontal: 12,

        color: "#ccc",
    },
    address: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#ccc",
    },
    datatime: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#ccc",
    },
    confirmed: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#00a000",
    },
    interested: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: "bold",
        marginLeft: 8,
        color: "#bfbfbf",
    },
    descriptionArea: {
        padding: 10,
        paddingBottom: 20,
        marginBottom: 10,
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: "#313134",
    },
    descriptionTitle: {
        fontSize: 18,
        marginHorizontal: 14,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#ccc",
    },
    description: {
        fontSize: 13,
        marginTop: 0,
        marginHorizontal: 14,
        color: "#ccc",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#00a000',
        padding: 10,
        borderRadius: 25,
        margin: 10,
        alignItems: 'center',
    },
    interestedButton: {
        backgroundColor: '#bfbfbf',
        padding: 10,
        borderRadius: 25,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default EventScreen;
