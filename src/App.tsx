import React, { useEffect, useState } from "react";

import api from './services/api'
import Repository from './interfaces/Repository'
import "./styles.css";

const App: React.FC = () => {
  const [repositories, setRepositories] = useState<Array<Repository>>([])

  useEffect(() => { 
    api.get('repositories')
       .then(response => setRepositories(response.data))
       .catch(err => console.error(err))
  }, [])

  async function handleAddRepository() {
    try { 
      const response = await api.post("repositories", {
        url: "https://github.com/LauraBeatris/gostack-reactjs-concepts",
        title: "GoStack ReactJS Concepts", 
        techs: ["JavaScript", "ReactJS"]
      })
  
      const repository = response.data;
      setRepositories(repositories => [...repositories, repository]); 
    } catch (err) { 
      alert('Não foi possivel adicionar um repositório, tente novamente.')
    } 
  }

  async function handleRemoveRepository(id: string) {
    await api.delete(`repositories/${id}`)
             .then(() => 
                setRepositories(
                  repositories => repositories.filter((repository: Repository) => repository.id !== id))
             )
             .catch(err => console.error(err)) 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
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
