
const { createContext, useState } = require("react");

const SnackbarContext = createContext()

const SnackbarProvider = ({children}) => {
    const [SnackbarOpen,setSnackbarOpen] = useState(false)
    const [SnackbarMessage,setSnackbarMessage] = useState("")
    function displaySnackbar(SnackbarMessage) {
        setSnackbarOpen(true)
        setSnackbarMessage(SnackbarMessage)
    }
    function closeSnackbar() {
        setSnackbarOpen(false)
    }
    return <SnackbarContext.Provider value={{displaySnackbar,SnackbarOpen,SnackbarMessage,setSnackbarMessage,closeSnackbar}}>
        {children}
    </SnackbarContext.Provider>
}

export {SnackbarContext,SnackbarProvider}