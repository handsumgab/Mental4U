import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import supabase from '../../supabaseClient';
import { Colors } from '@/constants/Colors';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [email, password]);

    const validateForm = () => {
        let errors = {};

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
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                console.log('Login error:', error.message);
            } else {
                const user = data.user;
                if (user) {
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (profileError && profileError.code !== 'PGRST116') {
                        console.log('Profile fetching error:', profileError.message);
                    } else if (!profile) {
                        const { error: createProfileError } = await supabase
                            .from('profiles')
                            .insert([{ id: user.id, email }]);

                        if (createProfileError) {
                            console.log('Profile creation error:', createProfileError.message);
                        }
                    }

                    navigation.navigate('tabHome');
                } else {
                    console.log('User object is undefined after sign in.');
                }
            }
        } else {
            console.log('Form has errors. Please correct them.');
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('RegistrationPage');
    };

    return (
        <View style={styles.container}>
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
                <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            {Object.values(errors).map((error, index) => (
                <Text key={index} style={styles.error}>
                    {error}
                </Text>
            ))}
            <TouchableHighlight
                style={styles.inputbtn}
                onPress={navigateToRegister}
                underlayColor="white">
                <Text style={styles.buttonText}>Register</Text>
            </TouchableHighlight>
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
