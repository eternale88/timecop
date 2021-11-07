import React from 'react'
import { useProjectsValue, useSelectedProjectValue } from '../context'

export const Projects = ({activeValue = true}) => {
	const [active, setActive ] = React.useState(activeValue)
	const { setSelectedProject } = useSelectedProjectValue() 
	const { projects } = useProjectsValue()
	return (
		projects &&
		projects.map(project => {
			return (
				<li
					key={project.projectId}
					data-doc-id={project.docId}
					data-testid="project-action"
					role="button"
					className={
						active === project.projectId
						? 'active sidebar__project'
						: 'active sidebar__project'
					}
					onClick={() => {
						setActive(project.projectId)
						setSelectedProject(project.projectId)
					}}
					onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
				>
				{project.name}
				</li>
			)
		})
	)
}

export default Projects
