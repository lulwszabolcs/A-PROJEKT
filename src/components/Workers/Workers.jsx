import { ImageProvider } from '../../contexts/ImageProvider';
import { WorkerProvider } from '../../contexts/WorkerProvider';
import MiniDrawer from '../Sidebar/Sidebar';
import WorkerInfoBox from './WorkerInfoBox/WorkerInfoBox';
export default function Workers() {
    return (
        <>
            <MiniDrawer></MiniDrawer>
            <WorkerProvider>
                <ImageProvider>
                     <WorkerInfoBox/>
                </ImageProvider>
            </WorkerProvider>
        </>
    )
}