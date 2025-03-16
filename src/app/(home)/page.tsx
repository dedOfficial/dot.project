import { Logo } from '@/components';
import Title from 'antd/es/typography/Title';
import { Flex } from 'antd';

export default function Home() {
    return (
        <Flex gap={10} className="w-full h-full" align="center" justify="center">
            <Logo />
            <Title className="!mb-0 mt-1.5" level={2}>
                starts here
            </Title>
        </Flex>
    );
}
