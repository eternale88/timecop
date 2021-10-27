import React from 'react'
import { Sidebar } from './Sidebar'
import { Tasks } from '../Tasks.js'

export const Content = () => {
	return (
		<section>
			<Sidebar/>
			<Tasks/>
		</section>
	)
}