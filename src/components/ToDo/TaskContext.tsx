import {useState, createContext, useContext} from 'react'
import { supabase } from '../../backend/supabase'

export type Task = {
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
        try {
            const result = await supabase.from('tasks').insert({name:taskName, userId: user?.id})
            if(result.error) throw result.error
            setTasks([
                ...tasks,
                result.data[0]
            ])
            console.log('addNewTask',result.data[0])
        } catch (error) {
            alert(error)
        }
    }
    const checkTask = ()=>{}
    const updateTask = ()=>{}
    const deleteTask = ()=>{}
    const getTasks = async ()=>{
        try {
            const { error, data } = await supabase
              .from("tasks")
              .select()
              .eq("userId", user?.id)
              .order("id");
            if (error) throw error;
            console.log('getTasks',data)
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
    // console.log('context', context)
    if (context === undefined) {
      throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}