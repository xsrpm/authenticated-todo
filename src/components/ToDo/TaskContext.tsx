import {useState, createContext, useContext} from 'react'
import { supabase } from '../../backend/supabase'

type created_at = string;
type name = string;
type id = number;
type done = boolean;
type userId = string;

export type Task = {
  created_at: created_at;
  name: name;
  id: id;
  done: done;
  userId: userId;
};

export type UpdateTask = {
  created_at?: created_at;
  name?: name;
  id?: id;
  done?: done;
  userId?: userId;
};

type TaskContextType = {
  tasks: Array<Task>;
  addNewTask: (taskName: string) => void;
  updateTask: (taskId: number, updateFields: UpdateTask) => void;
  deleteTask: (taskId: number) => void;
  getTasks: () => void;
};

const TaskContext = createContext<TaskContextType>(null!);

type Props = {
  children: JSX.Element;
};

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const user = supabase.auth.user();
  const addNewTask = async (taskName: string) => {
    try {
      const result = await supabase
        .from("tasks")
        .insert({ name: taskName, userId: user?.id });
      if (result.error) throw result.error;
      setTasks([...tasks, result.data[0]]);
      //console.log("addNewTask", result.data[0]);
    } catch (error) {
      alert(error);
    }
  };
  const updateTask = async (taskId: number, updateFields: UpdateTask) => {
    console.log(updateFields);
    try {
      const { error, data } = await supabase
        .from("tasks")
        .update(updateFields)
        .eq("userId", user?.id)
        .eq("id", taskId);
      if (error) throw error;
      //console.log("updateTask", data);
    } catch (error) {
      alert(error);
    }
  };
  const deleteTask = async (taskId: number) => {
    console.log(taskId);
    try {
      const { error, data } = await supabase
        .from("tasks")
        .delete()
        .eq("userId", user?.id)
        .eq("id", taskId);
      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== taskId));
      //console.log("deleteTask", data);
    } catch (error) {
      alert(error);
    }
  };
  const getTasks = async () => {
    try {
      const { error, data } = await supabase
        .from("tasks")
        .select()
        .eq("userId", user?.id)
        .order("id");
      if (error) throw error;
      //console.log("getTasks", data);
      setTasks(data);
    } catch (error) {
      alert({ error });
    }
  };

  let value = {
    tasks,
    addNewTask,
    updateTask,
    deleteTask,
    getTasks,
  };

  return (
    <TaskContext.Provider value={value}> {children} </TaskContext.Provider>
  );
};

export function useTasks(){
    const context = useContext(TaskContext);
    // console.log('context', context)
    if (context === undefined) {
      throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
}