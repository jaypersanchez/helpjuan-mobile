import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

const FooterBar = () => {
  
  const navigation = useNavigation();
  const { user, env } = useUser()
  console.log(`FooterBar ${JSON.stringify(user)}::${user.data.email}::${user.data.userid}`)

  const handlePlusSquarePress = async () => {
    navigation.navigate('PostJobAd', {user});
  };

  const handleSearch = () => {
    console.log(`footer handlesearch ${JSON.stringify(user)}`)
    navigation.navigate('SearchForJobs',{user});
  }

  const handleMessages = () => {
    navigation.navigate('Messages', {user});
  }

  const handleSettings = () => {
    navigation.navigate('Settings', {user});
  }

  /*
  Icon names that you can use:

"home"
"user"
"heart"
"search"
"gear" or "cog"
"camera"
"comments"
"bell"
"bookmark"
"paper-plane" or "send"
"map"
"music"
"film" or "video-camera"
"gift"
"sun" or "moon" (for light/dark mode)
"star"
"check"
"times" or "close"
"arrow-up"
"arrow-down"
"arrow-left"
"arrow-right"
  */
  return (
    <View style={styles.footer}>
      
      <TouchableOpacity onPress={handlePlusSquarePress}>
        <Icon name="plus-square" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch}>
        <Icon name="search" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMessages}>
        <Icon name="envelope" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSettings}>
        <Icon name="cog" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'green',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around', // Space items evenly along the axis
    flexDirection: 'row', // Align items horizontally
    position: 'absolute',
    bottom: 0,
    marginTop: 18
  },
  footerText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FooterBar;
