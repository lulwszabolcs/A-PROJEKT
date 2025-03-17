import { fireEvent, render, screen, waitFor } from '../test-utils';
import { beforeEach, describe, expect, test,vi } from 'vitest';
import Homepage from '../../components/Homepage-content/Homepage';

describe("Test of the Homepage component",()=>{
   test('Renders Homepage without crashing', () => {
      render(<Homepage />);
    });
})


