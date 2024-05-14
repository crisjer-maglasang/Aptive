import { useState } from 'react';
import { Button } from '.';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const ButtonComponent = () => {
  const [defaultValue, setDefaultValue] = useState('default');
  const onClick = () => setDefaultValue('updatedDefaultValue');

  return <Button onClick={onClick}>{defaultValue}</Button>;
};

test('renders button', () => {
  const { getByText } = render(<ButtonComponent />, { name: 'test button' });

  expect(getByText('default')).toBeInTheDocument();
});

test('changes Button text on click', async () => {
  const { getByText } = render(<ButtonComponent />);
  const Button = getByText('default');

  await fireEvent.click(Button);

  expect(Button).toHaveTextContent('updatedDefaultValue');
});
