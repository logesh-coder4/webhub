import { Spinner } from './ui/spinner'

const Loader = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center dark:bg-stone-900 relative">
            <Spinner className='size-8' />
        </div>
    )
}

export default Loader