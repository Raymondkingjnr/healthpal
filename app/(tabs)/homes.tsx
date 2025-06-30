import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { images } from "@/constants/images";
import { categories } from "@/constants/data";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

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
const hospitalData = [
  {
    id: 1,
    image: images.hospital_1,
    title: "sunrise clinic",
    location: "123 Oak Street, CA 98765.",
    km: "2.5 km/40min",
  },
  {
    id: 2,
    image: images.hospital_2,
    title: "Golden Cardiology Center",
    location: "555 Bridge Street, Golden Gate.",
    km: "2.5 km/40min",
  },
  {
    id: 3,
    image: images.hospital_3,
    title: "sunrise clinic",
    location: "123 Oak Street, CA 98765.",
    km: "2.5 km/40min",
  },
];

const Home = () => {
  // const [user, setUser] = React.useState<User>();
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (!error) setProfile(data);
      }
      setLoadingProfile(false);
    };
    fetchProfile();
  }, []);

  if (loadingProfile) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 36 }}
      >
        <View style={styles.flex_between}>
          <Text style={styles.name}>
            {profile ? `Welcome, ${profile?.full_name}` : ""}
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
            paddingBottom: 5,
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
        <View>
          <Animated.FlatList
            data={hospitalData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 15 }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "column",

                  marginTop: 10,
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 300,
                    height: 170,
                    objectFit: "cover",
                    borderRadius: 7,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Spartan_600SemiBold",
                    fontWeight: 600,
                    paddingTop: 10,
                    paddingBottom: 8,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFFF",
    flex: 1,
    paddingHorizontal: 17,
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
    textTransform: "capitalize",
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
    borderRadius: 8,
  },
  carouselItem: {
    width: width,
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
