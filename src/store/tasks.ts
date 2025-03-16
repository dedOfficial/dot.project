import { create } from 'zustand';

// TODO: add types

interface IUseTasks {
    tasks: unknown[];
    completedTasksIds: string[];
    setTasks: (newTasks: unknown[]) => void;
    completeTasks: (completedTasksIds: string[]) => void;
    createOrUpdateTask: (task: unknown) => void;
    deleteTask: (task: unknown) => void;
}

const mockTasks = [
    {
        id: '1',
        title: 'Task 1',
        description: 'Description for Task 1',
        created_at: '2023-10-01',
        status: 'completed',
    },
    {
        id: '2',
        title: 'Task 2',
        description: 'Description for Task 2',
        created_at: '2023-10-02',
        status: 'opened',
    },
    {
        id: '3',
        title: 'Task 3',
        description: 'Description for Task 3',
        created_at: '2023-10-03',
        status: 'completed',
    },
    {
        id: '4',
        title: 'Task 4',
        description: 'Description for Task 4',
        created_at: '2023-10-04',
        status: 'opened',
    },
    {
        id: '5',
        title: 'Task 5',
        description: 'Description for Task 5',
        created_at: '2023-10-05',
        status: 'opened',
    },
    {
        id: '6',
        title: 'Task 6',
        description: 'Description for Task 6',
        created_at: '2023-10-06',
        status: 'completed',
    },
    {
        id: '7',
        title: 'Task 7',
        description: 'Description for Task 7',
        created_at: '2023-10-07',
        status: 'opened',
    },
    {
        id: '8',
        title: 'Task 8',
        description: 'Description for Task 8',
        created_at: '2023-10-08',
        status: 'completed',
    },
    {
        id: '9',
        title: 'Task 9',
        description: 'Description for Task 9',
        created_at: '2023-10-09',
        status: 'opened',
    },
    {
        id: '10',
        title: 'Task 10',
        description: 'Description for Task 10',
        created_at: '2023-10-10',
        status: 'completed',
    },
    {
        id: '11',
        title: 'Task 11',
        description: 'Description for Task 11',
        created_at: '2023-10-11',
        status: 'opened',
    },
    {
        id: '12',
        title: 'Task 12',
        description: 'Description for Task 12',
        created_at: '2023-10-12',
        status: 'completed',
    },
    {
        id: '13',
        title: 'Task 13',
        description: 'Description for Task 13',
        created_at: '2023-10-13',
        status: 'opened',
    },
    {
        id: '14',
        title: 'Task 14',
        description: 'Description for Task 14',
        created_at: '2023-10-14',
        status: 'completed',
    },
    {
        id: '15',
        title: 'Task 15',
        description: 'Description for Task 15',
        created_at: '2023-10-15',
        status: 'opened',
    },
];

const useTasks = create<IUseTasks>((set) => ({
    tasks: mockTasks,
    completedTasksIds: mockTasks
        .filter((task) => task.status === 'completed')
        .map((task) => task.id),
    setTasks: (newTasks) => {
        set({ tasks: newTasks });
    },
    completeTasks: (completedTasksIds) => {
        set((state) => {
            // console.log(state, completedTasksIds);
            return {
                completedTasksIds,
                tasks: state.tasks.map((task) => {
                    if (completedTasksIds.includes(task.id))
                        return { ...task, status: 'completed' };
                    return { ...task, status: 'opened' };
                }),
            };
        });
    },
    createOrUpdateTask: (task) => {
        set((state) => {
            const oldTaskIndex = state.tasks.findIndex((t) => t.id === task.id);

            if (oldTaskIndex !== -1) {
                const newTasks = JSON.parse(JSON.stringify(state.tasks));
                newTasks[oldTaskIndex] = task;

                return { tasks: newTasks };
            } else {
                return { tasks: [...state.tasks, task] };
            }
        });
    },
    deleteTask: (task) => {
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== task.id),
            completedTasksIds: state.completedTasksIds.filter((id) => id !== task.id),
        }));
    },
}));

export default useTasks;
