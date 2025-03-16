'use client';

import AntdLink from 'antd/es/typography/Link';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { CSSProperties, FC, PropsWithChildren } from 'react';

interface LinkProps extends PropsWithChildren {
    href: string;
    options?: NavigateOptions;
    className?: string;
    style?: CSSProperties;
    onBeforeNavigate?: () => void;
    onAfterNavigate?: () => void;
}

export const Link: FC<LinkProps> = ({
    children,
    href,
    options,
    className,
    style,
    onBeforeNavigate,
    onAfterNavigate,
}) => {
    const router = useRouter();

    const onNavigate = () => {
        if (onBeforeNavigate) onBeforeNavigate();

        router.push(href, options);

        if (onAfterNavigate) onAfterNavigate();
    };

    return (
        <AntdLink className={className} style={style} onClick={onNavigate}>
            {children}
        </AntdLink>
    );
};
