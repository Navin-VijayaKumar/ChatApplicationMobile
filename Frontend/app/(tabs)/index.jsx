import { Image, StyleSheet, Platform,Text } from 'react-native';


export default function HomeScreen() {
  return (
    <>
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome to the Home Screen</Text>
    <Text style={{ fontSize: 16, marginBottom: 20 }}>This is the main screen of the app.</Text>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
