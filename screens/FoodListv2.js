import React, { useState } from 'react'
import { Text, Dimensions, Button, StyleSheet, View, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler'
import { Searchbar } from 'react-native-paper';

const { width } = Dimensions.get('screen')

const FoodListv2 = () => {
    const [foodData, setFoodData] = useState([]);
    const [search, setSearch] = useState('');

    handleSearch = () => {
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${search}&app_id=2626c70d&app_key=0c0f87ae4e5437621363ecf8e7ea80ae&page=20`)
            .then((res) => {
                setFoodData(res.data.hints)
            })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    return (
        <View style={styles.container}>
            <Searchbar placeholder='Type a food' value={search} onChangeText={(text) => setSearch(text)}
                onIconPress={handleSearch} onSubmitEditing={handleSearch} />
            <FlatList data={foodData.map((item) => item.food)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', { id: item.foodId })}>
                        <View style={styles.viewFlat}>
                            <Text style={styles.itemTitle}>{item.label}</Text>
                            <Text style={styles.itemKcal}>{Math.floor(item.nutrients.ENERC_KCAL)} KCAL</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.foodId}>
            </FlatList>
        </View>
    );
};

export default FoodListv2;

const styles = StyleSheet.create({
    viewFlat: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 0, 0.5)',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 20
    },

    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },

    submitButtonText: {
        color: 'white'
    },

    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 42,
        padding: 20
    },

    itemTitle: {
        fontSize: 22,
        fontWeight: '700'
    },

    itemKcal: {
        fontSize: 18,
        opacity: .7
    },
    textInput: {
        marginTop: width / 50,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#009387'
    }
});
