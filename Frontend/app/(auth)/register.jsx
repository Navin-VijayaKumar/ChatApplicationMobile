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
} from 'react-native';

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';

const Register = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validateForm()) {
            try {
                const response = await axios.post('http://192.168.84.195:4000/signup', {
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    name: formData.name.trim(),
                    password: formData.password
                });

                if (response.data.success) {
                    Alert.alert('Success', 'Registration successful');
                    router.push('/login');
                } else {
                    Alert.alert('Error', response.data.message || 'Something went wrong');
                }
            } catch (error) {
                Alert.alert('Error', error?.response?.data?.message || 'Registration failed');
            }
        } else {
            Alert.alert('Validation Error', 'Please fix the errors in the form');
        }
    };

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.innerContainer}
            >
                <Text style={styles.title}>Create Account</Text>

                <View style={styles.inputContainer}>
                    {['username', 'email', 'name', 'password', 'confirmPassword'].map((field, idx) => (
                        <View key={idx}>
                            <TextInput
                                style={[styles.input, errors[field] && styles.inputError]}
                                placeholder={
                                    field === 'confirmPassword'
                                        ? 'Confirm Password'
                                        : field.charAt(0).toUpperCase() + field.slice(1)
                                }
                                value={formData[field]}
                                onChangeText={(text) => handleChange(field, text)}
                                autoCapitalize={field === 'email' || field === 'username' ? 'none' : 'words'}
                                keyboardType={field === 'email' ? 'email-address' : 'default'}
                                secureTextEntry={field.toLowerCase().includes('password')}
                            />
                            {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
                    <Text style={styles.loginButtonText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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
    inputError: {
        borderColor: '#ff0000',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },
    registerButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    registerButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        marginTop: 15,
        padding: 10,
    },
    loginButtonText: {
        color: '#007BFF',
        textAlign: 'center',
        fontSize: 14,
    }
});

export default Register;
