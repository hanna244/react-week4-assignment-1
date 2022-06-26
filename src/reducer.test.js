import reducer from './reducer';

import {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './actions';

describe('reducer', () => {
  const defaultNewId = 101;
  const defaultTaskTitle = '새로운 할 일';

  describe('updateTaskTitle', () => {
    it('changes task title', () => {
      const state = reducer(
        { taskTitle: '' },
        updateTaskTitle(defaultTaskTitle),
      );

      expect(state.taskTitle).toBe(defaultTaskTitle);
    });
  });

  describe('addTask', () => {
    const reduceAddTask = (taskTitle) => reducer(
      {
        newId: defaultNewId,
        taskTitle,
        tasks: [],
      },
      addTask(),
    );

    context('with task title', () => {
      it('appends a new task with new id into tasks', () => {
        const state = reduceAddTask(defaultTaskTitle);

        expect(state.tasks).toHaveLength(1);
        expect(state.tasks[0].id).toBe(defaultNewId);
        expect(state.tasks[0].title).toBe(defaultTaskTitle);
      });

      it('adds 1 to newId', () => {
        const state = reduceAddTask(defaultTaskTitle);

        expect(state.newId).toBe(defaultNewId + 1);
      });

      it('makes taskTitle blank', () => {
        const state = reduceAddTask(defaultTaskTitle);

        expect(state.taskTitle).toBe('');
      });
    });

    context('without task title', () => {
      it("doesn't work", () => {
        const state = reduceAddTask('');

        expect(state.tasks).toHaveLength(0);
      });
    });
  });

  describe('deleteTask', () => {
    const idToBeDelete = 101;

    const reduceDeleteTask = (id) => reducer(
      {
        tasks: [
          { id: idToBeDelete, title: '오늘 할 일 1' },
          { id: idToBeDelete + 1, title: '오늘 할 일 2' },
        ],
      },
      deleteTask(id),
    );

    context('with existent task id', () => {
      it('removes the task from tasks', () => {
        const state = reduceDeleteTask(idToBeDelete);

        expect(state.tasks).toHaveLength(1);
        expect(state.tasks.find(({ id }) => id === idToBeDelete)).toBeUndefined();
      });
    });

    context('with non-existent task id', () => {
      it("doesn't work", () => {
        const state = reduceDeleteTask(32134);

        expect(state.tasks).toHaveLength(2);
      });
    });
  });
});
