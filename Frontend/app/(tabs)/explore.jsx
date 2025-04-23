import { Text,StyleSheet, Image, Platform } from 'react-native';


export default function TabTwoScreen() {
  return (
    <>
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Welcome to the Explore Screen</Text>
    <Text style={{ fontSize: 16, marginBottom: 20 }}>This is the main screen of the app.</Text>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
