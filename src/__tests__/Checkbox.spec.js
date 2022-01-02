import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Checkbox } from '../components/Checkbox'

beforeEach(cleanup) // clean the DOM

//mocking each method on firebase call for component
jest.mock('../firebase', () => ({
	firebase: {
		firestore: jest.fn(() => ({
			collection: jest.fn(() => ({
				doc: jest.fn(() => ({
					update: jest.fn()
				}))
			}))
		}))
	}
}))

describe('<Checkbox />', () => {
	describe('Success', () => {
		it('renders the task checkbox', () => {
			const { queryByTestId, debug } = render(<Checkbox id="1" taskDesc="Finish task"/>)
			//debug()
			expect(queryByTestId('checkbox-action')).toBeTruthy()
		})
	})
})