import reducer from './reducer';

describe('reducer', () => {
  describe('updateTaskTitle', () => {
    const previousState = {
      taskTitle: '',
      tasks: [],
    };

    function updateTaskTitleAction(taskTitle) {
      return ({
        type: 'updateTaskTitle',
        payload: {
          taskTitle,
        },
      });
    }
    it('returns new task title', () => {
      const state = reducer(previousState, updateTaskTitleAction('New Task'));

      expect(state.taskTitle).toBe('New Task');
    });

    it('returns new task title in korean', () => {
      const state = reducer(previousState, updateTaskTitleAction('새로운 테스크'));

      expect(state.taskTitle).toBe('새로운 테스크');
    });
  });

  describe('addTask', () => {
    const previousState = {
      taskTitle: 'New Task',
      tasks: [],
    };

    function addTaskAction() {
      return ({
        type: 'addTask',
      });
    }

    it('returns new task', () => {
      const state = reducer(previousState, addTaskAction());

      expect(state).toHaveLength(1);
    });
  });
});
