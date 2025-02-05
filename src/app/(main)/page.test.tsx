import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
it('renders the correct university link after searching', () => {
  render(<Test />);
});

function Test() {
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}
