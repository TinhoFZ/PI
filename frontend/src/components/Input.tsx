type InputProps = {
    placeholder: string;
    className?: string;
    type?: string;
}

export default function Input(props: InputProps) {
    return(
        <input 
            type={props.type || "text"}
            placeholder={props.placeholder}
            className={`w-[80%] px-3 py-2 rounded-xl bg-snow text-dark outline-none focus:ring-2 focus:ring-primary ${props.className}`}
        />
    )
}