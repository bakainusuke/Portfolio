import React, { useEffect, useState } from "react";
const POST_KEY = "posts";

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {

    setPosts(JSON.parse(localStorage.getItem(POST_KEY)))
  },[

  ])
  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    if (postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }
    if (postTrimmed.length > 256) {
      setErrorMessage("A post must contain less than 256 Charaters.");
      return;
    }
    let getPost = []
    getPost = JSON.parse(localStorage.getItem(POST_KEY))
    if(getPost === null)
    {
      getPost=[]
    }
    console.log(getPost)
   getPost.push({
     username: props.username, text: postTrimmed 
   })
   localStorage.setItem(POST_KEY,  JSON.stringify(getPost));
    // Create post.
    setPosts([...posts, { username: props.username, text: postTrimmed }]);

    // Reset post content.
    setPost("");
    setErrorMessage("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Post now~</legend>
          <div className="form-group rounded">
            <textarea
              name="post"
              id="post"
              className="form-control"
              rows="3"
              value={post}
              onChange={handleInputChange}
            />
          </div>
          {errorMessage !== null && (
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
          <div className="form-group">
            <input
              type="button"
              className="btn btn-danger mr-5"
              value="Cancel"
              onClick={() => {
                setPost("");
                setErrorMessage(null);
              }}
            />
            <input
              type="submit"
              className="btn btn-outline-success"
              value="Publish"
            />
          </div>
        </fieldset>
      </form>

      <hr />
      <h1>Forum</h1>
      <div>
        {posts === null ? (
          <span className="text-muted">No posts have been submitted.</span>
        ) : (
          posts.map((x) => (
            <div
              className="border my-3 p-3 rounded bg-white col-auto"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <h3 className="text-primary col-auto">{x.username}</h3>
              <p class="text-md-left">{x.text}</p>
             
              <textarea
              name="post"
              id="post"
              className=" form-control"
              rows="3"
              value={post}
              onChange={handleInputChange}
            />
            <input
              type="submit"
              className="btn btn-outline-success"
              value="Comment"
            />
             
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;
