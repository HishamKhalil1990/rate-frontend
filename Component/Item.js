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


const width = Dimensions.get("window").width;

export default Item = ({item,cat,changeCatData,setModalVisible,catTotal,catNote,clearNote}) => {
    const [itemData,setItemData] = useState({score:item.score,total:cat.total})
    const [update,setUpdate] = useState(false)

    useEffect(() => {
        if(update){
            setUpdate(false)
            let newCat = cat
            newCat.questions[item.id].score = itemData.score
            newCat.total = itemData.total
            changeCatData(newCat)
        }
    },[update])

    const add = () => {
        let score = itemData.score
        let total = catTotal
        if(score < item.maxGrade){
            score += 1
            total += 1
            const newData = {
                score,
                total
            }
            setItemData({...newData})
            setUpdate(true)
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
            const newData = {
                score,
                total
            }
            setItemData({...newData})
            setUpdate(true)
        }else{
            alert('الحد الادنى للعلامة هو صفر')
        }
    }

    const addNote = () => {
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
                    <View style={styles.container}>
                        <TextInput
                                readOnly
                                value={item.question}
                                multiline
                                numberOfLines={3}
                                style={[styles.textStyle,{width:'60%',height:'100%',textAlignVertical:'top',padding:10}]}
                                scrollEnabled={true}
                        />
                        <View style={styles.addAndSubOutterView}>
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
                        <View style={styles.addAndSubOutterView}>
                            <View style={[styles.maxGradeView,{marginRight:20,marginLeft:20}]}>
                                <Text style={styles.maxGradeText}>
                                    {item.maxGrade}
                                </Text>
                            </View>
                        </View>
                    </View>
                :
                    <View>
                        <View style={styles.textButtons}>
                            <Text style={[styles.textStyle,{paddingRight:10}]}>
                                الملاحظات
                            </Text>
                            {(catNote == undefined) || (catNote == '')?
                                <TouchableOpacity
                                    onPress={() => addNote()}
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
                }
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:width,
        height:100,
        flexDirection:'row-reverse',
        borderBottomWidth:1,
        borderBottomColor:"#082032"
    },
    textStyle:{
        color:"#082032",
        fontSize:15
    },
    textButtons:{
        flex:1,
        width:width,
        height:50,
        flexDirection:'row-reverse',
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
        minWidth:'20%',
        maxWidth:'20%',
        inHeight:'100%',
        maxHeight:'100%',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
      },
      addAndSubBtu:{
        height:20,
        width:20,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
      },
      addAndSubView:{
        minHeight:20,
        minWidth:20,
        maxHeight:20,
        maxWidth:20,
        borderRadius:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#082032",
      },
      scoreView:{
        height:40,
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