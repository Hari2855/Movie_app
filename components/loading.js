import React from "react";
import { Dimensions, Text, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import * as Progress from 'react-native-progress';
import { theme } from "../theme";

const { width, height } = Dimensions.get('window')

export default function Loading() {
    return(
        <View style={[{height,width}, tw.flexRow, tw.itemsCenter, tw.justifyCenter, tw.absolute]}>
            <Progress.CircleSnail thickness={8} size={130} color={theme.background}/>
        </View>
    )
}