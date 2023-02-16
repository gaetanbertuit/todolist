import React from 'react';

function EditTodoForm({
	editTodoInputValue,
	setEditTodoInputValue,
	updateTodo,
}) {
	return (
		<form onSubmit={(e) => updateTodo(e, editTodoInputValue.todoId)}>
			<input
				className='todo-input'
				placeholder='Edit Todo...'
				value={editTodoInputValue.value}
				onChange={(e) =>
					setEditTodoInputValue({
						todoId: editTodoInputValue.todoId,
						value: e.target.value,
					})
				}></input>
			<button className='btn-add-todo' type='submit'>
				Update
			</button>
		</form>
	);
}

export default EditTodoForm;
