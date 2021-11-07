import React, {createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';

export const SelectedProjectContext = createContext()
// provider represents top level of app state
// and we want to consume data at the bottom level
export const SelectedProjectProvider = ({children}) => {
	const [ selectedProject, setSelectedProject ] = useState('INBOX')
	return (
		<SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
			{children}
		</SelectedProjectContext.Provider>
	)
}

export const useSelectedProjectValue = () => useContext(SelectedProjectContext)

SelectedProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
}