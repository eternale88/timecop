import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { AddTask } from '../components/AddTask'
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';
import { ProjectsProvider, SelectedProjectProvider, SelectedProjectContext, ProjectsContext } from '../context/selected-project-context'


function renderAddTaskWithContextWrapper(value) {
  return render(
    <SelectedProjectProvider>
					<SelectedProjectContext.Consumer>
					{(value) => <AddTask {...value} />	}
					</SelectedProjectContext.Consumer>
		</SelectedProjectProvider>
  )
}
 beforeEach(cleanup)
useSelectedProjectValue.mockReturnValue({selectedProject: 1 })
jest.mock('../context', () => ({
	useSelectedProjectValue: jest.fn(() => ({selectedProject: 1 }))
}))

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase')),
      })),
    })),
  },
}));

describe('<AddTask/>', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	describe('Success', () => {
		it('renders <AddTask/> component', () => {
			const { queryByTestId } = renderAddTaskWithContextWrapper()
			expect(queryByTestId('add-task-comp')).toBeTruthy()
		})

		it('renders the <AddTask /> quick overlay', () => {

			const { queryByTestId } = render(
				<SelectedProjectProvider>
							<SelectedProjectContext.Consumer>
							{(value) => <AddTask {...value} />	}
		
							</SelectedProjectContext.Consumer>
						</SelectedProjectProvider>
			)      
			expect(queryByTestId('quick-add-task')).toBeFalsy()
    })

	 })
})