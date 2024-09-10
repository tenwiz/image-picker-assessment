import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Button from "./components/Button/index";
import ImageCarousel from "./components/ImageCarousel/index";

const PlaceholderImage1 = Image.resolveAssetSource(
  require("./assets/images/1.jpg")
).uri;
const PlaceholderImage2 = Image.resolveAssetSource(
  require("./assets/images/2.jpg")
).uri;
const PlaceholderImage3 = Image.resolveAssetSource(
  require("./assets/images/3.jpg")
).uri;
const PlaceholderImage4 = Image.resolveAssetSource(
  require("./assets/images/4.jpg")
).uri;

export default function App() {
  const [selectedImages, setSelectedImages] = useState<string[]>([
    PlaceholderImage1,
    PlaceholderImage2,
    PlaceholderImage3,
    PlaceholderImage4,
  ]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      const images = result.selected.map((item) => item.uri);
      setSelectedImages([...images]);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Assessment</Text>
        <View style={styles.imageContainer}>
          <ImageCarousel images={selectedImages} />
        </View>
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Select Photos"
            onPress={pickImageAsync}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    padding: 32,
  },
  heading: {
    fontSize: 42,
    color: "#FFF",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
