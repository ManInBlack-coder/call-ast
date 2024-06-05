import React, { useEffect, useState } from "react"
import axios from 'axios';
import { useCookies } from "react-cookie";




const Todo = () => {

    const [todos, setTodos] = useState([])
    const [cookies] = useCookies(['user'])
 



    //votab backist 
    useEffect(() => {
        axios.get('http://localhost:8081/db')
        .then(response => {
            
            setTodos(response.data.todos)
            
        })
        .catch(error => {
            console.log(error)
        })
    
    }, [])



    const deleteTodo = async (id: any) => {
        try {
            const todoDelete = await axios.delete(`http://localhost:8081/delete/todo/${id}`);
            
            if (todoDelete.status === 200) {
                console.log('Todo deleted successfully');
                window.location.reload(); 
            } 
        } catch (error) {
            console.error('Error deleting todo:', error);
            

        }
    }
    

    console.log(todos)
    todos.forEach(todo => {
        console.log(todo)
    });


  

    return (
        <div>

            <div>
                
                
                <h2>TODO PART</h2>
                <div>
                    {todos.map((todo: any) => (
                        
                        <p>{todo.Task} 
                        
                        <button id="delete_todo" onClick={() => deleteTodo(todo.Task_id)}>Completed</button>
                    

                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Todo