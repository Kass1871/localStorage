import {createNativeStackNavigator} from"@react-navigation/native-stack";
import NameStorageScreen from "../screens/NameStorage";
import RegistrationScreen from "../screens/RegistrationScreen";
import TodoScreen from "../screens/todoScreen";
import NotesScreen from "../screens/NotesScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
    return(
        <Stack.Navigator initialRouteName="Registration">
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Name" component={NameStorageScreen}/>
            <Stack.Screen name="Todo" component={TodoScreen}/>
            <Stack.Screen name="Notes" component={NotesScreen}/>
        </Stack.Navigator>
    )
}