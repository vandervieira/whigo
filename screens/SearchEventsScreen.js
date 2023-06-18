import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

const eventosPopulares = [
  {
    id: 4,
    titulo: "Tardezinha em Porto Alegre chegou!",
    data: "12 Ago",
    imagem: require("../assets/mocks/event4.png"),
  },
  {
    id: 5,
    titulo: "Virada Mágina praia do Rosa, maior virada do litoral caterinense!",
    data: "03 Nov",
    imagem: require("../assets/mocks/event5.png"),
  },
  {
    id: 6,
    titulo: "Gusttavo Lima em Porto Alegre! Não perca esse evento que vai lotar a grande capital!",
    data: "30 Nov",
    imagem: require("../assets/mocks/event6.png"),
  },
];

const Evento = ({ titulo, data, imagem }) => (
  <View style={styles.eventoContainer}>
    <Image source={imagem} style={styles.imagemEvento} />
    <Text style={styles.tituloEvento}>{titulo.length > 40 ? titulo.slice(0, 45) + "..." : titulo}</Text>
    <Text style={styles.dataEvento(data)}>{data}</Text>
  </View>
);

const TelaEventos = () => (
  <View style={styles.container}>
    <View style={styles.areaPesquisa}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Pesquisar eventos" placeholderTextColor="#ccc" style={styles.inputPesquisa} />
        <TouchableOpacity style={styles.botaoFiltro}>
          <Ionicons name="filter" size={24} color="#7878F5" />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.areaEventos}>
      <Text style={styles.areaTitulo}>Próximos dias</Text>
      <ScrollView horizontal>
        {eventosProximos.map((evento) => (
          <Evento key={evento.id} titulo={evento.titulo} data={evento.data} imagem={evento.imagem} />
        ))}
      </ScrollView>
    </View>
    <View style={styles.areaEventos}>
      <Text style={styles.areaTitulo}>Populares</Text>
      <ScrollView horizontal>
        {eventosPopulares.map((evento) => (
          <Evento key={evento.id} titulo={evento.titulo} data={evento.data} imagem={evento.imagem} />
        ))}
      </ScrollView>
    </View>
  </View>
);

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
  eventoContainer: {
    width: 200,
    marginRight: 10,
    marginBottom: 10,
  },
  imagemEvento: {
    width: "100%",
    height: 170,
    borderRadius: 8,
  },
  tituloEvento: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#ccc",
  },
  dataEvento: (data) => ({
    marginTop: 3,
    fontSize: 15,
    color: data === "Hoje" ? "red" : "#ccc",
  }),
});

export default TelaEventos;
