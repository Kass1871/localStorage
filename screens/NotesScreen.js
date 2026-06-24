import styling from "../styling";
import {FlatList, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker"
import {logout} from "../auth";
import React, {useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";


export default function NotesScreen({navigation}){
    const db = useSQLiteContext();
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteCategoryId, setNoteCategoryId] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const loadNotes = async() => {
        try{
            const result = await db.getAllAsync('SELECT * FROM Notes');
            setNotes(result);
        } catch (e) {
            console.error("loadNotes error:", e); // likely printing here
        }
    };

    const loadCategories = async() => {
        try{
            const result = await db.getAllAsync('SELECT * FROM Categories');
            setCategories(result);
        } catch (e) {
            console.error("loadCategories error:", e); // likely printing here
        }
    }

    const handleAddCategory = async () => {
        if (!categoryTitle.trim()) return;
        try{
            await db.runAsync('INSERT INTO Categories (name) VALUES (?)', [categoryTitle])
            setCategoryTitle("");
            await loadCategories();
        }
        catch(err){
            console.log("handleAddCategory error", err);
        }
    }

    const handleAddNote = async () => {
        if(!noteTitle.trim() || !noteContent.trim()) return;
        try{
            await db.runAsync('INSERT INTO Notes (title, content, categoryId) VALUES (?, ?, ?)', [noteTitle, noteContent, noteCategoryId])
            setNoteContent("");
            setNoteTitle("");
            await loadNotes();
        } catch(err){
            console.log("handleAddNote error", err);
        }
    }

    const getCategoryName = (categoryId) => {
        const match = categories.find(c => c.id === categoryId);
        return match ? match.name : "Uncategorized";
    }

    const renderCategory = ({item: category}) => {
        const isActive = selectedCategory === category.id;
        return(
            <Pressable style={[styling.categoryBtn, isActive && styling.categoryBtnActive]} onPress={() => setSelectedCategory(category.id)}>
                <Text style={[styling.categoryBtnText, isActive && styling.categoryBtnActiveText]}>{category.name}</Text>
            </Pressable>
        )
    }

    const renderNote = ({item: note}) => {
        return(
            <View style={styling.note}>
                <View style={styling.noteHeader}>
                    <Text style={styling.noteTitle}>{note.title}</Text>
                    <Text style={styling.noteCategory}>{getCategoryName(note.categoryId)}</Text>
                </View>
                <Text style={styling.noteContent}>{note.content}</Text>

            </View>
        )
    }

    const filteredNotes =[...notes].filter((note) => {
        const query = search.toLowerCase();
        const matchesSearch = note.title.toLowerCase().includes(query) || (note.content || "").toLowerCase().includes(query);
        const isInCategory = selectedCategory === null || note.categoryId === selectedCategory;

        return matchesSearch && isInCategory;
    })

    useEffect(() => {
        loadCategories();
        loadNotes();
    }, [])

    return(
        <View style={styling.notesScreenContainer}>
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

            <FlatList
                data={filteredNotes}
                renderItem={renderNote}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                extraData={[categories, selectedCategory, search]}
                contentContainerStyle={{alignItems: "center", paddingBottom: 40}}
                ListHeaderComponent={
                    <>
                        <View style={styling.noteCategories}>
                            <View style={styling.noteCategoriesCreate}>
                                <TextInput style={styling.input} placeholder="New category" value={categoryTitle} placeholderTextColor="gray" onChangeText={setCategoryTitle} />
                                <Pressable style={styling.categoryBtn} onPress={handleAddCategory}>
                                    <Text style={styling.categoryBtnText}>Add</Text>
                                </Pressable>
                            </View>
                            <View style={styling.categories}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styling.categories}
                                    contentContainerStyle={{flexDirection: "row"}}
                                >
                                    {[{id: null, name: "All"}, ...categories].map(category => {
                                        const isActive = selectedCategory === category.id;
                                        return (
                                            <Pressable
                                                key={category.id === null ? "all" : category.id.toString()}
                                                style={[styling.categoryBtn, isActive && styling.categoryBtnActive]}
                                                onPress={() => setSelectedCategory(category.id)}
                                            >
                                                <Text style={[styling.categoryBtnText, isActive && styling.categoryBtnActiveText]}>
                                                    {category.name}
                                                </Text>
                                            </Pressable>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        </View>

                        <View style={styling.notes}>
                            <View style={styling.createNote}>
                                <TextInput style={styling.input} placeholder="Title" placeholderTextColor="gray" value={noteTitle} onChangeText={setNoteTitle} />
                                <TextInput style={styling.bigInput} placeholder="Content" placeholderTextColor="gray" value={noteContent} onChangeText={setNoteContent}/>
                                <View style={styling.createNoteCategoryRow}>
                                    <Picker selectedValue={noteCategoryId} onValueChange={setNoteCategoryId} style={{flex: 1}}>
                                        <Picker.Item label="No category" value={null}/>
                                        {categories.map(category => (
                                            <Picker.Item key={category.id} label={category.name} value={category.id}/>
                                        ))}
                                    </Picker>
                                    <Pressable style={styling.categoryBtn} onPress={handleAddNote}>
                                        <Text style={styling.categoryBtnText}>Add</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <TextInput
                                style={styling.searchInput}
                                placeholderTextColor="gray"
                                placeholder="Search notes..."
                                value={search}
                                onChangeText={setSearch}
                            />
                        </View>
                    </>
                }
            />
        </View>
    )
}