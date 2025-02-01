
const { createContext, useState } = require("react");

const SnackbarContext = createContext()

const SnackbarProvider = ({children}) => {
    const [SnackbarOpen,setSnackbarOpen] = useState(false)
    const [SnackbarMessage,setSnackbarMessage] = useState("")
    const [SnackbarSuccess,setSnackbarSuccess] = useState(true)
    function displaySnackbar(SnackbarMessage,success) {
        setSnackbarOpen(true)
        if (success == true) {
            setSnackbarSuccess(true)
        } else {
            setSnackbarSuccess(false)
        }
        setSnackbarMessage(SnackbarMessage)
    }
    function closeSnackbar() {
        setSnackbarOpen(false)
    }
    return <SnackbarContext.Provider value={{displaySnackbar,SnackbarOpen,SnackbarMessage,setSnackbarMessage,closeSnackbar,SnackbarSuccess}}>
        {children}
    </SnackbarContext.Provider>
}

export {SnackbarContext,SnackbarProvider}