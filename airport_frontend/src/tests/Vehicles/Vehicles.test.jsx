import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import { ImageContext } from '../../contexts/ImageProvider';
import { VehicleContext } from '../../contexts/VehicleProvider';
import { TypeContext } from '../../contexts/TypeProvider';
import VehicleList from '../../components/Vehicles/VehicleList/VehicleList';
import { UserContext } from '../../contexts/UserProvider';
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
const mockTypeContext = {
    vehicleTypes:['Busz','Emelőkocsi','Tolató traktor'],
    vehicleStatuses:['Jármű működőképes','Szemlén van','Tisztítás alatt']
};
const mockVehicleContext = {
    vehicles : [{
        vehicleId: 1,
        name: "Cobus 3000",
        license: "BUS-201",
        type: "Busz",
        vehicleYear: 2018,
        status: "Jármű működőképes"
    }]
};
const mockImageContext = {
    pickImageForVehicle:vi.fn(),
};
const Wrapper = ({ children }) => (
    <VehicleContext.Provider value={mockVehicleContext}>
        <TypeContext.Provider value={mockTypeContext}>
            <ImageContext.Provider value={mockImageContext}>
                <SnackbarContext.Provider value={mockSnackbarContext}>
                    <UserContext.Provider value={mockUserContext}>
                        {children}
                    </UserContext.Provider>
                </SnackbarContext.Provider>
            </ImageContext.Provider>
        </TypeContext.Provider>
    </VehicleContext.Provider>

);
describe('Vehicle page tests',()=>{
    beforeEach(() => {
        vi.clearAllMocks();
      });
    it('renders the vehicle page correctly',async ()=>{
        render(<VehicleList/>,{wrapper:Wrapper})
        await waitFor(()=>{
            expect(screen.getByTestId("typeFilterSelect")).toBeInTheDocument();
            expect(screen.getByTestId("statusFilterSelect")).toBeInTheDocument();
            expect(screen.getByTestId("statusChangeIcon")).toBeInTheDocument();
            expect(screen.getByTestId("vehicleCard")).toBeInTheDocument();
            expect(screen.getByTestId("addVehicleIcon")).toBeInTheDocument();
        })
    });
    it('renders a vehicle correctly',async ()=>{
        render(<VehicleList />,{wrapper:Wrapper})
        expect(screen.getByText("Cobus 3000")).toBeInTheDocument();
        expect(screen.getByText("BUS-201")).toBeInTheDocument();
        expect(screen.getByText("Busz")).toBeInTheDocument();
        expect(screen.getByText("2018")).toBeInTheDocument();
        expect(screen.getByText("Jármű működőképes")).toBeInTheDocument();
    })
    it('opens the add vehicle menu',async ()=>{
        render(<VehicleList canAddVehicleInitial={true}/>,{wrapper:Wrapper})
        const addVehicleIcon = screen.getByTestId("addVehicleIcon");
        fireEvent.click(addVehicleIcon);
        await waitFor(()=>{
            expect(screen.getByText("Jármű hozzáadása")).toBeInTheDocument()
            expect(screen.getByText("Bezár")).toBeInTheDocument()
            expect(screen.getByText("Mentés")).toBeInTheDocument()
        })
    })
    it('opens the change status menu',()=>{
        render(<VehicleList canChangeStatusInitial={true}/>,{wrapper:Wrapper})
        const changeStatusIcon = screen.getByTestId("statusChangeIcon");
        fireEvent.click(changeStatusIcon);
        expect(screen.getByText("Jármű állapot változtatása")).toBeInTheDocument()
        expect(screen.getByText("Mentés")).toBeInTheDocument()
        expect(screen.getByText("Bezár")).toBeInTheDocument()
    })
})