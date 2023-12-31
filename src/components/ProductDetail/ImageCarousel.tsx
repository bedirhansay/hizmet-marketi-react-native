import { Image, View, Dimensions, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";

export const ImageCarousel = ({ images }: { images: string[] }) => {
  const { height, width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.viewableItems.length > 0) {
      setActiveIndex(viewableItems.viewableItems[0].index || 0);
    }
  });
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: height * 0.25,
        backgroundColor: "white",
        paddingTop: 15,
      }}
    >
      <FlatList
        data={images}
        style={{ width: width * 0.5, height: height * 0.18 }}
        renderItem={(item) => (
          <Image
            source={{ uri: item.item }}
            style={{
              width: width * 0.5,
              height: height * 0.21,
              resizeMode: "stretch",
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.5}
        snapToAlignment={"center"}
        decelerationRate={"fast"}
        viewabilityConfig={viewConfigRef.current}
        onViewableItemsChanged={onViewRef.current}
      ></FlatList>
      <View style={styles.dots}>
        {images?.map((image, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? "#5D3EBD" : "#F2F0FD",
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  dots: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 5,
  },
});
