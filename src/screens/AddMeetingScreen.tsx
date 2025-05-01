import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Card, Title, Text} from 'react-native-paper';
import axios from '../api/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSnackbar} from '../context/SnackbarContext';

const formatDate = (date: Date) => {
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  AddMeeting: undefined;
};

type AddMeetingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddMeeting'
>;

const AddMeetingScreen = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [participants, setParticipants] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const navigation = useNavigation<AddMeetingScreenNavigationProp>();
  const onPressSelectDate = () => setShowDatePicker(true);
  const {showSnackbar} = useSnackbar();

  const onPressSelectTime = () => setShowTimePicker(true);

  const handleAddMeeting = async () => {
    if (!title || !notes || !date || !participants) {
      showSnackbar('Please fill all fields', 'error');
      return;
    }

    try {
      await axios.post('/meetings', {
        title,
        notes,
        meetingTime: date.toISOString(), // save in ISO format
        participants: participants.split(',').map(p => p.trim()),
      });

      showSnackbar('Meeting added successfully!', 'success');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to add meeting:', error);
      showSnackbar('Failed to add meeting. Try again.', 'error');
    }
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(prev => {
        const newDate = new Date(prev);
        newDate.setFullYear(selectedDate.getFullYear());
        newDate.setMonth(selectedDate.getMonth());
        newDate.setDate(selectedDate.getDate());
        return newDate;
      });
    }
  };
  const onChangeTime = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDate(prev => {
        const newDate = new Date(prev);
        newDate.setHours(selectedTime.getHours());
        newDate.setMinutes(selectedTime.getMinutes());
        return newDate;
      });
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add New Meeting</Title>

          <TextInput
            label="Meeting Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            label="Meeting Notes"
            mode="outlined"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
          />

          <TouchableOpacity onPress={onPressSelectDate}>
            <TextInput
              label="Meeting Date"
              mode="outlined"
              value={formatDate(date)}
              editable={false}
              style={styles.input}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressSelectTime}>
            <TextInput
              label="Meeting Time"
              mode="outlined"
              value={formatTime(date)}
              editable={false}
              style={styles.input}
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeTime}
            />
          )}

          <TextInput
            label="Participants (comma separated)"
            mode="outlined"
            value={participants}
            onChangeText={setParticipants}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleAddMeeting}
            style={styles.button}>
            Add Meeting
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
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
});

export default AddMeetingScreen;
