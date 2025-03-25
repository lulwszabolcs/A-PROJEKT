import MiniDrawer from '../Sidebar/Sidebar';
import ErrorList from './ErrorList/ErrorList';
import { TypeProvider } from '../../contexts/TypeProvider';
import { ProblemProvider } from '../../contexts/ProblemProvider';
export default function Errors() {
    return (
        <>
        <MiniDrawer></MiniDrawer>
        <ProblemProvider>
        <TypeProvider>
            <ErrorList></ErrorList>
        </TypeProvider>
        </ProblemProvider>
        </>
    )
}