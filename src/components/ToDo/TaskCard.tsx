import { Task } from './TaskContext'

type Props = {
    task: Task
}

export function TaskCard({task}: Props){
    return <span>{task.name}</span>
}