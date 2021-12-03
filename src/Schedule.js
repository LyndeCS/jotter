import React from "react";
import "./css/schedule.css";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	DayView,
	Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = new Date();
const currentHour = currentDate.getHours();

export default function Schedule(props) {
	const schedulerData = props.tasks.map((task) => ({
		startDate: task.sdt,
		endDate: task.edt,
		title: task.desc,
	}));

	return (
		<div className="schedule">
			<Paper>
				<Scheduler data={schedulerData}>
					<ViewState currentDate={currentDate} />
					<DayView startDayHour={currentHour} endDayHour={24} />
					<Appointments />
				</Scheduler>
			</Paper>
		</div>
	);
}
