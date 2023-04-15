import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ContextValues from '../../context/ContextValues'
import './index.css'

class LoginPage extends Component {
  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ContextValues.Consumer>
        {value => {
          const {
            updateUsername,
            updatePassword,
            checkDetails,
            detailsStatus,
          } = value

          return (
            <div className="login-page">
              <img
                src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1679509045/logo_iwa96c.png"
                className="movies-logo"
                alt="login website logo"
              />
              <form onSubmit={checkDetails} className="login-page-form">
                <div className="login-form-heading">
                  <h2 className="form-heading">Login</h2>
                </div>
                <div className="form-label-input-box">
                  <label className="login-label-text" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    onChange={updateUsername}
                    placeholder="rahul"
                    className="login-form-input-box"
                    id="username"
                  />
                </div>
                <div className="form-password-label-input-box">
                  <label className="login-label-text" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    onChange={updatePassword}
                    placeholder="*********"
                    className="login-form-input-box"
                    id="password"
                  />
                </div>
                <p className="form-error-msg">{detailsStatus}</p>
                <div className="submit-btn-box">
                  <button type="submit" className="submit-btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
          )
        }}
      </ContextValues.Consumer>
    )
  }
}

export default LoginPage
