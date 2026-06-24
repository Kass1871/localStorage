import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    muffled:{
        textAlign:'center',
        fontSize:10,
        color: "#a5a5a5"
    },
    input:{
        backgroundColor:'#000',
        color: "#FFF",
        borderWidth: 1,
        borderColor: '#000',
        minWidth: "50%",
        borderRadius: 100,
        marginHorizontal: 5,
    },
    register:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        Width: "50vw",
        borderColor:'#000',
        borderRadius: 20,
        borderWidth: 2,
        paddingHorizontal:20,
    },
    logout:{
        width: "100%",
        backgroundColor: "#7c0000",
        position:"absolute",
        top: 0
    },
    logoutText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center',
    },
    navRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        position:"absolute",
        gap: 10,
        top: 40,
    },
    navBtn:{
        backgroundColor:'#000',
        paddingHorizontal: 5,
        height: 40,
        display:"flex",
        justifyContent: "center",
        borderRadius: 5,
    },
    navBtnText:{
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
    },
    task: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 5,
        width: '100%',
    },
    taskHeader:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        marginBottom: 10,
    },
    taskActionsRow:{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        marginHorizontal: "auto",
    },
    taskNum: {
        textAlign: 'center',
        fontSize: 10,
        color: "#a5a5a5",
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    taskStatus: {
        minWidth: "40%",
        height: 36,
        justifyContent: 'center',
        borderRadius: 10,
    },
    taskStatusText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    taskStatusIncomplete: {
        backgroundColor: "#7c0000",
    },
    taskStatusComplete: {
        backgroundColor: "#006400",
    },
    registerBtn:{
        marginVertical: 10,
        backgroundColor: '#000',
        width: "25%",
        borderRadius: 5,
    },
    registerBtnText:{
        color: "white",
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    taskActions:{
        marginTop: 100,
        flexDirection: "row",
    },
    deleteBtn:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#ff5858',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#b64545',
    },
    deleteBtnText:{
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
    },
    editBtn:{
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#ffdf2b',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#ffe34e',
    },
    editBtnText:{
        color: "white",
        fontWeight: "bold",
        textAlign: 'center',
    },
    noteCategories:{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        paddingHorizontal: 10,
        width: '90%',
        marginBottom: 10,
        marginHorizontal: "auto"
    },
    noteCategoriesCreate:{
        flexDirection: "row",
        paddingVertical: 10,
    },
    categories:{
        flexDirection: "row",
        gap: 5,
        marginVertical: 10
    },
    categoryBtn:{
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    categoryBtnActive: {
        backgroundColor: '#162242',
        justifyContent: "center",
    },
    categoryBtnText:{
        color: "white",
        textAlign: "center",
    },
    categoryBtnActiveText:{
        color: "#7878d8",
        fontWeight: 'bold',
    },
    notes:{
        paddingVertical: 10,
        flexDirection: "column",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#000',
        minWidth: "95%"
    },
    bigInput:{
        backgroundColor:'#000',
        color: "#FFF",
        borderWidth: 1,
        borderColor: '#000',
        minWidth: "50%",
        borderRadius: 10,
        marginHorizontal: 5,
        minHeight: 100,
    },
    createNote:{
        flexDirection: "column",
        gap: 10
    },
    createNoteCategoryRow:{
        flexDirection: "row",
        gap: 5,
        paddingHorizontal: 10,
    },
    note: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 5,
        width: '100%',
    },
    noteHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 30,
        marginBottom: 8,
        minWidth: "50%",
    },
    noteTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#000"
    },
    noteCategory: {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 100,
    },
    noteContent: {
        fontSize: 14,
        color: '#333',
    },
    searchInput: {
        backgroundColor: '#000',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 100,
        minWidth: '50%',
        paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: "auto"
    },
    notesScreenContainer:{
        flex: 1,
        paddingTop: 90,
        marginHorizontal: "auto",
        alignItems:'center',
    }
})