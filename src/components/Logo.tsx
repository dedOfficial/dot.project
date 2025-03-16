'use client';

import { logoFont } from '@/fonts';
import { Link } from './Link';
import { theme } from 'antd';
import { FC } from 'react';

interface LogoProps {
    onClick?: () => void;
}

export const Logo: FC<LogoProps> = ({ onClick }) => {
    const {
        token: { colorPrimaryText },
    } = theme.useToken();

    return (
        <h1 className={`${logoFont.className} flex w-fit`}>
            <Link
                className={`!no-underline pt-1 !text-5xl`}
                style={{ color: colorPrimaryText }}
                onAfterNavigate={onClick}
                href="/"
            >
                .project
            </Link>
        </h1>
    );
};
