import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';

type Topic = {
  id: string;
  title: string;
  content: string;
};

type Subject = {
  id: string;
  title: string;
  type: string;
  favorite: boolean;
  topics: Topic[];
};

type Props = {
  subject: Subject;
  onToggleFavorite: (id: string) => void;
  onAddTopic: (subjectId: string, topic: Topic) => void;
};

export default function SubjectCard({ subject, onToggleFavorite, onAddTopic }: Props) {
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const router = useRouter();

  const handleAddTopic = () => {
    if (newTopicTitle.trim()) {
      const topic: Topic = {
        id: uuidv4(),
        title: newTopicTitle.trim(),
        content: 'Контент пока не добавлен',
      };
      onAddTopic(subject.id, topic);
      setNewTopicTitle('');
    } else {
      Alert.alert('Введите название темы');
    }
  };

  const handleTopicPress = (topicId: string) => {
    router.push(`/subjects/${subject.id}/${topicId}`);
  };

  const handleCardPress = () => {
    router.push(`/subjects/${subject.id}`);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{subject.title}</Text>
            <Text style={styles.type}>({subject.type})</Text>
          </View>
          <TouchableOpacity onPress={() => onToggleFavorite(subject.id)}>
            <Ionicons
              name={subject.favorite ? 'star' : 'star-outline'}
              size={24}
              color="#3D76F7"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.topicSection}>
          <Text style={styles.topicTitle}>Темы:</Text>
          {subject.topics.length === 0 ? (
            <Text style={styles.noTopics}>Нет добавленных тем</Text>
          ) : (
            subject.topics.map((topic) => (
              <TouchableOpacity key={topic.id} onPress={() => handleTopicPress(topic.id)}>
                <Text style={styles.topicItem}>• {topic.title}</Text>
              </TouchableOpacity>
            ))
          )}

          <View style={styles.addTopicContainer}>
            <TextInput
              value={newTopicTitle}
              onChangeText={setNewTopicTitle}
              placeholder="Новая тема"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleAddTopic} style={styles.addButton}>
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  type: {
    fontSize: 14,
    color: '#555',
  },
  topicSection: {
    marginTop: 12,
  },
  topicTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  noTopics: {
    color: '#888',
    fontStyle: 'italic',
  },
  topicItem: {
    color: '#000',
    marginTop: 4,
  },
  addTopicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#3D76F7',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
});
