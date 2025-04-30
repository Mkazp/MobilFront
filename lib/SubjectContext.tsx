import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Topic = {
  id: string;
  title: string;
  content?: string;
};

export type Subject = {
  id: string;
  title: string;
  type: string;
  favorite: boolean;
  topics: Topic[];
};

type SubjectsContextType = {
  subjects: Subject[];
  toggleFavorite: (id: string) => void;
  addTopic: (id: string, topic: Topic) => void;
};

const SubjectsContext = createContext<SubjectsContextType | undefined>(undefined);

export const SubjectsProvider = ({ children }: { children: ReactNode }) => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      title: 'Backend-разработка',
      type: 'Практические',
      favorite: true,
      topics: [
        { id: '1', title: 'Express.js', content: 'Express — это фреймворк для Node.js' },
        { id: '2', title: 'Node.js', content: 'Node.js — среда выполнения JavaScript' },
      ],
    },
    {
      id: '2',
      title: 'Дизайн взаимодействия и эргономика',
      type: 'Лекционные',
      favorite: false,
      topics: [],
    },
    {
      id: '3',
      title: 'Мобильная разработка',
      type: 'Лекционные',
      favorite: false,
      topics: [
        { id: '3', title: 'React Native', content: 'React Native — это фреймворк для мобильной разработки.' },
      ],
    },
  ]);

  const toggleFavorite = (id: string) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === id ? { ...subject, favorite: !subject.favorite } : subject
      )
    );
  };

  const addTopic = (id: string, topic: Topic) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === id
          ? {
              ...subject,
              topics: subject.topics.find(t => t.id === topic.id)
                ? subject.topics
                : [...subject.topics, topic],
            }
          : subject
      )
    );
  };

  return (
    <SubjectsContext.Provider value={{ subjects, toggleFavorite, addTopic }}>
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = () => {
  const context = useContext(SubjectsContext);
  if (!context) {
    throw new Error('useSubjects must be used within a SubjectsProvider');
  }
  return context;
};