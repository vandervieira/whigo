import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

// Dados de exemplo
const eventosProximos = [
  {
    id: 1,
    titulo: "Gusttavo Lima em Porto Alegre! Não perca esse evento que vai lotar a grande capital!",
    data: "Hoje",
    imagem: require("../assets/mocks/event1.png"),
  },
  {
    id: 2,
    titulo: "Virada Mágina praia do Rosa, maior virada do litoral caterinense!",
    data: "02 Jun",
    imagem: require("../assets/mocks/event2.png"),
  },
  {
    id: 3,
    titulo: "Tardezinha em Porto Alegre chegou!",
    data: "03 Jul",
    imagem: require("../assets/mocks/event3.png"),
  },
];

const Evento = ({ event, onSearch }) => (
  <View style={styles.eventoContainer(onSearch ? onSearch : null)}>
    <TouchableOpacity onPress={() => handleNavigateToEventScreen(event.id)}>
      <Image source={{ uri: event.image }} style={styles.imagemEvento} />
      <Text style={styles.eventName(onSearch ? onSearch : null)}>
        {event.name}
      </Text>
      {event.when ? (
        <>
          <View style={styles.dataHoraContainer}>
            <Text style={styles.dataEvento(event.when.split(" às ")[0], onSearch ? onSearch : null)}>{event.when.split(" às ")[0]}</Text>
            <Text style={styles.dataEvento(null, onSearch ? onSearch : null)}> às {event.when.split(" às ")[1]}</Text>
          </View>
        </>
      ) : (
        <Text style={styles.dataEvento(null, onSearch ? onSearch : null)}>{event.startDateTime}</Text>
      )}
    </TouchableOpacity>
  </View>
);

const TelaEventos = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const navigation = useNavigation();
  moment.locale("pt-br");

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsCollection = Fire.shared.firestore.collection("events");
      const querySnapshot = await eventsCollection.get();

      const eventsArray = [];
      const upcomingEventsArray = [];
      let popularEventsArray = [];

      querySnapshot.forEach((doc) => {
        const eventData = doc.data();
        eventData.id = doc.id;
        date = eventData.startDateTime.split(" as ")[0];
        hour = eventData.startDateTime.split(" as ")[1];
        if (moment(date + " " + hour, "DD/MM/YY HH:mm").calendar().includes("às")) {
          eventData.when = moment(date + " " + hour, "DD/MM/YY HH:mm").calendar();
        }
        const { startDateTime, peopleGoing } = eventData;

        // Verificar se o evento ocorrerá em breve (próximos 7 dias) e adicioná-lo à lista de eventos futuros
        const eventDate = moment(startDateTime, "DD/MM/YY HH:mm").toDate();
        const now = moment().toDate();
        const daysDiff = moment(eventDate).diff(now, "days");
        if (daysDiff >= 0 && daysDiff <= 7) {
          eventData.when = moment(eventDate).calendar();
          upcomingEventsArray.push(eventData);
        }

        eventsArray.push(eventData);
      });

      // Ordenar eventos futuros pela data
      upcomingEventsArray.sort((a, b) =>
        moment(a.startDateTime, "DD/MM/YY HH:mm").toDate() - moment(b.startDateTime, "DD/MM/YY HH:mm").toDate()
      );

      // Ordenar eventos populares pelo número de pessoas confirmadas
      popularEventsArray = eventsArray.sort((a, b) => b.peopleGoing - a.peopleGoing);

      setAllEvents(eventsArray);
      setUpcomingEvents(upcomingEventsArray);
      setPopularEvents(popularEventsArray);
    };

    fetchAllEvents();

  }, []);

  const filterEvents = (events, searchValue) => {
    // Se não houver um valor de pesquisa, retorne todos os eventos
    if (!searchValue) {
      return events;
    }

    // Filtrar os eventos com base no valor da pesquisa
    const filteredEvents = events.filter((event) => {
      // Verificar se o campo 'titulo' existe e se contém o valor da pesquisa (ignore case)
      return event.name && event.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    return filteredEvents;
  };




  handleNavigateToEventScreen = (eventID) => {
    navigation.navigate('Event', { eventID: eventID });
  };

  if (!allEvents) {

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
      {/* Search Box */}
      <View style={styles.areaPesquisa}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Pesquisar eventos"
            placeholderTextColor="#ccc"
            style={styles.inputPesquisa}
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
          <TouchableOpacity style={styles.botaoFiltro}>
            <Ionicons name="filter" size={24} color="#7878F5" />
          </TouchableOpacity>
        </View>
      </View>

      {searchValue ? (
        <ScrollView vertical >
          {filterEvents(allEvents, searchValue).map((event) => (
            <View key={event.id} style={{
              backgroflexDirection: "row",
              alignItems: "center",
            }}>
              <Evento event={event} onSearch={true} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <>
          {/* Upcoming Events Area */}
          <View style={styles.areaEventos}>
            <Text style={styles.areaTitulo}>Próximos dias</Text>
            <ScrollView horizontal>
              {upcomingEvents.map((event) => (
                <View key={event.id} >
                  <Evento event={event} onSearch={false} />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Popular Events Area */}
          <View style={styles.areaEventos}>
            <Text style={styles.areaTitulo}>Populares</Text>
            <ScrollView horizontal>
              {popularEvents.map((event) => (
                <View key={event.id} >
                  <Evento event={event} onSearch={false} />
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C2C2E",
    paddingTop: 20,
  },
  areaPesquisa: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#2C2C2E",
    height: 40,
  },
  inputPesquisa: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#fff",
  },
  botaoFiltro: {
    padding: 8,
    marginLeft: 10,
  },
  areaEventos: {
    marginTop: 5,
    marginBottom: 0,
    marginLeft: 10,
  },
  areaTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 8,
    color: "#ccc",
  },
  eventoContainer: (search) => ({
    width: search ? '90%' : 200,
    marginRight: 10,
    marginBottom: 10,
  }),
  imagemEvento: {
    width: "100%",
    height: 170,
    borderRadius: 8,
  },
  eventName: (search) => ({
    fontSize: search ? 18 : 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#ccc",
  }),
  dataHoraContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dataEvento: (data, search) => ({
    marginTop: 3,
    fontSize: search ? 18 : 15,
    color: data === "Hoje" ? "#DA0D0D" : data === "Amanhã" ? "#DA790D" : "#ccc",
  })
});

export default TelaEventos;
