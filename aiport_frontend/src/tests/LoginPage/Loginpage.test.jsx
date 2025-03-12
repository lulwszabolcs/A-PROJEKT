import { render, screen } from '../test-utils';
import Loginpage from '../../components/Login/LoginPage/Loginpage';
import { describe, expect, test } from 'vitest';


describe("Test of the Loginpage component",()=>{
   test('Renders Loginpage without crashing', () => {
      render(<Loginpage />);
    });

    test('The login button is rendered',()=>{
      render(<Loginpage/>)
      let loginButton = screen.getByTestId("loginButton")
      expect(loginButton).toBeInTheDocument()
    })
})


