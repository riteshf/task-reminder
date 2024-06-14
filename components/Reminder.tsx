import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  id: number;
  title: string;
  onDelete: (id: number) => void;
};

const Reminder = ({ id, title, onDelete }: Props) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.reminder}>{title}</Text>
      <View style={styles.options}>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/edit/[id]",
              params: { id: id },
            });
          }}
          style={[
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
            },
          ]}
        >
          <Ionicons name="pencil-sharp" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={[
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
            },
          ]}
        >
          <Ionicons name="trash-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskItem: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  reminder: {
    color: "black",
    fontSize: 34,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap:20,
  },
});

export default Reminder;
