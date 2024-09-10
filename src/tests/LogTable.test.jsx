import { render, act, within } from '@testing-library/react'
import {LogTable} from '../components/LogTable.tsx'
import '@testing-library/jest-dom'
const domTestingLib = require('@testing-library/dom')
const {queryHelpers} = domTestingLib
const queryByRowIndex = queryHelpers.queryByAttribute.bind(
  null,
  'data-rowindex',
)
const testLogData = [
  {
    "id": "a3922ad6-49ed-4cf3-8293-cc4d58a5d4c9",
    "created": "2024-04-22",
    "message": "Message 1",
    "bot": "44700aa2-cba6-43d2-9ad4-8d8a499bd356",
    "worker": "e5d7874c-fd2d-41b8-abc1-2e311964ae8c"
  },
  {
    "id": "b3daff60-4682-453d-bfa9-82547ff1150b",
    "created": "2024-04-22",
    "message": "Message 2",
    "bot": "04140c19-0c46-43c6-8e78-f459cd3b3370",
    "worker": "e5d7874c-fd2d-41b8-abc1-2e311964ae8c"
  },
  {
    "id": "96ed2649-2579-4d7d-bc73-56e740c16fc5",
    "created": "2024-04-22",
    "message": "Message 3",
    "bot": "44700aa2-cba6-43d2-9ad4-8d8a499bd356",
    "worker": "374bef68-e278-4b1e-810b-83eccbdf3eaf"
  },
]

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve(testLogData),
  })


describe('Log Table', async () => {
  
  it('renders the Log Table component', async () => {
    const {getByTestId, getByRole}  = await act( async () => render( <LogTable selectedBotID={'1'} selectedWorkerID={'1'}/>));
    expect(getByTestId('log-table')).toBeInTheDocument();
    expect(getByRole('table-title')).toHaveTextContent('Logs')
  })
  it('renders the correct row elements', async () => {
    const {getAllByRole}  = await act( async () => render( <LogTable selectedBotID={'1'} selectedWorkerID={'1'}/>));
    expect(within(getAllByRole('row')[1]).getAllByRole('gridcell')[0]).toHaveTextContent('2024-04-22');
    expect(within(getAllByRole('row')[1]).getAllByRole('gridcell')[1]).toHaveTextContent('Message 1');
    expect(within(getAllByRole('row')[2]).getAllByRole('gridcell')[1]).toHaveTextContent('Message 2');
  })


})