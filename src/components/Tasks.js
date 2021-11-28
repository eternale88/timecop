import React, {useState, useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { useTasks } from '../custom-hooks'
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { AddTask } from './AddTask';

export const Tasks = () => {
	const { selectedProject } = useSelectedProjectValue()
	const { projects } = useProjectsValue()
	const { tasks } = useTasks(selectedProject)

	let projectName = ''


	//get tasks that are collated,  inbox, today and next_7 etc
	if(collatedTasksExist(selectedProject) && selectedProject) {
		projectName = getCollatedTitle(collatedTasks, selectedProject).name
	}

		//get regular self made tasks, instead of inbox, today and next_7 etc
		if(projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
			projectName = getTitle(projects, selectedProject).name
		}
	useEffect(() => {
		document.title = `${projectName}: TimeCop Task`
	})
	return (
		<div className="tasks" data-testid="tasks">
			<h2 data-testid="project-name">{projectName}</h2>
			<ul className="tasks__list">
			{
				tasks.map((task) => {
				return <li key={`${task.id}`}>
						<Checkbox id={task.id} />
						<span>{task.task}</span>
					</li>
			 })
		  }
			</ul>
			<AddTask/>
		</div>
	)
}
