import { Text, View } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

class FoodDetails extends Component {
constructor(props) {
  super(props)

  this.state = {
    foodData: []
  }
};

 componentDidMount() {
        axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${this.props.route.params.id}&app_id=2626c70d&app_key=0c0f87ae4e5437621363ecf8e7ea80ae&page=20`)
        .then((res) => {
            this.setState({foodData: res.data.hints})
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    }

  
  render() {
    return (
      <FlatList data={this.state.foodData.map((item) => item.food)}
       renderItem={({item}) => (
                        <View>
                            <Text>Name of food:{item.label}</Text>
                            <Text>Category:{item.category}</Text>
                            <Text>Category Label:{item.categoryLabel}</Text>
                            <Text>Food Contents:{item.foodContentsLabel}</Text>
                            <Text>Energy :{item.nutrients.ENERC_KCAL} KCAL</Text>
                            <Text>Protein: {item.nutrients.PROCNT} KCAL</Text>
                            <Text>Fat: {item.nutrients.FAT} KCAL</Text>
                            <Text>Carbohydrate: {item.nutrients.CHOCDF} KCAL</Text>
                            <Text>Fiber: {item.nutrients.FIBTG} KCAL</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.foodId}>
      </FlatList>
    );
  }
}

export default FoodDetails;
