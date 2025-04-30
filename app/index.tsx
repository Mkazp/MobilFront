import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles } from '../lib/styles';
const StartPage: React.FC = () => {
  const router = useRouter();

  return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/goose.png')}
          style={styles.image}
        />
        <Text style={styles.title}>База знаний</Text>
        <Text style={styles.description}>
          Этот производительный инструмент, разработанный для того, чтобы помочь вам лучше и удобнее управлять своими задачами в рамках учебы
        </Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push('/(tabs)/home')} 
        >
          <Text style={globalStyles.buttonText}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push('/home')} 
        >
          <Text style={globalStyles.buttonText}>Войти</Text>
        </TouchableOpacity>

      </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
    lineHeight: 22,
  },
});

export default StartPage;
