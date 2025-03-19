import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Loginpage from '../../components/Login/LoginPage/Loginpage';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import { UserContext } from '../../contexts/UserProvider';

const mockSnackbarContext = {
  displaySnackbar: vi.fn(),
  SnackbarMessage: '',
  SnackbarOpen: false,
  closeSnackbar: vi.fn(),
  SnackbarSuccess: false,
};

const mockUserContext = {
  userLogin: vi.fn(),
};

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Loginpage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const Wrapper = ({ children }) => (
    <MemoryRouter>
      <SnackbarContext.Provider value={mockSnackbarContext}>
        <UserContext.Provider value={mockUserContext}>
          {children}
        </UserContext.Provider>
      </SnackbarContext.Provider>
    </MemoryRouter>
  );
  describe('Loginpage tests',()=>{
  it('renders login form correctly', () => {
    render(<Loginpage />, { wrapper: Wrapper });

    expect(screen.getByTestId("userNameField")).toBeInTheDocument();
    expect(screen.getByTestId('passwordField')).toBeInTheDocument();
    expect(screen.getByTestId('loginButton')).toBeInTheDocument();
  });

  it('submits form with valid data and handles successful login', async () => {
    mockUserContext.userLogin.mockResolvedValue(true);

    render(<Loginpage />, { wrapper: Wrapper });

    const loginButton = screen.getByTestId('loginButton');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockUserContext.userLogin).toHaveBeenCalledWith({
        username: 'viccelek',
        password: 'viccelek123',
      });
      expect(mockSnackbarContext.displaySnackbar).toHaveBeenCalledWith(
        'Sikeres bejelentkezés!',
        true
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    }, { timeout: 1500 });
  });

  it('handles failed login attempt', async () => {
    mockUserContext.userLogin.mockResolvedValue(false);

    render(<Loginpage />, { wrapper: Wrapper });

    const loginButton = screen.getByTestId('loginButton');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockUserContext.userLogin).toHaveBeenCalledWith({
        username: 'viccelek',
        password: 'viccelek123',
      });
      expect(mockSnackbarContext.displaySnackbar).toHaveBeenCalledWith(
        'Sikertelen bejelentkezés!',
        false
      );
    });
  });

  it('updates input values when changed', () => {
    render(<Loginpage />, { wrapper: Wrapper });

    const usernameInput = screen.getByTestId("userNameField").querySelector("input");
    const passwordInput = screen.getByTestId('passwordField').querySelector("input");

    fireEvent.change(usernameInput, { target: { value: 'newuser' } });
    fireEvent.change(passwordInput, { target: { value: 'newpass123' } });

    expect(usernameInput).toHaveValue('newuser');
    expect(passwordInput).toHaveValue('newpass123');
  });
  })
});