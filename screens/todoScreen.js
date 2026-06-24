import {FlatList, Pressable, Text, TextInput, View} from "react-native";
import styling from "../styling";
import {logout} from "../auth";
import React, {useEffect, useState} from "react";
import {useSQLiteContext} from "expo-sqlite";

export default function TodoScreen({ navigation }){
    const db = useSQLiteContext();
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    const loadTasks = async() => {
        const result = await db.getAllAsync('SELECT * FROM Tasks');
        setTasks(result);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAddTask = async () => {
        if (!newTitle.trim()) return;
        await db.runAsync('INSERT INTO Tasks (title, state) VALUES (?, ?)', [newTitle, 0])
        setNewTitle("");
        await loadTasks();
    }

    const handleDeleteTask = async (id) => {
        await db.runAsync('DELETE FROM Tasks WHERE id = ?', [id]);
        if(editingId === id){
            setEditingId(null);
            setEditingTitle("");
        }
        await loadTasks();
    }

    const handleEditPress = async (item) => {
        if(editingId === item.id){ return handleSaveEdit();}
        setEditingId(item.id)
        setEditingTitle(item.title)
    }

    const handleSaveEdit = async () => {
        if(!editingTitle.trim() || editingId === null) return;

        await db.runAsync('UPDATE Tasks SET title = ? WHERE id = ?', [editingTitle, editingId])

        setEditingId(null);
        setEditingTitle("");
        await loadTasks();
    }

    const handleStateChange = async (item) => {
        const state = !item.state
        await db.runAsync('UPDATE Tasks SET state = ? WHERE id = ?', [state, item.id])
        await loadTasks();
    }

    const renderItem = ({item}) => {
        const isEditing = editingId === item.id;

        return(
            <View style={styling.task}>
                <View style={styling.taskHeader}>
                    <Text style={styling.taskNum}>Task #{item.id}</Text>
                    {isEditing ? (
                            <TextInput value={editingTitle} onChangeText={setEditingTitle} style={styling.input} autoFocus/>)
                        : (<Text style={styling.taskTitle}>{item.title}</Text>
                        )}
                </View>
                <View style={styling.taskActionsRow}>
                    <Pressable style={[styling.taskStatus, item.state === 0 ? styling.taskStatusIncomplete : styling.taskStatusComplete]}
                               onPress={() => handleStateChange(item)}>
                        <Text style={styling.taskStatusText}>{item.state === 0 ? "Incomplete" : "Complete"}</Text>
                    </Pressable>
                    <Pressable style={styling.editBtn} onPress={() => {handleEditPress(item);}}>
                        <Text style={styling.editBtnText}>{isEditing ? "Save" : "Edit"}</Text>
                    </Pressable>
                    {isEditing && (
                        <Pressable style={styling.editBtn} onPress={() => {setEditingId(null); setEditingTitle("");}}>
                            <Text style={styling.editBtnText}>Cancel</Text>
                        </Pressable>
                    )}
                    <Pressable style={styling.deleteBtn} onPress={() => {handleDeleteTask(item.id);}}>
                        <Text style={styling.deleteBtnText}>X</Text>
                    </Pressable>
                </View>
            </View>
        )
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

            <View style={styling.taskActions}>
                <TextInput value={newTitle} onChangeText={setNewTitle} placeholder="New task title" style={styling.input}/>
                <Pressable onPress={handleAddTask} style={styling.navBtn}>
                    <Text style={styling.navBtnText}>Add task</Text>
                </Pressable>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                columns={3}
            />

        </View>
    )
}