import { updateTimer } from '../../utils'

const SinglePlayer = ({ time, count }) => {
  return (
    <>
      <div className='updates mr-3'>
        <p className='text-grey font-semibold' data-testid='time'>
          Tiempo
        </p>
        <p>{updateTimer(time)}</p>
      </div>
      <div className='updates'>
        <p className='text-grey font-semibold' data-testid='moves'>
          Movimientos
        </p>
        <p>{count}</p>
      </div>
    </>
  )
}

export default SinglePlayer
