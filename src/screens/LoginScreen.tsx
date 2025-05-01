import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from 'react-native-paper';
import axios from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSnackbar} from '../context/SnackbarContext';
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  AddMeeting: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const {showSnackbar} = useSnackbar();

  const handleLogin = async () => {
    if (!email || !password) {
      showSnackbar('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        await AsyncStorage.setItem('token', token);
        login(token);
        navigation.replace('Dashboard');
        showSnackbar('Login successful!');
      } else {
        showSnackbar('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Login error', error);
      showSnackbar('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Smart Meeting Assistant</Title>

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
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={loading}
            disabled={loading}>
            Login
          </Button>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register' as never)}
            style={styles.registerLink}>
            <Text style={styles.registerLinkText}>
              Don't have an account? Register here
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
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  registerLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  registerLinkText: {
    color: '#0066cc',
    fontSize: 16,
  },
});

export default LoginScreen;
