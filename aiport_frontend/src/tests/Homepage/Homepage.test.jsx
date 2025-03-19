import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import { UserContext } from '../../contexts/UserProvider';
import HomePageContent from '../../components/Homepage-content/HomePageContent'
import { VehicleContext } from '../../contexts/VehicleProvider';
import { NoteContext } from '../../contexts/NoteProvider';
import { useState } from 'react';
import axios from 'axios';
const mockSnackbarContext = {
  displaySnackbar: vi.fn(),
  SnackbarMessage: '',
  SnackbarOpen: false,
  closeSnackbar: vi.fn(),
  SnackbarSuccess: false,
};
const mockUserContext = {
    getOnlineUsers: vi.fn(),
    getUsersLenght:vi.fn(),
    userProfile:{},
  };
  
const mockVehicleContext = {
    getActiveVehicles: vi.fn(),
    getInActiveVehicles: vi.fn(),
};

const mockNoteContext = {
    notes: [],
    deleteNote: vi.fn(),
}
vi.mock('axios');

describe('Homepage',()=>{
    beforeEach(() => {
        vi.clearAllMocks();
      });
    
    const Wrapper = ({ children }) => (
        <MemoryRouter>
          <SnackbarContext.Provider value={mockSnackbarContext}>
            <UserContext.Provider value={mockUserContext}>
                <VehicleContext.Provider value={mockVehicleContext}>
                    <NoteContext.Provider value={mockNoteContext}>
                        {children}
                    </NoteContext.Provider>
                </VehicleContext.Provider>
            </UserContext.Provider>
          </SnackbarContext.Provider>
        </MemoryRouter>
      );
      
    describe('Homepage tests',()=>{
        beforeEach(() => {
            vi.setSystemTime(new Date('2023-01-01T00:00:00'));
          });
        
          afterEach(() => {
            vi.useRealTimers();
          });

        it('Renders the Homepage correctly',async ()=>{
            axios.get.mockResolvedValue({
                data: {
                  hourly: {
                    rain: [0, 0, 0],
                    temperature_2m: [1, 2, 3], 
                    visibility: [15000, 16000, 17000], 
                    wind_speed_120m: [5, 6, 7],
                    snowfall: [0, 0, 0],
                  },
                },
              });
            render(<HomePageContent/>, { wrapper: Wrapper });
            await waitFor(()=>{
                expect(screen.getByTestId("weatherContainer")).toBeInTheDocument();
                expect(screen.getByTestId("userChart")).toBeInTheDocument();
                expect(screen.getByTestId("vehicleChart")).toBeInTheDocument();
                expect(screen.getByTestId("stickyNotes")).toBeInTheDocument();
            })
        })

        it('Renders the weather alert if the temperature is below 2 celsius ',async ()=>{
            axios.get.mockResolvedValue({
                data: {
                  hourly: {
                    rain: [0, 0, 0],
                    temperature_2m: [1, 2, 3], 
                    visibility: [15000, 16000, 17000], 
                    wind_speed_120m: [5, 6, 7],
                    snowfall: [0, 0, 0],
                  },
                },
              });
          
            render(<HomePageContent/>, { wrapper: Wrapper });
            await waitFor(() => {
                expect(
                    screen.getByText(
                      'Veszélyesen alacsony hőmérséklet! Fokozottan ügyeljenek biztonságukra!'
                    )
                  ).toBeInTheDocument();
            });
        })
        it('Does not render the weather alert if the temperature is above 2 celsius ',async ()=>{
            axios.get.mockResolvedValue({
                data: {
                  hourly: {
                    rain: [0, 0, 0],
                    temperature_2m: [5, 2, 3], 
                    visibility: [15000, 16000, 17000], 
                    wind_speed_120m: [5, 6, 7],
                    snowfall: [0, 0, 0],
                  },
                },
              });
          
            render(<HomePageContent/>, { wrapper: Wrapper });
            await waitFor(() => {
                expect(
                    screen.queryByText(
                      'Veszélyesen alacsony hőmérséklet! Fokozottan ügyeljenek biztonságukra!'
                    )
                  ).not.toBeInTheDocument();
            });
        })

        // törlés szimulálás, add note fgv hivas szimulalas toHaveBennCalledTimes(1)
    })
})