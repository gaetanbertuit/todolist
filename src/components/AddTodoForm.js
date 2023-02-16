import React from 'react';

function AddTodoForm({ addTodo, addTodoInputValue, setAddTodoInputValue }) {
	return (
		<form onSubmit={(e) => addTodo(e)}>
			<input
				className='todo-input'
				placeholder='Add item...'
				value={addTodoInputValue}
				onChange={(e) => setAddTodoInputValue(e.target.value)}></input>
			<button className='btn-add-todo' type='submit'>
				Add +
			</button>
		</form>
	);
}

export default AddTodoForm;
