import { render, act } from '@testing-library/react'
import {WorkerSelect} from './index.tsx'
import '@testing-library/jest-dom'
const testWorkerData = [
  { 
    id: '1',
    name: 'Worker 1',
    description: 'Desc 1',
    bot: 'Bot 1'
  },
  { id: '2',
    name: 'Worker 2',
    description: 'Desc 2',
    bot: 'Bot 1'
  }
]
global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve(testWorkerData),
  })

describe('WorkerSelect', () => {
  it('renders the Bot Select component', async () => {
    const {getByTestId}  = await act( async () => render(<WorkerSelect selectedWorkerID={''} setSelectedWorkerID={()=>{}} selectedBotName={'Bot 1'}/>));
    expect(getByTestId('worker-select')).toBeInTheDocument();
  })
  it('renders the correct item 1', async () => {
    const {getByTestId}  = await act( async () => render(<WorkerSelect selectedWorkerID={testWorkerData[0].id} setSelectedWorkerID={()=>{}} selectedBotName={'Bot 1'}/>));
    expect(getByTestId('worker-select-item_1')).toBeInTheDocument();
    expect(getByTestId('worker-select-item_1')).toHaveTextContent('Worker 1');
  })
  it('renders the correct item 2', async () => {
    const {getByTestId}  = await act( async () => render(<WorkerSelect selectedWorkerID={testWorkerData[1].id} setSelectedWorkerID={()=>{}} selectedBotName={'Bot 1'}/>));
    expect(getByTestId('worker-select-item_2')).toBeInTheDocument();
    expect(getByTestId('worker-select-item_2')).toHaveTextContent('Worker 2');
  })

})