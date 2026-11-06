import { Stack } from "expo-router";

export default function PhotoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Photos de la NASA" }} />
      <Stack.Screen name="[date]" options={{ title: "Détail" }} />
    </Stack>
  );
}