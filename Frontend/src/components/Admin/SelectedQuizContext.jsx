import { createContext, useState, useContext, useEffect } from 'react';

const SelectedQuizContext = createContext();

export const SelectedQuizProvider = ({ children }) => {
  const [selectedQuiz, setSelectedQuizState] = useState(null);

  // Load from localStorage when component mounts
  useEffect(() => {
    const savedQuiz = localStorage.getItem('selectedQuiz');
    if (savedQuiz) {
      setSelectedQuizState(savedQuiz);
    }
  }, []);

  // Save to localStorage whenever quiz changes
  const setSelectedQuiz = (quiz) => {
    setSelectedQuizState(quiz);
    localStorage.setItem('selectedQuiz', quiz);
  };

  return (
    <SelectedQuizContext.Provider value={{ selectedQuiz, setSelectedQuiz }}>
      {children}
    </SelectedQuizContext.Provider>
  );
};

export const useSelectedQuiz = () => useContext(SelectedQuizContext);
