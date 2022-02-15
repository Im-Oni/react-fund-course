import React, { useState} from "react";

import Postlist from "./components/PostList";

import './styles/app.css'
import PostForm from "./components/PostForm";

function App() {
  const  [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'Description'},        
    {id: 2, title: 'JS 2', body: 'Description'},        
    {id: 3, title: 'JS 3', body: 'Description'},        
  ])

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
  }
  
  
  return (
    <div className="App">
      <PostForm create={createPost}/>
      <Postlist posts={posts} title={'Список Постов 1'}/>   
    </div>
  );
}

export default App;
