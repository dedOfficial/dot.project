import { ThemeConfig } from 'antd';

const colorBgWhite = '#ededed';
const colorPrimary = '#171717';

export const defaultTheme: ThemeConfig = {
    token: {
        colorPrimary, // Primary color
        colorSuccess: '#52c41a', // Success color
        colorWarning: '#faad14', // Warning color
        colorError: '#f5222d', // Error color
        colorInfo: '#1890ff', // Info color
        borderRadius: 6, // Border radius
        fontSize: 14, // Base font size
        colorText: colorPrimary,
    },
    components: {
        Layout: { headerBg: colorBgWhite },
        Menu: {
            itemBg: colorBgWhite,
        },
        Table: {
            rowSelectedBg: '#57575780',
            rowSelectedHoverBg: '#57575766',
        },
    },
};
