import { useTasks } from './TaskContext'
import {useEffect} from 'react'

export function TaskList(){
    const {tasks, getTasks } = useTasks()
    useEffect(()=>{
        getTasks()
        console.log(tasks)
    },[])
    return (
        <ul>
            {
                tasks.map((task)=>{
                    return <li key={task.id}>{task.name}</li>
                })
            }
        </ul>
    )
}