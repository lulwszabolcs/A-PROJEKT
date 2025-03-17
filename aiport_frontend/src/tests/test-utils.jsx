import { render } from '@testing-library/react';
import { UserProvider } from '../contexts/UserProvider';
import { SnackbarProvider } from '../contexts/SnackbarProvider';
import { BrowserRouter } from 'react-router-dom';
import { ImageProvider } from '../contexts/ImageProvider';
import { VehicleProvider } from '../contexts/VehicleProvider';
import { TypeProvider } from '../contexts/TypeProvider';

const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => (
        <BrowserRouter>
      <SnackbarProvider>
        <UserProvider>
        <TypeProvider>
          <VehicleProvider>

        <ImageProvider>
          {children}
        </ImageProvider>
          </VehicleProvider>
        </TypeProvider>
          </UserProvider>
      </SnackbarProvider>
        </BrowserRouter>
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };