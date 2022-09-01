export interface AuxProps {
    children: React.ReactNode;
}

const PageContainer = ({ children }: AuxProps) => {
    return <div>{children}</div>;
};

export default PageContainer;
