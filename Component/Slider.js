import React, { useEffect, useState,useRef } from "react";
import {
    Text,
    StyleSheet,
    View,
    Alert,
    Image,
    Button,
    Dimensions,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Modal
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Item from "./Item";

const width = Dimensions.get("window").width;

let allCatData = []

export default Slider = ({data,changeData}) => {
    const [catData,setCatData] = useState(data)
    const [cat,setCat] = useState(data[0])
    const [maxSlidesNo,setMaxSlidesNo] = useState(data[0].max)
    const [currIndex,setCurrIndex] = useState(0)

    useEffect(() => {
        data.forEach(cat => {
            allCatData.push(cat)
        })
        return () => {
            changeData(allCatData)
        }
    },[])
    
    const scrollSlider = (type) => {
        let newIndex = currIndex
        if(type == 'next'){
            if(currIndex < (maxSlidesNo - 1)){
                newIndex += 1
            }
        }else if(type == 'back'){
            if(currIndex > 0){
                newIndex -= 1
            }
        }
        setCurrIndex(newIndex)
        setCat(catData[newIndex])
    }
    
    const Category = () => {
        const [modalVisible, setModalVisible] = useState(false);
        const [note,setNote] = useState(cat.note)
        const [editNote,setEditNote] = useState(cat.note)
        const [editCat,setEditCat] = useState(cat)
        const [total,setTotal] = useState(cat.total)

        useEffect(() => {
            return () =>setCatData(allCatData)
        },[])

        const saveNote = () => {
            const newCat = cat
            newCat.note = editNote
            setNote(editNote)
            setEditCat({...newCat})
            allCatData[editCat.id] = newCat
        }

        const changeCatData = (newCat) => {
            setTotal(newCat.total)
            setEditCat({...newCat})
            allCatData[editCat.id] = editCat
        }

        const clearNote = () => {
            setEditNote('')
            setNote('')
        }
        
        return(
            <View style={styles.Catcontainer}>
                <View style={styles.nameCatContainer}>
                    <Text style={styles.nameText}>
                        {cat.name}
                    </Text>
                </View>
                <View style={styles.header}>
                    <Text style={{height:'100%',width:'60%',textAlign:'center',textAlignVertical:'center',color:'#fff'}}>السؤال</Text>
                    <Text style={{height:'100%',width:'20%',textAlign:'center',textAlignVertical:'center',color:'#fff'}}>العلامة</Text>
                    <Text style={{height:'100%',width:'20%',textAlign:'center',textAlignVertical:'center',color:'#fff'}}>الحد الاعلى</Text>
                </View>
                <View style={styles.sliderCatContainer}>
                    <FlatList
                        data={cat.questions}
                        renderItem={({item}) => <Item item={item} cat={cat} changeCatData={changeCatData} setModalVisible={setModalVisible} catTotal={total} catNote={note} clearNote={clearNote}/>}
                        keyExtractor={item => item.id}
                        scrollEnabled={true}
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={{textAlign:'center',textAlignVertical:'center'}}>
                        {`المجموع ${total} / ${cat.maxTotal}`}
                    </Text>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                value={editNote}
                                onChangeText={text => setEditNote(text)}
                                multiline
                                numberOfLines={20}
                                maxLength={500}
                                placeholder="لا يوجد"
                                style={[styles.text,styles.textStyle]}
                                scrollEnabled={true}
                                editable={true}
                            />
                            <TouchableOpacity
                                onPress={() => {setModalVisible(!modalVisible),saveNote()}}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>   
                </Modal>
            </View>
        )
    }


    return(
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <Category/>
            </View>
            <View style={styles.sliderButtonsContainer}>
                <View style={{marginLeft:40}}>
                    {currIndex != (maxSlidesNo - 1)?
                        <TouchableOpacity
                            onPress={() => scrollSlider('next')}
                            style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
                        >
                            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
                            <Text style={{color:'#fff',fontSize:15}}>
                            {`Next `}
                            </Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            onPress={() => scrollSlider('next')}
                            style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
                        >
                            <Text style={{
                                color:"#082032",
                                fontSize:15,
                                paddingTop:2,
                                paddingBottom:2,
                                paddingLeft:15,
                                paddingRight:15,
                                backgroundColor:'#fff',
                                borderRadius:15
                            }}>
                            {`Done`}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    <Text style={{color:'#fff',fontSize:20}}>
                        {`${maxSlidesNo} : ${currIndex + 1}`} 
                    </Text>
                </View>
                <View style={{marginRight:40}}>
                    <TouchableOpacity
                        onPress={() => scrollSlider('back')}
                        style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
                    >
                        <Text style={{color:'#fff',fontSize:15}}>
                        {`Back `}
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    sliderContainer:{
        width:'100%',
        height:'90%',
    },
    sliderButtonsContainer:{
        flex:1,
        width:'100%',
        height:'10%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    Catcontainer:{
        flex:1,
        width:width,
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    sliderCatContainer:{
        width:'100%',
        height:'80%',
    },
    nameCatContainer:{
        width:'100%',
        height:'10%',
    },
    nameText:{
        width:'100%',
        height:'100%',
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:25,
        fontWeight:'bold',
        color:"#082032",
        borderBottomColor:"#082032",
        borderBottomWidth:3
    },
    header:{
        flex:1,
        width:width,
        height:'5%',
        flexDirection:'row-reverse',
        borderBottomWidth:3,
        backgroundColor:"#082032",
        borderBottomColor:"#082032",
    },
    footer:{
        flex:1,
        width:width,
        height:'5%',
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:3,
        borderTopColor:"#082032"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        minHeight:300,
        minWidth:width*0.9,
        maxHeight:300,
        maxWidth:width*0.9,
        // margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
        text:{
        marginTop:-20,
        height:'95%',
        width:width*0.85,
        padding: 10,
        color:"#082032",
        borderBottomColor:"#082032",
        textAlignVertical:'top',
        borderWidth:3,
        borderRadius:10
    },
})