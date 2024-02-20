import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { style } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";

const ios = Platform.ios == 'ios'
export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation()

    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])

    const getTrendingMovies = async ()=>{
        const data = await fetchTrendingMovies()
        // console.log('got trending movies ', data);
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }

    const getUpcomingMovies = async ()=>{
        const data = await fetchUpcomingMovies()
        // console.log('got upcoming movies ', data);
        if (data && data.results) setUpcoming(data.results);
    }

    const getTopRatedMovies = async ()=>{
        const data = await fetchTopRatedMovies()
        // console.log('got toprated movies ', data);
        if (data && data.results) setTopRated(data.results);
    }
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: ios ? 2 : 3 }}>
                <StatusBar backgroundColor={"#1d1f1d"} />
                <View style={styles.container2}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} style={{ left: 15 }} />
                    <Text style={styles.txt}><Text style={style.text}>M</Text>ovies</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={25} strokeWidth={2} color={'white'} style={{ right: 10 }} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loading />
                ) :
                    (

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                           {trending.length>0 && <TrendingMovies data={trending} /> }

                            <MovieList title="Upcoming" data={upcoming} />

                            <MovieList title="Top Rated" data={topRated} />
                        </ScrollView>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1f1d'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    }
})
