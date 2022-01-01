import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../action/actions';
import List from './List';

export default function ListContainer() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  function handleClickDeleteTask(id) {
    dispatch(deleteTask(id));
  }

  return (
    <List
      tasks={tasks}
      onClickDelete={handleClickDeleteTask}
    />
  );
}
