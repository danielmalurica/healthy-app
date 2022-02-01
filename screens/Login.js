import { ScrollView, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import RoundedButton from '../components/RoundedButton'
import { authentication } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { width, height } = Dimensions.get('window')

const Login = ({ navigation }) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    checkInputEmail: false,
    checkInputPassword: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true
  })

  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, data.email, data.password)
      .then((res) => {
        setIsSignedIn(true)
        ToastAndroid.show("Login successfully!", ToastAndroid.SHORT)
        navigation.navigate('FoodList')
      })
      .catch((err) => {
        console.log(err)
        ToastAndroid.show("Incorrect Email or Password!", ToastAndroid.SHORT)
      })
  }

  const handleEmail = (value) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (reg.test(String(value).toLowerCase()) && value.length > 0) {
      setData({
        ...data,
        email: value,
        checkInputEmail: true,
        isValidEmail: true,
      })
    } else {
      setData({
        ...data,
        email: value,
        checkInputEmail: false,
        isValidEmail: false,
      })
    }
  }

  const handlePasswordChange = (value) => {
    if (value.length > 5) {
      setData({
        ...data,
        password: value,
        isValidPassword: true
      })
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false
      })
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome!</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        <Animatable.View animation='zoomInUp'>
          <Text style={styles.textFooter}>Email</Text>
          <View style={styles.emailAndPasswordInput}>
            <FontAwesome
              name="user-o"
              color='#009387'
              size={20}
            />
            <TextInput
              placeholder='Enter Your Email'
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(value) => handleEmail(value)}
              value={data.email}
            />
            {data.checkInputEmail ?
              <Animatable.View animation='bounceIn'>
                <Feather
                  name='check-circle'
                  color='green'
                  size={20}
                />
              </Animatable.View>
              :
              null
            }
          </View>
          {data.isValidEmail ? null
            :
            <Animatable.View animation='shake'>
              <Text style={styles.warningText}>Invalid Email!</Text>
            </Animatable.View>
          }

          <Text style={styles.textFooter}>Password</Text>
          <View style={styles.emailAndPasswordInput}>
            <FontAwesome
              name="lock"
              color='#009387'
              size={20}
            />
            <TextInput
              placeholder='Enter Your Password'
              style={styles.textInput}
              autoCapitalize='none'
              secureTextEntry={data.secureTextEntry ? true : false}
              onChangeText={(value) => handlePasswordChange(value)}
            />
            {data.isValidPassword ?
              <Animatable.View animation='bounceIn'>
                <Feather
                  name='check-circle'
                  color='green'
                  size={20}
                />
              </Animatable.View>
              : null}

            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ?
                <Feather
                  name='eye-off'
                  color='green'
                  size={20}
                />
                :
                <Feather
                  name='eye'
                  color='green'
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null
            :
            <Animatable.View animation='shake'>
              <Text style={styles.warningText}>Password must be 6 characters long!</Text>
            </Animatable.View>
          }

          <View style={styles.loginButton}>
            <RoundedButton title='Login' onPress={handleSignIn} />
            <RoundedButton title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
          </View>
        </Animatable.View>
      </Animatable.View>


    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  textHeader: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold'
  },
  textFooter: {
    fontSize: 18,
    color: '#009387',
    marginTop: 10
  },
  emailAndPasswordInput: {
    marginTop: width / 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#009387'
  },
  textInput: {
    flex: 1,
    paddingLeft: 10
  },
  warningText: {
    color: 'red',
    fontSize: 12
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width / 4
  }
});
