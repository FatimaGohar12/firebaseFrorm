import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css';
const Form = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    message: '',
  });

  const getUserData = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const { name, email, message, password } = user;

  const postData = async (e) => {
    e.preventDefault();
    if (name && email && message && password) {
      const response = await fetch(
        'https://form-a6330-default-rtdb.firebaseio.com/form.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            message,
          }),
        }
      );
      // Handle the response as needed
      if (response.ok) {
        setUser({
          name: '',
          email: '',
          password: '',
          message: '',
        });

        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Data Submitted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to submit form!',
          
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all the fields!',
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return (
    <div className="container my-2">
      <h1>Welcome to the Code World</h1>
      <form method="POST">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            value={user.name}
            onChange={getUserData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            onChange={getUserData}
            value={user.email}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={user.password}
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: 100 }}
            name="message"
            value={user.message}
            onChange={getUserData}
            required
          ></textarea>
          <label htmlFor="floatingTextarea2">Comments</label>
        </div>
        <button
          type="submit"
          className="btn btn-danger my-2"
          onClick={postData}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
