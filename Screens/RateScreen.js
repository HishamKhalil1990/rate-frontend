import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as apis from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator,CardStyleInterpolators, } from "@react-navigation/stack";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import SwipeableFlatList from 'react-native-swipeable-list'
import DialogInput from 'react-native-dialog-input';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import Loader from '../Component/Loader'
import Slider from "../Component/Slider";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Stack = createStackNavigator();

export default function RateScreen({ navigation, route }) {
  const [username, setUsername] = useState(route.params.username);
  const [loading, setLoading] = useState(false);
  const [fetcheddata, setFetchedData] = useState(route.params.data)
  const [ratedata, setRateData] = useState()
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [branchOpen, setBranchOpen] = useState(false);
  const [branchValue, setBranchValue] = useState(null);
  const [branch, setBranch] = useState([]);
  const [noOfemployee, setNoOfemployee] = useState(1);
  const [names, setNames] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateEmployee, setUpdateEmployee] = useState({})
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if(fetcheddata !== undefined){
      branchesList(fetcheddata.branches)
      setRateData(fetcheddata.categories)
    }else{
      newAtempt()
    }
  }, []);

  const clear = () => {
    setBranchValue(null)
    setDate(new Date())
    setDatePicker(false)
    setTimePicker(new Date(Date.now()))
    setTimePicker(false)
    setNoOfemployee(1)
    setNames([])
  }

  useEffect(() => {
    clear()
  }, [fetcheddata]);

  const branchesList = (fetchedBranches) => {
    const branches = fetchedBranches.map((branch,index) => {
      return {
        key:index, 
        label:branch,
        value: branch,
      }
    })
    setBranch([...branches])
  }

  async function logOut(){
    Alert.alert(
      'Logout',
      'هل انت متأكد من الخروج ؟',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            AsyncStorage.clear();
            navigation.navigate("Login");
          },
        },
      ],
      {cancelable: false},
    );
  }

  const goToRateInfo = () => {
    if(branchValue == null){
      alert('الرجاء اختيار فرع')
    }else if(names.length < noOfemployee){
      alert('الرجاء تعبئة اسماء الموظفين كاملة')
    }else{
      navigation.navigate("RateInfo")
    }
  }

  const newAtempt = async () => {
    if(errMsg != ''){
      setErrMsg('')
    }
    setLoading(true)
    const data = await apis.getRateTemplatesData(username)
    if(data){
      setLoading(false)
      if (data.status == "success") {
        branchesList(data.data.branches)
        setRateData([...data.data.categories])
        setFetchedData({...data.data})
      }else{
        setErrMsg(data.msg)
        setRateData([...fetcheddata.categories])
        setFetchedData({...fetcheddata})
      }
    }else{
      setLoading(false)
      setErrMsg('لم يتم تحديث قائمة الفروع')
      setRateData([...fetcheddata.categories])
      setFetchedData({...fetcheddata})
    }
  }

  const showDatePicker = () => {
    setDatePicker(true);
  };
 
  const showTimePicker = () => {
    setTimePicker(true);
  };

  const onDateSelected = (event, value) => {
    setDatePicker(false);
    setDate(value);
  };
 
  const onTimeSelected = (event, value) => {
    setTimePicker(false);
    setTime(value);
  };

  const getTimeFormat = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const add = () => {
    let no = noOfemployee
    no += 1
    setNoOfemployee(no)
  }

  const sub = () => {
    let no = noOfemployee
    no -= 1
    if(no < 1){
      no = 1
      alert('عدد الموظفين ينبغي ان يكون اكثر من واحد')
    }else if(no < names.length){
      alert('الاسماء المدخلة يجب ان تساوي عدد الموظفين')
    }else{
      setNoOfemployee(no)
    }
  }

  const Item = ({item, backgroundColor, textColor, deleteItem}) => {
    return (
      <>
        <View style={styles.item}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={30} color="black" />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </View>
        <View />
      </>
    );
  };

  const extractItemKey = (item) => {
    return item.id.toString();
  };

  const deleteItem = (itemId) => {
    let allNames = [...names];
    allNames = allNames.filter(item => item.id !== itemId);
    setNames(allNames);
  };

  const editItem = (item) => {
    setUpdateEmployee(item)
    setVisible(true);
  }

  const saveUpdatedName = (newName) => {
    let allNames = [...names];
    allNames = allNames.map(item => {
      if(item.id == updateEmployee.id){
        item.name = newName
        setUpdateEmployee({})
      }
      return item
    });
    setVisible(false);
    setNames(allNames);
  }

  const QuickActions = (index, item) => {
    return (
      <View style={styles.qaContainer}>
        <View style={[styles.button, styles.button1]}>
          <TouchableOpacity onPress={() => editItem(item)}>
            <Feather name="edit" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={[styles.button, styles.button2]}>
          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <MaterialIcons name="delete" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItemSeparator = ()=> {
    return <View style={styles.itemSeparator} />;
  }

  const VisitInfoScreen = () => {

    const [inputName, setInputName] = useState("");

    const addName = () => {
      let allNames = [...names]
      if(inputName != ""){
        if(allNames.length < noOfemployee){
          const newName = {
            name:inputName,
            id:allNames.length + 1
          }
          allNames.push(newName)
          setNames(allNames)
        }else{
          alert('عدد الاسماء المدخلة اكثر من عدد الموظفين!')
        }
      }else{
        alert('الرجاء ادخال اسم الموظف اولا!')
      }
    }

    return (
        <View
          style={styles.screen}
        >
          <Loader loading={loading} />
          <KeyboardAvoidingView enabled>
            <View style={[styles.itemOutterView,{marginTop:10,zIndex:50}]}>
              <View>
                <Text style={styles.itemtextView}>
                  Branch
                </Text>
              </View>
              <DropDownPicker
                itemKey="key"
                searchable={true}
                open={branchOpen}
                value={branchValue}
                items={branch}
                setOpen={setBranchOpen}
                setValue={setBranchValue}
                setItems={setBranch}
                placeholder="Select Branch"
                containerStyle={{height: 50}}
                autoScroll={true}
                listMode="FLATLIST"
                zIndex={3000}
              />
              {errMsg != ''?
                <Text style={{color:'red',textAlign:'center',width:0.8*width,fontWeight:'bold',padding:5}}>{errMsg}</Text>
              :
                <></>
              }
            </View>
            <View style={styles.dateOutterView}>
              <View style={styles.dataInnerView}>
                <View>
                  <Text style={styles.itemtextView}>
                    Date
                  </Text>
                </View>
                <View style={styles.itemInputView}>
                  <View style={{width:'60%'}}>
                    <Text style={styles.dateAndTime}>
                     {date.toLocaleDateString('en-GB')}
                    </Text>
                  </View>
                  <View style={{width:'40%'}}>
                    <TouchableOpacity 
                      style={styles.dateAndTimeBtu}
                      onPress={showDatePicker}
                    >
                      <Entypo name="calendar" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.dataInnerView}>
                <View>
                  <Text style={styles.itemtextView}>
                    Time
                  </Text>
                </View>
                <View style={styles.itemInputView}>
                <View style={{width:'60%'}}>
                    <Text style={styles.dateAndTime}>
                     {getTimeFormat(time)}
                    </Text>
                  </View>
                  <View style={{width:'40%'}}>
                    <TouchableOpacity 
                      style={styles.dateAndTimeBtu}
                      onPress={showTimePicker}
                    >
                      <FontAwesome5 name="clock" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.itemOutterView}>
              <View>
                <Text style={styles.itemtextView}>
                  No. of Employees
                </Text>
              </View>
              <View style={styles.addAndSubOutterView}>
                <TouchableOpacity 
                  style={styles.addAndSubBtu}
                  onPress={add}
                >
                  <View style={styles.addAndSubView}>
                    <FontAwesome5 name="plus" size={24} color="black" />
                  </View>
                </TouchableOpacity>
                <View style={styles.noOfemployeeView}>
                  <Text style={styles.noOfemployeeText}>
                    {noOfemployee}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.addAndSubBtu}
                  onPress={sub}
                >
                  <View style={styles.addAndSubView}>
                  <MaterialCommunityIcons name="minus-thick" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemOutterView}>
              <View>
                <Text style={styles.itemtextView}>
                  Employees Names
                </Text>
              </View>
              <View style={styles.employeeInputView}>
                <TextInput 
                  style={styles.employeeInput}
                  placeholder={"Employee Name"}
                  value={inputName}
                  onChangeText={text => setInputName(text)}
                  textAlign={"left"}
                  editable={true}
                />
                <View style={{width:'20%'}}>
                  <TouchableOpacity 
                    style={styles.dateAndTimeBtu}
                    onPress={addName}
                  >
                    <Octicons name="person-add" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {datePicker && (
              <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
              />
            )}
            {timePicker && (
              <DateTimePicker
                value={time}
                mode={'time'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={false}
                onChange={onTimeSelected}
                style={styles.datePicker}
              />
            )}
          </KeyboardAvoidingView>
          <View>
            <DialogInput isDialogVisible={visible}
                title={"تعديل الاسماء"}
                message={"الرجاء تعديل اسم الموظف"}
                initValueTextInput ={updateEmployee.name}
                submitText={"UPDATE"}
                submitInput={ (inputText) => {saveUpdatedName(inputText)} }
                closeDialog={ () => {setVisible(false)}}>
            </DialogInput>
          </View>
          <SwipeableFlatList
            keyExtractor={extractItemKey}
            data={names}
            renderItem={({item}) => (
              <Item item={item} deleteItem={() => deleteItem} />
            )}
            maxSwipeDistance={160}
            renderQuickActions={({index, item}) => QuickActions(index, item)}
            shouldBounceOnMount={true}
            ItemSeparatorComponent={renderItemSeparator}
          />
        </View>
      )
  }

  const changeData = (catData,sent) => {
    if(!sent){
      setRateData([...catData])
    }else{
      newAtempt()
    }
  }

  const RateInfoScreen = () => {
    return (
      <View
        style={styles.screen}
      >
        <Slider data={ratedata} changeData={changeData} username={username} branchValue={branchValue} time={time} date={date} names={names}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1}}>   
      <Stack.Navigator
          initialRouteName="VisitInfo"
          screenOptions={{
            headerShown: true,
            gestureEnabled: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: "#082032",
              borderBottomColor:"#fff",
              borderBottomWidth:2
            },
            headerTitleStyle: {
              textAlign: 'center',
            },
            headerTintColor:'#fff',
            headerLeftContainerStyle:{
              marginTop:-30,
              flex:1,
              justifyContent: 'center',
              paddingLeft:10
            },
            headerRightContainerStyle:{
              marginTop:-30,
              flex:1,
              justifyContent: 'center',
              paddingRight:10
            },
            headerTitleContainerStyle:{
              marginTop:-30,
              flex:1,
              justifyContent: 'center',
            }
          }}
        >
        <Stack.Screen 
          name="VisitInfo" component={VisitInfoScreen}
          options={{
            headerTitle: () => (
              <TouchableOpacity
                onPress={() => newAtempt()}
                style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
              >
                <Fontisto name="spinner-refresh" size={30} color="#fff" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goToRateInfo()}
                style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
                <Text style={{color:'#fff',fontSize:15}}>
                  {`Next `}
                </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => logOut()}
                style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
              >
                <Text style={{color:'#fff',fontSize:15}}>
                  {`Logout `}
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="RateInfo"
          options={{
            title:'Rate',
            gestureDirection: "horizontal-inverted",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerLeft: () => (
              <View></View>
              // <TouchableOpacity
              //   onPress={() => {}}
              //   style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
              // >
              //   {/* <MaterialIcons name="arrow-back-ios" size={24} color="#fff" /> */}
              //   <Text style={{color:'#fff',fontSize:15}}>
              //     {`Submit`}
              //   </Text>
              // </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("VisitInfo")
                }}
                style={{flex:1,flexDirection:'row',justifyContent:"center",alignItems:'center'}}
              >
                <Text style={{color:'#fff',fontSize:15}}>
                  {`Back `}
                </Text>
                <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
              </TouchableOpacity>
            ),
          }}
          component={RateInfoScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}


const darkColors = {
  background: '#121212',
  primary: '#BB86FC',
  primary2: '#3700b3',
  secondary: '#03DAC6',
  onBackground: '#FFFFFF',
  error: '#CF6679',
};

const colorEmphasis = {
  high: 0.87,
  medium: 0.6,
  disabled: 0.38,
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "relative",
    width: "100%",
  },
  loading: {
    position: "absolute",
    top: height * 0.15,
    height: height * 0.3,
    left: "10%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    zIndex: 3,
  },
  loadingInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  screen: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#082032",
  },
  itemOutterView:{
    width:0.85*width,
    maxHeight:70,
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginBottom:40
  },
  itemtextView:{
    marginBottom:10,
    fontSize:15,
    color:'#fff'
  },
  itemInputView:{
    flex:1,
    flexDirection:'row',
    minHeight:50,
    maxHeight:50,
    width:'100%',
    backgroundColor:'#fff',
    borderRadius:10
  },
  dateAndTime:{
    height:50,
    textAlignVertical:'center',
    paddingLeft:5
  },
  dateOutterView:{
    width:0.85*width,
    maxHeight:70,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    marginBottom:40,
  },
  dateAndTimeBtu:{
    height:50,
    width:'100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  dataInnerView:{
    minWidth:0.4*width,
    maxWidth:0.4*width,
    maxHeight:70,
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginBottom:40,
  },
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },
  addAndSubOutterView:{
    width:0.85*width,
    maxHeight:50,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  addAndSubBtu:{
    height:50,
    width:50,
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
    backgroundColor:'#fff'
  },
  noOfemployeeView:{
    height:50,
    maxWidth:50,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'#fff'
  },
  noOfemployeeText:{
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:25,
    fontWeight:'bold'
  },
  employeeInputView:{
    width:0.85*width,
    minHeight:50,
    borderRadius:10,
    flex:1,
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  employeeInput:{
    width:'80%',
    height:50,
    paddingLeft:5,
  },
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  container: {
    backgroundColor: '#121212',
  },
  headerContainer: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '800',
    color: darkColors.onBackground,
    opacity: colorEmphasis.high,
  },
  item: {
    backgroundColor: '#fff',
    height: 80,
    flexDirection: 'row',
    padding: 10,
    width:width
  },
  messageContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start'
  },
  name: {
    fontSize: 16,
    color: 'black',
    opacity: colorEmphasis.high,
    fontWeight: '800',
    paddingLeft:10
  },
  text: {
    fontSize: 10,
    color: darkColors.onBackground,
    opacity: colorEmphasis.medium,
  },
  avatar: {
    maxWidth: 50,
    maxHeight: 50,
    minWidth: 50,
    minHeight: 50,
    backgroundColor: darkColors.onBackground,
    opacity: colorEmphasis.high,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 7,
    alignSelf: 'center',
    shadowColor: darkColors.secondary,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: colorEmphasis.high,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
    opacity: colorEmphasis.medium,
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1:{
    backgroundColor:'lightgray'
  },
  button2:{
    backgroundColor:'red'
  },
});
