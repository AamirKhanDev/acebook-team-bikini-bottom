import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import PostForm from '../postForm/PostForm';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  const reload = () => {
    if (token) {
      fetch('/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem('token', data.token);
          setToken(window.localStorage.getItem('token'));
          setPosts(data.posts);
        });
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  if (token) {
    return (
      <>
        <div id="header_wrapper">
          <div id="header">
            <li id="sitename">
              <a href="/signup">Acebook</a>
            </li>
            <button onClick={logout}>
              Logout <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>

        <div class="flexbox-container">
          <div id="feed" role="feed">
            <h2 id="Page-title">Feed</h2>
            <div id="feed-strip" class="center">
              <PostForm reload={reload} />

              <br></br>
              {posts
                .slice(0)
                .reverse()
                .map((post) => (
                  <div class="post-card-container">
                    <Post post={post} key={post._id} reload={reload} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate('/signin');
  }
};

export default Feed;
