import Button from "../Button"
import placeholder from '../../assets/images/placeholder.png'

export default function HeroSection() {
    return(
        <div className="w-full h-[50dvh] bg-primary">
            <div className="grid grid-cols-2 h-full">
                
                <div className="flex flex-col justify-center pl-[5vw] space-y-4">
                    <h1 className="text-snow font-bold text-5xl">
                        Explore o mundo
                    </h1>

                    <h2 className="text-snow/70">
                        Descubra tesouros escondidos em lugares reais
                    </h2>

                    <Button 
                        text='Começar'
                        route='/map'
                        className="w-fit bg-accent"
                    />
                </div>

                <div className="flex items-center justify-center overflow-hidden">
                    <img 
                        src={placeholder} 
                        alt="Imagem" 
                        className="w-[70%] opacity-80"
                    />
                </div>

            </div>
        </div>
    )
}