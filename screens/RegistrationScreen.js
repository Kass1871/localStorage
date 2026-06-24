import {View, Text, TextInput, Pressable, Alert} from "react-native";
import styling from "../styling";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import * as Crypto from 'expo-crypto'


export default function RegistrationScreen({navigation}) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const checkAuthState = async () => {
            try{
                const token = await SecureStore.getItemAsync("authToken");
                if(token) navigation.navigate("Name");
            } catch (error) {
                console.log(error);
            }
        }

        checkAuthState();
    }, [])

    const handleSubmit = async () => {
        try{
            if(!email.includes('@') || !email.includes(".")){
                Alert.alert("Invalid email.", "Email must contain @ and .")
                console.log("Invalid email.", "Email must contain @ and .")
                return;
            }
            const connected = `${username+password+email}`
            const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, connected)
            await SecureStore.setItemAsync('authToken', hash)
            navigation.navigate("Name");
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style={styling.container}>
            <View style={styling.register}>
                <Text>Usename:</Text>
                <TextInput value={username} style={styling.input} onChangeText={setUsername} placeholder="Username goes here..." placeholderTextColor="gray"/>

                <Text>Email:</Text>
                <TextInput value={email} style={styling.input} onChangeText={setEmail} dataDetectorTypes={email} keyboardType="email-address" placeholder="Email goes here..." placeholderTextColor="gray"/>

                <Text>Password:</Text>
                <TextInput value={password} style={styling.input} onChangeText={setPassword} dataDetectorTypes={password} keyboardType="password" secureTextEntry={true} placeholder="Password goes here..." placeholderTextColor="gray"/>

                <Pressable onPress={() => {handleSubmit()}} style={styling.registerBtn}>
                    <Text style={styling.registerBtnText}>Register</Text>
                </Pressable>
            </View>
        </View>
    )
}