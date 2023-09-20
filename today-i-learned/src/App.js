import React from 'react'

import './style.css'

const App = () => {
  const appTitle = "Today I Learned"

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img
            src="logo.png"
            alt="Today I Learned Logo"
          />
          <h1>{appTitle}</h1>
        </div>
        <button className="btn btn-large btn-open">Share a fact</button>
      </header>

      <NewFactForm />

      <main className={"main"}>
        <CategoryFilter />
        <FactList />
      </main>
    </>
  )
}

const NewFactForm = () => {
  return <form className={"fact-form"}>Fact form</form>
}

const CategoryFilter = () => {
  return <aside>Category filter</aside>
}

const FactList = () => {
  return <section>Facts Lists</section>
}

export default App;
