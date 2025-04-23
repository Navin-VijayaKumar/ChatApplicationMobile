import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

const AuthStack = createNativeStackNavigator();

const AuthLayout = () => {


    return (
<Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
</Stack>    
);
};

export default AuthLayout;