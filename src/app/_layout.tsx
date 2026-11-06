import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Ciel",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="viseur"
        options={{
          title: "Viseur",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="iss"
        options={{
          title: "ISS",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="photo"
        options={{
          title: "Photo",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="image-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="lancements"
        options={{
          title: "Lancements",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}