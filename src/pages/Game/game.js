import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from './index'

describe('test render Game Component', () => {
  test('when a numbers theme, a single player and 4x4 grid is selected', async () => {
    render(<Game />)
  })
})
