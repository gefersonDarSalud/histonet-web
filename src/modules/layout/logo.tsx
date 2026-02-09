import darsaludLogo from '$/histonet-logo/Logo Histo-Net Go (transparente).ico'
// import darsaludLogo from '$/darsalud-logo/nuevo-logo-2-500x281-1.png'

export const Logo = () => {
    return (
        <>
            <div className='flex justify-center items-center w-full'>
                <img
                    className="h-32 w-auto self-center"
                    id='logo'
                    src={darsaludLogo}
                    alt='darsalud logo'
                />
            </div >
        </>
    );
}