import Modal from './modal';
import { ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

ReactDOM.createPortal = jest.fn((element, _node) => {
  return element as ReactPortal;
});

describe('Modal', () => {
  it('shows Children element in modal', () => {
    render(
      <Modal closeModal={jest.fn()}>
        <div>Test</div>
      </Modal>
    );

    const testChild = screen.getByText('Test');

    expect(testChild).toBeInTheDocument();
  });

  it('Calls closeModal when user clicks backdrop', async () => {
    const closeModal = jest.fn();
    render(
      <Modal closeModal={closeModal}>
        <div>Test</div>
      </Modal>
    );
    const backdrop = screen.getByTestId('backdrop');

    userEvent.click(backdrop);

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });
});
