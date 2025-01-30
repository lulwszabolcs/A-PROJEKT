import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import Slide from '@mui/material/Slide';

export default function SnackbarComponent({message,snackbarOpen,close}) {
    const [state, setState] = useState({
        open: false,
        Transition: Slide,
      });
    return (
        <Snackbar
        ContentProps={{
          sx: {
            background: "#4BB543",
            marginLeft:8
          }
        }}
          open={snackbarOpen}
          onClose={close}
          TransitionComponent={state.Transition}
          message={message}
          key={state.Transition.name}
          autoHideDuration={1200}
        />
    )
}