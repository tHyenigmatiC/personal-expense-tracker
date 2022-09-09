export const PageNotFound = () => {
    return (
        <div className='bg-bgmedium h-screen w-screen p-16'>
            <div className='w-full h-60vh flex flex-col items-center justify-center'>
                <div className='bg-404Image inline-block h-42vh w-20vw bg-center bg-cover' />
                <p className='text-4xl mt-8 text-orange-600 font-black'>
                    Whoops!!! This Page is Broken
                </p>
            </div>
        </div>
    )
}
