import React, { useEffect, useState } from "react";
import { Dimensions, Platform, ScrollView, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ChevronLeftIcon, } from "react-native-heroicons/outline";
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation, useRoute } from "@react-navigation/native";
import { tw } from "react-native-tailwindcss";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackpersonimage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/moviedb";

var { height, width } = Dimensions.get('window')
const ios = Platform.OS == 'ios'

export default function PersonScreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggelfavourite] = useState(false)
    const navigation = useNavigation()
    const [personMovies, setPersonMovies] = useState([])
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])


    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if (data) setPerson(data);
        setLoading(false);
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) setPersonMovies(data.cast);
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#141714', paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.safe}>
                <TouchableOpacity style={{ borderRadius: 10, padding: 2, backgroundColor: '#eab308' }}
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggelfavourite(!isFavourite)}>
                    <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) : (

                    <View>
                        <View style={[tw.flexRow, tw.justifyCenter]}>
                            <View style={[tw.itemsCenter, tw.roundedFull, tw.overflowHidden, tw.h72, tw.w72, tw.border2, tw.borderWhite, Platform.OS === 'android' ? { elevation: 10, backgroundColor: 'white' } : { shadowColor: '#ffffff', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4 }]}>
                                <Image source={{ uri: image342(person?.profile_path) || fallbackpersonimage }} style={{ height: height * 0.43, width: height * 0.43 }} />
                            </View>
                        </View>




                        <View style={[tw.mT6]}>
                            <Text style={[tw.text3xl, tw.textWhite, tw.fontBold, tw.textCenter]}>{person?.name}</Text>
                            <Text style={[tw.textBase, tw.textCenter, { color: '#cccccc' }]}>{person?.place_of_birth}</Text>
                        </View>

                        <View style={[tw.mX3, tw.p4, tw.mT6, tw.flexRow, tw.justifyBetween, tw.itemsCenter, tw.roundedFull, { backgroundColor: '#373936' }]}>
                            <View style={[tw.borderR2, tw.pX2, tw.itemsCenter, { borderRightColor: '#9a9b99' }]}>
                                <Text style={[tw.textWhite, tw.fontSemibold,]}>Gender</Text>
                                <Text style={[tw.textSm, { color: '#cccccc' }]}>{person?.gender == 1 ? 'Female' : 'Male'}</Text>
                            </View>

                            <View style={[tw.borderR2, tw.pX2, tw.itemsCenter, { borderRightColor: '#9a9b99' }]}>
                                <Text style={[tw.textWhite, tw.fontSemibold,]}>Birthday</Text>
                                <Text style={[tw.textSm, { color: '#cccccc' }]}>{person?.birthday}</Text>
                            </View>

                            <View style={[tw.borderR2, tw.pX2, tw.itemsCenter, { borderRightColor: '#9a9b99' }]}>
                                <Text style={[tw.textWhite, tw.fontSemibold,]}>Known for</Text>
                                <Text style={[tw.textSm, { color: '#cccccc' }]}>{person?.known_for_department}</Text>
                            </View>

                            <View style={[tw.pX2, tw.itemsCenter,]}>
                                <Text style={[tw.textWhite, tw.fontSemibold,]}>Popularity</Text>
                                <Text style={[tw.textSm, { color: '#cccccc' }]}>{person?.popularity?.toFixed(2)} %</Text>
                            </View>
                        </View>

                        <View style={[tw.mY6, tw.mX4, tw.mL4]}>
                            <Text style={[tw.textWhite, tw.textLg]}>Biography</Text>
                            <Text style={[tw.trackingWide, tw.mT1, { color: '#868885' }]}>
                                {person?.biography || 'N/A'}
                            </Text>
                        </View>

                        <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    safe: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10
    },
})
