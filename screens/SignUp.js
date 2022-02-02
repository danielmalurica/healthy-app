import { ScrollView, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import RoundedButton from '../components/RoundedButton'
import { authentication } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window')

const SignUp = ({ navigation }) => {

    const [dataSignUp, setDataSignUp] = useState({
        name: '',
        age: '',
        email: '',
        password: '',
        reEnteredPassword: '',
        checkInputName: false,
        checkInputAge: false,
        checkInputEmail: false,
        checkInputPassword: false,
        secureTextEntryPassword: true,
        secureTextEntryRePassword: true,
        isValidName: true,
        isValidAge: true,
        isValidEmail: true,
        isValidPassword: true
    })

    const [isSingedIn, setIsSignedIn] = useState(false);

    const handleRegister = () => {
        createUserWithEmailAndPassword(authentication, dataSignUp.email, dataSignUp.password)
            .then((res) => {
                console.log(res)
                ToastAndroid.show('User created successfully!', ToastAndroid.SHORT);
                setIsSignedIn(true)
                Alert.alert("Complete personal info", "Do you want to complete other personal info about you?",
                    [{ text: "Yes", onPress: () => navigation.navigate('OtherInfo') }, { text: "No", style: "cancel", onPress: () => navigation.navigate('FoodList') }])

            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    ToastAndroid.show('Email already in use!', ToastAndroid.SHORT)
                }
                if (error.code === 'auth/invalid-email') {
                    ToastAndroid.show('That email address is invalid!');
                }
            })
    }

    const handleName = (value) => {
        if (value.length >= 3) {
            setDataSignUp({
                ...dataSignUp,
                name: value,
                checkInputName: true,
                isValidName: true
            })
        }
        else {
            setDataSignUp({
                ...dataSignUp,
                name: value,
                checkInputName: false,
                isValidName: false
            })
        }
    }

    const handleAge = (value) => {
        if (value > 0 && value <= 110) {
            setDataSignUp({
                ...dataSignUp,
                age: value,
                checkInputAge: true,
                isValidAge: true
            })
        }
        else {
            setDataSignUp({
                ...dataSignUp,
                age: value,
                checkInputAge: false,
                isValidAge: false
            })
        }
    }

    const handleEmail = (value) => {
        const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (reg.test(String(value).toLowerCase()) && value.length > 0) {
            setDataSignUp({
                ...dataSignUp,
                email: value,
                checkInputEmail: true,
                isValidEmail: true,
            })
        } else {
            setDataSignUp({
                ...dataSignUp,
                email: value,
                checkInputEmail: false,
                isValidEmail: false,
            })
        }
    }

    const handlePasswordChange = (value) => {
        if (value.length > 5) {
            setDataSignUp({
                ...dataSignUp,
                password: value,
                isValidPassword: true
            })
        } else {
            setDataSignUp({
                ...dataSignUp,
                password: value,
                isValidPassword: false
            })
        }
    }

    const handleRePasswordChange = (value) => {
        if (value.length > 5) {
            setDataSignUp({
                ...dataSignUp,
                reEnteredPassword: value,
            })
        } else {
            setDataSignUp({
                ...dataSignUp,
                reEnteredPassword: value,
            })
        }
    }

    const updateSecureTextEntryPassword = () => {
        setDataSignUp({
            ...dataSignUp,
            secureTextEntryPassword: !dataSignUp.secureTextEntryPassword
        })
    }

    const updateSecureTextEntryRePassword = () => {
        setDataSignUp({
            ...dataSignUp,
            secureTextEntryRePassword: !dataSignUp.secureTextEntryRePassword
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Please complete all fields to register</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Animatable.View animation='zoomInUp'>
                    <ScrollView>
                        <Text style={styles.textFooter}>Your Name</Text>
                        <View style={styles.emailAndPasswordInput}>
                            <FontAwesome
                                name="user-o"
                                color='#009387'
                                size={20}
                            />
                            <TextInput
                                placeholder='Enter Your Name'
                                style={styles.textInput}
                                onChangeText={(value) => handleName(value)}
                                value={dataSignUp.name}
                            />
                            {dataSignUp.checkInputName ?
                                <Animatable.View animation='bounceIn'>
                                    <Feather
                                        name='check-circle'
                                        color='green'
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                        {dataSignUp.isValidName ? null
                            :
                            <Animatable.View animation='shake'>
                                <Text style={styles.warningText}>Invalid Name!</Text>
                            </Animatable.View>

                        }

                        <Text style={styles.textFooter}>Your Age</Text>
                        <View style={styles.emailAndPasswordInput}>
                            <FontAwesome
                                name="id-badge"
                                color='#009387'
                                size={20}
                            />
                            <TextInput
                                placeholder='Enter Your Age'
                                style={styles.textInput}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                onChangeText={(value) => handleAge(value)}
                            />
                            {dataSignUp.checkInputAge ?
                                <Animatable.View animation='bounceIn'>
                                    <Feather
                                        name='check-circle'
                                        color='green'
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                        {dataSignUp.isValidAge ? null
                            :
                            <Animatable.View animation='shake'>
                                <Text style={styles.warningText}>Age should be between 1 and 110!</Text>
                            </Animatable.View>

                        }

                        <Text style={styles.textFooter}>Email</Text>
                        <View style={styles.emailAndPasswordInput}>
                            <FontAwesome
                                name="envelope-o"
                                color='#009387'
                                size={20}
                            />
                            <TextInput
                                placeholder='Enter Your Email'
                                style={styles.textInput}
                                autoCapitalize='none'
                                onChangeText={(value) => handleEmail(value)}
                                value={dataSignUp.email}
                            />
                            {dataSignUp.checkInputEmail ?
                                <Animatable.View animation='bounceIn'>
                                    <Feather
                                        name='check-circle'
                                        color='green'
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>
                        {dataSignUp.isValidEmail ? null
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
                                secureTextEntry={dataSignUp.secureTextEntryPassword ? true : false}
                                onChangeText={(value) => handlePasswordChange(value)}
                                value={dataSignUp.password}
                            />

                            <TouchableOpacity onPress={updateSecureTextEntryPassword}>
                                {dataSignUp.secureTextEntryPassword ?
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
                        {dataSignUp.isValidPassword ? null
                            :
                            <Animatable.View animation='shake'>
                                <Text style={styles.warningText}>Password must be 6 characters long!</Text>
                            </Animatable.View>
                        }
                        <Text style={styles.textFooter}>Re-Enter Password</Text>
                        <View style={styles.emailAndPasswordInput}>
                            <FontAwesome
                                name="lock"
                                color='#009387'
                                size={20}
                            />
                            <TextInput
                                placeholder='Re-Enter Your Password'
                                style={styles.textInput}
                                autoCapitalize='none'
                                secureTextEntry={dataSignUp.secureTextEntryRePassword ? true : false}
                                onChangeText={(value) => handleRePasswordChange(value)}
                                value={dataSignUp.reEnteredPassword}
                            />

                            <TouchableOpacity onPress={updateSecureTextEntryRePassword}>
                                {dataSignUp.secureTextEntryRePassword ?
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
                        {(dataSignUp.password === dataSignUp.reEnteredPassword) ? null
                            :
                            <Animatable.View animation='shake'>
                                <Text style={styles.warningText}>Password and confirm password does not match!</Text>
                            </Animatable.View>
                        }

                        <View style={styles.loginButton}>
                            <RoundedButton title='Register' onPress={handleRegister} />
                        </View>
                    </ScrollView>
                </Animatable.View>
            </Animatable.View>


        </View>
    );
};

export default SignUp;

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
        fontSize: 25,
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
