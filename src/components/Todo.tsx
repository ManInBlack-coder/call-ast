import React, { useEffect, useState } from "react"
import axios from 'axios';


const Todo = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/db')
        .then(response => {
            setTodos(response.data.todos)
        })
        .catch(error => {
            console.log(error)
        })
    
    }, [])

    
    
    
    
    
    
    return (
        <div>

            <div>
                
                
                <h2>TODO PART</h2>
                <div>
                    {todos.map((todo: {Task: string}) => (
                        <p>{todo.Task}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Todo