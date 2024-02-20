import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import { style } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
    let movieName = 'Ant-Man and the Wasp: Quantumania'
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.txt1}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={[style.text, { fontSize: 20 }]}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, marginTop: 10 }}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
                                <View style={{ marginBottom: 4, marginRight: 15 }}>
                                    <Image source={{uri: image185(item.poster_path) || fallbackMoviePoster}} style={styles.img1} />
                                    <Text style={{ color: '#cbcdcb', marginRight: 10 }}>
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
        paddingVertical: 4
    },
    container1: {
        marginHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txt1: {
        color: 'white',
        fontSize: 20,
        marginTop: 10
    },
    img1: {
        width: width * 0.33,
        height: height * 0.22,
        borderRadius: 20
    }
})
