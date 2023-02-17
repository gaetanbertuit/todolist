import React from 'react';

function AddTodoForm({ addTodo, addTodoInputValue, setAddTodoInputValue }) {
	return (
		<form className='add-todo-form' onSubmit={(e) => addTodo(e)}>
			<input
				className='add-todo-input'
				placeholder='Add item... (Press enter to submit)'
				value={addTodoInputValue}
				onChange={(e) => setAddTodoInputValue(e.target.value)}></input>
		</form>
	);
}

export default AddTodoForm;
