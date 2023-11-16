import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

const CustomSpinner = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* You can use your custom image or any content here */}
      <Image source={require('../assets/blue_collar_worker_logo1.png')} />
    </View>
  );
};

const HeaderBar = ({user}) => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  console.log(`HeaderBar ${user.email}::${user.id}`)
  /*const navigateToUserProfile = () => {
    navigation.navigate('UserProfile')
  }*/
  const navigateToUserProfile = () => {
    setLoading(true); // Show the spinner

    // Simulate an action that takes 3 seconds
    setTimeout(() => {
      setLoading(false); // Hide the spinner
      navigation.navigate('UserProfile', {user}); // Move to the next screen
    }, 3000);
  };

  /*const about = () => {
    Alert.alert(`HelpGenie`, `Beta 0.1`)
  }*/
  const about = () => {
    setLoading(true); // Show the spinner

    // Simulate an action that takes 3 seconds
    setTimeout(() => {
      setLoading(false); // Hide the spinner
      Alert.alert('HelpGenie', 'Beta 0.1'); // Show the alert
    }, 3000);
  };


  return (
    <View style={styles.header}>

      <TouchableOpacity onPress={about}>
      <Image
        source={require('../assets/HelpGenie_Logo3.png')} // Adjust the path as needed
        style={styles.rightIcon}
      />
      </TouchableOpacity>
        <Text style={styles.headerText}>Help Genie</Text>
        <TouchableOpacity onPress={navigateToUserProfile}>
      <Image
        source={require('../assets/code_ninja.jpeg')} // Adjust the path as needed
        style={styles.rightIcon}
      />
      </TouchableOpacity>
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'green',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 55, // Adjusted margin to avoid overlapping with system indicators
    flexDirection: 'row',
    justifyContent: 'space-between', // Updated to space-between
  },
  headerText: {
    color: 'yellow',
    fontSize: 18,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10, // Margin between icon and text
  },
  rightIcon: {
    width: 40,
    height: 40,
    
  },
});

export default HeaderBar;
