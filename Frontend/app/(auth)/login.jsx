import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native'

import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import axios from'axios';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        axios.post('http://192.168.84.195:4000/login', {
            email,
            password
        }).then((res) => {
            console.log(res.data)
            if (res.data.token) {  // Check for token instead of status
               
                router.push('/(tabs)')
            } else {
                Alert.alert('Login Failed', 'Invalid credentials or something went wrong');
            }
        }).catch((err) => {
            console.log(err)
            Alert.alert('Login Error', err?.response?.data?.message || 'An error occurred. Please try again.');
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.innerContainer}
            >
                <Text style={styles.title}>Welcome Back</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={() => router.push('/register')}
                >
                    <Text style={styles.registerButtonText}>
                        Don't have an account? Register
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        gap: 15,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 15,
        padding: 10,
    },
    registerButtonText: {
        color: '#007BFF',
        textAlign: 'center',
        fontSize: 14,
    }
})

export default Login