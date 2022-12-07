import { getAllItems } from './api-utils';
import { mockData } from '../mock/mockData';

describe('api-utils', () => {
  it('happy path - GetAllItems returns correct data', async () => {
    const data = await getAllItems();
    expect(data).toEqual(mockData);
  });

  it('unhappy path - console.logs error message', async () => {
    console.log = jest.fn();
    const data = await getAllItems('throwErrorMessage');

    expect(console.log).toHaveBeenCalledWith(
      'Request failed with status code 404'
    );
  });
});
