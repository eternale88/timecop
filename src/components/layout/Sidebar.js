import React from 'react'
import { 
	FaChevronDown, 
	FaInbox, 
	FaRegCalendarAlt,
	FaRegCalendar
} from 'react-icons/fa'
import { useSelectedProjectValue } from '../../context'
import { AddProject } from '../AddProject'
import { Projects } from '../Projects'

export const Sidebar = () => {
	const { setSelectedProject } = useSelectedProjectValue()
	const [active, setActive ] = React.useState('inbox')
	const [showProjects, setShowProjects ] = React.useState(true)

	return (
		<div className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
			<li
				data-testid="inbox"
				className={active === 'inbox' ? 'active' : undefined}
			>
			<div
				data-testid="inbox-action"
				aria-label="Show inbox tasks"
				tabIndex={0}
				role="button"
				onClick={() => {
					setActive('inbox');
					setSelectedProject('INBOX');
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setActive('inbox');
						setSelectedProject('INBOX');
					}
				}}
			>
				<span>
					<FaInbox />
				</span>
				<span>Inbox</span>
			</div>
		</li>
				<li
				data-testid="today" 
				className={active === 'today' ? 'active' : undefined}
				onClick={() => {
					setActive('today')
					setSelectedProject('TODAY')
				}}
				>
					<span>
						<FaRegCalendar/>
					</span>
					<span>
						Today
					</span>
				</li>
				<li
				data-testid="next_7"
				className="next_7"
				data-testid="next_7" 
				className={active === 'next_7' ? 'active' : undefined}
				onClick={() => {
					setActive('next_7')
					setSelectedProject('NEXT_7')
				}}
				>
					<span>
						<FaRegCalendarAlt/>
					</span>
					<span>
						Next 7 Days
					</span>
				</li>
			</ul>

			<div className="sidebar__middle" 
			  onClick={() => setShowProjects(!showProjects)}
			>
				<span>
					<FaChevronDown className={!showProjects ? 'hidden-projects' : undefined}/>
				</span>
				<h2>Projects</h2>
			</div>
			<ul className="sidebar__projects">{showProjects && <Projects />}
			</ul>
			{showProjects && <AddProject/>}
		</div>	
)
}