import React from 'react';
import {View, Image, Text, Pressable, Alert} from 'react-native';
import {useMutation, gql} from '@apollo/client';

interface ITask {
  task: any;
}

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($where: TaskWhereUniqueInput!, $data: TaskUpdateInput!) {
    updateTask(where: $where, data: $data) {
      id
      doings
      taskStatus
      # Add any other fields you want to retrieve after updating the task
    }
  }
`;

const Task = ({task}: ITask) => {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const handleUpdateTask = () => {
    // Replace these variables with actual values or state variables
    const where = {id: task.id};
    const data = {taskStatus: !task.taskStatus};

    updateTask({
      variables: {where, data},
    })
      .then(result => {
        Alert.alert('Task status updated successfully');
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };
  return (
    <View
      key={task.id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 4,
      }}>
      {
        <Pressable onPress={handleUpdateTask}>
          {task.taskStatus ? (
            <Image
              source={require('../../assets/checkmark-circle.png')}
              style={{
                height: 20,
                width: 20,
                marginRight: 10,
              }}
            />
          ) : (
            <Image
              source={require('../../assets/checkmark-circle-outline.png')}
              style={{
                height: 20,
                width: 20,
                marginRight: 10,
              }}
            />
          )}
        </Pressable>
      }

      <Text
        style={{
          fontSize: 18,
          textDecorationLine:
            task.taskStatus === false ? 'none' : 'line-through',
        }}>
        {' '}
        {task.doings}
      </Text>
    </View>
  );
};

export default Task;
