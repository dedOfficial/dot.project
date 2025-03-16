import { defaultTheme } from '@/themePresets';
import { TLocale } from '@/types';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import ruRU from 'antd/lib/locale/ru_RU';

interface AppConfigProviderProps {
    locale: TLocale;

    children: React.ReactNode;
}

export default function AppConfigProvider({ locale, children }: AppConfigProviderProps) {
    const localeFile = locale === 'ru' ? ruRU : enUS;

    return (
        <ConfigProvider theme={defaultTheme} locale={localeFile}>
            {children}
        </ConfigProvider>
    );
}
