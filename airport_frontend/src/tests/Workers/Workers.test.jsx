import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import { UserContext } from '../../contexts/UserProvider';
import { ImageContext } from '../../contexts/ImageProvider';
import { WorkerContext } from '../../contexts/WorkerProvider';
import WorkerInfoBox from '../../components/Workers/WorkerInfoBox/WorkerInfoBox';


const mockSnackbarContext = {
  displaySnackbar: vi.fn(),
  SnackbarMessage: '',
  SnackbarOpen: false,
  closeSnackbar: vi.fn(),
  SnackbarSuccess: false,
};

const mockUserContext = {
    checkIfUserHasPermission: vi.fn(() => Promise.resolve(true)), 
};
const mockImageContext = {
    pickImageForWorker: vi.fn(),
    getImages:vi.fn()
};
const mockWorkers = [
  { workerId: 1, name: 'John Doe',
    title: 'Developer',
    email: "wiwew20047@isorax.com",
    phoneNumber: "0620000000",
    wage: 500000 
  },
];
const mockWorkerContext = {
    getWorkers: vi.fn(),
    workers:mockWorkers,
};
const Wrapper = ({ children }) => (
      <WorkerContext.Provider value={mockWorkerContext}>
        <ImageContext.Provider value={mockImageContext}>
          <SnackbarContext.Provider value={mockSnackbarContext}>
            <UserContext.Provider value={mockUserContext}>
                    {children}
            </UserContext.Provider>
          </SnackbarContext.Provider>
        </ImageContext.Provider>
      </WorkerContext.Provider>
  );

  describe('Worker page tests', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it('renders the worker page correctly', async () => {
      render(<WorkerInfoBox />, { wrapper: Wrapper });
      await waitFor(() => {
        expect(screen.getByTestId('selectRole')).toBeInTheDocument();
        expect(screen.getAllByTestId('workerCard')[0]).toBeInTheDocument(); 
        expect(screen.getByTestId('addIcon')).toBeInTheDocument();
      });
    });
    it('renders a worker correctly', async () => {
      render(<WorkerInfoBox />, { wrapper: Wrapper });
      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Developer')).toBeInTheDocument();
      });
    });

    it('opens the add worker menu',async ()=>{
      render(<WorkerInfoBox canAddWorkerInitial={true}/>, { wrapper: Wrapper });
      const addIcon = screen.getByTestId('addIcon')
      fireEvent.click(addIcon)
      await waitFor(()=>{
        expect(screen.getByText("Új dolgozó felvétele")).toBeInTheDocument()
      })
    })
    it('opens the worker info box menu',async ()=>{
      render(<WorkerInfoBox canAddWorkerInitial={true}/>, { wrapper: Wrapper });
      const infoIcon = screen.getAllByTestId('detailIcon')[0]
      fireEvent.click(infoIcon)
      await waitFor(()=>{
        expect(screen.getByText("Dolgozó információ")).toBeInTheDocument()
      })
    })
  });
