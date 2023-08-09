import ReactLoading from 'react-loading';

export function Loading() {
    return (
        <ReactLoading className='w-full h-full flex mx-auto' type={'cylon'} color={'#c6c6c6'} height={400} width={90} />
    )
}