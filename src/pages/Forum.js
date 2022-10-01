import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Button, Modal } from "react-bootstrap";

const POST_KEY = "posts";

function Forum(props) {
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [indexvalue, setIndexvalue] = useState(null);
  const [indexvalueofReply, setIndexvalueofReply] = useState(null);
  const [comment, setComment] = useState("");
  const [replyValue, setreplyvalue] = useState("");
  const [posts, setPosts] = useState([]);
  const [update, setUpdate] = useState(false);
  const [imageurl, setImageUrl] = useState("");
  const [newimageurl, setNewImageUrl] = useState("");
  const [getUserData, setGetUserData] = useState("");
  const [editShow, setEdShow] = useState(false);
  const [userPost, setgetUserPost] = useState();
  const [editPost, setEditPost] = useState("");
  const [uploadImage, setUploadImage] = useState(false);
  const [postIndex, setPostIndex] = useState();
  const [isHoverR, setIsHoverR] = useState(false);
  const [isHoverC, setIsHoverC] = useState(false);

  const handleMouseOverReply = () => {
    setIsHoverR(true);
  };

  const handleMouseOutReply = () => {
    setIsHoverR(false);
  };

  const handleMouseOverCommnet = () => {
    setIsHoverC(true);
  };

  const handleMouseOutCommnet = () => {
    setIsHoverC(false);
  };

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem(POST_KEY)));
    setGetUserData(JSON.parse(localStorage.getItem("user")));
    setgetUserPost(JSON.parse(localStorage.getItem(POST_KEY)));
  }, [update]);
  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditPost(event.target.value);
  };

  const hanldeUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "mjejl4ae");
    setUploadImage(true);
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/devf3tnbv/image/upload",
      {
        mode: "cors",
        method: "post",
        body: formData,
      }
    ).then((res) => res.json());
    console.log(result);
    setUploadImage(false);

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
    setUpdate(update === false ? true : false);
  };
  const hanldeReUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "mjejl4ae");
    setUploadImage(true);

    const result = await fetch(
      "https://api.cloudinary.com/v1_1/devf3tnbv/image/upload",
      {
        mode: "cors",
        method: "post",
        body: formData,
      }
    ).then((res) => res.json());
    console.log(result);
    setUploadImage(false);

    setNewImageUrl(result.secure_url);
  };

  const handleSubmitChange = () => {
    console.log(postIndex);
    const prepost = userPost[postIndex].text;
    const postTrimmed = editPost.trim();

    if (postTrimmed.length > 256) {
      setErrorMessage("A post must contain less than 256 Charaters.");
      return;
    }

    if (newimageurl !== "") {
      userPost[postIndex].imageurl = newimageurl;
      console.log(userPost[postIndex].imageurl);
    }

    if (postTrimmed === "") {
      userPost[postIndex].text = prepost;
    } else if (postTrimmed !== undefined) {
      userPost[postIndex].text = postTrimmed;
    }

    localStorage.setItem(POST_KEY, JSON.stringify(userPost));

    setNewImageUrl("");
    setEditPost("");
    setErrorMessage("");
    setUpdate(update === false ? true : false);
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
    posts.splice(index.index, 1);
    console.log(posts);
    localStorage.setItem(POST_KEY, JSON.stringify(posts));

    setUpdate(update === false ? true : false);
  };
  return (
    <div
      onMouseEnter={(e) => {
        handleMouseOutReply();
        handleMouseOutCommnet();
      }}
    >
      <form>
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
              className="btn btn-danger mr-3"
              value="Cancel"
              onClick={() => {
                setPost("");
                setErrorMessage(null);
              }}
            />
            <input
              type="file"
              className="btn-dark btn-outline-success   mr-3 rounded-lg  "
              onChange={hanldeUpload}
            />
            <input
              type="submit"
              className="btn btn-outline-success"
              value="Publish"
              disabled={uploadImage}
              onClick={handleSubmit}
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
          posts
            .map((x, index) => (
              <>
                <div
                  className="border my-3 p-3 rounded bg-white col-auto"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  <h3 className="text-primary col-auto m-3 ">
                    {x.username}{" "}
                    {x.username === getUserData.username ? (
                      <button
                        className="btn btn-danger float-right"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeletePost({ index: index });
                        }}
                      >
                        Delete
                      </button>
                    ) : null}
                    {x.username === getUserData.username ? (
                      <button
                        className="btn btn-success float-right mr-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setPostIndex(index);
                          setEdShow(true);
                        }}
                      >
                        Edit
                      </button>
                    ) : null}
                    <Modal show={editShow} onHide={() => setEdShow(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Post</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="form-group input-group">
                          <span className=" " style={{ width: "80px" }}>
                            <i className="">Text</i>
                          </span>

                          <textarea
                            name="editPost"
                            id="editPost"
                            className="form-control"
                            rows="3"
                            value={editPost}
                            onChange={handleEditChange}
                          />
                        </div>
                        {errorMessage !== null && (
                          <div className="form-group">
                            <span className="text-danger">{errorMessage}</span>
                          </div>
                        )}
                        <div className="form-group  ">
                          <input
                            className="btn-outline-success  mx-auto rounded-lg"
                            type="file"
                            onChange={hanldeReUpload}
                          />
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setEdShow(false);
                            setEditPost("");
                            setErrorMessage(null);
                          }}
                        >
                          Close
                        </Button>
                        <input
                          type="submit"
                          className="btn btn-success mr-5"
                          value="Confirm"
                          disabled={uploadImage}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmitChange();
                            setEdShow(false);
                          }}
                        />
                      </Modal.Footer>
                    </Modal>
                  </h3>

                  {x.imageurl !== undefined ? (
                    <img
                      className=" mx-auto"
                      style={{ display: "block", width: 700 }}
                      src={x.imageurl}
                      alt=""
                    />
                  ) : null}
                  <p className="text-md-left m-5">{x.text} </p>

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
                              <p className=" text-md ">
                                {dataReply.replyValue}
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                      <div>
                        {isHoverR && (
                          <textarea
                            name="post"
                            id="post"
                            className=" form-control"
                            rows="3"
                            value={
                              index === indexvalueofReply ? replyValue : ""
                            }
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
                        )}
                        <input
                          type="submit"
                          className="mt-3 btn btn-outline-success"
                          value="Reply"
                          onMouseEnter={handleMouseOverReply}
                          onClick={(e) => {
                            e.preventDefault();
                            handleReply({
                              commentIndex: indexvalueofReply,
                              commentId: x,
                            });
                          }}
                        />
                      </div>
                    </>
                  ))}
                  <div>
                    {isHoverC && (
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
                    )}
                    <input
                      type="submit"
                      className="mt-3 btn btn-outline-success"
                      value="Comment"
                      onMouseEnter={handleMouseOverCommnet}
                      onClick={(e) => {
                        e.preventDefault();
                        handleComment({ postId: index });
                      }}
                    />
                  </div>
                </div>
              </>
            ))
            .reverse()
        )}
      </div>
    </div>
  );
}

export default Forum;
