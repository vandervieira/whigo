import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Config from 'react-native-config';
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from 'react-native-dropdown-select-list'
import { TextInputMask } from "react-native-masked-text";

const CreateEventScreen = () => {
  const [name, setName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isStartDateTimePickerVisible, setIsStartDateTimePickerVisible] = useState(false);
  const [isEndDateTimePickerVisible, setIsEndDateTimePickerVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const categories = [
    {value: 'Festa' },
    {value: 'Show' },
    {value: 'Aniversário' },
    {value: 'Churrasco' },
    {value: 'Palestra' }
  ];


  const toggleVisibility = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  const resetNotifyMessages = () => {
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };

  const resetInputs = () => {
    setName("");
    setStartDateTime("");
    setEndDateTime("");
    setCep("");
    setAddress("");
    setNeighborhood("");
    setCity("");
    setStateAddress("");
    setAddressNumber("");
    setFullAddress("");
    setDescription("");
    setImage(null);
  };

  const showDateTimePicker = (pickerType) => {
    if (pickerType === "start") {
      setIsStartDateTimePickerVisible(true);
    } else if (pickerType === "end") {
      setIsEndDateTimePickerVisible(true);
    }
  };

  const hideDateTimePicker = (pickerType) => {
    if (pickerType === "start") {
      setIsStartDateTimePickerVisible(false);
    } else if (pickerType === "end") {
      setIsEndDateTimePickerVisible(false);
    }
  };

  const handleDateConfirm = (date, pickerType) => {
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDateTime = `${formattedDate} as ${formattedTime}`;

    if (pickerType === "start") {
      setStartDateTime(formattedDateTime);
      hideDateTimePicker("start");
    } else if (pickerType === "end") {
      setEndDateTime(formattedDateTime);
      hideDateTimePicker("end");
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function getCoordinatesByAddress(addressFull) {
    try {
      const apiKey = Config.GOOGLE_MAPS_API_KEY; // Substitua pelo seu API key do Google Maps
      const encodedAddress = encodeURIComponent(addressFull);
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`);
      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        // Os dados foram encontrados
        const { lat, lng } = data.results[0].geometry.location;
        return lat + ',' + lng;
      } else {
        // O endereço não foi encontrado ou ocorreu um erro na requisição
        console.log('Endereço não encontrado');
        return null;
      }
    } catch (error) {
      console.log('Erro na requisição:', error.message);
      return null;
    }
  }

  async function searchAddressByCEP(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (response.ok) {
        // O endereço foi encontrado
        const { logradouro, bairro, localidade, uf } = data;
        console.log('Endereço:', logradouro);
        setAddress(logradouro);
        console.log('Bairro:', bairro);
        setNeighborhood(bairro);
        console.log('Cidade:', localidade);
        setCity(localidade);
        console.log('UF:', uf);
        setStateAddress(uf);
      } else {
        // O CEP não foi encontrado ou ocorreu um erro na requisição
        console.log('CEP não encontrado');
      }
    } catch (error) {
      console.log('Erro na requisição:', error.message);
    }
  }

  const handleSetCep = (cep) => {
    if (cep.length == 9) {
      setCep(cep);
      cepOnlyNumbers = cep.replace("-", "");
      searchAddressByCEP(cepOnlyNumbers);
    } else {
      setCep(cep);
      setAddress("");
      setNeighborhood("");
      setCity("");
      setStateAddress("");
      setFullAddress("");
    }
  };

  const handleSetNumber = (number) => {
    setAddressNumber(number);
    if (number > 0) {
      setFullAddress(`${address}, ${addressNumber}, ${city}, ${stateAddress}`);
    } else {
      setFullAddress("");
    }
  };

  const handleNewEvent = async () => {
    if (name && startDateTime && endDateTime && fullAddress && description) {
      const coordinates = await getCoordinatesByAddress(fullAddress);
      if (coordinates) {
        const [lat, lng] = coordinates.split(',');
        Fire.shared.addEvent({
          localUri: image,
          name: name.trim(),
          category: category,
          visibility: visibility,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          cep: cep,
          city: city,
          stateAddress: stateAddress,
          neighborhood: neighborhood,
          address: address,
          addressNumber: addressNumber,
          fullAddress: fullAddress.trim(),
          latitude: lat,
          longitude: lng,
          description: description.trim(),
        }).then((ref) => {
          resetInputs();
          setErrorMessage("");
          setSuccessMessage("Evento criado com sucesso!");
          resetNotifyMessages();
        });
      } else {
        setErrorMessage("Geolocalizacao não encontrada para este número!");
        setSuccessMessage("");
        resetNotifyMessages();
      }
    } else {
      setErrorMessage("Preencha todos os campos!");
      console.log(category);
      setSuccessMessage("");
      resetNotifyMessages();
    }
  };

  return (
    <View style={styles.container}>
      {image && (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handlePickImage}>
            <Image source={{ uri: image }} style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      )}
      {!image && (
        <TouchableOpacity style={styles.photo} onPress={handlePickImage}>
          <Ionicons name="md-camera" size={48} color="#9D9D9D" />
        </TouchableOpacity>
      )}

      <View style={styles.form}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {errorMessage !== "" && (
            <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
          )}
          {successMessage !== "" && (
            <Text style={{ color: "green", marginBottom: 10 }}>{successMessage}</Text>
          )}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputTitle}>Nome do Evento</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              if (text.length <= 40) {
                setName(text);
              }
            }}
            value={name}
          />
          <Text style={{
            color: name.length === 40 ? "red" : '#787880',
            fontSize: 10,
            marginTop: 4,
            alignItems: "flex-end",
          }}>{name.length}/40</Text>

        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputTitle}>Categoria</Text>
            <SelectList
              search={false}
              boxStyles={{ marginTop: 5, height: 40, width: 120, borderWidth: 0.5, borderRadius: 50, borderColor: '#7878F5', backgroundColor: '#1C1C1E' }}
              inputStyles={{ color: '#7878F5', fontWeight: 'bold' }}
              dropdownStyles={{ backgroundColor: '#1C1C1E', borderColor: '#7878F5' }}
              dropdownTextStyles={{ color: '#7878F5' }}
              defaultOption={{ key: '1', value: 'Festa' }}
              setSelected={(val) => setCategory(val)}
              data={categories}
            />
          </View>
          <View style={{ marginTop: 10, marginLeft: 10, flex: 1 }}>
            <Text style={styles.inputTitle}>Visibilidade</Text>
            <View
              style={{
                marginTop: 5,
                backgroundColor: '#1C1C1E',
                width: '100%',
                height: 40,
                borderWidth: 0.5,
                borderRadius: 50,
                borderColor: '#7878F5',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 5,
                paddingRight: 5,
              }}>
              <TouchableOpacity style={{
                width: '50%',
                height: 30,
                backgroundColor: visibility === true ? '#282828' : '#1C1C1E',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
                onPress={toggleVisibility}
              >
                <Text style={{
                  color: visibility === true ? '#7878F5' : '#2C2C2E',
                  fontSize: 14,
                  fontWeight: '700'
                }}>PUBLICO</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                width: '50%',
                height: 30,
                backgroundColor: visibility === false ? '#282828' : '#1C1C1E',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
                onPress={toggleVisibility}
              >
                <Text style={{
                  color: visibility === false ? '#7878F5' : '#2C2C2E',
                  fontSize: 14,
                  fontWeight: '700'
                }}>PRIVADO</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.inputTitle}>Data e Hora de Início</Text>
            <TouchableOpacity style={styles.dateTimePickerButton} onPress={() => showDateTimePicker("start")}>
              <Text style={styles.dateTimePickerButtonText}>
                {startDateTime ? startDateTime : "00/00/00 as 00:00"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDateTimePickerVisible}
              mode="datetime"
              onConfirm={(date) => handleDateConfirm(date, "start")}
              onCancel={() => hideDateTimePicker("start")}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.inputTitle}>Data e Hora de Fim</Text>
            <TouchableOpacity style={styles.dateTimePickerButton} onPress={() => showDateTimePicker("end")}>
              <Text style={styles.dateTimePickerButtonText}>
                {endDateTime ? endDateTime : "00/00/00 as 00:00"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndDateTimePickerVisible}
              mode="datetime"
              onConfirm={(date) => handleDateConfirm(date, "end")}
              onCancel={() => hideDateTimePicker("end")}
            />
          </View>
        </View>


        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <View style={{ width: 90, marginLeft: 5 }}>
            <Text style={styles.inputTitle}>Cep</Text>
            <TextInputMask
              type="zip-code"
              options={{
                mask: "99999-999",
              }}
              style={styles.input}
              onChangeText={(cep) => handleSetCep(cep)}
              value={cep}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 7 }}>
            <Text style={styles.inputTitle}>Cidade</Text>
            <TextInput
              style={styles.inputNotEditable}
              value={city}
              editable={false}
            />
          </View>

          <View style={{ width: 30, marginLeft: 5 }}>
            <Text style={styles.inputTitle}>UF</Text>
            <TextInput
              style={styles.inputNotEditable}
              value={stateAddress}
              editable={false}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.inputTitle}>Bairro</Text>
            <TextInput
              style={styles.inputNotEditable}
              value={neighborhood}
              editable={false}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.inputTitle}>Endereço</Text>
            <TextInput
              style={styles.inputNotEditable}
              value={address}
              editable={false}
            />
          </View>

          <View style={{ width: 40, marginLeft: 5 }}>
            <Text style={styles.inputTitle}>Nº</Text>
            <TextInput
              style={styles.input}
              onChangeText={(number) => handleSetNumber(number)}
              value={addressNumber}
            />
          </View>


        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.inputTitle}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 130 }]}
            onChangeText={setDescription}
            value={description}
            multiline={true}
          />
        </View>

      </View>
      <TouchableOpacity style={styles.button} onPress={handleNewEvent}>
        <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 18 }}>Criar evento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C2C2E",
    flex: 1
  },
  form: {
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#fff",
  },
  inputNotEditable: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#8A8F9E",
  },
  button: {
    position: "absolute",
    backgroundColor: "#7878F5",
    borderRadius: 4,
    height: 52,
    width: 200,
    bottom: 30,
    left: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  dateTimePickerButton: {
    marginTop: 5,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#3C3C3E",
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  dateTimePickerButtonText: {
    color: "#8A8F9E",
  },
  photo: {
    height: 100,
    backgroundColor: "#3C3C3E",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    marginHorizontal: 0,
    marginTop: 0,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default CreateEventScreen;
