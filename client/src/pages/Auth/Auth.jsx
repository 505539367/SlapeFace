import { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { GoogleOutlined } from '@ant-design/icons';

import "./Auth.css"
import { AuthContext } from '../../context/AuthProvider';
import * as AuthAction from "../../actions/AuthAction"
import * as AuthAPI from "../../API/AuthAPI"


const Auth = () => {

  const { isFetching, dispatch, user, error, token } = useContext(AuthContext);


  /*************************************
  *        GOOGLE AUTHENTICATION       *
  *************************************/
  const googleAuth = () => {
    // console.log("google")
    try {
      window.open(
        `${process.env.REACT_APP_API_URL}/auth/google/callback`,
        "_self"
      );
      // const res = AuthAPI.GooglelogIn();
      // console.log(res)
    } catch (error) {
      console.log("Auth page, open oauth...  \n" + error)
    }
  };




  const initData = {
    username: "",
    password: "",
  }

  const [data, setData] = useState(initData);

  // check if the user's username or passward is an invalid input
  const [badInfo, setBadInfo] = useState(0);

  const checkForm = () => {
    if (data.username.length === 0) {
      setBadInfo(1)
      return false;
    }
    else if ((data.password.length === 0)) {
      setBadInfo(2)
      return false;
    }
    return true;
  }

  const changeData = (e) => {
    setData(
      { ...data, [e.target.name]: e.target.value }
    )
  }

  /******************************
  *        REGULAR SIGNIN       *
  *******************************/
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (checkForm()) {
      const ifErr = await AuthAction.logIn(data, dispatch)

      if (ifErr) {
        setBadInfo(3)
      }
      // console.log(isFetching)
      // console.log(user)
    }
  }



  //==========================================================================================
  return (
    <div className="auth">

      <div className="authContainer">

        {/* <div className="signIn"> */}
        <form className="infoForm authform">
          <span className='authTitle'>User Login</span>

          <span className='authDesc'>Enter your data to get sign in to your account</span>

          {badInfo === 1 &&
            <span className='authDesc failAuth'>Username cannot be empty!</span>
          }
          {badInfo === 2 &&
            <span className='authDesc failAuth'>Password cannot be empty!</span>
          }
          {badInfo === 3 &&
            <span className='authDesc failAuth'>Invalid Username or Wrong Password</span>
          }

          <div className='infoInputWraper'>
            <input required
              type="text"
              className="infoInput"
              placeholder=' Username'
              name='username'
              value={data.username}
              onChange={changeData}
            />
          </div>

          <div className='infoInputWraper'>
            <input required

              type="password"
              className="infoInput"
              placeholder=' Password'
              name='password'
              value={data.password}
              onChange={changeData}
            />
          </div>

          <span className='trouble'>
            <Link className='trouble' to="/signup">Don't have account? Sign Up!</Link>
          </span>

          <button className='button infoButton'
            type='Submit'
            disabled={isFetching}
            onClick={handleSubmit}>
            {isFetching ? "Lading" : "Sign in"}
          </button>


          <hr className="hr-mid-circle" />


          <span className='signOptions'>Or Sign in with</span>

          <div className="buttonWrapper">
            <div className="logoWrapper">

              <GoogleOutlined style={{fontSize:"18px", marginTop:"3px"}}/>
              <button className='button logoBtn' onClick={googleAuth}>
                Google
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Auth
