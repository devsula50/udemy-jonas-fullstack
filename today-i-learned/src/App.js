import React, { useState } from "react";

import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const App = () => {
  const [facts, setFacts] = useState([...initialFacts]);
  const [showForm, setShowForm] = useState(false);

  const addFactHandler = (newFact) => {
    // setFacts((prevFacts) => [...prevFacts, newFact]);
    setFacts((prevFacts) => {
      newFact.id = prevFacts.length;
      return prevFacts.concat(newFact);
    });
  };

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          onAddFact={addFactHandler}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      ) : null}
      <main className={"main"}>
        <CategoryFilter />
        <FactList facts={facts} />
      </main>
    </>
  );
};

const Header = ({ showForm, setShowForm }) => {
  const appTitle = "Today I Learned";

  const formButtonClickHandler = () => {
    setShowForm((showForm) => !showForm);
  };
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={formButtonClickHandler}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
};

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const NewFactForm = ({ onAddFact, showForm, setShowForm }) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");

  const changeTextHandler = (event) => {
    setText(event.target.value);
  };
  const changeSourceHandler = (event) => {
    setSource(event.target.value);
  };
  const changeCategoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const submitFormHandler = (event) => {
    // 1. Prevent browser reload
    event.preventDefault();

    // 2. Check if data is valid. If so, create a new fact
    if (!(text && isValidHttpUrl(source) && category && text.length <= 200))
      return;

    // 3. Create a new fact object
    const newFact = {
      text: text,
      source: source,
      category: category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
    };

    // 4. Add the new fact to the UI: add to fact to state
    onAddFact(newFact);

    // 5. Reset input fields
    setText("");
    setSource("");
    setCategory("Choose category:");

    // 6. Close the form
    setShowForm((showForm) => !showForm);
  };

  return (
    <form className="fact-form" onSubmit={submitFormHandler}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={changeTextHandler}
      />
      <span>{200 - text.length}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={changeSourceHandler}
      />
      <select value={category} onChange={changeCategoryHandler}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((CATEGORY) => (
          <option key={CATEGORY.name} value={CATEGORY.name}>
            {CATEGORY.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-large">
        Post
      </button>
    </form>
  );
};

const CategoryFilter = () => {
  return (
    <aside>
      <ul>
        <li>
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const FactList = ({ facts }) => {
  return (
    <section>
      <ul className={"fact-list"}>
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
};

const Fact = (props) => {
  const fact = props.fact;
  return (
    <li className={"fact"}>
      <p>
        {fact.text}
        <a href={fact.source} className="source" target={"_blank"}>
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: `${
            CATEGORIES.find((cat) => cat.name === fact.category).color
          }`,
        }}
      >
        #technology#
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔ {fact.votesFalse}</button>
      </div>
    </li>
  );
};

export default App;
