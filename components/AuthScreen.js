// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import MainApp from './MainApp';


const AuthScreen = ({ navigation }) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [user, setUser] = useState({
    id: 1,
    username: 'exampleUser',
    email: 'user@example.com',
    // Other user data you want to include
  });
  
const handleLogin = async () => {
      
        // Validate inputs
      const validationStatus = validateInputs();
      
      // Check if validation failed
      if (validationStatus === 'failed') {
        // Stop the rest of the code from running
        throw new Error(`Invalid inputs`);
      }

      const response = await fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      
      const data = await response.json();
      //if (data.message === 'true') {
        console.log(`Login ${JSON.stringify(data)}`)
        // Registration was successful, navigate to MainApp
        navigation.navigate('MainApp');
      //} else {
        // Registration failed, display an alert with the error message
        //Alert.alert('Login Failed', JSON.stringify(data));
     // }
  };

  const handleRegister = async () => {
    try {
      console.log(`Registering ${email}::${password}`)
      // Validate inputs
      const validationStatus = validateInputs();
      
      // Check if validation failed
      if (validationStatus === 'failed') {
        // Stop the rest of the code from running
        throw new Error(`Invalid inputs`);
      }

      const response = await fetch('http://127.0.0.1:3000/new-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Register Data ${data}`)
      if (data.message === 'success') {
        // Registration was successful, navigate to MainApp
        navigation.navigate('MainApp');
      } else {
        // Registration failed, display an alert with the error message
        Alert.alert('Registration Failed', data.error);
      }
  
      // Handle the response data or perform any necessary actions
      console.log('Registration response:', data);
  
      
    } catch (error) {
      console.error('Error registering:', error);
      // Handle the error, show an error message, etc.
    }
  }

  const validateInputs = async () => {
    // Validate email
    if (!email || !password) {
      Alert.alert('Email and password are required');
      return "failed"
    }
    else {
      return "success"
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/blue_collar_worker_logo1.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>Help Juan</Text>
      </View>

        <View style={styles.textContainer}>
        <Text  style={styles.boldText}>Enter email and password.  You can either login to your account or tap on Register to create a new account</Text>
        </View>
        
        <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)} />
       
        <View style={styles.container}>
          <TouchableOpacity onPress={handleLogin} style={styles.greenButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row', // Arrange the logo and text horizontally
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 20,
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 20, // Add some margin to separate the logo from the text
  },
  logoText: {
    marginLeft: 10, // Add some margin between the logo and text
    fontSize: 20, // Adjust the font size as needed
    color: "green",
    fontWeight: 'bold'
  },
  textContainer: {
    marginBottom: 20, // Adjust as needed
  },
  boldText: {
    fontWeight: 'bold', // Set the font weight to bold
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%', // Adjust width as needed
  },
  input: {
    marginBottom: 16, // Add some spacing between input fields
    fontSize: 16,
    marginBottom: 20,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  greenButton: {
    backgroundColor: 'green', // Set the background color to green
    width: 200, // Set the width
    height: 50,  // Set the height
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 10, // Add horizontal padding
    borderRadius: 5, // Optional: Add rounded corners to the button
    alignSelf: 'center', // Center the button horizontally
    marginTop: 5, // Add some top margin for spacing
    marginBottom: 20,
    marginTop: 150,
  },
  registerButton: {
    backgroundColor: 'green',
    width: 100,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white', // Set the text color to white for better visibility on a green background
    textAlign: 'center', // Center the text horizontally
    fontSize: 18,
  },
});

export default AuthScreen;
