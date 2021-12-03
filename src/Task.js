import React, { useState } from "react";
import "date-fns";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import "./css/task.css";

function Task(props) {
	const [isEditing, setEditing] = useState(false);
	const [newDesc, setNewDesc] = useState(props.desc);
	const [startDateTime, setStartDateTime] = useState(props.sdt);
	const [endDateTime, setEndDateTime] = useState(props.edt);

	function handleChange(e) {
		setNewDesc(e.target.value);
	}

	function handleStartDateChange(date) {
		setStartDateTime(date);
	}
	function handleEndDateChange(date) {
		setEndDateTime(date);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.saveTask(props.id, newDesc, startDateTime, endDateTime);
		setEditing(false);
	}

	const editingTemplate = (
		<li
			className="task"
			ref={props.provided.innerRef}
			{...props.provided.draggableProps}
			{...props.provided.dragHandleProps}
		>
			<form onSubmit={handleSubmit} className="task-edit-form">
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
				<DateTimePicker
					className="sdt"
					renderInput={(props) => <TextField {...props} />}
					label="DateTimePicker"
					value={startDateTime}
					onChange={handleStartDateChange}
				/>
				<DateTimePicker
					className="edt"
					renderInput={(props) => <TextField {...props} />}
					label="DateTimePicker"
					value={endDateTime}
					onChange={handleEndDateChange}
				/>
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
		<li
			className="task"
			ref={props.provided.innerRef}
			{...props.provided.draggableProps}
			{...props.provided.dragHandleProps}
		>
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

	//todo: remove redundant html tags in templates
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			{isEditing ? editingTemplate : viewTemplate}
		</LocalizationProvider>
	);
}

export default Task;
