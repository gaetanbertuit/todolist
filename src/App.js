import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './App.css';

function App() {
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('tasks')) ?? []
	);
	const [addTodoInputValue, setAddTodoInputValue] = useState('');
	const [editTodoInputValue, setEditTodoInputValue] = useState({});
	const [isEditMode, setIsEditMode] = useState(false);
	const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
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

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(todos));
		console.log(localStorage.getItem('tasks'));
	}, [todos]);

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

	const deleteAllTodos = (i) => {
		setTodos([]);
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
		<div className='app'>
			<h1>Todo Today</h1>
			<blockquote>
				<span className='quote'>{quote.text}</span> <br />
				{quote.author ? <span className='author'>{quote.author}</span> : null}
			</blockquote>
			<AddTodoForm
				addTodo={addTodo}
				setAddTodoInputValue={setAddTodoInputValue}
				addTodoInputValue={addTodoInputValue}
			/>
			<div className='todo-list' ref={parent}>
				{todos.map((todo, i) =>
					i === editTodoInputValue.todoId && isEditMode ? (
						<EditTodoForm
							key={i}
							editTodoInputValue={editTodoInputValue}
							setEditTodoInputValue={setEditTodoInputValue}
							updateTodo={updateTodo}
						/>
					) : (
						<Todo
							key={i}
							id={i}
							todo={todo}
							removeTodo={removeTodo}
							editTodo={editTodo}
							manageCheckTodo={manageCheckTodo}
						/>
					)
				)}
			</div>

			{todos.length > 0 && (
				<button className='btn-delete-all' onClick={() => deleteAllTodos()}>
					DELETE ALL TODOS <i className='fi fi-rr-trash'></i>
				</button>
			)}
		</div>
	);
}

export default App;
