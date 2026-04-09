import Button from '../Button'
import Input from '../Input'

export default function Login() {
    return(
        <div className="w-dvw h-dvh flex items-center justify-center bg-primary">
            
            <div className='flex flex-col w-75 bg-snow rounded-2xl p-6 space-y-4 shadow-lg'>
                
                <h1 className='font-bold text-dark text-2xl text-center'>
                    Login
                </h1>

                <Button 
                    text='Entrar com Google'
                    route='/'
                    className='w-full text-center bg-accent'
                />

                <Input placeholder='Email' />
                <Input placeholder='Senha' type="password"/>

                <Button 
                    text='Continuar'
                    route='/map'
                    className='w-full text-center'
                />

            </div>
        </div>
    )
}