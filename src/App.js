import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm';
import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [addTodoInputValue, setAddTodoInputValue] = useState('');
	const [editTodoInputValue, setEditTodoInputValue] = useState({});
	const [isEditMode, setIsEditMode] = useState(false);
	const [quote, setQuote] = useState({ text: '', author: '' });

	useEffect(() => {
		fetch('https://type.fit/api/quotes')
			.then((response) => response.json())
			.then((data) => {
				const randomQuote = data[Math.floor(Math.random() * data.length)];
				setQuote({
					text: '"' + randomQuote.text + '"',
					author: randomQuote.author,
				});
			});
	}, []);

	const addTodo = (e) => {
		e.preventDefault();
		setTodos([
			...todos,
			{ idChecked: false, value: addTodoInputValue.toUpperCase() },
		]);
		setAddTodoInputValue('');
	};

	const removeTodo = (i) => {
		const newArray = [...todos];
		newArray.splice(i, 1);
		setTodos(newArray);
	};

	const editTodo = (id) => {
		setEditTodoInputValue({ todoId: id, value: todos[id].value });
		setIsEditMode(true);
	};

	const updateTodo = (e, id) => {
		e.preventDefault();
		const newArray = [...todos];
		newArray[id] = {
			isChecked: todos[id].isChecked,
			value: editTodoInputValue.value.toUpperCase(),
		};
		setTodos(newArray);
		setIsEditMode(false);
	};

	const manageCheckTodo = (e, id) => {
		const newArray = [...todos];
		newArray[id] = { isChecked: e.target.checked, value: todos[id].value };
		setTodos(newArray);
	};

	return (
		<>
			<h1>My To Do List</h1>
			<blockquote>
				{quote.text} <br /> - {quote.author}{' '}
			</blockquote>
			{isEditMode ? (
				<EditTodoForm
					editTodoInputValue={editTodoInputValue}
					setEditTodoInputValue={setEditTodoInputValue}
					updateTodo={updateTodo}
				/>
			) : (
				<AddTodoForm
					addTodo={addTodo}
					setAddTodoInputValue={setAddTodoInputValue}
					addTodoInputValue={addTodoInputValue}
				/>
			)}

			{todos.map((todo, i) => (
				<Todo
					key={i}
					id={i}
					todo={todo}
					removeTodo={removeTodo}
					editTodo={editTodo}
					manageCheckTodo={manageCheckTodo}
				/>
			))}
		</>
	);
}

export default App;
