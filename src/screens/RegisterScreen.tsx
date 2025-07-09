import React, {useState} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Button, Card, Title, Text} from 'react-native-paper';
import axios from '../api/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSnackbar} from '../context/SnackbarContext';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  AddMeeting: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {showSnackbar} = useSnackbar();

  const handleRegister = async () => {
    if (!email || !password) {
      showSnackbar('Please fill all fields', 'error');

      return;
    }

    try {
      await axios.post('/auth/register', {
        email,
        password,
      });
      showSnackbar('Registration successful!, Please login now.', 'success');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed:', error);
      showSnackbar('Something went wrong.', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Register</Title>

          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}>
            Register
          </Button>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}
            style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              Already have an account? Login here
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  card: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#0066cc',
    fontSize: 16,
  },
});

export default RegisterScreen;
