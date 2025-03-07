import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

// API URL
const API_URL = 'http://10.0.2.2:8000'; // Use this for Android emulator
// const API_URL = 'http://localhost:8000'; // Use this for iOS simulator

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/alldays`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      Alert.alert('Error', 'Could not fetch notes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content for your note');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/create`, {
        content,
        rating,
      });
      
      setContent('');
      setRating(3);
      await fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
      Alert.alert('Error', 'Could not add note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNote = (id, content, rating) => {
    setEditingId(id);
    setContent(content);
    setRating(rating);
  };

  const handleUpdateNote = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content for your note');
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`${API_URL}/update/${editingId}`, {
        content,
        rating,
      });
      
      setContent('');
      setRating(3);
      setEditingId(null);
      await fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
      Alert.alert('Error', 'Could not update note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await axios.delete(`${API_URL}/delete/${id}`);
              await fetchNotes();
            } catch (error) {
              console.error('Error deleting note:', error);
              Alert.alert('Error', 'Could not delete note');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteDate}>{formatDate(item.date)}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{item.rating}/5</Text>
        </View>
      </View>
      
      <Text style={styles.noteContent}>{item.content}</Text>
      
      <View style={styles.noteActions}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]} 
          onPress={() => handleEditNote(item.id, item.content, item.rating)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => handleDeleteNote(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Make My Day</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="How was your day?"
          value={content}
          onChangeText={setContent}
          multiline
        />
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating:</Text>
          <Picker
            selectedValue={rating}
            style={styles.picker}
            onValueChange={(value) => setRating(value)}
          >
            <Picker.Item label="1 - Poor" value={1} />
            <Picker.Item label="2 - Fair" value={2} />
            <Picker.Item label="3 - Good" value={3} />
            <Picker.Item label="4 - Great" value={4} />
            <Picker.Item label="5 - Excellent" value={5} />
          </Picker>
        </View>
        
        {editingId ? (
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]} 
            onPress={handleUpdateNote}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Updating...' : 'Update Note'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.addButton]} 
            onPress={handleAddNote}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Adding...' : 'Add Note'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No notes yet. Start by adding one!
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#4caf50',
  },
  saveButton: {
    backgroundColor: '#2196f3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  noteCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noteDate: {
    color: '#666',
    fontSize: 14,
  },
  ratingBadge: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 30,
  },
});