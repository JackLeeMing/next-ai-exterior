import '@/app/juxtapose.scss'
import { Juxtapose } from './Juxtapose'
export default function M3Home() {
    return (
        <div className='juxtapose-wrapper' style={{ width: 500, height: 500 }}>
            <h1>KnightLab JuxtaposeJS</h1>
            <div id="juxtapose" />
            <Juxtapose />
        </div>
    )
}