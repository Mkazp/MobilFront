import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useSubjects } from '../../../lib/SubjectContext'; // Путь к контексту

const SubjectDetail = ({ params }: any) => {
  const { subjects } = useSubjects(); // Получаем данные предметов из контекста
  const router = useRouter();
  const subjectId = params.id; // Получаем ID предмета из маршрута

  // Находим предмет по ID
  const subject = subjects.find((subj) => subj.id === subjectId);

  if (!subject) {
    return (
      <View style={styles.container}>
        <Text>Предмет не найден</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject.title}</Text>
      <Text style={styles.type}>Тип: {subject.type}</Text>
      <Text style={styles.topicTitle}>Темы:</Text>
      <Text style={styles.topicTitle}>Темы:</Text>
        {subject.topics.length === 0 ? (
          <Text style={styles.noTopics}>Нет добавленных тем</Text>
        ) : (
          subject.topics.map((topic) => (
            <Text key={topic.id} style={styles.topicItem}>• {topic.title}</Text>
          ))
        )}
      <Button title="Назад" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 16,
    color: '#555',
  },
  topicTitle: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  topicItem: {
    marginTop: 8,
  },
  noTopics: {
    color: '#888',
    fontStyle: 'italic',
  },
});

export default SubjectDetail;
