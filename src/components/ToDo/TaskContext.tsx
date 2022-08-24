import {useState, createContext, useContext} from 'react'
import { supabase } from '../../backend/supabase'

type Task = {
    created_at: string,
    name:"string",
    id: number,
    done:boolean,
    userId:string
}

type TaskContextType = {
    tasks: Array<Task>,
    addNewTask: (taskName:string ) => void,
    checkTask: ()=>void,
    updateTask: ()=>void,
    deleteTask: ()=>void,
    getTasks: ()=>void
}

const TaskContext = createContext<TaskContextType>(null!)

type Props = {
    children: JSX.Element
}

export const  TaskProvider = ({ children }: Props)=>{
    const [tasks, setTasks] = useState<Array<Task>>([])
    const user = supabase.auth.user()
    const addNewTask = async (taskName: string)=>{
        const result = await supabase.from('tasks').insert({name:taskName, userId: user?.id})
        console.log(result)
        getTasks()
    }
    const checkTask = ()=>{}
    const updateTask = ()=>{}
    const deleteTask = ()=>{}
    const getTasks = async ()=>{
        try {
            const { error, data } =  await supabase.from('tasks').select().eq("userId", user?.id)
            if (error) throw error;
            console.log(data)
            setTasks(data)
        }
        catch (error) {
            alert({error})
        } 
    }

    let  value =  {
        tasks, addNewTask, checkTask, updateTask, deleteTask, getTasks
    }

    return (<TaskContext.Provider value={value} > { children} </TaskContext.Provider>)
}

export function useTasks(){
    const context = useContext(TaskContext);
    console.log(context)
    if (context === undefined) {
      throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}