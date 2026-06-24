import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logout(navigation){
    await AsyncStorage.removeItem("authToken");
    navigation.navigate("Registration");
}