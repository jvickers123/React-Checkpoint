import Modal from './modal';
import { ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

ReactDOM.createPortal = jest.fn((element, _node) => {
  return element as ReactPortal;
});
const setUp = ({ closeFunction }: { closeFunction: () => void }) =>
  render(
    <Modal closeModal={closeFunction}>
      <div>Test</div>
    </Modal>
  );
describe('Modal', () => {
  it('shows Children element in modal', () => {
    setUp({ closeFunction: jest.fn() });

    const testChild = screen.getByText('Test');

    expect(testChild).toBeInTheDocument();
  });

  it('Calls closeModal when user clicks backdrop', async () => {
    const mockCloseModal = jest.fn();
    setUp({ closeFunction: mockCloseModal });
    const backdrop = screen.getByTestId('backdrop');

    userEvent.click(backdrop);

    await waitFor(() => {
      expect(mockCloseModal).toHaveBeenCalledTimes(1);
    });
  });
});
