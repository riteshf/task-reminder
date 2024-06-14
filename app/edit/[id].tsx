import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Button from "@/components/Button";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { useLocalSearchParams, useRouter } from "expo-router";

const EditReminderScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [title, setTitle] = useState("");

  const editReminder = async () => {
    const reminders =
      ((await asyncStorage.getItem("reminders")) as ReminderType[]) || [];
    const reminderId = Number(id);
    const newReminders: ReminderType[] = reminders.reduce(
      (acc: ReminderType[], crr) => {
        if (crr.id === reminderId) {
          crr.title = title;
        }
        acc.push(crr);
        return acc;
      },
      []
    );
    await asyncStorage.setItem("reminders", newReminders);
    router.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      const reminderId = Number(id);
      const reminders =
        ((await asyncStorage.getItem("reminders")) as ReminderType[]) || [];

      const reminder = reminders.find((r) => r.id === reminderId);
      setTitle(reminder!.title);
    };
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.textInput}
      />
      <Button
        title="Edit Reminder"
        onPress={editReminder}
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

export default EditReminderScreen;
