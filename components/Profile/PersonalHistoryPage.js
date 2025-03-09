import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';
import { Colors } from '@/constants/Colors';

export default function PersonalHistoryPage() {
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const fetchMoodHistory = async () => {
    const { data, error } = await supabase
      .from('mood')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching mood history:', error);
    } else {
      setMoodHistory(data);
    }
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
        <Text style={styles.header}>Personal History</Text>
        {moodHistory.length > 0 && (
          <>
            <View style={styles.historyContainer}>
              <Text style={styles.header}>Mood History</Text>
              <View style={styles.historyItems}>{renderHistory()}</View>
            </View>
            <View style={styles.historyContainer}>
              <Text style={styles.header}>Mood Percentages</Text>
              <Text>Happy: {moodPercentages.Happy.toFixed(2)}%</Text>
              <Text>Sad: {moodPercentages.Sad.toFixed(2)}%</Text>
              <Text>Angry: {moodPercentages.Angry.toFixed(2)}%</Text>
              <Text>Stressed: {moodPercentages.Stressed.toFixed(2)}%</Text>
            </View>
          </>
        )}
        {moodHistory.length === 0 && (
          <Text>No mood history recorded yet.</Text>
        )}
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  historyContainer: {
    marginTop: 20,
    alignItems: 'center',
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
