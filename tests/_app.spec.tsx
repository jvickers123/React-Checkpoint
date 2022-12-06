import { render, screen } from '@testing-library/react';
import App from '../pages/_app';
import * as nextRouter from 'next/router';
import { Router } from 'next/router';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

const router = nextRouter;

const TestComponent = (props: any) => (
  <div data-props={props.children}>Test Component</div>
);
const testProps = { children: 'test' };

describe('App', () => {
  it('Render component with correct props', () => {
    render(
      <App
        Component={TestComponent}
        pageProps={testProps}
        router={router as unknown as Router}
      />
    );
    const testComponent = screen.getByText('Test Component');
    expect(testComponent).toBeInTheDocument();
    expect(testComponent.dataset.props).toEqual('test');
  });
});
