import React, {useState} from 'react';
import {View, TextInput, Button, Text, Pressable, Alert} from 'react-native';
import {gql, useMutation, useQuery} from '@apollo/client';
import {Formik} from 'formik';
import * as yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import {StyleSheet} from 'react-native';

const GET_NOTES = gql`
  query getNotes {
    notes {
      id
      title
      noteStatus
      createdAt
    }
  }
`;
const CREATE_NOTE = gql`
  mutation CreateNote($data: NoteCreateInput!) {
    createNote(data: $data) {
      id
      title
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($data: TaskCreateInput!) {
    createTask(data: $data) {
      id
      doings
      taskStatus
    }
  }
`;

const CreateNote = () => {
  const {loading, error, data} = useQuery(GET_NOTES);
  const [isNote, setIsNote] = useState<boolean>(true);
  const [CreateNote] = useMutation(CREATE_NOTE);
  const [CreateTask] = useMutation(CREATE_TASK);
  const [selected, setSelected] = useState<any | null>(null);

  const account = {
    id: 'clvf0ennk6lpk08lctp4hrphq',
    email: 'jeon316@icloud.com',
  };

  const noteValidationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
  });

  const taskValidationSchema = yup.object().shape({
    doings: yup.string().required('Task is required'),
  });

  return (
    <View style={{padding: 40}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginVertical: 20,
        }}>
        <Pressable>
          <Text
            onPress={() => setIsNote(true)}
            style={{
              fontSize: 16,
              textDecorationLine: isNote ? 'line-through' : 'none',
            }}>
            New Note
          </Text>
        </Pressable>

        <Pressable onPress={() => setIsNote(false)}>
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: !isNote ? 'line-through' : 'none',
            }}>
            New Task
          </Text>
        </Pressable>
      </View>

      {isNote ? (
        <Formik
          validationSchema={noteValidationSchema}
          initialValues={{title: ''}}
          onSubmit={values => {
            const noteData = {
              title: values.title,
              noteStatus: false,
              accountRef: {
                connect: {
                  email: account.email,
                },
              },
            };

            // Call the createNote mutation with the note data
            CreateNote({
              variables: {data: noteData},
            })
              .then(result => {
                // Handle the result as needed
                Alert.alert('Note created.');
              })
              .catch(error => {
                // Handle any errors
                console.error('Error creating note:', error);
              });
          }}>
          {({
            handleChange,
            errors,
            handleBlur,
            handleSubmit,
            values,
            isValid,
          }) => (
            <>
              <TextInput
                id="title"
                placeholder="Note title"
                style={{
                  height: 60,
                  borderColor: '#d1d1d1',
                  borderWidth: 0.3,
                  padding: 20,
                }}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                keyboardType="default"
              />

              {errors.title && (
                <Text style={{fontSize: 10, color: 'red'}}>{errors.title}</Text>
              )}

              <View style={{marginVertical: 20}}>
                <Button
                  disabled={!isValid}
                  onPress={() => handleSubmit()}
                  title="Create New Note"
                />
              </View>
            </>
          )}
        </Formik>
      ) : (
        <Formik
          validationSchema={taskValidationSchema}
          initialValues={{doings: ''}}
          onSubmit={values => {
            const task = {
              doings: values.doings,
              taskStatus: false,
              noteRef: {
                connect: {
                  id: selected.id,
                },
              },
            };

            if (selected === null) Alert.alert('Please select a note');

            CreateTask({
              variables: {data: task},
            })
              .then(result => {
                // Handle the result as needed
                Alert.alert(`Task added to ${selected.title} note`);
              })
              .catch(error => {
                // Handle any errors
                console.error('Error creating note:', error);
              });
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View style={{marginVertical: 10}}>
                <TextInput
                  id="title"
                  placeholder="Task title"
                  style={{
                    height: 60,
                    borderColor: '#d1d1d1',
                    borderWidth: 0.3,
                    padding: 20,
                  }}
                  onChangeText={handleChange('doings')}
                  onBlur={handleBlur('doings')}
                  value={values.doings}
                  keyboardType="default"
                />

                {errors.doings && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.doings}
                  </Text>
                )}
              </View>

              <SelectDropdown
                data={data?.notes ? data.notes : []}
                onSelect={(selectedItem, index) => {
                  setSelected(selectedItem);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) || 'Select note'}
                      </Text>
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: '#D2D9DF'}),
                      }}>
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />

              <View style={{marginVertical: 20}}>
                <Button
                  disabled={!isValid}
                  onPress={() => handleSubmit()}
                  title="Create New Task"
                />
              </View>
            </>
          )}
        </Formik>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 'auto',
    height: 60,
    borderWidth: 0.3,
    borderColor: '#d1d1d1',
    padding: 20,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#000',
  },
  dropdownButtonArrowStyle: {
    fontSize: 16,
  },
  dropdownButtonIconStyle: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    padding: 10,
    marginVertical: 10,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default CreateNote;
