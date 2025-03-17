import { fireEvent, render, screen, waitFor } from '../test-utils';
import Profile from '../../components/Profile/ProfileCard/ProfileCard';
import { beforeEach, describe, expect, test,vi } from 'vitest';

describe("Test of the Profile component",()=>{
   test('Renders Profile without crashing', () => {
      render(<Profile />);
    });
})


