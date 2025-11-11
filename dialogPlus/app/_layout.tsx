import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'ICONIC Dialog+' }} />
      <Stack.Screen name="client" options={{ title: 'service user' }} />
      <Stack.Screen name="prevsession" />
      <Stack.Screen name="newsession" options={{ title: 'new session' }} />
      <Stack.Screen name="review" />
      <Stack.Screen name="discuss" />
    </Stack>
  );
}
