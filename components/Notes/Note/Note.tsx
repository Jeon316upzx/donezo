import React from 'react';
import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import {format} from 'date-fns';
import {useMutation, useQuery} from '@apollo/client';
import {gql} from '@apollo/client';
import Tasks from '../../Tasks/Tasks';
import {Alert} from 'react-native';

export interface INote {
  id: string;
  title: string;
  noteStatus: boolean;
  accountRef?: AccountRef;
  tasksRef: any[];
  onSelect?: React.Dispatch<React.SetStateAction<any>>;
  createdAt: string;
  selected?: INote | null;
}

interface Task {
  id: string;
  doings: string;
  taskStatus: boolean;
}

interface AccountRef {
  id: string;
  email: string;
}

const UPDATE_MUTATION = gql`
  mutation UpdateNote($where: NoteWhereUniqueInput!, $data: NoteUpdateInput!) {
    updateNote(where: $where, data: $data) {
      id
      noteStatus
    }
  }
`;

const Note = ({
  id,
  title,
  noteStatus,
  accountRef,
  tasksRef,
  selected,
  onSelect,
  createdAt,
}: INote) => {
  const [UpdateNote] = useMutation(UPDATE_MUTATION);

  const handleUpdate = () => {
    const where = {id: id};
    const data = {noteStatus: !noteStatus};

    UpdateNote({
      variables: {where, data},
    })
      .then(result => {
        Alert.alert('Note updated successfully');
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  };

  return (
    <TouchableOpacity>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          minHeight: 60,
          borderRadius: 15,
          marginVertical: 2,
          marginHorizontal: 10,
          paddingHorizontal: 15,
          paddingVertical: 25,
        }}>
        <Pressable
          onPress={() => {
            if (selected == null && onSelect) {
              onSelect({
                id,
                title,
                noteStatus,
                accountRef,
                tasksRef,
                createdAt,
              });
            } else {
              onSelect!(null);
            }
          }}>
          <View
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
                lineHeight: 20,
                textTransform: 'uppercase',
              }}>
              {' '}
              {format(createdAt, 'E')}
              <Text style={{color: 'orange'}}> {format(createdAt, 'd')} </Text>
            </Text>

            <Pressable onPress={handleUpdate}>
              {noteStatus ? (
                <Image
                  style={{height: 24, width: 24}}
                  source={require('../../../assets/flag.png')}
                />
              ) : (
                <Image
                  style={{height: 24, width: 24}}
                  source={require('../../../assets/flag-outline.png')}
                />
              )}
            </Pressable>
          </View>
        </Pressable>
        <View>
          {selected?.id != null && id === selected.id && (
            <View
              style={{
                minHeight: 400,
                marginVertical: 30,
              }}>
              <Tasks tasks={tasksRef} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Note;
