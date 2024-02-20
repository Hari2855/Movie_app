import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import MovieScreeen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Movie" component={MovieScreeen}/>
                <Stack.Screen name="Person" component={PersonScreen}/>
                <Stack.Screen name="Search" component={SearchScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}