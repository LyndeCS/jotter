import React, { useState, useEffect } from "react";
import "./css/App.css";
import Jotbox from "./Jotbox";
import Header from "./Header";
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
				sortTasks={sortTasks}
			/>
		</div>
	);
}

export default App;
