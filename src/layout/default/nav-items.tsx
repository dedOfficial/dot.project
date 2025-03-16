import { Logo } from '@/components';
import { GetProp, Menu } from 'antd';
import Link from 'next/link';

const navItems: GetProp<typeof Menu, 'items'> = [
    { key: 'home', label: <Logo /> },
    { key: 'tasks', label: <Link href="/tasks">Tasks</Link> },
];

export default navItems;
