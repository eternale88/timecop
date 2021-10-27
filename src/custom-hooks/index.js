import { useState, useEffect } from 'react'
import { firebase } from '../firebase'
import { collatedTasksExist } from '../helpers'
import moment from 'moment'
//custom takes proj, and returns all tasks associated with it
// it if a task is archived it return those as well
//this is live and is constantly checking for new projects real time and why we use unsubscribe

//fyi collated task are inbox, today and next 7 days
export const useTasks = (selectedProject) => {
	const [tasks, setTasks] = useState([])
	const [archivedTasks, setArchivedTasks] = useState([])

	useEffect(() => {
		//fetch tasks from firestore
		let unsubscribe = firebase
		.firestore()
		.collection('tasks')
		.where('userId', '==', 'e3dger393ngri')

		//if we have a project and it doesn't exist in the collated tasks
		if(selectedProject && !collatedTasksExist(selectedProject)) {
			(unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
		} else if(selectedProject === 'TODAY') {
			//retrieve today's projects
			(unsubscribe = unsubscribe.where(
				'date',
				 '==',
					moment().format('DD/MM/YYYY')
			 ))
		} else if(selectedProject === 'INBOX' || selectedProject === 0) {
			//new projects?
			(unsubscribe = unsubscribe.where('date', '==', ''))
		} else {
			unsubscribe
		}

		unsubscribe = unsubscribe.onSnapshot(snapshot => {
			//getting docs from the firestore
			const newTasks = snapshot.docs.map(task => ({
				id: task.id,
				...task.data(),
			}))

			//our setTasks hook
			setTasks(
				//get next 7 day projects back, if the difference in the task and todays date is less than 7 we know it's one of the next 7 days task and return it, else mark it as not archived and give them back
				selectedProject === 'NEXT_7'
				? newTasks.filter((task) => {
					moment(task.date, 'DD-MM-YYY').diff(moment(), 'days') <= 7 && task.archived !== true
				})
				: newTasks.filter((task) => {
					task.archived !== true
				})
			)

			//our archived tasks
			setArchivedTasks(newTasks.filter((task) => {
				task.archived !== false
			}))
		})

		//refactored above from this ternary
		// selectedProject && !collatedTasksExist(selectedProject) ?
		// //retrieve the project if it's there
		// (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
		// : selectedProject === 'TODAY'
		// ? (unsubscribe = unsubscribe.where(
		// 	'date',
		// 	 '==',
		// 	  moment().format('DD/MM/YYYY')
		// 		))
		// 		: selectedProject === 'INBOX' || selectedProject === 0
		// 		? (unsubscribe = unsubscribe.where('date', '==', ''))
		// 		: unsubscribe

		//we unsubscribe because we don't want to be looking for projects all the time, we only want to look when there's a new selectedProject
		//a useEffect cleanup function
		return () => unsubscribe()
	}, [selectedProject])
	return { tasks, archivedTasks }
}

//useProjects hook
// used to get projects once, why we use get()
export const usePojects = () => {
	const [projects, setProjects] = useState([])

	useEffect(() => {
		firebase
		.firestore()
		.collection
		.where('userId', '==', 'e3dger393ngri')
		.orderBy('projectId')
		.get()
		.then((snapshot) => {
			const allProjects = snapshot.docs.map(project => ({
				...project.data(),
				//if want to delete must alway pass docId
				docId: project.id,
			}))
			//this avoids infinite loop, as otherwise it would set projects, everytime and because we have project in dependency array it would keep running it, this way it makes sure a project has actually changed
			if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
				setProjects(allProjects)
			}
		})
		
	}, [projects])
	return {projects, setProjects}
}
