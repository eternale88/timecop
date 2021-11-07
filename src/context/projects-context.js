import React, {createContext, useContext } from 'react'

import { useProjects } from '../custom-hooks'

export const ProjectsContext = createContext()
// provider represents top level of app state
// and we want to consume data at the bottom level
export const ProjectsProvider = ({children}) => {
	const { projects, setProjects } = useProjects()
	return (
		<ProjectsContext.Provider value={{ projects, setProjects }}>
			{children}
		</ProjectsContext.Provider>
	)
}

export const useProjectsValue = () => useContext(ProjectsContext)
