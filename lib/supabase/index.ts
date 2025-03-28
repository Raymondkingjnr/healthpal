import { AppState } from "react-native";
import "react-native-url-polyfill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supebaseurl = process.env.EXPO_PUBLIC_PROJECT_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_KEY || "";

export const supabase = createClient(supebaseurl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
