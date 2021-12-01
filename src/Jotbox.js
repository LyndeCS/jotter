import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import {
	Grid,
	Table,
	TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
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

	const columns = [{ name: "desc", title: "Task" }];
	const rows = props.tasks.map((task) => ({ desc: task.desc }));

	const taskList = props.tasks.map((task, index) => (
		<Draggable key={task.id} draggableId={task.id} index={index}>
			{(provided) => (
				<Task
					provided={provided}
					id={task.id}
					desc={task.desc}
					completed={task.completed}
					sdt={task.sdt}
					edt={task.edt}
					completeTask={props.completeTask}
					saveTask={props.saveTask}
					deleteTask={props.deleteTask}
				/>
			)}
		</Draggable>
	));

	return (
		<div className="Jotbox">
			<Paper>
				<Grid rows={rows} columns={columns}>
					<Table />
					<TableHeaderRow />
				</Grid>

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
			</Paper>
		</div>
	);
}

export default Jotbox;
