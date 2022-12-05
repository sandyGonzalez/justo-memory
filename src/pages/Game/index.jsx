import { useState } from 'react'
import classNames from 'classnames'
import SelectedGame from '../../components/Board'
import Header from '../../components/Header'

import './styles.css'

const Game = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [startGame, setStartGame] = useState(false)

  const handleEndGame = () => {
    setNumberOfPlayers(0)
    setStartGame(false)
  }

  return (
    <>
      {startGame ? (
        <SelectedGame
          numberOfPlayers={numberOfPlayers}
          handleEndGame={handleEndGame}
        />
      ) : (
        <div className='bg-green w-screen h-screen flex flex-col justify-center items-center'>
          <Header/>
          <div className='card-container w-80 lg:w-3/6 h-48 lg:h-2/3 py-2.5 lg:py-5 px-0'>
            <div className='section-container'>
              <h2 className='sub-heading bg-grey'>Número de Jugadores</h2>
              <div className='flex justify-center'>
                {[...Array(2)].map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={classNames(
                        'w-14 lg:w-32 h-10 lg:h-12 hover:bg-grey text-off-white mr-2.5 rounded-xl flex justify-center items-center',
                        {
                          'bg-light-grey': numberOfPlayers !== index + 1,
                          'bg-navy-blue': numberOfPlayers === index + 1,
                        }
                      )}
                      onClick={() => setNumberOfPlayers(index + 1)}
                      data-testid={`player number ${index + 1}`}
                    >
                      {(index + 1).toString()}
                    </button>
                  )
                })}
              </div>
            </div>
            <div
              style={{ marginTop: '20px' }}
              className='flex justify-center w-full'
            >
              <button
                className={classNames(
                  'w-72 lg:w-4/5 h-10 lg:h-12 bg-green text-off-white rounded-xl flex justify-center items-center hover:opacity-70',
                  {
                    'pointer-events-none':
                    numberOfPlayers === 0,
                  }
                )}
                onClick={
                  numberOfPlayers !== 0
                    ? () => setStartGame(true)
                    : () => {}
                }
                data-testid='start-game'
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Game
