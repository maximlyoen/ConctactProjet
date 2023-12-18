import { useState, useEffect } from 'react'
import './App.css'

function App() {
  type Post = {
    id: number;
    title: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <>
      <div>
        <h1>Posts</h1>
        <pre>
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default App;
