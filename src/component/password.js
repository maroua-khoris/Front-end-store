import { newpassword } from "../services/loginApi";
import imglogo from "../assets/0da783cb9ab23e2dc0c5ce3516d62e45.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginCustomer } from "../services/loginApi";
import { Button, Input, Form, Space, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"; // Import Ant Design eye icons
import "../styling/pass.css";

const { Title } = Typography;

function Password() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userlogin = useSelector((state) => state.data.userlogin);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const { resetToken } = useParams();

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords don't match. Please check again.");
      return;
    }

    try {
      const res = await resetPassword(
        {
          email: email,
          password: newPassword,
        },
        resetToken
      );

      if (res && res.success) {
        const user = {
          email: email,
          password: newPassword,
        };

        const response = await loginCustomer(dispatch, user);

        if (response.status === 200) {
          console.log("Login successful");
          navigate("/");
        } else {
          console.log("Login failed", response && response.message);
        }
      }
    } catch (error) {
      console.error("Error resetting password:", error.message);
      alert("Error resetting password. Please try again.");
    }

    setEmail("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const resetPassword = async (credentials, updatedResetToken) => {
    try {
      const res = await newpassword(dispatch, credentials, updatedResetToken);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="bodyy">
      <div className="form-container">
        <Form align="center">
          <Title level={2} align="center" >
            
            Log In with new password
            
            <br />
            <br></br>
            <img src={imglogo} width={"50%"} height={"60px"} alt="logo" />
            
            <br />
          </Title>
         
          <Space direction="vertical" size="middle">
            <Form.Item>
              <Input
                className="form-style"
                placeholder="Write your email here"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<i className="input-icon uil uil-at"></i>}
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                className="form-style"
                placeholder="Write your new password here"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                visibilityToggle
                prefix={
                  <i className="input-icon uil uil-lock-alt"></i>
                }
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                className="form-style"
                placeholder="Confirm your new password here"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                visibilityToggle
                prefix={
                  <i className="input-icon uil uil-lock-alt"></i>
                }
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={(e) => {
                handleResetPassword(e);
              }}
            >
              Login
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
}

export default Password;
