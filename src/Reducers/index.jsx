
import {COUNTER, TIMER, CURRENTPLAYER, SINGLEPLAYERCOMPLETED, MULTIPLAYERCOMPLETED, SHOWMENUMODAL, RESETCURRENTPLAYER, RESETGAME, RESET } from '../types'

export const PlayerActionKind = {
    One: 1,
    Two: 2,
    Three:3,
    Four: 4,
    RESET:RESET,
  }
  
  export  const PlayerStateTypes = {
    count: COUNTER,
    timer:TIMER,
    singleCompleted:SINGLEPLAYERCOMPLETED,
    currentPlayer:CURRENTPLAYER,
    multiplayerCompleted:MULTIPLAYERCOMPLETED,
    showMenuModal: SHOWMENUMODAL,
    resetCurrentPlayer:RESETCURRENTPLAYER,
    resetGame: RESETGAME,
  }
  
  export const initialState = {
    player1: 0,
    player2: 0,
  }
  
  export const playerScoreReducer = (
    state,
    action
  ) => {
    switch (action.type) {
      case 1:
        return { ...state, player1: state.player1 + 1 }
  
      case 2:
        return { ...state, player2: state.player2 + 1 }
  
      case RESET:
        return { ...initialState }
  
      default:
        return state
    }
  }
  
  export const initialPlayersState = {
    count: 0,
    timer: 0,
    currentPlayer: 1,
    singleCompleted: false,
    multiCompleted: false,
    showMenuModal: false,
  }
  
  export const PlayersReducer = (state, action) => {
    switch (action.type) {
      case COUNTER:
        return { ...state, count: state.count + 1 }
  
      case TIMER:
        return { ...state, timer: state.timer + 1 }
  
      case CURRENTPLAYER:
        return { ...state, currentPlayer: state.currentPlayer + 1 }
  
      case RESETCURRENTPLAYER:
        return { ...state, currentPlayer: 1 }
  
      case SINGLEPLAYERCOMPLETED:
        return { ...state, singleCompleted: action.singleCompletedPayload }
  
      case MULTIPLAYERCOMPLETED:
        return { ...state, multiCompleted: action.multiCompletedPayload }
  
      case SHOWMENUMODAL:
        return { ...state, SHOWMENUMODAL: action.menuModalPayload }
  
      case RESETGAME:
        return { ...initialPlayersState }
  
      default:
        return state
    }
  }