import { render, screen } from '@testing-library/react'
import {Menu} from './index.tsx'
import '@testing-library/jest-dom'

describe('Menu', () => {
  it('renders the Stack component', () => {
    const { getByTestId } = render(<Menu page={'data'} setPage={() => {}} />);
    expect(getByTestId('menu')).toBeInTheDocument();
  })
  it('renders the correct amount of buttons', () => {
    const { getAllByRole } = render(<Menu page={'data'} setPage={() => {}} />);
    expect(getAllByRole('button')).toHaveLength(2);
  })
  it('renders buttons with the correct values', () => {
    const { getAllByRole } = render(<Menu page={'data'} setPage={() => {}} />);
    expect(getAllByRole('button')[0]).toHaveAttribute('value', 'data');
    expect(getAllByRole('button')[1]).toHaveAttribute('value', 'edit');
  })
  it('renders buttons with the correct values', () => {
    const { getAllByRole } = render(<Menu page={'data'} setPage={() => {}} />);
    expect(getAllByRole('button')[0]).toHaveTextContent('Data Dive');
    expect(getAllByRole('button')[1]).toHaveTextContent('Editor');
  })

})