import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue } from '../context';

export const AddProject = ({shouldShow = false}) => {

	const [show, setShow] = useState(shouldShow)
	const [projectName, setProjectName] = useState('')

	const projectId = generatePushId()
	const { setProjects } = useProjectsValue()

	const addProject = () => {
		projectName && 
		firebase
			.firestore()
			.collection('projects')
			.add({
				projectId,
				name: projectName,
				userId: process.env.REACT_APP_FIREBASE_USERNAME
			})
			.then(() => {
				//forces a page refresh from firebase
				setProjects([])
				setProjectName('')
				setShow(false)
			})
	}
	return (
		<div className="add-project" data-testid="add-project">
			{show && (
				<div className="add-project__input">
					<input
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						className="add-project__name"
						data-testid="project-name"
						placeholder="Name your project"
					/>
					<button 
						className="add-project__submit"
						type="button"
						onClick={() => addProject()}
						>
						Add Project
					</button>
					<span 
						className="add-project__cancel"
						data-testid="hide-project-overlay"
						onClick={() => setShow(false)}
					>
					Cancel
					</span>
				</div>
			)}
		</div>
	)
}
