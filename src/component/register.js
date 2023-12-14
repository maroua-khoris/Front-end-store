import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import "../styling/pass.css";
import imglogo from "../assets/0da783cb9ab23e2dc0c5ce3516d62e45.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/loginApi";

function REGISTER() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const loginCus = useSelector((state) => state.data.loginCustomer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const preventDefault = (event) => event.preventDefault();
  // const [open, setOpen] = React.useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);

  const showResetModal = () => {
    setResetModalVisible(true);
  };

  const handleResetCancel = () => {
    setResetModalVisible(false);
  };

  const handleLogin = async () => {
    try {
      const customer = {
        email: email,
        password: password,
      };
      const response = await loginCustomer(dispatch, customer);
      if (response.message === "Login Successful") {
        console.log("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.log("erreur", error.message);
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <body class="bodyy">
      <div className="form-container">
        <div className="container">
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <div align="center">
              <h2> Log In</h2>
              <br></br>
              <img src={imglogo} width={"50%"} height={"60px"} alt="logo" />
              <br></br>
              <br></br>
              <br></br>
            </div>
            <Form.Item
              name="logemail"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid email!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <Input
                className="form-style"
                placeholder="Your Email"
                prefix={<i className="input-icon uil uil-at"></i>}
              />
            </Form.Item>
            <Form.Item
              name="logpass"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <Input.Password
                className="form-style"
                placeholder="Your Password"
                prefix={<i className="input-icon uil uil-lock-alt"></i>}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="mt-4"
                class="bttn"
                onClick={handleLogin}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </body>
  );
}

export default REGISTER;
