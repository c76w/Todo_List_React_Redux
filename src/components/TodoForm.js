import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import the useSelector and useDispatch from redux
import { addTodo } from '../store/todo'; // Import actions form todo slice


const TodoForm = () => {

    // Declare the nextId variable from the todo slice store
    const nextId = useSelector((state) => state.todo.nextId);

    // Set state for the user input
    const [userInput, setUserInput] = useState('');

    // Declare the dispact variable
    const dispatch = useDispatch();

    // Function to handle the form submit and create a new todo
    const handleSubmit = (e) => {
        // Prevent default submit
        e.preventDefault();
        // Send the data to the addTodo
        dispatch(addTodo({id: nextId, content: userInput}));

        // Clear the input
        setUserInput('');
    }

    const handleOnChange = (e) => {
        let inputValue = e.target.value;

        setUserInput(e.target.value);

        const errorsElement = document.getElementById('errors');
        const saveButton = document.getElementById('saveBtn');

        if (inputValue.length <= 3) {
            errorsElement.classList.remove('d-none');
            saveButton.classList.add('disabled');
        } else {
            errorsElement.classList.add('d-none');
            saveButton.classList.remove('disabled');
        }
    }

    return (
        <div className='card'>
            <div className='todoAdd'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='d-flex flex-column gap-3 align-items-center'>
                        <label className='h3'>Add Item</label>
                        <input className='addTodo' type='text' value={userInput} onChange={(e) => handleOnChange(e)} required minLength={3}></input>
                        <div id='errors' className='errors d-none'>Please enter a valid item more then 3 characters</div>
                        <button id='saveBtn' type='submit' className='btn btn-success'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;