import React, { useState } from 'react'
import { FaPizzaSlice } from 'react-icons/fa'
import { AddTask } from '../AddTask'
import PropTypes from 'prop-types'

export const Header = ({darkMode, setDarkMode}) => {

	const [shouldShowMain, setShouldShowMain] = useState(false)
	const [showQuickAddTask, setShowQuickAddTask] = useState(false)

	return (
		<header className="header" data-testid="header">
		<nav>
			<div className="logo">
				<img src="/images/logo.png" alt="timecop" />
			</div>
			<div className="settings">
				<ul>
					<li 
						data-testid="quick-add-task-action" 
						aria-label="Quick add task"
						className="settings__add"
						onClick={() => {setShowQuickAddTask(true); setShouldShowMain(true)}}
						tabIndex={0}
						role="button"
					>
						+
					</li>
					<li 
						data-testid="dark-mode-action"
						aria-label="Darkmode on/off"
						className="settings__darkmode"
					  onClick={() => setDarkMode(!darkMode)}
						role="button"
						tabIndex={0}
					>
						<FaPizzaSlice/>
					</li>
				</ul>
			</div>
		</nav>
		<AddTask
			showAddTaskMain={false}
			shouldShowMain={shouldShowMain}
			showQuickAddTask={showQuickAddTask}
			setShowQuickAddTask={setShowQuickAddTask}
		/>
		</header>
	)
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};