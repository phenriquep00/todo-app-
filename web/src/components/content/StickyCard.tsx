import { useEffect, useRef, useState } from 'react';
import { Sticky } from '../../utils/interfaces';
import axios from 'axios';
import Draggable from 'react-draggable';

interface StickyCardProps {
    sticky: Sticky
    updateStickys: () => void

}

export function StickyCard({ sticky, updateStickys}: StickyCardProps) {
    const [title, setTitle] = useState<string>(sticky.title);
    const [description, setDescription] = useState<string>(sticky.description);
    const cardRef = useRef<HTMLDivElement | null>(null)

    const stickyColor = `${sticky.color}`

    const handleUpdateSticky = async () => {
        try {
            const response = await axios.put('http://localhost:3333/sticky/update', {
                stickyId: sticky.id,
                title,
                description
            })
            setTitle(response.data.title)
            setDescription(response.data.description)
            updateStickys()
        } catch (error) {
            console.log(error)
        }
    }



    return ( 
        
        <Draggable
            position={{ x: 0, y: 0 }}
        >
            <div ref={cardRef} style={{ backgroundColor: stickyColor }} className="w-64 h-64 flex flex-col gap-4 p-4 rounded ">
                <input type="text" onBlur={handleUpdateSticky} onChange={e => setTitle(e.target.value)} value={title} className="font-fredoka text-xl bg-transparent focus:outline-none" />
                <textarea onBlur={handleUpdateSticky} onChange={e => setDescription(e.target.value)} value={description} className="h-full text-sm bg-transparent border-none focus:outline-none resize-none overflow-x-hidden overflow-y-auto scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin" />
            </div>
        </Draggable>

    )
}
