import { render } from '@testing-library/react';
import { UserProvider } from '../contexts/UserProvider';
import { SnackbarProvider } from '../contexts/SnackbarProvider';
import { BrowserRouter } from 'react-router-dom';

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
        <BrowserRouter>
      <SnackbarProvider>
        <UserProvider>{children}</UserProvider>
      </SnackbarProvider>
        </BrowserRouter>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };