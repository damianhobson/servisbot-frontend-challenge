import { render } from '@testing-library/react'
import {ViewSelect} from '../ViewSelect'
import {VIEWS} from '../../constants.ts'

describe('ViewSelect', () => {
  it('renders the view component', async () => {
    const {getByTestId}  = render(<ViewSelect views={VIEWS} selectedView={VIEWS[0].key} setSelectedView={()=>{}}/>);
    expect(getByTestId('view-select')).toBeInTheDocument();
  })

  it('renders the bots - worker option', async () => {
    const {getByTestId}  = render(<ViewSelect views={VIEWS} selectedView={VIEWS[0].key} setSelectedView={()=>{}}/>);
    expect(getByTestId('view-select-bots_workers')).toBeInTheDocument();
  })

  it('renders the bots - logs option', async () => {
    const {getByTestId}  = render(<ViewSelect views={VIEWS} selectedView={VIEWS[1].key} setSelectedView={()=>{}}/>);
    expect(getByTestId('view-select-bots_logs')).toBeInTheDocument();
  })

  it('renders the workers - logs option', async () => {
    const {getByTestId}  = render(<ViewSelect views={VIEWS} selectedView={VIEWS[2].key} setSelectedView={()=>{}}/>);
    expect(getByTestId('view-select-workers_logs')).toBeInTheDocument();
  })
})