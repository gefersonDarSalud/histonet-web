import darsaludLogo from '$/darsalud-logo/nuevo-logo-2-500x281-1.png'
// import darsaludLogo from '$/darsalud-logo/nuevo-logo-2-500x281-1.png'

type BrandmarkProps = {
    className?: string
}

export const Brandmark = (props: BrandmarkProps) => {
    return (
        <>
            <div className='flex justify-center items-center w-full'>
                <img
                    className={props.className}
                    id='brandmark'
                    src={darsaludLogo}
                    alt='darsalud logo'
                />
            </div >
        </>
    );
}