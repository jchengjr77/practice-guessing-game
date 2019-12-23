import React, { useState, useRef, useEffect } from "react";
import { View, Button, Text, StyleSheet, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import { getCurrentFrame } from "expo/build/AR";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  var num = Math.random() * (max - min) + min;
  num = Math.floor(num);
  if (num === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return num;
};

const GameScreen = props => {
  const [currGuess, setCurrGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);

  const currLow = useRef(1);
  const currHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
  }, [currGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (direction === "lower") {
      if (props.userChoice > currGuess) {
        Alert.alert("Wrong bounds", "Hey... Don't cheat the computer", [
          { text: "Alrighty", style: "cancel" }
        ]);
        return;
      } else {
        currHigh.current = currGuess;
      }
    } else if (direction === "higher") {
      if (props.userChoice < currGuess) {
        Alert.alert("Wrong bounds", "Hey... Don't cheat the computer", [
          { text: "Alrighty", style: "cancel" }
        ]);
        return;
      } else {
        currLow.current = currGuess;
      }
    }
    const nextNum = generateRandomBetween(
      currLow.current,
      currHigh.current,
      currGuess
    );
    setCurrGuess(nextNum);
    setRounds(currRounds => currRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="Lower" onPress={() => nextGuessHandler("lower")} />
        <Button title="Higher" onPress={() => nextGuessHandler("higher")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  }
});

export default GameScreen;
