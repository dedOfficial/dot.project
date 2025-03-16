import { Menu } from 'antd';
import { Header as AntdHeader } from 'antd/es/layout/layout';
import navItems from '../nav-items';

export const Header = () => {
    return (
        <AntdHeader className="flex gap-2.5 !px-5">
            <Menu mode="horizontal" defaultSelectedKeys={['home']} items={navItems} />
        </AntdHeader>
    );
};
