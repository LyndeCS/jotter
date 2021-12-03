import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { DataTypeProvider, EditingState } from "@devexpress/dx-react-grid";
import {
	Grid,
	Table,
	TableHeaderRow,
	TableEditRow,
	TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import "./css/jotbox.css";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@material-ui/core";

const getRowId = (row) => row.id;

function Jotbox(props) {
	const [columns] = useState([
		{ name: "desc", title: "Task" },
		{ name: "sdt", title: "Start Date" },
		{ name: "edt", title: "End Date" },
	]);
	const [dateColumns] = useState(["sdt", "edt"]);
	const [startDate, setStartDate] = useState(new Date());
	//const [endDate, setEndDate] = useState(new Date());

	const DateEditor = (props) => (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker
				renderInput={(props) => <TextField {...props} />}
				//label="Start Date"
				value={startDate}
				//onChange={handleDateChange}
				onChange={(newValue) => {
					setStartDate(newValue);
				}}
			/>
		</LocalizationProvider>
	);

	const DateTypeProvider = (props) => (
		<DataTypeProvider
			//formatterComponent={DateFormatter}
			editorComponent={DateEditor}
			{...props}
		/>
	);

	// function handleDateChange(e) {
	// 	console.log(e);
	// 	setStartDate(e);
	// }

	const commitChanges = ({ added, changed, deleted }) => {
		if (added) {
			console.log(added);
			props.addTask(added);
		}
		if (changed) {
			props.updateTask(changed);
		}
		if (deleted) {
			props.deleteTask(deleted);
		}
	};

	return (
		<div className="Jotbox">
			<Paper>
				<Grid rows={props.tasks} columns={columns} getRowId={getRowId}>
					<DateTypeProvider for={dateColumns} />
					<EditingState onCommitChanges={commitChanges} />
					<Table />
					<TableHeaderRow />
					<TableEditRow />
					<TableEditColumn showAddCommand showEditCommand showDeleteCommand />
				</Grid>
			</Paper>
		</div>
	);
}

export default Jotbox;
