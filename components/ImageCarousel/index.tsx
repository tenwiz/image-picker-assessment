import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

const { width } = Dimensions.get("window");
const height = (width * 14) / 20;

type ImageCarouselProps = {
  images: string[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeInd, setActiveInd] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    let inter: NodeJS.Timeout;

    inter = setInterval(() => {
      const newInd = (activeInd + 1) % images.length;
      setActiveInd(newInd);
      scrollViewRef.current?.scrollTo({ x: newInd * width, animated: true });
    }, 4000);

    return () => clearInterval(inter);
  }, [activeInd]);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveInd(newIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: "#25292e",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    paddingTop: 58,
    width,
    height,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width,
    height,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
