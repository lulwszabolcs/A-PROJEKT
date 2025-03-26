import { describe, it, expect, vi, beforeEach} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import { UserContext } from '../../contexts/UserProvider';
import { ImageContext } from '../../contexts/ImageProvider';
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard';


const mockSnackbarContext = {
  displaySnackbar: vi.fn(),
  SnackbarMessage: '',
  SnackbarOpen: false,
  closeSnackbar: vi.fn(),
  SnackbarSuccess: false,
};

const mockUserContext = {
  userProfile: {
    name:"test user",
    email:"test@example.com",
    phoneNumber:"+3670111111",
    role:"Exampe role",
    workerId:10,
    status:"ONLINE"
  },
  generatePdfFileForUser: vi.fn(),
};
const mockImageContext = {
    pickImageForWorker: vi.fn(),
};
const Wrapper = ({ children }) => (
      <SnackbarContext.Provider value={mockSnackbarContext}>
        <UserContext.Provider value={mockUserContext}>
            <ImageContext.Provider value={mockImageContext}>
                    {children}
            </ImageContext.Provider>
        </UserContext.Provider>
      </SnackbarContext.Provider>
  );
describe('Profile page tests',()=>{
    beforeEach(() => {
        vi.clearAllMocks();
      });
    it('renders the profile page correctly',()=>{
        render(<ProfileCard/>, {wrapper:Wrapper})
        expect(screen.getByTestId('downloadIcon')).toBeInTheDocument();
        expect(screen.getByTestId('profilePicture')).toBeInTheDocument();
        expect(screen.getByTestId('nameField')).toBeInTheDocument();
        expect(screen.getByTestId('roleField')).toBeInTheDocument();
        expect(screen.getByTestId('emailField')).toBeInTheDocument();
        expect(screen.getByTestId('phoneNumberField')).toBeInTheDocument();
    })
    it('generate pdf function only calls once',()=>{
        render(<ProfileCard/>, {wrapper:Wrapper})
        const downloadIcon = screen.getByTestId('downloadIcon')
        fireEvent.click(downloadIcon)
        expect(mockUserContext.generatePdfFileForUser).toHaveBeenCalledTimes(1)
    })
})