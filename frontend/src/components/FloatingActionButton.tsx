type Props = {
    text: string;
}

export default function FloatingActionButton({ text }: Props) {
    return(
        <button className="absolute bottom-6 right-6 bg-accent text-snow px-4 py-3 rounded-full shadow-lg">
            {text}
        </button>
    )
}