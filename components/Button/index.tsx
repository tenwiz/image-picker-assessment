import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

type ButtonProps = {
  label: string;
  theme?: "primary" | "default";
  onPress?: () => void;
};

export default function Button({
  label,
  theme = "default",
  onPress,
}: ButtonProps) {
  if (theme === "primary") {
    return (
      <View style={styles.primaryButtonContainer}>
        <Pressable style={styles.primaryButton} onPress={onPress}>
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={styles.primaryButtonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress || defaultPressHandler}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const defaultPressHandler = () => alert("You pressed a button.");

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  primaryButtonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderWidth: 4,
    borderRadius: 18,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  primaryButtonLabel: {
    color: "#25292e",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
