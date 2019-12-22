import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import Confirm from "../components/Confirm";
import colors from "../constants/colors";

const StartScreen = props => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const inputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNum = parseInt(enteredValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid Number!", "Number has to be between 1 and 99.", [
        { text: "OK", style: "destructive", onPress: resetInputHandler }
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  const confirmCancelHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
    setSelectedNumber();
  };

  const confirmContinueHandler = () => {
    console.log("Going with chosen number: " + selectedNumber);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={2}
            onChangeText={inputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="RESET"
                onPress={resetInputHandler}
                color={colors.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="CONFIRM"
                onPress={confirmInputHandler}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        <Confirm
          visible={confirmed}
          chosenNumber={selectedNumber}
          onPressNo={confirmCancelHandler}
          onPressYes={() => props.onStartGame(selectedNumber)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  title: {
    fontSize: 30,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center"
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  button: {
    width: 100
  }
});

export default StartScreen;
