'use client';

import { Link } from '@/components';
import useTasks from '@/store/tasks';
import { Button, Flex, Table, TableColumnsType, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DeleteTaskButton from './_components/DeleteTaskButton';

const columns: TableColumnsType = [
    {
        title: 'Title',
        dataIndex: 'title',
        width: '30%',
        render: (text: string, task) => <Link href={`tasks/${task.id}`}>{text}</Link>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        defaultSortOrder: 'descend',
        width: '12.5%',
        sorter: (a, b) => {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        },
    },
    {
        title: 'Actions',
        key: 'actions',
        width: '15%',
        render: (_, task) => <DeleteTaskButton task={task} />,
    },
];

export default function Tasks() {
    const { tasks, completedTasksIds, completeTasks } = useTasks();
    const router = useRouter();

    // TODO: replace unknow by defined type
    const rowSelection: TableProps['rowSelection'] = {
        onChange: (completedTasksIds: React.Key[], selectedRows: unknown[]) => {
            console.log(`selectedRowKeys: ${completedTasksIds}`, 'selectedRows: ', selectedRows);
            completeTasks(completedTasksIds as string[]);
        },
        selectedRowKeys: completedTasksIds,
        // getCheckboxProps: (record: unknown) => ({
        //     checked: record.status === 'completed', // Column configuration not to be checked
        //     name: record.title,
        // }),
    };

    const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Flex align="center" justify="space-between">
                <Title level={2}>Tasks</Title>

                <Button className="!font-semibold" onClick={() => router.push('/tasks/new')}>
                    + Create
                </Button>
            </Flex>

            <Table
                rowKey="id"
                size="small"
                sortDirections={['ascend', 'descend', 'ascend']}
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                rowClassName={(task) => (task.status === 'completed' ? '!line-through' : '')}
                // virtual
                pagination={{ size: 'default' }}
                scroll={{
                    y: windowHeight - 300,
                }}
                columns={columns}
                dataSource={tasks}
            />
        </>
    );
}
