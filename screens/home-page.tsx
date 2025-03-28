import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";

const HomePage = () => {
  return (
    <SafeAreaView>
      <ImageBackground source={images.splash} />
    </SafeAreaView>
  );
};

export default HomePage;
