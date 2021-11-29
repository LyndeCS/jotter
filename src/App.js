import React, { useState, useEffect } from "react";
import "./css/App.css";
import Header from "./Header";
import Jotbox from "./Jotbox";
import Schedule from "./Schedule";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "jotter.tasks";

function App(props) {
	const [tasks, setTasks] = useState([]);

	function addTask(desc) {
		const newTask = { id: "task-" + nanoid(), desc: desc, completed: false };
		setTasks([...tasks, newTask]);
	}

	function saveTask(id, desc) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, desc: desc };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function completeTask(id) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function deleteTask(id) {
		if (window.confirm("Delete?")) {
			setTasks(tasks.filter((task) => task.id !== id));
		}
	}

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		const tasksClone = Array.from(tasks);
		const [reorderedTask] = tasksClone.splice(result.source.index, 1);
		tasksClone.splice(result.destination.index, 0, reorderedTask);

		setTasks(tasksClone);
	}

	function sortTasks() {
		const incompleteTasks = tasks.filter((task) => !task.completed);
		const completedTasks = tasks.filter((task) => task.completed);
		const sortedTasks = [...incompleteTasks, ...completedTasks];
		setTasks(sortedTasks);
	}

	// todo: decompose local storage functions
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
		if (storedTasks) setTasks(storedTasks);
	}, []);
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
	}, [tasks]);

	return (
		<div className="App">
			<Header />
			<Jotbox
				tasks={tasks}
				addTask={addTask}
				deleteTask={deleteTask}
				saveTask={saveTask}
				completeTask={completeTask}
				handleOnDragEnd={handleOnDragEnd}
				sortTasks={sortTasks}
			/>
			<Schedule />
		</div>
	);
}

export default App;
