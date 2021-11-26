import React, { useState } from "react";
import "./css/jotbox.css";
import Task from "./Task";

function Jotbox(props) {
	const [input, setInput] = useState("");

	function handleChange(e) {
		setInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.addTask(input);
		setInput("");
	}

	const taskList = props.tasks.map((task) => (
		<Task
			id={task.id}
			key={task.id}
			desc={task.desc}
			completed={task.completed}
			completeTask={props.completeTask}
			saveTask={props.saveTask}
			deleteTask={props.deleteTask}
		/>
	));

	return (
		<div className="Jotbox">
			<div className="title">
				<h1>Jotbox</h1>
			</div>

			{/* todo: make separate form component */}
			<form className="add-task-form" onSubmit={handleSubmit}>
				<input
					type="text"
					className="add-task-input"
					value={input}
					onChange={handleChange}
				></input>
				<button type="submit">Add</button>
			</form>

			<ul>{taskList}</ul>
			<button type="buton" onClick={props.sortTasks}>
				Sort
			</button>
		</div>
	);
}

export default Jotbox;
