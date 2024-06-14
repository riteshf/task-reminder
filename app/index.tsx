import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Reminder from "@/components/Reminder";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import asyncStorage from "@/utils/AsyncStorage";
import { ReminderType } from "@/constants/types";
import { usePushNotifications } from "@/hooks/usePushNotification";

const HomeScreen = () => {
  const router = useRouter();

  const [reminders, setReminders] = useState<ReminderType[]>([]);
  const { schedulePushNotification } = usePushNotifications();
  const onDelete = async (id: number) => {
    const updatedReminders = reminders.filter((r) => r.id !== id);
    await asyncStorage.setItem("reminders", updatedReminders);
    router.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      const reminders = (await asyncStorage.getItem(
        "reminders"
      )) as ReminderType[];
      setReminders(reminders || []);
      console.log("reminders", reminders);
    };
    getData();
  }, []);

  useEffect(() => {
    schedulePushNotification();
  }, []);

  return (
    <View style={styles.container}>
      {reminders.map((reminder) => (
        <Reminder key={reminder.id} onDelete={onDelete} {...reminder} />
      ))}
      {reminders.length === 0 && (
        <View>
          <Text style={styles.emptyText}>No Reminder for today!</Text>
          <Text style={styles.emptyText2}>It's time to plan your day!</Text>
        </View>
      )}
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/add-reminder",
            });
          }}
          style={[
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "gray",
              borderRadius: 8,
              margin: "auto",
              paddingHorizontal: 30,
              paddingVertical: 10,
            },
          ]}
        >
          <Ionicons name="add" size={36} />
          <Text style={styles.buttonText}>New Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  options: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 30,
  },
  emptyText: {
    fontSize: 36,
    fontWeight: "500",
  },
  emptyText2: {
    fontSize: 30,
    fontWeight: "400",
  },
});

export default HomeScreen;
