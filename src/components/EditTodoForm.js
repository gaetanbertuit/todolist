import React from 'react';

function EditTodoForm({
	editTodoInputValue,
	setEditTodoInputValue,
	updateTodo,
}) {
	return (
		<form
			className='edit-todo-form'
			onSubmit={(e) => updateTodo(e, editTodoInputValue.todoId)}>
			<input
				autoFocus
				className='edit-todo-input'
				placeholder='Edit Todo...'
				value={editTodoInputValue.value}
				onChange={(e) =>
					setEditTodoInputValue({
						todoId: editTodoInputValue.todoId,
						value: e.target.value,
					})
				}></input>
		</form>
	);
}

export default EditTodoForm;
