import React, { useEffect, useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CameraModule from "./CameraModule";
import Dialog from "react-native-dialog";
import ModalDropdown from 'react-native-modal-dropdown';


const width = Dimensions.get("window").width;

export default Item = ({item,cat,changeCatData,catTotal,setModalVisible,catNote,clearNote}) => {
    const [itemData,setItemData] = useState({score:item.score,total:cat.total})
    const [visible, setVisible] = useState(false)
    const [note, setNote] = useState(item.note)

    const add = () => {
        let score = itemData.score
        let total = catTotal
        if(score < item.maxGrade){
            score += 1
            total += 1
            if(total > cat.maxTotal){
                total = cat.maxTotal
            }
            const newData = {
                score,
                total
            }
            setItemData({...newData})
            let newCat = cat
            newCat.questions[item.id].score = score
            newCat.total = total
            changeCatData(newCat)
        }else{
            alert('العلامة المدخلة اعلى من الحد الاعلى')
        }
      }
    
    const sub = () => {
        let score = itemData.score
        let total = catTotal
        if(score > 0){
            score -= 1
            total -= 1
            if(total < 0){
                total = 0
            }
            const newData = {
                score,
                total
            }
            setItemData({...newData})
            let newCat = cat
            newCat.questions[item.id].score = score
            newCat.total = total
            changeCatData(newCat)
        }else{
            alert('الحد الادنى للعلامة هو صفر')
        }
    }

    const addNote = (index) => {
        let note = item.answers[index]
        if(note == 'لا يوجد'){
            note = ''
        }
        setVisible(false)
        setNote(note)
        let newCat = cat
        newCat.questions[item.id].note = note
        changeCatData(newCat)
    }

    const addCatNote = () => {
        setModalVisible(true)
    }

    const editNote = () => {
        setModalVisible(true)
    }

    const deleteNote = () => {
        clearNote()
    }

    return(
        <SafeAreaProvider>
                {item.id != item.max?
                    <>

                        <View style={styles.container}>
                            <TextInput
                                    readOnly
                                    value={item.question}
                                    multiline
                                    numberOfLines={3}
                                    style={[styles.textStyle,{width:'60%',height:'100%',textAlignVertical:'top',padding:10}]}
                                    scrollEnabled={false}
                            />
                            <View style={[styles.addAndSubOutterView,{minWidth:'25%',maxWidth:'25%'}]}>
                                <TouchableOpacity 
                                    style={styles.addAndSubBtu}
                                    onPress={add}
                                >
                                    <View style={styles.addAndSubView}>
                                        <FontAwesome5 name="plus" size={10} color="#fff" />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.scoreView}>
                                    <Text style={styles.scoreText}>
                                        {itemData.score}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.addAndSubBtu}
                                    onPress={sub}
                                >
                                    <View style={styles.addAndSubView}>
                                    <   MaterialCommunityIcons name="minus-thick" size={10} color="#fff" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.addAndSubOutterView,{minWidth:'15%',maxWidth:'15%'}]}>
                                <View style={[styles.maxGradeView,{marginRight:10,marginLeft:10}]}>
                                    <Text style={styles.maxGradeText}>
                                        {item.maxGrade}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={note == '' || note == undefined? styles.container : styles.noteContainer}>
                            <Dialog.Container visible={visible}>
                                <ModalDropdown 
                                    options={item.answers} 
                                    onSelect={index => {addNote(index)}}
                                    dropdownTextStyle={{fontSize:15}}
                                />
                                <Dialog.Button label="Cancel" onPress={() => {setVisible(false)}} />
                            </Dialog.Container>
                            <TouchableOpacity
                                style={{width:'100%',height:'100%'}}
                                onPress={() => setVisible(true)}
                            >
                                {note == '' || note == undefined?
                                <Text 
                                    style={{width:'100%',height:'100%',textAlignVertical:'top',padding:10,fontSize:15}}
                                >
                                    اضف ملاحظة
                                </Text>
                                :
                                <Text
                                    style={{width:'100%',height:'100%',textAlignVertical:'top',padding:10,fontSize:15,color:'#fff'}}
                                >
                                    {note}
                                </Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </>
                :
                    <>
                        <View>
                            <View style={styles.textButtons}>
                                <Text style={[styles.textStyle,{paddingRight:10}]}>
                                    الملاحظات
                                </Text>
                                {(catNote == undefined) || (catNote == '')?
                                    <TouchableOpacity
                                        onPress={() => addCatNote()}
                                        style={{marginRight:50}}
                                    >
                                        <AntDesign name="addfile" size={30} color="#082032" />
                                    </TouchableOpacity>
                                    :
                                    <>
                                        <TouchableOpacity
                                            onPress={() => deleteNote()}
                                            style={{marginRight:50}}
                                        >
                                            <AntDesign name="delete" size={32} color="#082032" />
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>
                            {(catNote == undefined) || (catNote == '')?
                                <></>
                            :
                                <TouchableOpacity 
                                    style={styles.textContainer}
                                    onPress={editNote}
                                >
                                    <TextInput
                                        readOnly
                                        value={catNote}
                                        multiline
                                        numberOfLines={20}
                                        maxLength={500}
                                        placeholder="لا يوجد"
                                        style={[styles.text,styles.textStyle]}
                                        scrollEnabled={true}
                                    />
                                </TouchableOpacity>
                            }       
                        </View>
                        <View style={styles.container}>
                            <CameraModule></CameraModule>
                        </View>
                    </>
                }
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:width,
        height:100,
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:"#082032"
    },
    noteContainer:{
        flex:1,
        width:width,
        height:100,
        flexDirection:'row',
        borderBottomWidth:1,
        backgroundColor:"#082032"
    },
    textStyle:{
        color:"#082032",
        fontSize:15
    },
    textButtons:{
        flex:1,
        width:width,
        height:50,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    textContainer:{
        flex:1,
        height:300,
        width:width,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    text:{
        height:'90%',
        width:'90%',
        padding: 10,
        color:"#082032",
        borderBottomColor:"#082032",
        textAlignVertical:'top',
        borderWidth:3,
        borderRadius:10
    },
    addAndSubOutterView:{
        inHeight:'100%',
        maxHeight:'100%',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
      },
      addAndSubBtu:{
        height:30,
        width:30,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      addAndSubView:{
        minHeight:30,
        minWidth:30,
        maxHeight:30,
        maxWidth:30,
        borderRadius:15,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#082032",
      },
      scoreView:{
        height:40,
        minWidth:30,
        maxWidth:30,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderColor:"#082032",
        borderWidth:2
      },
      scoreText:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#082032'
      },
      maxGradeView:{
        height:40,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:'#082032',
        borderColor:"#082032",
        borderWidth:2
      },
      maxGradeText:{
        textAlign:'center',
        textAlignVertical:'center',
        fontSize:15,
        color:'#fff',
        fontWeight:'bold'
      },
})