import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data?.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.home}>
      <Text style={styles.text}>Home</Text>
      <Text>{user ? `Welcome, ${user.email}` : "Loading user..."}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#FFFF",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 40,
  },
});
