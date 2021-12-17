import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableHighlight,
} from "react-native";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Axios from "axios";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [text, setText] = useState("");
  const [todos, settodos] = useState([]);
  const [precommands, setprecommands] = useState([]);
  const todosCollectionRef = collection(db, "precommands");

  const fetchText = async () => {
    console.log("clicked");
    const data = await getDocs(todosCollectionRef);
    // console.log("data: ", data);
    settodos(
      data.docs.map(
        (doc) => (
          console.log("doc: ", doc.data()), { ...doc.data(), id: doc.id }
        )
      )
    );
  };

  const makeTodo = async () => {
    await addDoc(todosCollectionRef, { cmd: text });
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const fetchPreCommands = async () => {
    const precommands = await getDocs(todosCollectionRef);

    setprecommands(
      precommands.docs.map(
        (doc) => (
          console.log("doc: ", doc.data()), { ...doc.data(), id: doc.id }
        )
      )
    );
  };

  const onPress = () => {};

  useEffect(() => {
    fetchPreCommands();
  }, []);

  return (
    <SafeAreaView style={styles.containerMain}>
      <SafeAreaView style={styles.container1}>
        <Text style={styles.output}>Command Output Here</Text>
      </SafeAreaView>

      <SafeAreaView style={styles.container2}>
        <Text>Hello React Native!</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.textInput}
          placeholder="Type a Command to execute on terminal"
          onChangeText={(text) => setText(text)}
          defaultValue={""}
        />
        {/* <TextInput onChangeText={handleChangeText} /> */}
        {todos &&
          todos.map((todo) => {
            return <Text key={todo.id}>{todo.todo}</Text>;
          })}
        <View style={{ margin: 10 }}>
          <Button title="Make todo" style={styles.button} onPress={makeTodo} />
        </View>

        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#9b36c9",
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    flex: 1,
    backgroundColor: "#a2a82d",
  },
  containerMain: {
    flex: 1,
    // flexDirection: "column",
  },
  textInput: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
  },
  button: {
    // margin: 10,
    padding: 10,
    backgroundColor: "#DDDDDD",
  },
  output:{
    top: 20,
  }
});
