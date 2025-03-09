import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export default function HelpPage() {
  const navigation = useNavigation();

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the settings page and click on "Change Password". Follow the instructions to reset your password.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support by emailing support@mental4u.com or calling +65 98765432.',
    },
    {
      question: 'Where can I find the privacy policy?',
      answer: 'The privacy policy is available in the settings page under "Privacy Policy".',
    },
    // Add more FAQs as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Help & Support</Text>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>FAQs</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Contact Information</Text>
          <Text style={styles.contactText}>Email: support@mental4u.com</Text>
          <Text style={styles.contactText}>Phone: +65 98765432</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  faqItem: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  answer: {
    fontSize: 16,
    color: Colors.DARK_GREY,
  },
  contactText: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
