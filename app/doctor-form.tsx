import { useState } from "react";
import {
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import DocumentPicker from "expo-document-picker";
import { FileObject } from "@supabase/storage-js";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import ImagePicker from "expo-image-picker";

const DoctorForm = () => {
  const [profile, setProfile] = useState<any>(null);
  const [doctorForm, setDoctorForm] = useState({
    medical_field: "",
    license_number: "",
    license_document: "",
    years_experience: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleDoctorRegister = async () => {
    setSubmitting(true);
    // You may want to add validation here
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("doctors").insert([
      {
        id: user?.id ?? "",
        medical_field: doctorForm.medical_field,
        license_number: doctorForm.license_number,
        license_document_url: doctorForm.license_document,
        years_of_experience: doctorForm.years_experience,
        is_verified: false,
      },
    ]);
    if (!error) {
      // Update profile to is_doctor = true
      await supabase
        .from("profiles")
        .update({ is_doctor: true })
        .eq("id", user?.id);
      setProfile({ ...profile, is_doctor: true });

      Alert.alert("Success", "Doctor registration submitted!");
    } else {
      Alert.alert("Error", error.message);
    }
    setSubmitting(false);
  };

  const documentPick = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register as a Doctor</Text>
            <TextInput
              style={styles.input}
              placeholder="Medical Field"
              value={doctorForm.medical_field}
              onChangeText={(t) =>
                setDoctorForm((f) => ({ ...f, medical_field: t }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="License Number"
              value={doctorForm.license_number}
              onChangeText={(t) =>
                setDoctorForm((f) => ({ ...f, license_number: t }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              keyboardType="numeric"
              value={doctorForm.years_experience}
              onChangeText={(t) =>
                setDoctorForm((f) => ({ ...f, years_experience: t }))
              }
            />

            {/* <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Pressable style={styles.uploadBtn} onPress={handlePickDocument}>
                <Text style={styles.uploadBtnText}>Upload File</Text>
              </Pressable>
              {doctorForm.license_document ? (
                <Text style={{ color: 'green', fontSize: 13 }}>Uploaded</Text>
              ) : null}
            </View> */}
            <TextInput
              style={styles.input}
              placeholder="License Document URL"
              value={doctorForm.license_document}
              onChangeText={(t) =>
                setDoctorForm((f) => ({ ...f, license_document: t }))
              }
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Pressable
                style={styles.submitBtn}
                onPress={handleDoctorRegister}
                disabled={submitting}
              >
                <Text style={styles.submitBtnText}>
                  {submitting ? "Submitting..." : "Submit"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorForm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", marginTop: 24, marginBottom: 16 },
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
    fontFamily: "Spartan_600SemiBold",
    height: 50,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: "#1C2A3A",
    borderRadius: 8,
    height: 45,
    textAlignVertical: "center",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Spartan_600SemiBold",
  },
  uploadBtn: {
    backgroundColor: "#1C2A3A",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  uploadBtnText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Spartan_600SemiBold",
  },
});
