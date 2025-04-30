import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import SubjectCard from '../../components/SubjectCard'; // Вернем обратно SubjectCard
import { useSubjects } from '../../lib/SubjectContext';

export default function SubjectsScreen() {
  const { subjects, toggleFavorite, addTopic } = useSubjects();

  useEffect(() => {
    console.log('Subjects:', subjects); // Выводим список предметов в консоль
  }, [subjects]);

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onToggleFavorite={toggleFavorite}
            onAddTopic={addTopic}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 60 },
});
