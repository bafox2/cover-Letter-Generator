import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

//test connection to db
describe('Database connection', () => {
  it('connects to the database', async () => {
    const db = await connectToDatabase()
    expect(db).toBeTruthy()
  })
  it('gets data from the database', async () => {
    const db = await connectToDatabase()
    const data = await db.collection('users').find({}).toArray()
    expect(data).toBeTruthy()
  })
  it('adds data to the database', async () => {
    const db = await connectToDatabase()
    const data = await db.collection('users').insertOne({
      name: 'Test User',
      email: '