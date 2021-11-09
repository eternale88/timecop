import React, { useState, Fragment } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { firebase } from '../firebase'
export const IndividualProject = ({ project }) => {
	const [showConfirm, setShowConfirm] = useState(false)
	const { projects, setProjects } = useProjectsValue()
	const { setSelectedProject } = useSelectedProjectValue()

	const deleteProject = docId => {
		firebase
			.firestore()
			.collection('projects')
			.doc(docId)
			.delete()
			.then(() => {
				//when project is deleted, we want to reset the projects, so we spread them out
				//this passing in of projects to the custom hook, causes rerender base on what's in the useEffect dependency array
				setProjects([...projects])
				setSelectedProject('INBOX')
			})

	}
	return (
		<Fragment>
			<span className="sidebar__dot">•</span>
			<span className="sidebar__project-name">{project.name}</span>
			<span 
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => setShowConfirm(!showConfirm)}

			>
				<FaTrashAlt/>
				{showConfirm && (
					<div className="project-delete-modal">
						<div className="project-delete-modal__inner">
							<p>Are you sure you want to delete this project?</p>
							<button
								type="button"
								onClick={deleteProject(project.docId)}
							>
								Delete
								<span onClick={() => setShowConfirm(!showConfirm)}>
									Cancel
								</span>
							</button>
						</div>
					</div>
				)}
			</span>
		</Fragment>
	)
}

