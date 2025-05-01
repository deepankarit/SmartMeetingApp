import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useAuth} from './useAuth';
import {useTheme} from './ThemeContext';

const LogScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {user, login, signUp} = useAuth();
  const {theme, toggleTheme} = useTheme();
  const [count, setCount] = useState(0);

  const handleLogin = () => {
    if (user) {
      const success = login(email, password);
      if (success) {
        alert('Login success');
      } else {
        alert('please check credentials');
      }
    } else {
      signUp(email, password);
      alert('Signup success please login!');
    }
    setEmail('');
    setPassword('');
  };

  // Use memo
  const handleUseMemo = useMemo(() => {
    console.log('Computation-----');
    fakeApicall(false)
      .then(response => {
        console.log(response);
        alert(response);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
    return count * 2;
  }, [count]);

  //promis

  function fakeApicall(success: boolean) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (success) {
          resolve('Successfull');
        } else {
          reject('unsuccess');
        }
      }, 2000);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          onChangeText={setEmail}></TextInput>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="password"
          onChangeText={setPassword}></TextInput>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>{user ? 'Login' : 'SignUp'}</Text>
        </TouchableOpacity>
        <View>
          <Text>{theme}</Text>
          <TouchableOpacity style={styles.button} onPress={toggleTheme}>
            <Text>Toggle</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}>
          <Text>UseMemo-Handle + {count}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 16,
    backgroundColor: 'lightblue',
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 12,
  },
});

export default LogScreen;
