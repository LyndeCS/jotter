import React, { useState } from "react";
import "./css/task.css";

function Task(props) {
	const [isEditing, setEditing] = useState(false);
	const [newDesc, setNewDesc] = useState(props.desc);

	function handleChange(e) {
		setNewDesc(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.saveTask(props.id, newDesc);
		setEditing(false);
	}

	const editingTemplate = (
		<li className="task">
			<form onSubmit={handleSubmit}>
				<button
					type="button"
					className="complete-task-button"
					onClick={() => props.completeTask(props.id)}
				></button>
				<div
					className={
						props.completed
							? "task-desc completed-true"
							: "task-desc completed-false"
					}
				></div>
				<input
					type="text"
					className="edit-task-input"
					value={newDesc}
					onChange={handleChange}
				></input>
				<div className="right-task-buttons">
					<button type="submit" className="save-task-button">
						Save
					</button>
					<button
						type="button"
						className="delete-task-button"
						onClick={() => props.deleteTask(props.id)}
					>
						Delete
					</button>
				</div>
			</form>
		</li>
	);

	const viewTemplate = (
		<li className="task">
			<button
				type="button"
				className="complete-task-button"
				onClick={() => props.completeTask(props.id)}
			></button>
			<div
				className={
					props.completed
						? "task-desc completed-true"
						: "task-desc completed-false"
				}
			>
				{props.desc}
			</div>
			<div className="right-task-buttons">
				<button
					type="button"
					className="edit-task-button"
					onClick={() => setEditing(true)}
				>
					Edit
				</button>
				<button
					type="button"
					className="delete-task-button"
					onClick={() => props.deleteTask(props.id)}
				>
					Delete
				</button>
			</div>
		</li>
	);

	return isEditing ? editingTemplate : viewTemplate; //todo: remove redundant html tags in templates
}

export default Task;
