import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Paper from "@material-ui/core/Paper";
import { EditingState } from "@devexpress/dx-react-grid";
import {
	Grid,
	Table,
	TableHeaderRow,
	TableEditRow,
	TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import "./css/jotbox.css";
import Task from "./Task";
import { setWeekYearWithOptions } from "date-fns/fp";

const getRowId = (row) => row.id;

function Jotbox(props) {
	const [input, setInput] = useState("");
	const [columns] = useState([{ name: "desc", title: "Task" }]);
	const [rows, setRows] = useState(
		props.tasks.map((task) => ({ id: task.id, desc: task.desc }))
	);

	function handleChange(e) {
		setInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.addTask(input);
		setInput("");
	}

	const commitChanges = ({ added, changed, deleted }) => {
		if (added) {
			props.addTask2(added);
		}
		if (changed) {
			props.saveTask2(changed);
		}
		if (deleted) {
			props.deleteTask2(deleted);
		}
	};

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
				<Grid rows={props.tasks} columns={columns} getRowId={getRowId}>
					<EditingState onCommitChanges={commitChanges} />
					<Table />
					<TableHeaderRow />
					<TableEditRow />
					<TableEditColumn showAddCommand showEditCommand showDeleteCommand />
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
