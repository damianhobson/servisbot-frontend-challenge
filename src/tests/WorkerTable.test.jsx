import { render, act, within } from '@testing-library/react'
import {WorkerTable} from '../components/WorkerTable.tsx'
import '@testing-library/jest-dom'
const domTestingLib = require('@testing-library/dom')
const {queryHelpers} = domTestingLib
const queryByRowIndex = queryHelpers.queryByAttribute.bind(
  null,
  'data-rowindex',
)
const testWorkerData = [
  {
    "id": "6f4fdfd9-da33-4711-9386-579e8101dc43",
    "name": "Worker One",
    "description": "First Worker",
    "bot": "Bot One",
    "created": 1713773401591
  },
  {
    "id": "98f2b3cd-53dc-42b3-b327-935113e2b105",
    "name": "Worker Two",
    "description": "Second Worker",
    "bot": "Bot One",
    "created": 1713762135068
  },
  {
    "id": "9844fd23-415b-4d2f-9fa1-78571036cd96",
    "name": "Worker Three",
    "description": "Third Worker",
    "bot": "Bot Two",
    "created": 1713746559494
  }
]

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve(testWorkerData),
  })

describe('Worker Table', async () => {
  
  it('renders the Log Table component', async () => {
    const {getByTestId, getByRole}  = await act( async () => render( <WorkerTable selectedBotID={'1'} selectedBotName={'1'}/>));
    expect(getByTestId('worker-table')).toBeInTheDocument();
    expect(getByRole('table-title')).toHaveTextContent('Workers')
  })
  it('renders the correct row elements', async () => {
    const {getAllByRole}  = await act( async () => render( <WorkerTable selectedBotID={'1'} selectedBotName={'Bot One'}/>));
    expect(within(getAllByRole('row')[1]).getAllByRole('gridcell')[0]).toHaveTextContent('Worker One');
    expect(within(getAllByRole('row')[1]).getAllByRole('gridcell')[1]).toHaveTextContent('Bot One');
    expect(within(getAllByRole('row')[3]).getAllByRole('gridcell')[1]).toHaveTextContent('Bot Two');
    expect(within(getAllByRole('row')[3]).getAllByRole('gridcell')[3]).toHaveTextContent('April 22, 2024 1:42 AM');
  })

})