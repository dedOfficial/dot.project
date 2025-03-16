'use client';

import uuidv4 from '@/helpers/uuidv4';
import useTasks from '@/store/tasks';
import { Button, Checkbox, Flex, Form, GetProp, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DeleteTaskButton from '../_components/DeleteTaskButton';

export default function Task() {
    const router = useRouter();

    const { task_id } = useParams();

    const { tasks, createOrUpdateTask } = useTasks();

    const isNewTask = task_id === 'new';

    const initialValueOfTask = { id: isNewTask ? uuidv4() : task_id };

    const taskFromStore = useRef(initialValueOfTask);
    const [task, setTask] = useState(initialValueOfTask);
    // console.log(isNewTask, task);

    const isCompleted = task.status === 'completed';
    const isChanged =
        task.title !== taskFromStore.current.title ||
        task.description !== taskFromStore.current.description ||
        task.status !== taskFromStore.current.status;

    console.log(task_id, tasks, task, taskFromStore.current);

    useEffect(() => {
        if (tasks.length || !isNewTask) {
            const task = tasks.find((task) => task.id === task_id);

            if (task) {
                taskFromStore.current = task;
                setTask((prev) => ({ ...prev, ...task, isCompleted: task.status === 'complete' }));
            }
        }
    }, [tasks, task_id, isNewTask]);

    const toggleStatus = () => {
        setTask((prevTask) => ({
            ...prevTask,
            status: isCompleted ? 'opened' : 'completed',
        }));
    };

    const changeDescription: GetProp<typeof TextArea, 'onChange'> = (e) =>
        setTask((prevTask) => ({ ...prevTask, description: e.target.value }));

    const onSave = () => {
        if (isNewTask) {
            const newTask = { ...task, created_at: new Date().toISOString().slice(0, 10) }; // TODO: replace and put full day maybe
            taskFromStore.current = newTask;

            createOrUpdateTask(newTask);

            router.push('/tasks/' + newTask.id);
        } else {
            taskFromStore.current = task;
            createOrUpdateTask(task);
        }
    };

    const onReset = () => {
        setTask(taskFromStore.current);
    };

    const onCancel = () => {
        setTask(taskFromStore.current);
        router.back();
    };

    return (
        <>
            <Flex align="center" justify="space-between">
                <Title
                    className={`flex items-center ${isCompleted ? 'line-through' : ''}`}
                    level={2}
                >
                    <Checkbox
                        checked={isCompleted}
                        className="!mr-2 !mt-1"
                        onChange={toggleStatus}
                    />
                    <span onClick={toggleStatus} className="min-w-fit cursor-pointer">
                        Task 
                    </span>
                    <Input
                        classNames={{
                            input: '!text-3xl !border-none focus:!border-none focus:!shadow-none !bg-transparent !p-0 focus:!underline h-full',
                        }}
                        placeholder="name..."
                        value={task.title}
                        onChange={(e) =>
                            setTask((prevTask) => ({ ...prevTask, title: e.target.value }))
                        }
                    />
                </Title>

                {!isNewTask && <DeleteTaskButton task={task} onAfterDelete={router.back} />}
            </Flex>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                className="flex flex-col gap-2"
                onFinish={onSave}
                // style={{ maxWidth: 600 }}
            >
                <Flex vertical gap={5}>
                    <span>Description:</span>
                    <TextArea rows={4} value={task.description} onChange={changeDescription} />
                </Flex>

                {isChanged ? (
                    <Flex gap={5}>
                        <Button
                            disabled={!task.title}
                            className="w-30"
                            type="primary"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                        {isNewTask ? (
                            <Button className="w-30" onClick={onCancel}>
                                Cancel
                            </Button>
                        ) : (
                            <Button className="w-30" onClick={onReset}>
                                Reset
                            </Button>
                        )}
                    </Flex>
                ) : null}
            </Form>
        </>
    );
}
