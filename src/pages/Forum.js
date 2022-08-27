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
  const [selectedFile, setSelectedFile] = useState();
  const [comment, setComment] = useState("");
  const [replyValue, setreplyvalue] = useState("");
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [imageurl, setImageUrl] = useState("");
  const [getUserData, setGetUserData] = useState("");
  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem(POST_KEY)));
    setGetUserData(JSON.parse(localStorage.getItem("user")));
  }, [update]);
  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const hanldeUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "mjejl4ae");

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/devf3tnbv/image/upload",
      {
        mode: "cors",
        method: "post",
        body: formData,
      }
    ).then((res) => res.json());
    console.log(result);
    setImageUrl(result.secure_url);
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
      imageurl: imageurl,
    });
    localStorage.setItem(POST_KEY, JSON.stringify(getPost));
    // Create post.
    if (posts === null || post.length === 0) {
      setPosts([
        {
          username: props.username,
          text: postTrimmed,
          postId: uuid(),
          imageurl: imageurl,
        },
      ]);
    } else {
      setPosts((oldArray) => [
        ...oldArray,
        {
          username: props.username,
          text: postTrimmed,
          postId: uuid(),
          imageurl: imageurl,
        },
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
  const handleDeletePost = (index) => {
    posts.splice(index.index,1);
    console.log(posts)
    localStorage.setItem(POST_KEY, JSON.stringify(posts));

    setUpdate(update === false ? true : false);
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
            <input type="file" onChange={hanldeUpload} />
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
          (console.log(posts),
          posts.map((x, index) => (
            <>
              <div
                className="border my-3 p-3 rounded bg-white col-auto"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {x.username === getUserData.username ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeletePost({ index: index });
                    }}
                  >
                    Delete Post
                  </button>
                ) : null}
                <h3 className="text-primary col-auto m-3 ">{x.username}</h3>
                <p className="text-md-left m-5">{x.text}</p>
                {x.imageurl !== undefined ? (
                  <img src={x.imageurl} alt="" />
                ) : null}
                <hr />
                <p className="text-warning mt-3 m-4">Reply</p>

                {x?.comment?.map((data, index) => (
                  <>
                    <div className="row">
                      <div className="col-sm-3 col-md-1">
                        <h4 className="text-md-left text-info col-lg-1 col-md-8 col-3">
                          {data.userCreated}
                        </h4>
                      </div>
                      <div className="col-sm-3 col-md-6">
                        <p className=" text-md ">{data.commentValue}</p>
                      </div>
                    </div>

                    {data?.reply?.map((dataReply, index) => (
                      <>
                        <div className="row">
                          <div className="col- m-2"></div>
                          <div className="col-sm-3 col-md-1 m-1">
                            <h5 className="text-md-right text-secondary col-lg-1 col-md-8 col-3">
                              {dataReply.userCreated}
                            </h5>
                          </div>
                          <div className="col-sm-3 col-md-6 my-1">
                            <p className=" text-md ">{dataReply.replyValue}</p>
                          </div>
                        </div>
                      </>
                    ))}
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
          )))
        )}
      </div>
    </div>
  );
}

export default Forum;
