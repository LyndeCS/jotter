import React, { useState, useEffect } from "react";
import "./css/App.css";
import Header from "./Header";
import Jotbox from "./Jotbox";
import Schedule from "./Schedule";
import { nanoid } from "nanoid";

const LOCAL_STORAGE_KEY = "jotter.tasks";

function App(props) {
	const [tasks, setTasks] = useState([]);
	const [events, setEvents] = useState([]);

	function addTask(desc) {
		const newTask = { id: "task-" + nanoid(), desc: desc, completed: false };
		setTasks([...tasks, newTask]);
	}

	function addTask2(added) {
		const newTasks = added.map((task) => ({
			id: "task-" + nanoid(),
			desc: task.desc,
			completed: false,
			sdt: task.sdt,
			edt: task.edt,
		}));
		setTasks([...tasks, ...newTasks]);
	}

	function saveTask(id, desc, sdt, edt) {
		const updatedTasks = tasks.map((task) => {
			if (id === task.id) {
				return { ...task, desc: desc, sdt: sdt, edt: edt };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	function saveTask2(changed) {
		const updatedTasks = tasks.map((task) =>
			changed[task.id] ? { ...task, ...changed[task.id] } : task
		);
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

	function deleteTask2(deleted) {
		const deletedSet = new Set(deleted);
		const changedTasks = tasks.filter((task) => !deletedSet.has(task.id));
		setTasks(changedTasks);
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
				addTask2={addTask2}
				deleteTask={deleteTask}
				deleteTask2={deleteTask2}
				saveTask={saveTask}
				saveTask2={saveTask2}
				completeTask={completeTask}
				handleOnDragEnd={handleOnDragEnd}
				sortTasks={sortTasks}
			/>
			<Schedule tasks={tasks} />
		</div>
	);
}

export default App;
