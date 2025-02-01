import { createContext } from "react";

const ProblemContext = createContext()

function getProblemTypes(params) {
    
}

const ProblemProvider = ({children}) => {
    return <ProblemContext.Provider value={{}}>
        {children}
    </ProblemContext.Provider>
}

export {ProblemContext,ProblemProvider}