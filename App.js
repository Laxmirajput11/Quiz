import { Dimensions, FlatList, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useState, useRef } from 'react';
import { englishData } from './src/EnglishQuestions'; // Ensure this import is correct
import QuestionItem from './QuestionItem';

const { height, width } = Dimensions.get('window');

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start with the first question (index 0)
  const [questions, setQuestions] = useState(englishData);
  const [score, setScore] = useState(0);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);

  const OnSelectOption = (index, selectedOption) => {
    const updatedQuestions = questions.map((question, ind) => {
      if (index === ind) {
        return { ...question, marked: selectedOption };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    questions.forEach(question => {
      if (question.marked === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
  };

  if (!englishData || !Array.isArray(englishData)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>
          English Questions data is not available.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
        }}>
        Questions: {currentIndex + 1} / {englishData.length}
      </Text>
      <View style={{ marginTop: 30 }}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x / width;
            setCurrentIndex(Math.round(x));
          }}
          data={questions}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                data={item}
                selectedOption={selectedOption => {
                  OnSelectOption(index, selectedOption);
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'orange',
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (currentIndex > 0) {
              listRef.current.scrollToIndex({
                animated: true,
                index: currentIndex - 1,
              });
            }
          }}>
          <Text style={{ color: '#000' }}>Previous</Text>
        </TouchableOpacity>
        {currentIndex === questions.length - 1 ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              calculateScore();
              setModalVisible(true);
            }}>
            <Text style={{ color: '#000' }}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              height: 50,
              width: 100,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (currentIndex < questions.length - 1) {
                listRef.current.scrollToIndex({
                  animated: true,
                  index: currentIndex + 1,
                });
              }
            }}>
            <Text style={{ color: '#000' }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              height: 200,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Your Score</Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>You scored {score} out of {questions.length}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'gray',
                padding: 10,
                borderRadius: 5,
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
