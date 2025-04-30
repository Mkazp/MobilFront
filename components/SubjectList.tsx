import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSubjects } from '../lib/SubjectContext';  // Путь к вашему контексту
import SubjectCard from '../components/SubjectCard'; // Путь к компоненту карточки

const SubjectList = () => {
  const { subjects, toggleFavorite, addTopic } = useSubjects(); // Получаем данные и функции из контекста

  return (
    <FlatList
      data={subjects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SubjectCard
          subject={item}
          onToggleFavorite={toggleFavorite}
          onAddTopic={addTopic}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  // Ваши стили, если они есть
});

export default SubjectList;
