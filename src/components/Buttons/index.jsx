import classnames from 'classnames'
import { useState } from 'react'


const Buttons = ({
  handleRestart,
  setNewGame,
}) => {
  const [width] = useState(window.innerWidth)

  return (
    <div className='md:flex'>
      <button
        className={classnames(
          'w-72 h-12 mb-5 md:mr-2.5 bg-green hover:opacity-70 text-white rounded-xl flex justify-center items-center cursor-pointer',
          {
            'w-48': width > 500,
            'w-72': width < 500,
          }
        )}
        onClick={handleRestart}
      >
        Reiniciar
      </button>
      <button
        className={classnames(
          'w-72 h-12 bg-ash hover:bg-light-blue text-navy-blue hover:text-off-white rounded-xl flex justify-center items-center cursor-pointer',
          {
            'w-48': width > 500,
            'w-72': width < 500,
          }
        )}
        onClick={setNewGame}
      >
        Nuevo Juego
      </button>
    </div>
  )
}

export default Buttons
