import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { image500 } from "../api/moviedb";

var {width, height} = Dimensions.get('window');

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return(
        <View style={styles.container}>
            <Text style={styles.txt1}>Trending</Text>
            <Carousel data={data} renderItem={({item})=> <MovieCard item={item} handleClick={handleClick}/>}
            firstItem={1}
            inactiveSliderOpacity={0.60}
            sliderWidth={width}
            itemWidth={width*0.62}
            sliderStyle={{display: 'flex', alignItems: 'center'}}
            />
        </View>
    )
}

const MovieCard = ({item, handleClick}) => {
    // console.log('item.poster_path ', item.poster_path);
    return(
        <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
            <Image source={{uri: image500(item.poster_path)}} style={styles.img}
            />
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8
    },
    txt1: {
        color: 'white',
        marginTop: 15,
        marginBottom: 8,
        marginLeft: 20,
        fontSize: 20
    },
    img: {
        width: width*0.6,
        height: height*0.4,
        borderRadius: 20,
        marginTop: 15
    }
})
