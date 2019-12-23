import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of rounds: {props.rounds}</Text>
      <Text>Target number was: {props.userNum}</Text>
      <Button title="New Game" onPress={props.resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default GameOverScreen;
