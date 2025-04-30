import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useSubjects } from '../../../../lib/SubjectContext';

export default function TopicScreen() {
  const { subjectId, topicId } = useLocalSearchParams();
  const { subjects } = useSubjects();

  const subject = subjects.find(s => s.id === subjectId);
  const topic = subject?.topics.find(t => t.id === topicId);

  if (!subject || !topic) {
    return (
      <View style={styles.container}>
        <Text>Тема не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{topic.title}</Text>
      <Text style={styles.content}>{topic.content || 'Нет содержимого'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  content: { marginTop: 12, fontSize: 16 },
});