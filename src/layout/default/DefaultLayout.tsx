import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { FC, PropsWithChildren } from 'react';
import { Header } from './components';

// const { Header, Content, Footer } = Layout;

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Layout className="h-screen">
            <Header />
            <Content className="p-7">
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                {/* <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                > */}
                {children}
                {/* </div> */}
            </Content>
            <Footer className="text-center !p-4">
                .project v 0.0.1 ©{new Date().getFullYear()} Created by Konstantin Karpov
            </Footer>
        </Layout>
    );
};
