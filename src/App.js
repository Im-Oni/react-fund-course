import React, { useState } from "react";
import PostList from "./components/PostList";
import './styles/app.css';
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFIlter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import { useEffect } from "react";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";

function App() {
  const  [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState( {sort: '', query: ''});
  const [modal, setModal] = useState (false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostLoading, setisPostLoading] = useState (false);

  
  useEffect(() => {
    fetchPosts()
  }, []);

  const createPost = (newPost) => {
    setPosts ([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    setisPostLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts)
    setisPostLoading(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  return (
    <div className="App">
      <MyButton
      onClick={fetchPosts}>
        Get Posts
      </MyButton>
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
      <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0', borderColor: 'aqua'}} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
      {isPostLoading
        ? <div
          style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Loader/>
          </div> 
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Список Постов 1'}/>
      }
    </div>
  );
}

export default App;
