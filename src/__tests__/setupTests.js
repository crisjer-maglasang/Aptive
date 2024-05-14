// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Button } from '../components/common/Button';
import { render } from '@testing-library/react';

// this test is a placeholder to retain this file and prevent test failure due to lack of tests in the file
test('renders button', () => {
  const { getByText } = render(<Button onClick={() => {}}>default</Button>, {
    name: 'test button',
  });
  expect(getByText('default')).toBeInTheDocument();
});
