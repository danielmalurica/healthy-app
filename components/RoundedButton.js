import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const RoundedButton = ({ title, onPress, individualStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: width / 1.5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});
