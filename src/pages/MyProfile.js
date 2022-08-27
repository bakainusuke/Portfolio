import { fromUnixTime } from "date-fns";
import React, { useState } from "react";
import { getUser, removeUser, deleteUser } from "../data/repository";

import { Button, Modal } from "react-bootstrap";
const USER_KEY = "user";

function MyProfile(props) {
  const [deleteShow, setDeShow] = useState(false);
  const [editShow, setEdShow] = useState(false);

  let user = [];
  user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user.dateCreated === undefined) {
    var userDate = "Unknown";
  } else {
    const result = fromUnixTime(user.dateCreated);
    userDate = `${result.getDate()}/${
      result.getMonth() + 1
    }/${result.getFullYear()}`;
  }

  const handleDelete = (userId) => {
    console.log("delete not done");
    deleteUser(userId);
    // removeUser();
  };

  return (
    <div className="row">
      <div
        className=" col-xl-6 col-lg-7 col-md-12 "
        style={{ height: "300px" }}
      >
        <div className="card " style={{ height: "300px" }}>
          <div className="col-lg-8 col-md-8 col-12">
            <h1 className="form-group display-5 m-3">
              <strong>Details</strong>
            </h1>
            <div className=" form-group m-4">
              <h4 className="">
                User:
                <strong> {user.username}</strong>
              </h4>
              <span className="">Email: {user.email}</span>
              <p>Join Date: {userDate}</p>
            </div>

            <div className="form-group">
              <>
                <input
                  type="submit"
                  className="btn btn-primary btn-round m-3"
                  value="Edit"
                  onClick={() => setEdShow(true)}
                />
                <Modal show={editShow} onHide={() => setEdShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Edit your details</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setEdShow(false)}
                    >
                      Close
                    </Button>
                    <input
                      type="submit"
                      className="btn btn-success mr-5"
                      value="Confirm"
                      onClick={(e) => {}}
                    />
                  </Modal.Footer>
                </Modal>
              </>
              <>
                <input
                  type="submit"
                  className="btn btn-danger mr-5"
                  onClick={() => setDeShow(true)}
                  value="Delete"
                />
                <Modal show={deleteShow} onHide={() => setDeShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    This will permanently delete your Account.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setDeShow(false)}
                    >
                      Close
                    </Button>
                    <input
                      type="submit"
                      className="btn btn-danger mr-5"
                      value="Delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(user.userId);
                      }}
                    />
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
