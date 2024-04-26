import React from 'react';
import Task from '../Task/Task';

interface ITasks {
  tasks: any;
}

const Tasks = ({tasks}: ITasks) => {
  return (
    tasks &&
    tasks.map((task: any) => {
      return <Task key={task.id} task={task} />;
    })
  );
};

export default Tasks;
