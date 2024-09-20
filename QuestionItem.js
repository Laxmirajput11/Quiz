import {View, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

const {height, width} = Dimensions.get('window');

const QuestionItem = ({data, selectedOption}) => {
  return (
    <View style={{width, padding: 20, backgroundColor: '#f8f8f8'}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '700',
          color: '#333',
          marginBottom: 20,
        }}>
        {'Q: ' + data.question}
      </Text>
      <FlatList
        data={data.Options}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                elevation: 5,
                backgroundColor: data.marked == index + 1 ? 'yellow' : '#fff',
                borderRadius: 12,
                marginBottom: 15,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 20,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
              onPress={() => {
                selectedOption(index + 1);
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 17.5,
                  backgroundColor: data.marked == index + 1 ? 'red' : '#4CAF50',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Text style={{fontWeight: '700', color: '#fff'}}>
                  {index === 0
                    ? 'A'
                    : index === 1
                    ? 'B'
                    : index === 2
                    ? 'C'
                    : 'D'}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: data.marked == index + 1 ? '#000' : '#555',
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default QuestionItem;
