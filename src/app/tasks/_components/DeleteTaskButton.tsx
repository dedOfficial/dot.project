'use client';

import useTasks from '@/store/tasks';
import { Button } from 'antd';
import { FC } from 'react';

interface DeleteTaskButtonProps {
    task: unknown;
    onBeforeDelete?: () => void;
    onAfterDelete?: () => void;
}

// TODO: add delete confirmation

const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({ task, onBeforeDelete, onAfterDelete }) => {
    const { deleteTask } = useTasks();

    const onDelete = () => {
        if (onBeforeDelete) onBeforeDelete();

        deleteTask(task);

        if (onAfterDelete) onAfterDelete();
    };

    return (
        <Button color="danger" variant="text" onClick={onDelete}>
            Delete
        </Button>
    );
};

export default DeleteTaskButton;
