import React, { useState } from "react";
import { Form, Input, Button, Modal, message } from "antd";
import "../styling/login.css";
import imglogo from "../assets/0da783cb9ab23e2dc0c5ce3516d62e45.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../services/loginApi";
import { resetPasswordApi } from "../services/loginApi";
import { registerCustomerApi, verifyCustomerEmailApi } from "../services/loginApi"
import { MailOutlined, LockOutlined } from "@ant-design/icons";
function LOGIN() {
  
  const [registrationData, setRegistrationData] = useState({first_name: '',last_name: '',email: '',password: '',
  });

  const handleRegistration = async (values) => {
    try {
      const response = await registerCustomerApi(values);
  
      if (response.success) {
        console.log('Registration successful');
        message.success('Registration successful. Check your email for verification.');
        // Optionally, you can handle the verificationToken or display a success message
      } else {
        console.error('Registration failed:', response.message);
        message.error(response.message);
        // Handle the registration failure, display an error message, etc.
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      message.error('Error during registration. Please try again.');
      // Handle the error, display an error message, etc.
    }
  };
  

  const handleVerification = async (verificationToken) => {
    try {
      const response = await verifyCustomerEmailApi(verificationToken);

      if (response.success) {
        console.log('Email verification successful');
        message.success('Email verification successful. You can now log in.');
        // Optionally, you can redirect the user to the login page or perform other actions
      } else {
        console.error('Email verification failed:', response.message);
        message.error('Email verification failed. Please try again.');
        // Handle the email verification failure, display an error message, etc.
      }
    } catch (error) {
      console.error('Error during email verification:', error.message);
      message.error('Error during email verification. Please try again.');
      // Handle the error, display an error message, etc.
    }
  };

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

  const handlePassword = async () => {
    try {
      await resetPasswordApi(dispatch, { email });
      message.success("Reset password link sent to your email");
      handleResetCancel(); // Close the modal after successful reset request
    } catch (error) {
      console.error("Error resetting password:", error.message);
    }
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
  const handleCheckboxChange = () => {
    setIsFlipped(!isFlipped);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <body class="body">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                
                
                  <span>Log In </span>
                  <span>Sign Up</span>
                  
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  checked={isFlipped}
                  onChange={handleCheckboxChange}
                /> 
                <label htmlFor="reg-log"></label>
                <br></br>
                  <img src={imglogo} width={"40%"} height={"60px"}></img>
                <div className="card-3d-wrap mx-auto">
                  
                  <div
                    className={`card-3d-wrapper${isFlipped ? " flipped" : ""}`}
                  >
                    <div className="card-container">
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4 className="mb-4 pb-3">Log In</h4>
                            <Form
                              name="loginForm"
                              initialValues={{ remember: true }}
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                            >
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
                                  prefix={
                                    <i className="input-icon uil uil-at"></i>
                                  }
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
                                  prefix={
                                    <i className="input-icon uil uil-lock-alt"></i>
                                  }
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
                            <p className="mb-0 mt-4 text-center">
                              <a onClick={showResetModal}>
                                Forgot your password?
                              </a>
                            </p>
                            <Modal
                              title="Forgot password?"
                              visible={resetModalVisible}
                              onCancel={handleResetCancel}
                              onOk={handlePassword}
                            >




                              <Form>

                                <Form.Item
                                  label="Email"
                                  name="email"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter your email!",
                                    },
                                    {
                                      type: "email",
                                      message:
                                        "Please enter a valid email address!",
                                    },
                                  ]}
                                >
                                  <Input
                                    prefix={<MailOutlined />}
                                    placeholder="Write your email here"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </Form.Item>
                              </Form>
                            </Modal>
                          </div>
                        </div>{" "}
                      </div>
                    </div>{" "}
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <Form
                            name="registrationForm"
      onFinish={handleRegistration}
                            initialValues={{ remember: true }}
                           
                            onFinishFailed={onFinishFailed}
                          >
                            <Form.Item
                              name="first_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your First name!",
                                },
                              ]}
                            >
                              <Input
                                className="form-style"
                                placeholder="Your First Name"
                                prefix={
                                  <i className="input-icon uil uil-user"></i>
                                }
                              />
                            </Form.Item>
                            <Form.Item
                              name="last_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Last name!",
                                },
                              ]}
                            >
                              <Input
                                className="form-style"
                                placeholder="Your Last Name"
                                prefix={
                                  <i className="input-icon uil uil-user"></i>
                                }
                              />
                            </Form.Item>
                            <Form.Item
                              name="email"
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
                            >
                              <Input
                                className="form-style"
                                placeholder="Your Email"
                                prefix={
                                  <i className="input-icon uil uil-at"></i>
                                }
                              />
                            </Form.Item>
                            <Form.Item
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your password!",
                                },
                              ]}
                            >
                              <Input.Password
                                className="form-style"
                                placeholder="Your Password"
                                prefix={
                                  <i className="input-icon uil uil-lock-alt"></i>
                                }
                              />
                            </Form.Item>
                            {/* Add more form items for additional signup fields */}
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="mt-4"
                                class="bttn"
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default LOGIN;
