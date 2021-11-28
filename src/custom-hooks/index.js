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
		.where('userId', '==', process.env.REACT_APP_FIREBASE_USERNAME)

		//if we have a project and it doesn't exist in the collated tasks
		unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe

		unsubscribe = unsubscribe.onSnapshot(snapshot => {
			//getting docs from the firestore
			const newTasks = snapshot.docs.map(task => ({
				id: task.id,
				...task.data()
			}))
			console.log(newTasks)
			//our setTasks hook
			setTasks(
				//get next 7 day projects back, if the difference in the task and todays date is less than 7 we know it's one of the next 7 days task and return it, else mark it as not archived and give them back
				selectedProject === 'NEXT_7'
          ? newTasks.filter(
              task =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 
                && task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      )
      setArchivedTasks(newTasks.filter(task => task.archived !== false))
		})
		//we unsubscribe because we don't want to be looking for projects all the time, we only want to look when there's a new selectedProject
		//a useEffect cleanup function
		return () => unsubscribe()
	}, [selectedProject])
	return { tasks, archivedTasks }
}

//useProjects hook
// used to get projects once, why we use get()
export const useProjects = () => {
	const [projects, setProjects] = useState([])

	useEffect(() => {
		 firebase
		.firestore()
		.collection('projects')
		.where('userId', '==', process.env.REACT_APP_FIREBASE_USERNAME)
		.orderBy('projectId')
		.get()
		.then((snapshot) => {
			//this would work, but sequence isn't maintained with destructuring so condition below doesn't stop excess db calls, so define the sequence
			// const allProjects = snapshot.docs.map((project) => ({
			// 	...project.data(),
			// 	//if want to delete must alway pass docId
			// 	docId: project.id,
			// }))
			const allProjects = snapshot.docs.map((project) => ({
				name: project.data().name,
				userId: project.data().userId,
				projectId: project.data().projectId,
				docId: project.id,
			}))
			console.log(allProjects)
			//this avoids infinite loop, as otherwise it would set projects, everytime and because we have project in dependency array it would keep running it, this way it makes sure a project has actually changed
			if(JSON.stringify(allProjects) !== JSON.stringify(projects)) {
				setProjects(allProjects)
			}
		})
		// maybe add projects back
	}, [projects])
	return {projects, setProjects}
}
