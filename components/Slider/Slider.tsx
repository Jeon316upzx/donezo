import React from 'react';
import {ImageBackground} from 'react-native';
import {View, Text} from 'react-native';

interface ISlider {
  uri: string;
  count: number;
  title: string;
}

const Slider = ({uri, count, title}: ISlider) => {
  return (
    <ImageBackground
      style={{
        height: 200,
        width: 200,
        marginLeft:10,
        marginRight: 10,
        position: 'relative',
        marginVertical: 15
      }}
      imageStyle={{
        borderRadius: 10,
      }}
      source={{
        uri: uri,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
        }}>
        <Text
          style={{
            fontSize: 40,
            textTransform: 'capitalize',
          }}>
          {' '}
          {count}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            textTransform: 'capitalize',
          }}>
          {' '}
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Slider;
