import React, {useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import Note from './Note/Note';
import {INote} from './Note/Note';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/client';

const QUERY = gql`
  query MyQuery {
    notes {
      id
      title
      noteStatus
      accountRef {
        id
        email
      }
      tasksRef {
        id
        doings
        taskStatus
      }
      createdAt
    }
  }
`;



const Notes = () => {
  const {loading, error, data} = useQuery(QUERY);
  
  if (error) return <Text> Error </Text>;

  const [mynote, setSelectedNote] = useState<INote | null>(null);

  return loading ? (
    <ActivityIndicator size={'large'} />
  ) : (
    <View>
      {data &&
        data?.notes.map((note: any) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              noteStatus={note.noteStatus}
              tasksRef={note.tasksRef}
              onSelect={setSelectedNote}
              createdAt={note.createdAt}
              selected={mynote}
            />
          );
        })}
    </View>
  );
};

export default Notes;
