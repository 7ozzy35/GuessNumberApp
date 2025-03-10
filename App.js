import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import GameStartScreen from "./screens/GameStartScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";


export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOVer, setGameIsOVer] = useState(true);
  const [guessCounts, setguessCounts] = useState(0)

  function startNewGameHandler(){
    setUserNumber(null);
    setguessCounts(0);
  };

  function sendedNumberHandler(sendedNumber) {
    console.log(sendedNumber);
    setUserNumber(sendedNumber);
    setGameIsOVer(false);
  }

  function gameOVerHandler(numberOfGuess){
    setGameIsOVer(true);
    setguessCounts(numberOfGuess);
  }

  let screen = <GameStartScreen onSendNumber={sendedNumberHandler} />;

  if (userNumber) {
    screen = <GameScreen  userNumber={userNumber} onGameOver={gameOVerHandler}/>;
  }
  if(gameIsOVer && userNumber){
    screen = <GameOverScreen roundsNumber={guessCounts} userNumber={userNumber} onStartNewGame={startNewGameHandler}  />;
  }
  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.8)", "transparent"]}
      style={styles.container}
    >
      <ImageBackground
        style={styles.container}
        source={require("./assets/back.jpg")}
        imageStyle={styles.backImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage: {
    opacity: 0.4,
  },
});
