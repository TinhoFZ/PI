import { Link } from 'react-router-dom';
import Button from './Button';

export default function Nav() {
    return(
        <nav className="bg-primary px-6 py-4 w-full sticky top-0 z-1000">
            <div className="flex items-center">
                <Link to="/" className="text-snow font-bold text-2xl">TreasureApp</Link>

                <div className="mx-auto space-x-6">
                    <Link to="/map" className="text-snow hover:underline">Mapa</Link>
                </div>

                <Button 
                    text='Login'
                    route='/login'
                />
            </div>
        </nav>
    )
}