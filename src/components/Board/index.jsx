import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
} from 'react'
import classnames from 'classnames'
import Modal from '../Modal'
import './styles.css'
import SinglePlayer from '../SinglePlayer'
import MultiPlayer from '../MultiPlayer'
import SinglePlayerModalContent from '../SinglePlayer/SinglePlayerModalContent'
import MultiPlayerModalContent from '../MultiPlayer/MultiPlayerModalContent'
import CtaButtons from '../Buttons'
import { shuffleArray } from '../../utils'
import { imagesData, coverImages } from './images'
import {PlayerActionKind, PlayerStateTypes, playerScoreReducer, PlayersReducer, initialPlayersState, initialState} from '../../Reducers/index'

const Board = ({
  numberOfPlayers,
  handleEndGame,
}) => {
  const [grid, setGrid] = useState({})
  const [selection, setSelection] = useState([])
  const [winnerScore, setWinnerScore] = useState([])
  const [width] = useState(window.innerWidth)
  const [state, dispatch] = useReducer(playerScoreReducer, initialState)
  const [playersUpdatedState, playersDispatch] = useReducer(
    PlayersReducer,
    initialPlayersState
  )


  const setNewGame = () => {
    handleRestart()
    handleEndGame()
  }

  const handleRestart = () => {
    setGridValues()
    setWinnerScore([])
    dispatch({ type: PlayerActionKind.RESET })
    playersDispatch({ type: PlayerStateTypes.resetGame })
  }

  const setGridValues = useCallback(async() => {
    const grid = {}
    const imagesArr = []
    const images = await imagesData

   
      for (let i = 0; i < images.length; i++) {
        imagesArr.push(
          ...[
            { image: images[i].image, value: images[i].value },
            { image: images[i].image, value: images[i].value },
          ]
        )
      }


    shuffleArray(imagesArr)

      for (let i = 0; i < imagesArr.length; i++) {
        grid[`grid-${i}`] = {
          value: imagesArr[i].value,
          image: imagesArr[i].image,
          selected: false,
          disabled: false,
        }
      }

    setGrid(grid)
  }, [])

  useEffect(() => {
    setGridValues()
  }, [setGridValues])

 

  const handleClick = (ev) => {
    ev.stopPropagation()
    let id = (ev.target).getAttribute('data-id')

    if (id) {
      if (selection.length === 0) {
        setGrid((grid) => {
          const target = grid[id]
          return {
            ...grid,
            [id]: { ...target, selected: !target.selected },
          }
        })
        setSelection([id])
      } else {
        const target_1 = grid[selection[0]]
        const target_2 = grid[id]

        if (target_1.value !== target_2.value) {
          // hide cards
          setGrid((grid) => {
            return {
              ...grid,
              [id]: { ...target_2, selected: true },
            }
          })

          setTimeout(
            () =>
              setGrid((grid) => {
                return {
                  ...grid,
                  [selection[0]]: { ...target_1, selected: false },
                  [id]: { ...target_2, selected: false },
                }
              }),
            1000
          )

          //increase the move for single player
          playersDispatch({ type: PlayerStateTypes.count })

          if (playersUpdatedState.currentPlayer === numberOfPlayers) {
            playersDispatch({ type: PlayerStateTypes.resetCurrentPlayer })
          } else {
            playersDispatch({ type: PlayerStateTypes.currentPlayer })
          }
        } else {
          setGrid((grid) => {
            return {
              ...grid,
              [selection[0]]: { ...target_1, disabled: true, selected: true },
              [id]: { ...target_2, disabled: true, selected: true },
            }
          })

          //increase the move for single player
          playersDispatch({ type: PlayerStateTypes.count })

          // update player
          if (playersUpdatedState.currentPlayer === numberOfPlayers) {
            playersDispatch({ type: PlayerStateTypes.resetCurrentPlayer })
          } else {
            playersDispatch({ type: PlayerStateTypes.currentPlayer })
          }

          // increase score for currentplayer
          dispatch({ type: playersUpdatedState.currentPlayer })
        }
        setSelection([])
      }
    }
  }

  useEffect(() => {
    const finished = Object.entries(grid).every(
      ([id, { value, selected, disabled }]) => disabled === true
    )

    if (numberOfPlayers === 1) {
      playersDispatch({
        type: PlayerStateTypes.singleCompleted,
        singleCompletedPayload: finished,
      })
      const timeInterval = setInterval(() => {
        if (!finished) {
          playersDispatch({ type: PlayerStateTypes.timer })
        }
      }, 1000)
      return () => {
        clearInterval(timeInterval)
      }
    } else {
      playersDispatch({
        type: PlayerStateTypes.multiplayerCompleted,
        multiCompletedPayload: finished,
      })
    }
  }, [grid, numberOfPlayers])

  const showWinner = useCallback(() => {
    let winner = []
    let playerOne = { player: 1, score: state.player1 }
    let playerTwo = { player: 2, score: state.player2 }

    switch (numberOfPlayers) {
      case 2:
        winner.push(playerOne, playerTwo)
        break
      default:
        winner.push(playerOne)
      
    }
    
    winner.sort((a, b) => b.score - a.score)
    setWinnerScore(winner)
  }, [numberOfPlayers, state])

  useEffect(
    () => showWinner(),
    [showWinner, playersUpdatedState.multiCompleted]
  )

  return (
    <>
      <div className='menu'>
        {width > 500 ? (
          <div className='flex justify-center items-center'>
            <button
              className='w-32 h-12 bg-green hover:opacity-70 text-white mr-3.5 rounded-xl flex justify-center items-center'
              onClick={handleRestart}
            >
              Restart
            </button>
            <button
              className='w-40 h-12 bg-grey hover:bg-light-blue text-navy-blue hover:text-off-white mr-3.5 rounded-xl flex justify-center items-center'
              onClick={setNewGame}
            >
              New Game
            </button>
          </div>
        ) : (
          <button
            className='w-20 h-10 bg-green hover:opacity-70 text-white rounded-xl flex justify-center items-center'
            onClick={() =>
              playersDispatch({
                type: PlayerStateTypes.showMenuModal,
                menuModalPayload: true,
              })
            }
          >
            Menú
          </button>
        )}
      </div>

      <div
        className='flex justify-between flex-wrap w-80 m-auto mt-5'
        onClick={handleClick}
      >
        {/* convert an object to array */}
        {Object.entries(grid).map(
          ([id, { value, image, selected, disabled }], index) => {
            return (
              <div
                key={id}
                data-id={id}
                data-testid={index + 1}
                className={classnames(
                  '',
                  {
                    'pointer-events-none': selected,
                  }
                )}
                style={{
                  width: '100px',
                  height: '100px',
                  fontSize:'40px',
                  marginBottom: '8px'
                }}
              >
                {!selected ?
                <img
                  src={coverImages.image}
                  alt={coverImages.value}
                  data-id={id}
                  data-testid={`grid-value${index + 1}`}
                  className={classnames({
                    'p-4': 4,
                    'text-2xl':4,
                  })}
                /> :
                <img
                src={image}
                alt={value}
                data-id={id}
                data-testid={`grid-value${index + 1}`}
                className={classnames({
                  hidden: !selected,
                  'p-4': 4,
                  'text-2xl':4,
                })}
              />
              }
                
              </div>
            )
          }
        )}
      </div>

      <div
        className='p-6 flex justify-center mt-20'
        style={{ left: numberOfPlayers === 2 ? '26%' : '0' }}
      >
        {numberOfPlayers === 1 ? (
          <SinglePlayer
            time={playersUpdatedState.timer}
            count={playersUpdatedState.count}
          />
        ) : (
          <MultiPlayer
            numberOfPlayers={numberOfPlayers}
            currentPlayer={playersUpdatedState.currentPlayer}
            players={state}
          />
        )}
      </div>

      {/* show modal on click of menu button */}
      {playersUpdatedState.showMenuModal && (
        <Modal
          handleClose={() =>
            playersDispatch({
              type: PlayerStateTypes.showMenuModal,
              menuModalPayload: false,
            })
          }
        >
          <CtaButtons handleRestart={handleRestart} setNewGame={setNewGame} />
        </Modal>
      )}

      {/* show modal when game is completed*/}
      {playersUpdatedState.singleCompleted && (
        <Modal width={width > 500 ? '654px' : '327px'} height='376px'>
          <SinglePlayerModalContent
            time={playersUpdatedState.timer}
            count={playersUpdatedState.count}
            handleRestart={handleRestart}
            setNewGame={setNewGame}
          />
        </Modal>
      )}

      {/* show modal when game is completed(multiplayer) */}
      {playersUpdatedState.multiCompleted && (
        <Modal width={width > 500 ? '655px' : '328px'} height='488px'>
          <MultiPlayerModalContent
            winnerScore={winnerScore}
            handleRestart={handleRestart}
            setNewGame={setNewGame}
          />
        </Modal>
      )}
    </>
  )
}

export default Board
