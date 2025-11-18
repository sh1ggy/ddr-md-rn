import { Stack, useGlobalSearchParams } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function SongLayout() {
  const { name } = useGlobalSearchParams();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Song List",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: String(name ?? "Song Details"),
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
