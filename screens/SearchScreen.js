import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { tw } from "react-native-tailwindcss";
import Loading from "../components/loading";
import {debounce} from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";

const { width, height } = Dimensions.get('window')

export default function SearchScreen() {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    const handleSearch = value=>{
        if(value && value.length>2){
            setLoading(true)
            searchMovies({
                query: value, 
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data=>{
                setLoading(false)
                // console.log('got movie: ', data);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
    }

    const handletextDebounce = useCallback(debounce(handleSearch, 400), []);
    return (
        <SafeAreaView style={[tw.flex1, { backgroundColor: '#1d201f' }]}>
            <View style={[tw.mX4, tw.mB3, tw.itemsCenter, tw.justifyBetween, tw.border, tw.flexRow, tw.roundedFull, { borderColor: '#666865' }]}>
                <TextInput onChangeText={handletextDebounce} placeholder="Search Movie" placeholderTextColor={'lightgray'} style={[tw.pB1, tw.pL6, tw.flex1, tw.fontSemibold, tw.textWhite, tw.trackingWider,]} />

                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[tw.roundedFull, tw.m1, tw.p3, { backgroundColor: '#656764' }]}>
                    <XMarkIcon size={15} color={'white'} />
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading />
                ) : (
                    results.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 15 }}>
                            <Text style={[tw.textWhite, tw.fontSemibold, tw.mL1]}>Results({results.length})</Text>

                            <View style={[tw.flexRow, tw.justifyBetween, tw.flexWrap]}>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View style={{ marginVertical: 8 }}>
                                                    <Image source={{uri: image185(item?.poster_path) || fallbackMoviePoster}} style={{
                                                        height: height * 0.3,
                                                        width: width * 0.44, borderRadius: 15
                                                    }} />

                                                    <Text style={[tw.mL1, { color: '#cbcdca', marginTop: 2 }]}>
                                                        {
                                                            item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={[tw.flexRow, tw.justifyCenter]}>
                            <Image source={require('../assets/no.jpg')} style={{
                                height: 250, width: 250,
                                borderRadius: 15, marginTop: '30%'
                            }} />
                        </View>
                    )
                )
            }
        </SafeAreaView >
    )
}
