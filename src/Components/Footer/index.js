import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {Component} from 'react'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <ul className="footer-social-media-icons-box">
          <li>
            <FaGoogle className="social-media-icon" />
          </li>
          <li>
            <FaTwitter className="social-media-icon" />
          </li>
          <li>
            <FaInstagram className="social-media-icon" />
          </li>
          <li>
            <FaYoutube className="social-media-icon" />
          </li>
        </ul>
        <div className="footer-text">
          <p>Contact us</p>
        </div>
      </div>
    )
  }
}

export default Footer
