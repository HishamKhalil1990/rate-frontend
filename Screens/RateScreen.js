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
import { RadioButton } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as apis from "../apis/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dim = Dimensions.get("window").width * 0.2;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RateScreen({ navigation }) {
  const [username, setUsername] = useState();
  const [warehouse, setWarehouse] = useState();
  const [visit, setVisit] = useState();
  const [checked1, setChecked1] = useState("1");
  const [checked2, setChecked2] = useState("1");
  const [checked3, setChecked3] = useState("1");
  const [checked4, setChecked4] = useState("1");
  const [checked5, setChecked5] = useState("1");
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          setUsername(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  async function submit() {
    alert(username);
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
          <View style={{ width: width, marginLeft: 20 }}>
            <Text style={styles.labelTextUser}>Branch Name</Text>
            <TextInput
              style={styles.inputUser}
              placeholder={"Name"}
              value={warehouse}
              onChangeText={(text) => setWarehouse(text)}
              textAlign={"center"}
              editable={true}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text style={styles.labelTextUser}>Questions</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <Text style={styles.labelTextUser}>yes</Text>
                <Text style={styles.labelTextUser}>no</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 23, color: "#fff" }}>Question 1</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <RadioButton
                  value="1"
                  uncheckedColor="#FFC947"
                  status={checked1 === "1" ? "checked" : "unchecked"}
                  onPress={() => setChecked1("1")}
                />
                <RadioButton
                  value="0"
                  color="white"
                  uncheckedColor="#FFC947"
                  status={checked1 === "0" ? "checked" : "unchecked"}
                  onPress={() => setChecked1("0")}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 23, color: "#fff" }}>Question 2</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <RadioButton
                  value="1"
                  uncheckedColor="#FFC947"
                  status={checked2 === "1" ? "checked" : "unchecked"}
                  onPress={() => setChecked2("1")}
                />
                <RadioButton
                  value="0"
                  color="white"
                  uncheckedColor="#FFC947"
                  status={checked2 === "0" ? "checked" : "unchecked"}
                  onPress={() => setChecked2("0")}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 23, color: "#fff" }}>Question 3</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <RadioButton
                  value="1"
                  uncheckedColor="#FFC947"
                  status={checked3 === "1" ? "checked" : "unchecked"}
                  onPress={() => setChecked3("1")}
                />
                <RadioButton
                  value="0"
                  color="white"
                  uncheckedColor="#FFC947"
                  status={checked3 === "0" ? "checked" : "unchecked"}
                  onPress={() => setChecked3("0")}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 23, color: "#fff" }}>Question 4</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <RadioButton
                  value="1"
                  uncheckedColor="#FFC947"
                  status={checked4 === "1" ? "checked" : "unchecked"}
                  onPress={() => setChecked4("1")}
                />
                <RadioButton
                  value="0"
                  color="white"
                  uncheckedColor="#FFC947"
                  status={checked4 === "0" ? "checked" : "unchecked"}
                  onPress={() => setChecked4("0")}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 23, color: "#fff" }}>Question 5</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "25%",
                }}
              >
                <RadioButton
                  value="1"
                  uncheckedColor="#FFC947"
                  status={checked5 === "1" ? "checked" : "unchecked"}
                  onPress={() => setChecked5("1")}
                />
                <RadioButton
                  value="0"
                  color="white"
                  uncheckedColor="#FFC947"
                  status={checked5 === "0" ? "checked" : "unchecked"}
                  onPress={() => setChecked5("0")}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.loginBtu}
              onPress={() => {
                submit();
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Submit</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
