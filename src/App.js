import './App.css';
import TodoForm from './components/TodoForm'; // Import the Todo Form
import TodoList from './components/TodoList'; // Import the Todo Form

function App() {

  
  return (
    <div className='todoList'>
      <h1>To-Do List</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
