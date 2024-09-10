import { render, act } from '@testing-library/react'
import {BotSelect} from '../components/BotSelect.tsx'
import '@testing-library/jest-dom'
const testBotData = [
  { 
    id: '1',
    name: 'Bot 1',
    description: 'Desc 1',
    status: 'ENABLED'
  },
  { id: '2',
    name: 'Bot 2',
    description: 'Desc 2',
    status: 'DISABLED'
  }
]
global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve(testBotData),
  })


describe('BotSelect', () => {
  it('renders the Bot Select component', async () => {
    const {getByTestId}  = await act( async () => render(<BotSelect selectedBotID={''} setSelectedBotID={()=>{}} setSelectedBotName={()=>{}}/>));
    expect(getByTestId('bot-select')).toBeInTheDocument();
  })
  it('renders the correct item 1', async () => {
    const {getByTestId}  = await act( async () => render(<BotSelect selectedBotID={'1'} setSelectedBotID={()=>{}} setSelectedBotName={()=>{}}/>));
    expect(getByTestId('bot-select-item_1')).toBeInTheDocument();
    expect(getByTestId('bot-select-item_1')).toHaveTextContent('Bot 1');
  })
  it('renders the correct item 2', async () => {
    const {getByTestId}  = await act( async () => render(<BotSelect selectedBotID={'2'} setSelectedBotID={()=>{}} setSelectedBotName={()=>{}}/>));
    expect(getByTestId('bot-select-item_2')).toBeInTheDocument();
    expect(getByTestId('bot-select-item_2')).toHaveTextContent('Bot 2');
  })

})