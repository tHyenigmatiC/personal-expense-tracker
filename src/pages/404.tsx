export const PageNotFound = () => {
    return (
        <div className='bg-bgmedium h-screen w-screen p-16'>
            <div className='w-100 h-60vh flex flex-col items-center justify-center'>
                <div className='bg-404Image inline-block h-40vh w-40vh bg-center bg-cover' />
                <p className='text-4xl mt-8 text-orange-600 font-black'>
                    Whoops!!! This Page is Broken
                </p>
            </div>
        </div>
    )
}

{
    /* <PageNotFoundImageOverlay>
      <PageNotFoundImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
      <PageNotFoundImageText>Whoops.... This Page is Broken</PageNotFoundImageText>
    </PageNotFoundImageOverlay> */
}
