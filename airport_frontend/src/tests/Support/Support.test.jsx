import { describe, it, expect} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import SupportChat from '../../components/Support/SupportChat/SupportChat';

describe('support page tests',() => { 
    it('renders the support page correctly',() => {
        render(<SupportChat/>)
        expect(screen.getByTestId('messageInput')).toBeInTheDocument();
        expect(screen.getByTestId('sendIcon')).toBeInTheDocument();
    })
    it('input message shows in the chat log',() => {
        render(<SupportChat/>)
        const messageInput = screen.getByTestId('messageInput').querySelector("textarea");
        const sendIcon = screen.getByTestId('sendIcon')
        fireEvent.change(messageInput, { target: { value: 'Example message' } });
        fireEvent.click(sendIcon)
        expect(screen.getByText('Example message')).toBeInTheDocument();
    })
})