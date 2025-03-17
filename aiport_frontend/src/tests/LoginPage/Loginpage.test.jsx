import { fireEvent, render, screen, waitFor } from '../test-utils';
import Loginpage from '../../components/Login/LoginPage/Loginpage';
import { beforeEach, describe, expect, test,vi } from 'vitest';
import { useContext } from 'react';

describe("Test of the Loginpage component",()=>{
   test('Renders Loginpage without crashing', () => {
      render(<Loginpage />);
      expect(screen.getByTestId('loginForm')).toBeInTheDocument();
      expect(screen.getByText('Felhasználónév')).toBeInTheDocument();
      expect(screen.getByText('Jelszó')).toBeInTheDocument();
      expect(screen.getByTestId('loginButton')).toBeInTheDocument();
    });

    test('The login button is rendered',()=>{
      render(<Loginpage/>)
      let loginButton = screen.getByTestId("loginButton")
      expect(loginButton).toBeInTheDocument()
    })
})


