import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    try {
      const repo = await api.post('repositories')
      setRepositories([...repositories, repo])
    } catch (error) {
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete('repositories/' + id)
      const repos = repositories.filter(rep => rep.id !== id)
      setRepositories([...repos])
    } catch (error) {
    }
  }

  async function handleGetRepositories() {
    try {
      const {data} = await api.post('repositories')
      setRepositories([data])
    } catch (error) {
    }
  }

  useEffect(() => {
    handleGetRepositories()
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep, index) => (
          <li key={index}>
            <div>
              {rep.title}
            </div>
            <div>
              {rep.url}
            </div>
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
