import React, {useEffect, useState, useContext, version} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import {Card, Title, Paragraph, Button, Text} from 'react-native-paper';
import axios from '../api/axiosInstance';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {useSnackbar} from '../context/SnackbarContext';
// import SmartMeetingInfoModule from 'native_modules/SmartMeetingInfoModule.flow';

interface Meeting {
  id: number;
  title: string;
  meetingTime: string;
  participants: string[];
  notes: string;
  aiSummary: string;
}

const DashboardScreen = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext);
  const {showSnackbar} = useSnackbar();
  const [appInfo, setAppInfo] = useState({version: '', env: '', appName: ''});

  // useEffect(() => {
  //   const version = SmartMeetingInfoModule.getAppVersion();
  //   const appName = SmartMeetingInfoModule.getAppName();
  //   const env = SmartMeetingInfoModule.getEnvironment();
  //   setAppInfo({version, env, appName});
  // }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('/meetings');
      setMeetings(response.data);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMeetings();
    }, []),
  );

  const handleSummarize = async (meetingId: number) => {
    try {
      await axios.post(`/meetings/${meetingId}/summarize`);
      showSnackbar('Meeting summarized!');
      fetchMeetings(); // Refresh list after summarizing
    } catch (error) {
      console.error('Failed to summarize meeting:', error);
      showSnackbar('Failed to summarize meeting.');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>My Meetings</Title>
        <Button mode="outlined" onPress={handleLogout}>
          Logout
        </Button>
      </View>

      <View style={styles.appDetailView}>
        <Text>App name: {appInfo.appName}</Text>
        <Text> Version: {appInfo.version}</Text>
        <Text>Environment: {appInfo.env}</Text>
      </View>
      <FlatList
        data={meetings}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>
                {new Date(item.meetingTime).toLocaleString()}
              </Paragraph>
              <Paragraph>
                Participants: {item.participants.join(', ')}
              </Paragraph>
              {item.aiSummary ? (
                <Paragraph style={styles.summary}>
                  Summary: {item.aiSummary}
                </Paragraph>
              ) : (
                <Paragraph style={styles.summaryPending}>
                  Summary pending...
                </Paragraph>
              )}
            </Card.Content>
            {!item.aiSummary && (
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => handleSummarize(item.id)}>
                  Summarize
                </Button>
              </Card.Actions>
            )}
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.noMeetings}>No meetings found. Add one!</Text>
        }
      />

      <Button
        mode="contained"
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMeeting' as never)}>
        Add New Meeting
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    elevation: 3,
  },
  summary: {
    marginTop: 8,
    fontStyle: 'italic',
    color: 'green',
  },
  summaryPending: {
    marginTop: 8,
    fontStyle: 'italic',
    color: 'orange',
  },
  addButton: {
    marginTop: 16,
  },
  noMeetings: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  appDetailView: {
    flexDirection: 'column',
  },
});

export default DashboardScreen;
