import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import ComputerNumber from "../components/ComputerNumber";
import CustomButton from "../components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import ComputerGuess from "../components/ComputerGuess";

let minNumber = 1;
let maxnumber = 100;

export default function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateNumber(1, 100, userNumber);

  const [currentGues, setCurrentGues] = useState(initialGuess);
  const [guessCounts, setGuessCounts] = useState([initialGuess]);

  useEffect(() => {
    if (currentGues === userNumber) {
      onGameOver(guessCounts.length);
    }
  }, [currentGues, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGues < userNumber) ||
      (direction === "greater" && currentGues > userNumber)
    ) {
      Alert.alert("hadi oradan!", "yanlış olduğunu bile bile basıyorsun!", [
        { text: "Tamam", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxnumber = currentGues;
    } else {
      minNumber = currentGues + 1;
    }
    const newRandomNumber = generateNumber(minNumber, maxnumber, currentGues);
    setCurrentGues(newRandomNumber);
    setGuessCounts((prevGues) => [newRandomNumber, ...prevGues]);
  }

  function generateNumber(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude) {
      return randomNumber(min, max, exclude);
    } else {
      return randomNumber;
    }
  }

   return (
    <View style={styles.container}>
    <Title>Bilgisayar Tahmini</Title>
    <ComputerNumber>{currentGues}</ComputerNumber>
    <View style={styles.card}>
      <Text style={styles.title}>Altında mı üstünde mi?</Text>
      <View style={styles.buttonsContainer}>
        <CustomButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <AntDesign name="minus" size={24} color="white" />
        </CustomButton>
        <CustomButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <AntDesign name="plus" size={24} color="white" />
        </CustomButton>
      </View>
    </View>
    <View style={styles.listContainer}>
      <FlatList
        data={guessCounts}
        keyExtractor={(itemData) => itemData}
        renderItem={(itemData) => (
          <ComputerGuess
            roundNumber={guessCounts.length - itemData.index}
            guess={itemData.item}
          />
        )}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: 'orange',
    padding: 16,
    marginTop: 20,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 25,
    marginBottom: 15,
  },
  listContainer:{
    flex:1,
    marginTop:10,
  }
});
