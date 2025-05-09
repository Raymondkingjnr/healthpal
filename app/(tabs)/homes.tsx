import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { images } from "@/constants/images";
import { categories } from "@/constants/data";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  Spartan_300Light,
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_600SemiBold,
} from "@expo-google-fonts/spartan";

const { width } = Dimensions.get("window");

const carouselData = [
  {
    id: 1,
    image: images.carousel_1,
    title: "Looking for Specialist Doctors?",
    subtitle: "Schedule an appointment with our top doctors.",
  },
  {
    id: 2,
    image: images.carousel_1,
    title: "Need Emergency Care?",
    subtitle: "Our emergency department is open 24/7.",
  },
  {
    id: 3,
    image: images.carousel_1,
    title: "Quality Healthcare",
    subtitle: "Experience world-class medical services.",
  },
];

const Home = () => {
  const [user, setUser] = React.useState<User>();
  const scrollX = useSharedValue(0);

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data?.user);
      }
    };
    fetchUser();
  }, []);

  function getFirstName(email: string | undefined) {
    if (!email) return "User";
    const namePart = email.split("@")[0];
    const firstName = namePart.split(".")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const CarouselItem = ({
    item,
    index,
  }: {
    item: { image: any; title: string; subtitle: string };
    index: number;
  }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.8, 1, 0.8]
      );
      const opacity = interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.5, 1, 0.5]
      );
      return {
        transform: [{ scale }],
        opacity,
      };
    });

    return (
      <Animated.View style={[styles.carouselItem, animatedStyle]}>
        <ImageBackground
          source={item.image}
          resizeMethod="auto"
          style={styles.carouselImage}
        >
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
        </ImageBackground>
      </Animated.View>
    );
  };

  const PaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {carouselData.map((_, index) => {
          const dotStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.8, 1.4, 0.8],
              "clamp"
            );
            const opacity = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0.3, 1, 0.3],
              "clamp"
            );
            return {
              transform: [{ scale }],
              opacity,
            };
          });

          return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.flex_between}>
        <Text style={styles.name}>
          {user ? `Welcome, ${getFirstName(user.email)}` : "Loading user..."}
        </Text>
        <EvilIcons
          name="bell"
          size={35}
          color="black"
          style={{
            fontWeight: "700",
          }}
        />
      </View>

      <View style={styles.relativeform}>
        <TextInput
          style={styles.input}
          placeholder="Search Doctor"
          placeholderTextColor="#9CA3AF"
          autoCapitalize={"none"}
        />
        <EvilIcons
          style={styles.icon}
          name="search"
          size={30}
          color="#D1D5DB"
        />
      </View>

      <View style={styles.carouselContainer}>
        <Animated.FlatList
          data={carouselData}
          renderItem={({ item, index }) => (
            <CarouselItem item={item} index={index} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
        <PaginationDots />
      </View>

      <View style={{ paddingTop: 30 }}>
        <Text style={[styles.categories]}>Categories</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 10,
          // alignContent: "center",
          // alignItems: "center",
          paddingBottom: 5,
          // marginBottom: 10,
          marginTop: 15,
        }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image source={item.image} style={{ marginBottom: 10 }} />
            <Text
              className=" truncate w-[100px]"
              style={[styles.text, styles.truncatText]}
            >
              {item.name.length > 10
                ? `${item.name.substring(0, 8)}...`
                : item.name}
            </Text>
          </View>
        )}
      />
      <View
        style={{
          paddingTop: 40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[styles.categories]}>Nearby Medical Centers</Text>
        <Text
          style={{
            fontFamily: "Spartan_600SemiBold",
            fontWeight: 400,
            fontSize: 15,
          }}
        >
          See All
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFFF",
    display: "flex",
    flexDirection: "column",
    // height: "100%",
    paddingHorizontal: 10,
    fontFamily: "Spartan_600SemiBold",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Spartan_500Medium",
  },
  truncatText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  name: {
    fontFamily: "Spartan_600SemiBold",
    paddingTop: 7,
  },
  input: {
    color: "#1C2A3A",
    fontFamily: "Spartan_600SemiBold",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    height: 45,
    borderRadius: 7,
    fontSize: 18,
    paddingLeft: 40,
    width: "100%",
    fontWeight: "500",
  },
  relativeform: {
    position: "relative",
    width: "100%",
    marginTop: 10,
  },
  icon: {
    position: "absolute",
    bottom: 11,
    left: 5,
  },
  flex_between: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  categories: {
    fontWeight: "700",
    fontFamily: "Spartan_600SemiBold",
    fontSize: 18,
  },
  carouselContainer: {
    height: 182,
    marginTop: 20,
    position: "relative",
  },
  carouselItem: {
    width: width - 20,
    height: 182,
  },
  carouselImage: {
    width: "auto",
    borderRadius: 10,
    height: 200,
    paddingTop: 40,
    paddingLeft: 10,
  },
  carouselTitle: {
    fontFamily: "Spartan_600SemiBold",
    fontSize: 25,
    fontWeight: "500",
    width: 270,
    color: "#ffff",
    lineHeight: 40,
  },
  carouselSubtitle: {
    fontFamily: "Spartan_500Medium",
    fontSize: 15,
    fontWeight: "400",
    width: 220,
    color: "#ffff",
    paddingTop: 10,
    lineHeight: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 10,
    left: 150,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffff",
    marginHorizontal: 4,
  },
});

export default Home;
