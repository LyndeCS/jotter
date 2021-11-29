import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

	const taskList = props.tasks.map((task, index) => (
		<Draggable key={task.id} draggableId={task.id} index={index}>
			{(provided) => (
				<Task
					provided={provided}
					id={task.id}
					desc={task.desc}
					completed={task.completed}
					completeTask={props.completeTask}
					saveTask={props.saveTask}
					deleteTask={props.deleteTask}
				/>
			)}
		</Draggable>
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

			<DragDropContext onDragEnd={props.handleOnDragEnd}>
				<Droppable droppableId="tasks">
					{(provided) => (
						<ul
							className="tasks"
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{taskList}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			<button type="button" onClick={props.sortTasks}>
				Sort
			</button>
		</div>
	);
}

export default Jotbox;
