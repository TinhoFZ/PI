import { Link } from 'react-router-dom';

type ButtonProps = {
    route: string;
    text: string;
    className?: string;
}

export default function Button(props: ButtonProps) {
    return(
        <Link 
            to={props.route} 
            className={`inline-block py-2 px-4 rounded-xl bg-primary text-snow font-semibold hover:brightness-110 active:brightness-90 transition ${props.className}`}
        >
            {props.text}
        </Link>
    )
}