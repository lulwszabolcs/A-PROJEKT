import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import { ProblemContext } from '../../contexts/ProblemProvider';
import ErrorList from '../../components/Errors/ErrorList/ErrorList';
import { UserContext } from '../../contexts/UserProvider';
import { TypeContext } from '../../contexts/TypeProvider';

const mockSnackbarContext = {
    displaySnackbar: vi.fn(),
    SnackbarMessage: '',
    SnackbarOpen: false,
    closeSnackbar: vi.fn(),
    SnackbarSuccess: false,
};
const mockProblemContext = {
    problems:[
        {
            problemId: 4,
            name: "Rádió kapcsolat megszakadt",
            description: "A földi irányítással megszakadt a rádiókapcsolat",
            date: "2024-11-23",
            problemType: "Kommunikációs hiba",
            status: "Függőben",
            role: "Légiforgalmi irányító"
          },
          {
            problemId: 18,
            name: "Tűzriadó a C terminálon",
            description: "Riasztás történt, kiürítették az épületet",
            date: "2024-12-01",
            problemType: "Tűzriadó",
            status: "Megoldva",
            role: "Tűzoltó"
          },
    ],
    deleteSelectedProblem:vi.fn(),
    closeSelectedProblem:vi.fn(),
    problemColorPicker:vi.fn()
}
const mockUserContext = {
    userProfile: {
      name:"test user",
      email:"test@example.com",
      phoneNumber:"+3670111111",
      role:"Exampe role",
      workerId:10,
      status:"ONLINE"
    },
    checkIfUserHasPermission: vi.fn(() => Promise.resolve(true)), 
};
const mockTypeContext = {
    problemTypes:['Kommunikációs hiba'],
};
const Wrapper = ({ children }) => (
    <TypeContext.Provider value={mockTypeContext}>
            <ProblemContext.Provider value={mockProblemContext}>
                <SnackbarContext.Provider value={mockSnackbarContext}>
                    <UserContext.Provider value={mockUserContext}>
                        {children}
                    </UserContext.Provider>
                </SnackbarContext.Provider>
            </ProblemContext.Provider>
    </TypeContext.Provider>
)

describe('problem page tests',()=>{
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('renders the problems page correctly',() => {
        render(<ErrorList canCloseProblemInitial={true} canCreateProblemInitial={true} canDeleteProblemInitial={true} 
            canUpdateProblemInitial={true}/>,{wrapper:Wrapper})
        expect(screen.getByTestId("filterClosed")).toBeInTheDocument();
        expect(screen.getByTestId("filterByRole")).toBeInTheDocument();
        expect(screen.getByTestId("problemTable")).toBeInTheDocument();
        expect(screen.getByTestId("updateIcon")).toBeInTheDocument();
        expect(screen.getByTestId("deleteIcon")).toBeInTheDocument();
        expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
        expect(screen.getByTestId("addIcon")).toBeInTheDocument();
    })
    it ('renders a problem correctly',()=>{
        render(<ErrorList/>,{wrapper:Wrapper})
        expect(screen.getAllByText('Rádió kapcsolat megszakadt')[0]).toBeInTheDocument();
        expect(screen.getAllByText('A földi irányítással megszakadt a rádiókapcsolat')[0]).toBeInTheDocument();
        expect(screen.getAllByText('2024-11-23')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Kommunikációs hiba')[0]).toBeInTheDocument();
    })
    it ('deleting a problem only calls the function once',()=>{
        render(<ErrorList canDeleteProblemInitial={true}/>,{wrapper:Wrapper})
        const deleteIcon = screen.getByTestId("deleteIcon");
        fireEvent.click(deleteIcon);
        fireEvent.click(screen.getByText("Törlés"));
        expect(mockProblemContext.deleteSelectedProblem).toHaveBeenCalledTimes(1);
    })
    it('opens the edit problem menu',() => {
        render(<ErrorList canUpdateProblemInitial={true}/>,{wrapper:Wrapper})
        const updateIcon = screen.getByTestId("updateIcon");
        fireEvent.click(updateIcon);
        expect(screen.getByText("Probléma szerkesztése"));
        expect(screen.getByText("Bezár"));
        expect(screen.getByText("Mentés"));
    })
    it('opens the add problem menu',() => {
        render(<ErrorList canCreateProblemInitial={true}/>,{wrapper:Wrapper})
        const addIcon = screen.getByTestId("addIcon");
        fireEvent.click(addIcon);
        expect(screen.getByText("Új probléma hozzáadása"));
        expect(screen.getByText("Bezár"));
        expect(screen.getByText("Mentés"));
    })
    it ('closing a problem only calls the function once',()=>{
        render(<ErrorList canCloseProblemInitial={true}/>,{wrapper:Wrapper})
        const closeIcon = screen.getByTestId("closeIcon");
        fireEvent.click(closeIcon);
        expect(mockProblemContext.closeSelectedProblem).toHaveBeenCalledTimes(1);
    })
    it ('checking the show closed problems works correctly',()=>{
        render(<ErrorList />,{wrapper:Wrapper})
        const filterClosedCheckBox = screen.getByTestId("filterClosed");
        fireEvent.click(filterClosedCheckBox);
        expect(screen.getAllByText("Tűzriadó a C terminálon")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Riasztás történt, kiürítették az épületet")[0]).toBeInTheDocument();
        expect(screen.getAllByText("2024-12-01")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Tűzriadó")[0]).toBeInTheDocument();
    })
})
