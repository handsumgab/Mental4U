import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import supabase from '../../supabaseClient';
import { Colors } from '@/constants/Colors';

export default function RegistrationPage({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [name, email, password]);

    const validateForm = () => {
        let errors = {};

        if (!name) {
            errors.name = 'Name is required.';
        }

        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }

        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = async () => {
        if (isFormValid) {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    }
                }
            });
            if (error) {
                console.log('Registration error:', error.message);
            } else {
                console.log('Registration successful:', user);
                navigation.navigate('tabHome');
            }
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableHighlight
                style={[styles.inputbtn, { opacity: isFormValid ? 1 : 0.5 }]}
                disabled={!isFormValid}
                onPress={handleSubmit}
                underlayColor="white">
                <Text style={styles.buttonText}>Register</Text>
            </TouchableHighlight>
            {Object.values(errors).map((error, index) => (
                <Text key={index} style={styles.error}>
                    {error}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF6666',
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: '10%',
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
    },
    inputbtn: {
        height: '10%',
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
