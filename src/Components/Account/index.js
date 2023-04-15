import {Component} from 'react'
import Cookies from 'js-cookie'
import ContextValues from '../../context/ContextValues'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class Account extends Component {
  state = {currentPage: 'ACCOUNT'}

  componentDidMount() {
    console.log('Hello account....')
  }

  removeCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {currentPage} = this.state
    const passVal = `********`
    const usrName = Cookies.get('user_name')

    return (
      <div className="account-page-container">
        <Header status={currentPage} />
        <div className="account-page-box">
          <h1 className="account-page-heading">Account</h1>

          <div className="account-name-password-box">
            <div className="name-box">
              <p className="membership-title">Member ship</p>
              <div className="membership-data">
                <p className="membership-value">{`${usrName}@gmail.com`}</p>
                <div className="name-password-box">
                  <p className="password">Password: </p>
                  <p className="password password-val">{passVal}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="account-membership-type-box">
            <p className="membership-title"> Plan details</p>
            <div className="membership-value-box">
              <p>Premium</p>
              <p className="ultra-box">Ultra HD</p>
            </div>
          </div>

          <div className="account-logout-box">
            <button
              type="button"
              className="logout-btn"
              onClick={this.removeCookie}
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Account
