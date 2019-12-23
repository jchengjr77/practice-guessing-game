import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const configNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    if (guessRounds <= 0) {
      content = (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      );
    } else {
      // guessRounds is greater than zero
      content = (
        <GameOverScreen
          rounds={guessRounds}
          userNum={userNumber}
          resetGame={configNewGameHandler}
        />
      );
    }
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
