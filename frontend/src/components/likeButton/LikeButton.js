//This will be the comment form

import React, { useState } from 'react'; 

export default function LikeButton(props) {
  // Component state
  const [like, setLike] = useState(null); /// set use state to null
  // Feed already resets the token for us.
  const token = window.localStorage.getItem('token');
  const tempId = '636932d263ba38502efa92d1';
  const handleSubmit = async (error) => {
    error.preventDefault(); // Prevents default action of refreshing the page

    const response = await fetch('/likes', {
      method: 'post',
      body: JSON.stringify({
        id: props.postId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log('Like couldnt send', json);
    }
    if (response.ok) {
      // If form sent successfully then it resets the input field.
      setLike('');
    }
  };

  // Handles value of the text input field.
  const handleChange = (event) => {
    setLike(event.target.value);
  };
  // Actual JSX
  return (
      <button onClick={handleSubmit}><i class="fa-regular fa-thumbs-up"></i></button>
      
  );
}


