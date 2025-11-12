import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'ICONIC aDialog+' }} />
      <Stack.Screen name="client" options={{ title: 'service user' }} />
      <Stack.Screen name="prevsession" options={{ title: 'previous session' }} />
      <Stack.Screen name="newsession" options={{ title: 'new session' }} />
      <Stack.Screen name="review" />
      <Stack.Screen name="discuss" />
    </Stack>
  );
}
