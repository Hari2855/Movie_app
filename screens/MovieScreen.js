import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView, Touchable, TouchableOpacity, Dimensions, Platform, Image, StatusBar } from "react-native";
import { ChevronLeftIcon, } from "react-native-heroicons/outline";
import { HeartIcon } from 'react-native-heroicons/solid'
import { theme } from "../theme";
import LinearGradient from "react-native-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

var { width, height } = Dimensions.get('window');


export default function MovieScreeen() {
    const { params: item } = useRoute()
    const navigation = useNavigation();
    const [isFavourite, toggelfavourite] = useState(false)
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    useEffect(() => {
        // call the movie details api
        // console.log('item id: ', item.id);
        setLoading(true)
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item])


    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        // console.log('got movie details: ', data);
        if (data) setMovie(data);
        setLoading(false);
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        // console.log('got movie details: ', data);
        if (data && data.cast) setCast(data.cast);
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        // console.log('got movie details: ', data);
        if (data && data.results) setSimilarMovies(data.results);
    }


    return (
        <ScrollView style={{ flex: 1, paddingBottom: 20, backgroundColor: '#151815' }} showsVerticalScrollIndicator={false}>
         <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
            <View style={{ width: '100%'}}>
                <SafeAreaView style={styles.safe}>
                    <TouchableOpacity style={{ borderRadius: 10, padding: 2, backgroundColor: '#eab308' }} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggelfavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                {
                    loading ? (
                        <Loading />
                    ) :
                        (
                            <View>
                                <Image source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }} style={{ width, height: height * 0.55, }} />
                                <LinearGradient
                                    colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                    style={{ width, height: height * 0.40, position: 'absolute', bottom: 0 }}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                />
                            </View>
                        )
                }
            </View>

            <View style={{ marginTop: -(height * 0.09), marginBottom: 12 }}>
                <Text style={styles.text}>
                    {movie?.title}
                </Text>
                {
                    movie?.id?(

                        <Text style={styles.text1}>
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ):null
                }

                <View style={styles.container}>
                    {
                        movie?.genres?.map((genre, index)=> {
                            let showDot = index+1 != movie.genres.length;
                            return(
                                <Text key={index} style={styles.text2}>{genre?.name} {showDot? '•' : null} </Text>
                            )
                        })
                    }
                    {/* <Text style={styles.text2}>Thrill • </Text> */}
                    {/* <Text style={styles.text2}>Comedy</Text> */}
                </View>
                <Text style={{ marginHorizontal: 16, color: '#999b99', marginTop: 10 }}>
                     {movie?.overview}
                </Text>
            </View>

            {cast.length>0 &&<Cast cast={cast} navigation={navigation} />}

            {similarMovies.length>0 && <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    safe: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: hp(6)
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    text1: {
        textAlign: 'center',
        color: '#999b99',
        fontWeight: '500',
        marginTop: 5
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        paddingHorizontal: 2,
    },
    text2: {
        fontWeight: '500',
        textAlign: 'center',
        color: '#999b99'
    }
})
