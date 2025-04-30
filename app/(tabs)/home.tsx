import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../lib/UserContext';
import { useSubjects } from '../../lib/SubjectContext';

export default function HomeScreen() {
  const { user } = useUser();
  const { subjects } = useSubjects();

  const recentCourses = subjects.slice(0, 3);
  const viewedCourses = subjects.filter(sub => sub.favorite);

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : require('../../assets/images/avatar.jpg')
            }
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Добро пожаловать!</Text>
          <Text style={styles.name}>
            {user?.firstName || ''} {user?.lastName || ''}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Вы смотрели</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            {viewedCourses.map((course, index) => (
              <View
                key={course.id}
                style={[
                  styles.courseCard,
                  index === 0 && styles.firstCardMarginLeft,
                ]}
              >
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseType}>({course.type})</Text>
                <Text style={styles.courseTime}>Добавлены темы: {course.topics.length}</Text>
                {course.favorite && (
                  <Ionicons name="star" size={20} color="#3D76F7" style={styles.starIcon} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Последние обновления</Text>
          {recentCourses.map(course => (
            <View key={course.id} style={[styles.courseCard, course.favorite && styles.highlight]}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseType}>({course.type})</Text>
              <Text style={styles.courseTime}>Добавлены темы: {course.topics.length}</Text>
              <Ionicons
                name={course.favorite ? 'star' : 'star-outline'}
                size={20}
                color="#3D76F7"
                style={styles.starIcon}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  horizontalScrollContainer: {
    paddingRight: 1,
  },
  firstCardMarginLeft: {
    marginLeft: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  courseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    marginBottom: 12,
    minWidth: 220,
    position: 'relative',
  },
  highlight: {
    backgroundColor: 'rgba(61, 118, 247, 0.15)',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  courseType: {
    fontSize: 14,
    color: '#555',
  },
  courseTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  starIcon: {
    position: 'absolute',
    top: 50,
    right: 12,
  },
});
