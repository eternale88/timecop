import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { AddTask } from '../components/AddTask'
import { firebase } from '../firebase';
import { useSelectedProjectValue } from '../context';

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

beforeEach(cleanup)