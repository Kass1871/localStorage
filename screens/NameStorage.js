import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {TextInput, View, Text, Pressable} from "react-native";
import styling from "../styling";
import {logout} from "../auth";

export default function NameStorageScreen({navigation}) {
    const [name, setName] = useState("");
    const [input, setInput] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadName = async () => {
            try{
                const saved = await AsyncStorage.getItem("name");
                if(saved){
                    setName(JSON.parse(saved));
                }
            } catch (error){
                console.log(error);
            } finally{
                setLoaded(true);
            }
        };

        loadName();
    }, []);

    useEffect(() => {
        if(!loaded) return;

        const saveName = async () => {
            try{
                await AsyncStorage.setItem("name", JSON.stringify(name));
            } catch(error){
                console.log(error);
            }
        };

        saveName();
    }, [name, loaded]);

    const handleSubmit = async () => {
        try{
            setName(input)
            await AsyncStorage.setItem("name", input);
        } catch(error){
            console.log(error);
        }
    }

    return(
        <View style={styling.container}>
            <Pressable onPress={() => logout(navigation)} style={styling.logout}>
                <Text style={styling.logoutText}>Logout</Text>
            </Pressable>

            <View style={styling.navRow}>
                <Pressable style={styling.navBtn} onPress={() => navigation.navigate("Name")}>
                    <Text style={styling.navBtnText}>To name demo</Text>
                </Pressable>
                <Pressable style={styling.navBtn} onPress={() => navigation.navigate("Todo")}>
                    <Text style={styling.navBtnText}>To task list</Text>
                </Pressable>
                <Pressable style={styling.navBtn} onPress={() => navigation.navigate("Notes")}>
                    <Text style={styling.navBtnText}>To notes</Text>
                </Pressable>
            </View>

            <Text>Your name: {name || "-"}</Text>
            <TextInput style={styling.input} value={input} onChangeText={setInput} onSubmitEditing={handleSubmit} placeholder={"Enter your name"}/>
            <Text style={styling.muffled}>Press enter to save your name</Text>
        </View>
    )
}