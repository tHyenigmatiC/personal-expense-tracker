import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loader = () => {
    return (
        <div className='h-screen w-screen'>
            <Skeleton count={5} />
        </div>
    )
}

export default Loader
