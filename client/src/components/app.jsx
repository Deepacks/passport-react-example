import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [registerFieldsValue, setRegisterFieldsValue] = useState({
    username: "",
    password: "",
  });

  const [loginFieldsValue, setLoginFieldsValue] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState();

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterFieldsValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFieldsValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const register = () => {
    axios({
      method: "post",
      data: registerFieldsValue,
      withCredentials: true,
      url: "http://localhost:5000/register",
    }).then((res) => console.log(res));
  };

  const login = () => {
    axios({
      method: "post",
      data: loginFieldsValue,
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => console.log(res));
  };

  const logout = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/user",
    }).then((res) => setData(res.data));
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          name="username"
          value={registerFieldsValue.username}
          onChange={handleRegisterChange}
        />
        <input
          placeholder="password"
          name="password"
          value={registerFieldsValue.password}
          onChange={handleRegisterChange}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          name="username"
          value={loginFieldsValue.username}
          onChange={handleLoginChange}
        />
        <input
          placeholder="password"
          name="password"
          value={loginFieldsValue.password}
          onChange={handleLoginChange}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data && (
          <div>
            <h5>{data}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
