type Props = {
    children: React.ReactNode[] | React.ReactNode
}

export const PageWrapper = ({ children }: Props) => {
    return <div className="page-wrapper">{children}</div>
}
