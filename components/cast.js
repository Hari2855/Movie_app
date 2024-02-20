import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fallbackMoviePoster, fallbackpersonimage, image185 } from "../api/moviedb";


export default function Cast({ cast, navigation }) {
    let personName = 'Keanu Reevs'
    let characterName = 'Paul Rudd'
    return (
        <View style={{ marginVertical: 6 }}>
            <Text style={{ fontSize: 20, color: 'white', marginHorizontal: 16, marginBottom: 5 }}>Top Cast</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity key={index} style={{ marginRight: 15, alignItems: 'center' }} onPress={() => navigation.navigate('Person', person)}>
                                <View style={{height: 80, width: 80, overflow: 'hidden', borderRadius: 40, borderWidth: 1, borderColor: '#666866', alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={{uri: image185(person?.profile_path) || fallbackpersonimage}} style={{height: 96, width: 80, borderRadius: 50, marginTop: 10}}/>
                                </View>
                                <Text style={{ color: 'white', marginTop: 1 }}>
                                    {
                                        person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character
                                    }
                                </Text>
                                <Text style={{ color: '#929492', marginTop: 1 }}>
                                    {
                                        person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' :
                                            person?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
