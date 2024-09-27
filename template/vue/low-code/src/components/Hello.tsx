interface HelloProps {
    msg: string
}

const Hello = (props: HelloProps) => {
    return (
        <div>{props.msg}</div>
    )
}

export default Hello