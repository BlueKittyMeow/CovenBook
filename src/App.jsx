import { useState } from 'react'
import BookFlip from './components/BookFlip'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>CovenBook</h1>
        <p>An Interactive Technomagic Textbook</p>
      </header>
      <main className="app-main">
        <BookFlip />
      </main>
      <footer className="app-footer">
        <p>Based on "The Coven at Devil's Den" by Bluekitty's Sister</p>
      </footer>
    </div>
  )
}

export default App
