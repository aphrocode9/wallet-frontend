import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React from "react";

import { Row, Col, CardBody, Card, Container, Form, Input, Label } from "reactstrap";
import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// Images
import profile from "assets/images/profile-img.png";
import logo from "assets/images/logo.svg";

import { getUserDetail } from "api/User";
import toast from "helpers/toast";

const Login = props => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "user0" || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      fetchUser(values.username)
    }
  });

  const fetchUser = async (username) => {
    const response = await getUserDetail(username)
    if (response) {
      localStorage.setItem("authUser", JSON.stringify(response))
      window.location.replace("/wallet")
    } else {
      toast("Username not found", "error")
    }
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login | Wallet - React Admin & Dashboard Template</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Wallet.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}>
                      <div className="mb-3">
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter username"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                        />
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit">
                          Log In
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
