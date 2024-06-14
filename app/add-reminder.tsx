import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Button from "@/components/Button";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { useRouter } from "expo-router";

const AddReminderScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const addReminder = async () => {
    const reminders =
      ((await asyncStorage.getItem("reminders")) as ReminderType[]) || [];

    const newReminders: ReminderType[] = [
      ...reminders,
      { id: Date.now(), title },
    ];
    await asyncStorage.setItem("reminders", newReminders);
    router.push("/");
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.textInput}
      />
      <Button
        title="Add Reminder"
        onPress={addReminder}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
  },
});

export default AddReminderScreen;
