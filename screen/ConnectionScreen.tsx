import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
// import { initializeBobAgent, receiveInvitation } from './bobAgent'; // 초기화 및 초대장 수락 함수 임포트
import { initializeBobAgent, receiveInvitation } from '../agent/bobagent.js';

function ConnectionScreen(): JSX.Element {
  const [invitationUrl, setInvitationUrl] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  const handleConnect = async () => {
    try {
      setConnectionStatus('Initializing Bob agent...');
      const bobAgent = await initializeBobAgent();
      setConnectionStatus('Accepting the invitation as Bob...');
      const outOfBandRecord = await receiveInvitation(bobAgent, invitationUrl);
      setConnectionStatus(`Connection completed with ID: ${outOfBandRecord.id}`);
      Alert.alert('Success', 'Connection established successfully!');
    } catch (error) {
      setConnectionStatus('Failed to establish connection.');
      Alert.alert('Error', 'Failed to establish connection. Please check the invitation URL and try again.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to the Connection Screen!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter invitation URL"
        value={invitationUrl}
        onChangeText={setInvitationUrl}
      />
      <Button title="Connect" onPress={handleConnect} />
      {connectionStatus ? <Text style={styles.status}>{connectionStatus}</Text> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  status: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default ConnectionScreen;
