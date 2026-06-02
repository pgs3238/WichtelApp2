import { render, screen } from '@testing-library/react';
//import Apps from './Apps';
import Apps from './index';

test('renders app without crashing', () => {
  render(<Apps />);
  // This is a simple test that just makes sure the component can mount without throwing an error
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
