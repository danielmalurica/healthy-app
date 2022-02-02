import { ScrollView, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import * as Animatable from 'react-native-animatable';
import RoundedButton from '../components/RoundedButton'
import { authentication } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection } from 'firebase/firestore'
import { db } from '../firebase';

const { width, height } = Dimensions.get('window')

const SignUp = ({ navigation }) => {

    const [otherInfo, setOtherInfo] = useState({
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        checkInputName: false,
        checkInputAge: false,
        checkInputWeight: false,
        checkInputHeight: false,
        isValidName: true,
        isValidAge: true,
        isValidWeight: true,
        isValidHeight: true,
    })

    const [selectedGender, setSelectedGender] = useState('Male')
    const [genderValues] = useState(
        ['Male',
            'Female'
        ]
    )


    const handleName = (value) => {
        if (value.length >= 3) {
            setOtherInfo({
                ...otherInfo,
                name: value,
                checkInputName: true,
                isValidName: true
            })
        }
        else {
            setOtherInfo({
                ...otherInfo,
                name: value,
                checkInputName: false,
                isValidName: false
            })
        }
    }

    const handleAge = (value) => {
        if (value > 0 && value <= 110) {
            setOtherInfo({
                ...otherInfo,
                age: value,
                checkInputAge: true,
                isValidAge: true
            })
        }
        else {
            setOtherInfo({
                ...otherInfo,
                age: value,
                checkInputAge: false,
                isValidAge: false
            })
        }
    }

    const handleWeight = (value) => {
        if (value > 0 && value <= 300) {
            setOtherInfo({
                ...otherInfo,
                weight: value,
                checkInputWeight: true,
                isValidWeight: true
            })
        }
        else {
            setOtherInfo({
                ...otherInfo,
                weight: value,
                checkInputWeight: false,
                isValidWeight: false
            })
        }
    }

    const handleHeight = (value) => {
        if (value > 0 && value <= 250) {
            setOtherInfo({
                ...otherInfo,
                height: value,
                checkInputHeight: true,
                isValidHeight: true
            })
        }
        else {
            setOtherInfo({
                ...otherInfo,
                height: value,
                checkInputHeight: false,
                isValidHeight: false
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Please complete all fields to register</Text>
            </View>
            <Animatable.View animation='fadeInUpBig' style={styles.footer}>
                <Animatable.View animation='zoomInUp'>
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
                            value={otherInfo.name}
                        />
                        {otherInfo.checkInputName ?
                            <Animatable.View animation='bounceIn'>
                                <Feather
                                    name='check-circle'
                                    color='green'
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {otherInfo.isValidName ? null
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
                            value={otherInfo.age}
                        />
                        {otherInfo.checkInputAge ?
                            <Animatable.View animation='bounceIn'>
                                <Feather
                                    name='check-circle'
                                    color='green'
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {otherInfo.isValidAge ? null
                        :
                        <Animatable.View animation='shake'>
                            <Text style={styles.warningText}>Age should be between 1 and 110!</Text>
                        </Animatable.View>

                    }

                    <Text style={styles.textFooter}>Gender</Text>
                    <Picker selectedValue={selectedGender}
                        onValueChange={(itemVal, itemIndex) => {
                            setSelectedGender(itemVal)
                        }}>
                        {genderValues.map((gen) => (
                            <Picker.Item label={gen} value={gen} key={gen} />
                        ))}
                    </Picker>


                    <Text style={styles.textFooter}>Your Height</Text>
                    <View style={styles.emailAndPasswordInput}>
                        <FontAwesome
                            name="id-badge"
                            color='#009387'
                            size={20}
                        />
                        <TextInput
                            placeholder='Enter Your Height'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='numeric'
                            onChangeText={(value) => handleHeight(value)}
                            value={otherInfo.height}
                        />
                        {otherInfo.checkInputAge ?
                            <Animatable.View animation='bounceIn'>
                                <Feather
                                    name='check-circle'
                                    color='green'
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {otherInfo.isValidAge ? null
                        :
                        <Animatable.View animation='shake'>
                            <Text style={styles.warningText}>Height should be between 1 and 250!</Text>
                        </Animatable.View>

                    }

                    <Text style={styles.textFooter}>Your Weight</Text>
                    <View style={styles.emailAndPasswordInput}>
                        <FontAwesome
                            name="id-badge"
                            color='#009387'
                            size={20}
                        />
                        <TextInput
                            placeholder='Enter Your Weight'
                            style={styles.textInput}
                            autoCapitalize='none'
                            keyboardType='numeric'
                            onChangeText={(value) => handleWeight(value)}
                            value={otherInfo.weight}
                        />
                        {otherInfo.checkInputAge ?
                            <Animatable.View animation='bounceIn'>
                                <Feather
                                    name='check-circle'
                                    color='green'
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {otherInfo.isValidAge ? null
                        :
                        <Animatable.View animation='shake'>
                            <Text style={styles.warningText}>Age should be between 1 and 300!</Text>
                        </Animatable.View>

                    }



                    <View style={styles.loginButton}>
                        <RoundedButton title='Register' onPress={console.log('pressed')} />
                    </View>
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
