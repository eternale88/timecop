import { useState, useEffect } from 'react'
import { firebase } from '../firebase'

//all tasks combined
const collatedTasksExist = () => {}

//just a regular function so no parentheses, as no props being passed, it's a custom hook
export const useTasks = (selectedProject) => {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		let unsubscribe = firebase
		.firestore()
		.collection('tasks')
		.where('userId', '==', 'e3dger393ngri')

		unsubscribe = 
		selectedProject && !collatedTasksExist(selectedProject) ?
		(unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
		: selectedProject === 'TODAY'
		? (unsubscribe = unsubscribe.where(
			'date',
			 '==',
			  moment().format('DD/MM/YYYY')
				))
				: selectedProject === 'INBOX' || selectedProject === 0
				? (unsubscribe = unsubscribe.where('date', '==', ''))
				: unsubscribe
	}, [])
}