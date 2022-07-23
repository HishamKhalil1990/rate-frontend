import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import * as apis from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dim = Dimensions.get("window").width * 0.2;
const height = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);

  function showPassword(value) {
    setShowPass(value);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          navigation.navigate("Rate");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  async function submit() {
    if (user && pass) {
      if (user.length > 0 && pass.length > 0) {
        setLoading(true);
        const password = await apis.getUser(user);
        if (password) {
          setLoading(false);
          if (password == pass) {
            const storeData = async () => {
              try {
                await AsyncStorage.setItem("username", user);
                setUser("");
                setPass("");
                navigation.navigate("Rate");
              } catch (e) {
                console.log(e);
              }
            };
            storeData();
          } else {
            alert("Invalid Username or Password");
          }
        }
      } else {
        alert("fill all fields");
      }
    } else {
      alert("fill all fields");
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.screen}>
          <View style={styles.loadingContainer}>
            {loading ? (
              <View style={styles.loading}>
                <View style={styles.loadingInner}>
                  {spinner ? (
                    <ActivityIndicator size="large" color="#082032" />
                  ) : (
                    <View>Done</View>
                  )}
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          {/* <Image style={styles.image} source={require("../img/logo.png")} /> */}
          <View style={styles.userView}>
            <FontAwesome name="user-circle" size={dim * 0.85} color="black" />
          </View>
          <Text style={styles.labelTextUser}>USER NAME</Text>
          <TextInput
            style={styles.inputUser}
            placeholder={"Username"}
            value={user}
            onChangeText={(text) => setUser(text)}
            textAlign={"center"}
            editable={true}
          />
          <Text style={styles.labelTextPass}>PASSWORD</Text>
          <TextInput
            style={styles.inputPass}
            placeholder={"password"}
            value={pass}
            onChangeText={(text) => setPass(text)}
            textAlign={"center"}
            secureTextEntry={!showPass}
          />
          <TouchableOpacity
            style={styles.boxView}
            onPress={() => showPassword(!showPass)}
          >
            <Checkbox
              value={showPass}
              onValueChange={showPassword}
              style={styles.checkbox}
              color={{ true: "#fff" }}
            />
            <Text style={styles.boxText}>SHOW PASSWORD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtu}
            onPress={() => {
              submit();
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#082032",
  },
  image: {
    height: 100,
    width: 100,
    opacity: 1,
    marginTop: 70,
  },
  userView: {
    marginTop: 35,
    height: dim,
    width: dim,
    borderRadius: dim * 0.5,
    borderColor: "#FFC947",
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  labelTextUser: {
    marginTop: 30,
    fontSize: 23,
    color: "#fff",
    marginBottom: 5,
  },
  inputUser: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#FFC947",
    color: "black",
    width: "80%",
  },
  labelTextPass: {
    marginTop: 10,
    fontSize: 23,
    color: "#fff",
    marginBottom: 5,
  },
  inputPass: {
    height: 40,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 20,
    backgroundColor: "#FFC947",
    color: "black",
    width: "80%",
    marginBottom: 10,
  },
  boxView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
  },
  checkbox: {
    marginRight: 10,
    borderColor: "#fff",
  },
  boxText: {
    fontSize: 15,
    color: "#fff",
    marginRight: 10,
  },
  loginBtu: {
    height: 40,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#FFC947",
    marginBottom: 20,
  },
  lastView: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  btu: {
    height: 40,
    padding: 10,
    width: "45%",
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#FFC947",
  },
});
