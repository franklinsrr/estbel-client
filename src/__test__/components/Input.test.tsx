import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Input } from '@/components/Input';
import { HTMLInputTypeAttribute } from 'react';

describe('Input Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with different input types', () => {
    const types = ['email', 'text', 'search', 'tel', 'date'];
    types.forEach(type => {
      cleanup(); // Clean up after each render
      render(<Input type={type as unknown as HTMLInputTypeAttribute} />);

      // For date inputs, we need to use a different approach
      if (type === 'date') {
        const input = screen.getByDisplayValue('');
        expect(input).toHaveAttribute('type', type);
      } else {
        const role = type === 'search' ? 'searchbox' : 'textbox';
        const input = screen.getByRole(role);
        expect(input).toHaveAttribute('type', type);
      }
    });
  });

  it('renders password input with visibility toggle', () => {
    render(<Input type="password" />);
    const input = screen.getByDisplayValue('');
    const toggleButton = screen.getByRole('button');

    // Initially password should be hidden
    expect(input).toHaveAttribute('type', 'password');

    // Click toggle button to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    // Click toggle button again to hide password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders appropriate icons for different input types', () => {
    const types = ['email', 'text', 'search', 'tel', 'date'];
    types.forEach(type => {
      cleanup(); // Clean up after each render
      const { container } = render(
        <Input type={type as unknown as HTMLInputTypeAttribute} />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  it('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<Input className={customClass} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(customClass);
  });
});
