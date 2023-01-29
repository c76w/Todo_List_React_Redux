import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import the useSelector and useDispatch from redux
import { editTodo, deleteTodo, completedTodo } from '../store/todo'; // Import actions form todo slice


const TodoList = () => {
    
    // Declare the todo data variable from the todo slice store
    const todoData = useSelector((state) => state.todo.data);
    // Declare the dispact variable
    const dispatch = useDispatch();

    // Decalre the eidtInput variable
    let editInput = '';

    // Function to handle the button click for edit a todo or save a todo
    const handleEditClick = (e, todoContent, action, todoIndex = 0) => {
        // Prevent the default submit action to stop page refreash
        e.preventDefault();

        // Delcare the variables
        const outerElement = e.target.parentNode.parentNode.parentNode; // Get the edit button outer parent
        const editElement = outerElement.querySelector('.todoEdit');  // Get the outer parent edit element
        const contentElement = outerElement.querySelector('.todoContent'); // Get the edit content element
        const editInputValue = editElement.querySelector('input').value; // Get the edit input value
        const todoButtons = outerElement.querySelector('.todoButtons'); // Get the buttons outer element
        const errorsElement = outerElement.querySelector('.errors'); // Get the edit errors element

        // If edit button has been clicked hide and show elements
        if (action === 'edit') {
            editElement.classList.remove('d-none'); // Show the edit element
            contentElement.classList.add('d-none'); // Hide the todo content element
            todoButtons.classList.add('d-none'); // Hide the completed, edit and delete buttons
        }

        // If the save button was clicked, dispatch the data to the reducer and reset the
        // above elements to show the todo content once again now that the item has been edited
        if (action === 'save') {
            editInput = editInputValue; // Set the input variable value for the new todo

            if (editInput.length <= 3) {
                errorsElement.classList.remove('d-none');
                return;
            }
            errorsElement.classList.add('d-none'); // Hide the errors element
            editElement.classList.add('d-none'); // Hide the edit element
            contentElement.classList.remove('d-none'); // Show the todo content
            todoButtons.classList.remove('d-none'); // Show the completed, edit and delete buttons

            dispatch(editTodo({id: todoIndex, value: editInput})); // Dispatch the data to the reducer
        }
    }

    const ShowTodos = () => {
        return (
            <div className='card'>
                <ul className="list-group list-group-flush">
                    {/* Loop through the todo items and display them */}
                    {Object.entries(todoData).map((todoItem, i) => {

                        // Set the variables for each todo data
                        let todoIndex = todoItem[0]; 
                        let todoContent = todoItem[1].content;
                        let completed = todoItem[1].completed;

                        return (
                            <li key={'todo-'+ todoIndex} className="list-group-item">
                                <div className='d-flex flex-wrap justify-content-between aligin-items-center'>
                                    <div className={'todoContent ' + (completed ? 'text-success' : '')}>{todoContent}</div>
                                    <div className='todoEdit d-none'>
                                        <form onSubmit={(e) => handleEditClick(e, todoContent, 'save', todoIndex)}>
                                            <input className='todoInput' type='text' defaultValue={todoContent}></input>
                                            <div className='errors d-none'>Please enter a valid item more then 3 characters</div>
                                            <button type='submit' className='btn btn-success'>Save</button>
                                        </form>
                                    </div>
                                    <div className='todoButtons ms-auto'>
                                        {/* If the item is marked as complete then don't show the edit or completed buttons */}
                                        {completed ? '' : <button type='button' onClick={() => dispatch(completedTodo(todoIndex))}><i className="bi bi-check2-square text-success" title='Mark as complete'></i></button>}
                                        {completed ? '' : <button type='button' onClick={(e) => handleEditClick(e, todoContent, 'edit')}><i className="bi bi-pencil-square text-warning" title='Edit Item'></i></button>}
                                        <button type='button' onClick={() => dispatch(deleteTodo(todoIndex))}><i className="bi bi-trash3-fill text-danger" title='Delete Item'></i></button>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div>
            <ShowTodos />      
        </div>
    );
};

export default TodoList;