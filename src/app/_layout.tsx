import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Ciel" }} />
      <Tabs.Screen name="viseur" options={{ title: "Viseur" }} />
      <Tabs.Screen name="iss" options={{ title: "ISS" }} />
      <Tabs.Screen name="photo" options={{ title: "Photo" }} />
      <Tabs.Screen name="lancements" options={{ title: "Lancements" }} />
    </Tabs>
  );
}