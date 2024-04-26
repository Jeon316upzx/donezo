import React, {useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native';
import Slider from '../Slider/Slider';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client';
import {Text} from 'react-native';

const NOTESQUERY = gql`
  query MyQuery {
    notes {
      id
    }
  }
`;

const TASKSQUERY = gql`
  query MyQuery {
    tasks {
      id
    }
  }
`;

const Sliders = () => {
  const {
    loading: notesLoading,
    error: errorNotes,
    data: dataNotes,
  } = useQuery(NOTESQUERY);

  const {
    loading: taskLoading,
    error: errorTasks,
    data: dataTasks,
  } = useQuery(TASKSQUERY);

  const [sliderData, setSlideData] = useState<any>([
    {
      uri: 'https://res.cloudinary.com/ifeanyi/image/upload/v1713911622/w8cg6tp4uh8yasje0tuo.jpg',
      title: 'Notes',
    },
    {
      uri: 'https://res.cloudinary.com/ifeanyi/image/upload/v1713911624/xrfvyl3fv7hx363cptb7.jpg',
      title: 'Tasks',
    },
  ]);

  if (errorNotes) return <Text> Error </Text>;

  if (errorTasks) return <Text> Error </Text>;

  return taskLoading && notesLoading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <SafeAreaView>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginVertical: 10,
        }}>
        {dataNotes && (
          <Slider
            key={sliderData[0].title + new Date()}
            uri={sliderData[0].uri}
            count={dataNotes?.notes.length}
            title={sliderData[0].title}
          />
        )}

        {dataTasks && (
          <Slider
            key={sliderData[1].title + new Date()}
            uri={sliderData[1].uri}
            count={dataTasks?.tasks.length}
            title={sliderData[1].title}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sliders;
