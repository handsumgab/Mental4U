import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';

export default function ProgressPage() {
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodClick = (selectedMood) => {
    const currentDate = new Date().toLocaleDateString();
    const updatedHistory = [...moodHistory, { mood: selectedMood, date: currentDate }];
    setMoodHistory(updatedHistory);
    setMood(selectedMood);
  };

  const calculateMoodPercentages = () => {
    const moodCounts = {
      Happy: 0,
      Sad: 0,
      Angry: 0,
      Stressed: 0,
    };

    moodHistory.forEach(item => {
      moodCounts[item.mood]++;
    });

    const totalCount = moodHistory.length;

    return {
      Happy: totalCount === 0 ? 0 : (moodCounts.Happy / totalCount) * 100,
      Sad: totalCount === 0 ? 0 : (moodCounts.Sad / totalCount) * 100,
      Angry: totalCount === 0 ? 0 : (moodCounts.Angry / totalCount) * 100,
      Stressed: totalCount === 0 ? 0 : (moodCounts.Stressed / totalCount) * 100,
    };
  };

  const renderHistory = () => {
    return moodHistory.map((item, index) => (
      <View key={index} style={styles.historyItem}>
        <Text>{item.date}</Text>
        <Text>{item.mood}</Text>
      </View>
    ));
  };

  const moodPercentages = calculateMoodPercentages();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Progress Page</Text>
        <View style={styles.moodBubble}>
          <Text style={styles.moodText}>{mood ? `You are feeling ${mood}` : 'How are you feeling today?'}</Text>
        </View>
        <View style={styles.moodButtonsContainer}>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodClick('Happy')}>
            <Text style={styles.moodButtonText}>Happy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodClick('Sad')}>
            <Text style={styles.moodButtonText}>Sad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodClick('Angry')}>
            <Text style={styles.moodButtonText}>Angry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodClick('Stressed')}>
            <Text style={styles.moodButtonText}>Stressed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyButtonText}>History</Text>
        </TouchableOpacity>
        <View style={styles.historyContainer}>
          {moodHistory.length > 0 && (
            <View>
              <Text style={styles.header}>Mood History</Text>
              <View style={styles.historyItems}>{renderHistory()}</View>
            </View>
          )}
          {moodHistory.length > 0 && (
            <View>
              <Text style={styles.header}>Mood Percentages (Last Month)</Text>
              <Text>Happy: {moodPercentages.Happy.toFixed(2)}%</Text>
              <Text>Sad: {moodPercentages.Sad.toFixed(2)}%</Text>
              <Text>Angry: {moodPercentages.Angry.toFixed(2)}%</Text>
              <Text>Stressed: {moodPercentages.Stressed.toFixed(2)}%</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.BLACK,
    marginBottom: 20,
  },
  moodBubble: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  moodText: {
    fontSize: 18,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  moodButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  moodButton: {
    width: '40%',
    backgroundColor: '#ADD8E6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  moodButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  historyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  historyItems: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
  },
});
