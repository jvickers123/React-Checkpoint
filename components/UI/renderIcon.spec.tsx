import { render } from '@testing-library/react';
import { renderIcon } from './renderIcon';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    sizes: string;
    fill: boolean;
    priority: boolean;
  }) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={props.alt} src={props.src} />
    );
  },
}));

describe('renderIcon', () => {
  it('returns image with correct src and alt and 30 height and width by default', () => {
    const icon = renderIcon({ iconName: 'pathName', alt: 'alt-text' });
    expect(icon.props).toEqual({
      src: '/assets/pathName.svg',
      alt: 'alt-text',
      className: 'icon',
      height: 30,
      width: 30,
    });
  });

  it('returns image with correct src and alt and changed height and width', () => {
    const icon = renderIcon({
      iconName: 'pathName',
      alt: 'alt-text',
      height: 15,
      width: 15,
    });
    expect(icon.props).toEqual({
      src: '/assets/pathName.svg',
      alt: 'alt-text',
      className: 'icon',
      height: 15,
      width: 15,
    });
  });
});
