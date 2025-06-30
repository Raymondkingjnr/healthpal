import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Spartan_500Medium,
  Spartan_600SemiBold,
  useFonts,
} from "@expo-google-fonts/spartan";
import { icons } from "@/constants/icons";

const menuItems = [
  { label: "Edit Profile", icon: "👤" },
  { label: "Favorite", icon: "🤍" },
  { label: "Notifications", icon: "🔔" },
  { label: "Settings", icon: "⚙️" },
  { label: "Help and Support", icon: "💬" },
  { label: "Terms and Conditions", icon: "📄" },
];

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    Spartan_500Medium,
    Spartan_600SemiBold,
  });

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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!fontsLoaded && !fontError) return null;
  if (loadingProfile) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.header}>
          <Image
            source={
              profile?.avatar_url ? { uri: profile.avatar_url } : icons.icon
            }
            style={styles.avatar}
          />
          <Pressable style={styles.editAvatar}>
            <Text style={{ fontSize: 18 }}>✏️</Text>
          </Pressable>
          <Text style={styles.name}>{profile?.full_name || "-"}</Text>
          {profile?.phone && <Text style={styles.phone}>{profile.phone}</Text>}
        </View>
        <View style={styles.menuList}>
          {menuItems.map((item, idx) => (
            <Pressable key={item.label} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>{">"}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={[styles.menuLabel, { color: "#E53935" }]}>
              Log Out
            </Text>
          </Pressable>
        </View>
        {!profile?.is_doctor && (
          <Pressable
            style={styles.doctorBtn}
            onPress={() => router.push("/doctor-form")}
          >
            <Text style={styles.doctorBtnText}>Register as a Doctor</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", marginTop: 24, marginBottom: 16 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  editAvatar: {
    position: "absolute",
    right: 110,
    top: 80,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontSize: 22,
    fontFamily: "Spartan_600SemiBold",
    marginTop: 16,
    textTransform: "capitalize",
  },
  phone: { color: "#888", fontSize: 15, marginTop: 4 },
  menuList: { marginTop: 24, backgroundColor: "#fff" },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIcon: { fontSize: 20, width: 32 },
  menuLabel: { flex: 1, fontSize: 16, fontFamily: "Spartan_500Medium" },
  menuChevron: { fontSize: 18, color: "#B0B0B0" },
  doctorBtn: {
    backgroundColor: "#1C2A3A",
    margin: 24,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  doctorBtnText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Spartan_600SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Spartan_600SemiBold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    fontSize: 16,
  },
  cancelBtn: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelBtnText: { color: "#1C2A3A", fontSize: 16 },
  submitBtn: {
    backgroundColor: "#1C2A3A",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  submitBtnText: { color: "#fff", fontSize: 16 },
  uploadBtn: {
    backgroundColor: "#1C2A3A",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  uploadBtnText: { color: "#fff", fontSize: 15 },
});

export default Profile;
