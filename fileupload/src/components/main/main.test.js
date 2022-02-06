import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import main from './main';

describe('<main />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<main />);
    const main = getByTestId('main');

    expect(main).toBeInTheDocument();
  });
});