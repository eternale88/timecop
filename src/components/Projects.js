import React from 'react'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { IndividualProject } from './IndividualProject'

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
						: 'sidebar__project'
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
					<IndividualProject project={project}/>
				</li>
			)
		})
	)
}

export default Projects
