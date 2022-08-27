import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const POST_KEY = "posts";

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [indexvalue, setIndexvalue] = useState(null);
  const [indexvalueofReply, setIndexvalueofReply] = useState(null);

  const [comment, setComment] = useState("");
  const [replyValue, setreplyvalue] = useState("");
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem(POST_KEY)));
  }, [update]);
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
    let getPost = [];
    getPost = JSON.parse(localStorage.getItem(POST_KEY));
    if (getPost === null) {
      getPost = [];
    }
    getPost.push({
      username: props.username,
      text: postTrimmed,
      postId: uuid(),
    });
    localStorage.setItem(POST_KEY, JSON.stringify(getPost));
    // Create post.
    if (posts === null || post.length === 0) {
      setPosts([
        { username: props.username, text: postTrimmed, postId: uuid() },
      ]);
    } else {
      setPosts((oldArray) => [
        ...oldArray,
        { username: props.username, text: postTrimmed, postId: uuid() },
      ]);
    }

    // Reset post content.
    setPost("");
    setErrorMessage("");
  };
  const handleComment = (postId) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      posts[postId.postId].comment === null ||
      posts[postId.postId].comment === undefined
    ) {
      posts[postId.postId].comment = [
        {
          commentId: uuid(),
          commentValue: comment,
          userCreated: user.username,
          userId: user.userId,
        },
      ];
      localStorage.setItem(POST_KEY, JSON.stringify(posts));
      setUpdate(update === false ? true : false);
    } else {
      posts[postId.postId].comment.push({
        commentId: uuid(),
        commentValue: comment,
        userCreated: user.username,
        userId: user.userId,
      });
      localStorage.setItem(POST_KEY, JSON.stringify(posts));
      setUpdate(update === false ? true : false);
    }
  };
  const handleReply = (commentIndex) => {
    console.log(commentIndex);
    let indexofPost = posts.findIndex(
      (element) => element.postId === commentIndex.commentId.postId
    );
    console.log(indexofPost);
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      posts[indexofPost].comment[commentIndex.commentIndex].reply === null ||
      posts[indexofPost].comment[commentIndex.commentIndex].reply === undefined
    ) {
      posts[indexofPost].comment[commentIndex.commentIndex].reply = [
        {
          commentId: uuid(),
          replyValue: replyValue,
          userCreated: user.username,
          userId: user.userId,
        },
      ];
      localStorage.setItem(POST_KEY, JSON.stringify(posts));
      setUpdate(update === false ? true : false);
    } else {
      posts[indexofPost].comment[commentIndex.commentIndex].reply.push({
        commentId: uuid(),
        replyValue: replyValue,
        userCreated: user.username,
        userId: user.userId,
      });
      localStorage.setItem(POST_KEY, JSON.stringify(posts));
      setUpdate(update === false ? true : false);
    }
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
          posts.map((x, index) => (
            <>
              <div
                className="border my-3 p-3 rounded bg-white col-auto"
                style={{ whiteSpace: "pre-wrap" }}
              >
                <h3 className="text-primary col-auto">{x.username}</h3>
                <p className="text-md-left">{x.text}</p>
                <p className="mt-3">Reply</p>

                {x?.comment?.map((data, index) => (
                  <>
                    <p className="text-md-left">{data.userCreated}</p>

                    <p className="text-md-left">{data.commentValue}</p>
                    <textarea
                      name="post"
                      id="post"
                      className=" form-control"
                      rows="3"
                      value={index === indexvalueofReply ? replyValue : ""}
                      onChange={(e) => {
                        if (
                          index !== indexvalueofReply &&
                          indexvalueofReply !== null
                        ) {
                          setIndexvalueofReply(index);
                          setreplyvalue("");
                        } else if (indexvalueofReply === null) {
                          setIndexvalueofReply(index);
                          setreplyvalue(e.target.value);
                        } else if (index === indexvalueofReply) {
                          setreplyvalue(e.target.value);
                        }
                      }}
                    />
                    {data?.reply?.map((dataReply, index) => (
                      <>
                        <p className="text-md-left ml-10">
                          {dataReply.replyValue}
                        </p>
                      </>
                    ))}
                    <input
                      type="submit"
                      className="mt-3 btn btn-outline-success"
                      value="Reply"
                      onClick={(e) => {
                        e.preventDefault();
                        handleReply({
                          commentIndex: indexvalueofReply,
                          commentId: x,
                        });
                      }}
                    />
                  </>
                ))}

                <textarea
                  name="post"
                  id="post"
                  className=" form-control"
                  rows="3"
                  value={index === indexvalue ? comment : ""}
                  onChange={(e) => {
                    if (index !== indexvalue && indexvalue !== null) {
                      setIndexvalue(index);
                      setComment("");
                    } else if (indexvalue === null) {
                      setIndexvalue(index);
                      setComment(e.target.value);
                    } else if (index === indexvalue) {
                      setComment(e.target.value);
                    }
                  }}
                />
                <input
                  type="submit"
                  className="mt-3 btn btn-outline-success"
                  value="Comment"
                  onClick={(e) => {
                    e.preventDefault();
                    handleComment({ postId: index });
                  }}
                />
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default Forum;
