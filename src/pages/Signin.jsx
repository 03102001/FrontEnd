import React, { useState } from "react";
import { Alert, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SAlert from "../components/Alert";
import SForm from "../components/SigninForm";
import { postData } from "../utils/fetch";
import { useDispatch } from "react-redux";
import Layout from "./Layout";
import AlertContainer from "../components/Alert";
import { userLogin } from '../features/auth/action';

function SignInPage() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    UserName: "",
    UserPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const res = await postData("/api/HrEmployee/SignIn", form);
      console.log(res)
      dispatch(
        userLogin(
          res.data.token,
          res.data.user
        )
      );
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeTest = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="columns is-fluid p-6">
        <div className="column">
          <div className="block">
            <img loading="lazy" src="logo.png" alt="Logo" />
            <h3 className="mb-0 title">Welcome Back!</h3>
          </div>
          <div className="block">
            <p className="mb-0 subtitle">Please login to continue</p>
          </div>

          <Card style={{ padding: "2rem" }}>
            <SForm
              form={form}
              handleChange={handleChangeTest}
              handleSubmit={handleOnSubmit}
              isLoading={isLoading}
            />
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default SignInPage;