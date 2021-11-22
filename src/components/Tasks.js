import React, {useState, useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { useTasks } from '../custom-hooks'
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../context';

export const Tasks = () => {
	const { selectedProject } = useSelectedProjectValue()
	//console.log('selected project', selectedProject)
	const { projects } = useProjectsValue()
	const { tasks } = useTasks(selectedProject)
	//console.log(tasks)

	let projectName = ''


	//get tasks that are collated,  inbox, today and next_7 etc
	if(collatedTasksExist(selectedProject) && selectedProject) {
		projectName = getCollatedTitle(collatedTasks, selectedProject)?.name
		//console.log('projectName 2: ', projectName)
	}

		//get regular self made tasks, instead of inbox, today and next_7 etc
		if(projects && selectedProject && !collatedTasksExist(selectedProject)) {
			projectName = getTitle(projects, selectedProject)?.name
			console.log('projectName 1: ', projectName)
		}
	useEffect(() => {
		document.title = `${projectName}: TimeCop Task`
	})
	//console.log('tasks', tasks)
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
		</div>
	)
}
