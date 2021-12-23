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
					data-testid="project-action-parent"
					data-doc-id={project.docId}
					className={
						active === project.projectId
							? 'active sidebar__project'
							: 'sidebar__project'
        }
        >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
			)
		})
	)
}

export default Projects
