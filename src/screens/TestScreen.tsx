import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {Child} from './Child';

export const TestScreen = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() != '') {
      setTasks([...tasks, task]);
    }
    setTask('');
  };

  const removeTask = (ind: number) => {
    const filter = tasks.filter((_, i) => i != ind);
    setTasks(filter);
  };

  const handleUseCallback = useCallback(() => {
    console.log('callvack');
  }, []); // no dependency function stays same

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Child label="Ran" onclick={handleUseCallback}></Child>
        <Text style={styles.text}>Hello worls</Text>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={task}
          onChangeText={setTask}></TextInput>
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Button>Add Task</Button>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <TouchableOpacity
                style={styles.remove}
                onPress={() => removeTask(index)}>
                <Text>Remove</Text>
              </TouchableOpacity>
            </View>
          )}></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, margin: 16},
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 2,
  },
  button: {
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'Blue',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'lightyellow',
    height: 50,
    marginBottom: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  title: {
    height: 50,
    flex: 0.8,
    verticalAlign: 'middle',
    flexWrap: 'wrap',
  },
  remove: {
    flex: 0.2,
    marginLeft: 10,
    // backgroundColor: 'red',
    minWidth: 50,
    alignItems: 'flex-end',
    marginBottom: 'auto',
    marginTop: 'auto',
    justifyContent: 'center',
  },
});
