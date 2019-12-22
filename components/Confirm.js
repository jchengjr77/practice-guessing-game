import React from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";
import Card from "./Card";
import colors from "../constants/colors";

const Confirm = props => {
  return (
    <Modal visible={props.visible} animationType="fade" transparent={false}>
      <View style={styles.confirmContainer}>
        <Card style={styles.confirmCard}>
          <View style={styles.infoContainer}>
            <Text>Confirm Chosen Number:</Text>
            <View style={styles.numberContainer}>
              <Text style={styles.chosenNumber}>{props.chosenNumber}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="No"
              color={colors.secondary}
              onPress={props.onPressNo}
            />
            <Button
              title="Yes"
              color={colors.primary}
              onPress={props.onPressYes}
            />
          </View>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "2%"
  },
  confirmCard: {
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    backgroundColor: "white"
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  numberContainer: {
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  chosenNumber: {
    fontSize: 22,
    fontWeight: "500"
  }
});

export default Confirm;
