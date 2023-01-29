import { createSlice, current } from "@reduxjs/toolkit";

export const todoSlice = createSlice({

    name: 'todo',

    initialState: {
        nextId: 2,
        data: 
            {
                1: {
                    content: 'Content 1',
                    completed: false
                },
            },
    },

    reducers: {
        // Add a todo
        addTodo: (state, action) => {
            let {id, content} = action.payload;
            // Declare a new todo object with data from the payload      
            const newObj = {[id]: {
                content: content,
                completed: false
            }}

            // Assign the a new object from state data and also assign the new object
            let newData = Object.assign({}, current(state.data), newObj);

            // Set the state data to the new data
            state.data = newData;            
            
            // Increase the nextId
            state.nextId = state.nextId + 1;
        },
        // Edit a todo
        editTodo: (state, action) => {
            const index = action.payload.id;
            const content = action.payload.value;
            state.data[index].content = content;
        },
        // Delete todo
        deleteTodo: (state, action) => {
            const index = action.payload;
            delete state.data[index];
        },
        // Mark completed todo
        completedTodo: (state, action) => {
            const index = action.payload;
            state.data[index].completed = true;
        },
    },
});

export const { addTodo, editTodo, deleteTodo, completedTodo } = todoSlice.actions;

export default todoSlice.reducer;

