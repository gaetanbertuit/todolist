import React, { forwardRef } from 'react';

const Todo = forwardRef(
	({ todo, id, removeTodo, editTodo, manageCheckTodo }, ref) => {
		return (
			<div
				ref={ref}
				className={todo.isChecked ? 'todo todo-checked' : 'todo'}
				id={id}>
				<div className='todo-text'>
					<input
						type='checkbox'
						onChange={(e) => {
							manageCheckTodo(e, id);
						}}
					/>
					<span
						onClick={() => {
							editTodo(id);
						}}>
						{todo.value}
					</span>
				</div>
				<div className='todo-buttons'>
					<button
						className='btn-edit'
						onClick={() => {
							editTodo(id);
						}}>
						<i className='fi fi-rr-edit'></i>
					</button>
					<button
						className='btn-delete'
						onClick={() => {
							removeTodo(id);
						}}>
						<i className='fi fi-br-cross'></i>
					</button>
				</div>
			</div>
		);
	}
);

export default Todo;
