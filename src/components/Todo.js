import React from 'react';

function Todo({ todo, id, removeTodo, editTodo, manageCheckTodo }) {
	return (
		<div id={id}>
			<input
				type='checkbox'
				onChange={(e) => {
					manageCheckTodo(e, id);
				}}
			/>
			<span
				style={
					todo.isChecked
						? { color: 'green', textDecoration: 'line-through' }
						: { color: 'black', textDecoration: 'none' }
				}>
				{todo.value}
			</span>

			<button
				className='btn-edit'
				onClick={() => {
					editTodo(id);
				}}>
				EDIT
			</button>
			<button
				className='btn-delete'
				onClick={() => {
					removeTodo(id);
				}}>
				X
			</button>
		</div>
	);
}

export default Todo;
