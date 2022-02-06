import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileUpload from './FileUpload';

describe('<FileUpload />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<FileUpload />);
    const fileUpload = getByTestId('FileUpload');

    expect(fileUpload).toBeInTheDocument();
  });
});