import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import Fire from "../Fire";

const EventScreen = () => {
    const [allEvents, setAllEvents] = useState([]);
    moment.locale("pt-br");
    useEffect(() => {
        const fetchAllEvents = async () => {
            const eventsCollection = Fire.shared.firestore.collection("events");

            eventsCollection.get().then((querySnapshot) => {
                const eventsArray = [];
                querySnapshot.forEach((doc) => {
                    const eventData = doc.data();
                    eventData.id = doc.id;
                    // date = eventData.startDateTime.split(" as ")[0];
                    // hour = eventData.startDateTime.split(" as ")[1];
                    // console.log(moment(date + " " + hour, "DD/MM/YY HH:mm").fromNow());
                    eventsArray.push(eventData);
                });
                setAllEvents(eventsArray);
            }).catch((error) => {
                console.log('Erro ao buscar documentos:', error);
            });
        };
        fetchAllEvents();
    }, []);


    return (
        <View style={styles.container}>
            {allEvents.map((event) => (
                <View key={event.name} style={styles.event} >
                    <Image source={{ uri: event.image }} style={styles.image} resizeMode="cover" />
                    <Text key={event.name} style={styles.name}>{event.name}</Text>
                    <Text key={event.fullAddress} >{event.fullAddress}</Text>
                    <Text key={event.description} style={styles.description} >{event.description}</Text>
                    <Text key={event.startDateTime} >{event.startDateTime}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2C2C2E",
        flex: 1
    },
    event: {
        alignItems: "center",
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
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 10,
        marginLeft: 8,
        color: "#ccc",
    },
    description: {
        fontSize: 13,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 10,
        marginHorizontal: 14,
        color: "#ccc",
    },
});

export default EventScreen;
