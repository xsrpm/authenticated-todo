import { useTasks } from './TaskContext'
import {useEffect, useMemo} from 'react'
import { TaskCard } from './TaskCard'

export function TaskList(){
    const {tasks, getTasks } = useTasks()
    useEffect(()=>{
        getTasks()
    },[])
    return (
        <ul>
            {
                tasks.map((task)=>{
                    return <li key={task.id}><TaskCard task={task}/></li>
                })
            }
        </ul>
    )
}