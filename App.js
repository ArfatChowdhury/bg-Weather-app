import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const API_KEY = '1c3c91771adf6a2fad672ffbbf56e00e'
export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const getWeather = async () => {
    if (city === '') {
      Alert.alert('please enter city name');
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      setWeather(data)
    }
    catch (error) {
      Alert.alert('something went wrong')
    }
  }


  return (
    <TouchableWithoutFeedback  >

      <View style={styles.container}>
        <Text style={styles.title}>Weather app</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Search your city'
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />
          <TouchableOpacity onPress={getWeather} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        <View style={styles.tempCon}>
          <Text style={styles.City}> {weather?.name}</Text>
          <Text style={styles.weatherDescription}>
            {weather?.weather?.[0]?.description}
          </Text>
          <Text style={styles.temp}> {weather?.main?.temp}c°</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 320,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tempCon: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  City: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e3a8a',
    textAlign: 'center',
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  weatherDescription: {
    fontSize: 20,
    color: '#64748b',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontWeight: '500',
  }
});
