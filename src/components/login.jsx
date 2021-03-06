import React, { useEffect, useState } from "react";
import "./login.css";
import { Modal, Form } from "react-bootstrap";
import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import { initCC } from "matomo-form-tracker";
//pageView
//form interaction
//event --> submit, onFocusChange --> initCC
const Login = () => {
  const [show, setShow] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);

  useEffect(() => {
    if (show) {
      initCC(22);
    }
  }, [show]);

  useEffect(() => {
    if (codeSent) {
      initCC(22);
    }
  }, [codeSent]);

  const handleModal = () => {
    setShow(!show);
    setCodeSent(false);
    setInvalidPhone(false);
  };

  const sendCode = (e) => {
    e.preventDefault();
    let dataIsValid = true;
    if (invalidPhone || !phoneNumber) dataIsValid = false;
    if (dataIsValid) setCodeSent(true);
    else setInvalidPhone(true);
  };

  const login = async (e) => {
    e.preventDefault();
    alert("Verified");

    // if (verificationCode) {
    //   let FormData = require("form-data");
    //   let data = new FormData();
    //   let url = "http://127.0.0.1:8000/"; //sample url
    //   data.append("verification_code", verificationCode);
    //   data.append("phone", phoneNumber);
    //   await axios
    //     .post(url, data)
    //     .then((res) => {
    //       if (res.status === 200) {
    //         console.log("user token : ", res.data.token);
    //       } else {
    //         console.log("unknown status");
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Failur : ", error);
    //     });
    // }
  };

  const handleChange = (e) => {
    if (e.target.value.length !== 11) {
      setInvalidPhone(true);
      setPhoneNumber(e.target.value);
    } else {
      setInvalidPhone(false);
      setPhoneNumber(e.target.value);
    }
  };
  return (
    <div className="main-container d-flex justify-content-center align-items-center">
      <div className="d-flex justify-content-center w-100 button-box">
        <button className="login-button btn btn-primary" onClick={handleModal}>
          login
        </button>
      </div>
      <Modal
        centered
        size={"sm"}
        backdrop="static"
        show={show}
        onHide={handleModal}
      >
        <Modal.Header className="row" closeButton>
          <Modal.Title className="col">
            <div className="title">????????</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form
            onSubmit={login}
            custom-attribute="include-form-tracking"
            id="Login-Form"
          >
            <div className="form-group d-flex justify-content-center">
              <div className="input-group d-flex justify-content-center">
                {!codeSent ? (
                  <Fragment>
                    <Form.Control
                      id={"phone-input"}
                      custom-attribute="include-content-tracking"
                      className="form-control shadow-none phone-input"
                      type="number"
                      value={phoneNumber}
                      required
                      isInvalid={invalidPhone}
                      placeholder="09XXXXXXXXX"
                      dir="ltr"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={"ml-1 invalid-phone"}
                    >
                      ?????????? ???????? ???????? ?????????? ?????? ????????
                    </Form.Control.Feedback>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div dir="ltr">
                      <ReactCodeInput
                        id="code-input"
                        // custom-attribute="include-content-tracking"
                        onChange={(e) => setVerificationCode(e)}
                        type="number"
                        fields={6}
                        fieldWidth={40}
                        fieldHeight={40}
                      />
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {!codeSent ? (
            <Fragment>
              <button
                onClick={sendCode}
                className="btn btn-primary w-100 btn-text"
              >
                ?????????????? ????
              </button>
              <p dir="rtl" className="login-text">
                ???? ???? ???????? ???????? ?????????? ???????????? ?????????? ???????? ?????? ?? ?????? ???????? ???"??????????????
                ????" ???????????? ???????? ???? ???? 6 ???????? ???????? ?????? ?????????? ?????????????. ???? ???????? ????????
                ???? ??????????????????? ???????? ???????? ???????????? ?????? ????????.
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <button
                onClick={login}
                className="btn btn-primary w-100 btn-text"
              >
                ?????????? ?? ????????
              </button>
              <p
                onClick={() => setCodeSent(false)}
                dir="rtl"
                className="login-text"
              >
                (?????????? ?????????? ???? ?????????????? ???? ????????)
              </p>
            </Fragment>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
