import { useState } from "react";

function ToDoList(){

    const [tasks, setTasks] = useState(["Eat", "walk", "sleep"])
    const [newtask, setNewtask] = useState("")
    
    function handleInputChange (e){
        setNewtask(e.target.value)

    }
    function addTask(){
        if(newtask.trim() !==""){      
            setTasks(t => [...t, newtask]);
    setNewtask("")
        }
    }
    function deleteTask(index){
    const updatedTasks = tasks.filter((_, i) =>i !== index )  
    setTasks(updatedTasks)
    }
    function moveTaskUp(index){
        if(index > 0){
           const updatedTasks = [...tasks] ;
           [updatedTasks[index], updatedTasks[index - 1]] = 
           [updatedTasks[index - 1], updatedTasks[index]]
           setTasks(updatedTasks)
        }  
    }
    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks] ;
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks)
         }
    }

    return(
        <div className="to-do-list">
            <h1>TO DO LIST📝</h1>
            <hr />
            <div>
                <input type="text" 
                placeholder="Enter task"
                value={newtask}
                onChange={handleInputChange}/>
                <button className="add-button"
                onClick={addTask}>
                 Add ➕
                </button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                <li key={index}>
                <span className="text">
                {task}
                </span>
                <button className="delete-button" onClick={() => deleteTask(index)}>Delete 🗙</button>
                <button className="move-button" onClick={() => moveTaskUp(index)}>MoveUp ⬆</button>
                <button className="move-button" onClick={() => moveTaskDown(index)}>MoveDown ↓</button>
                </li>
            )}
            </ol>
        </div>
    )
}

export default ToDoList;