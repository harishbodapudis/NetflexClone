import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NotFoundPage extends Component {
  componentDidMount() {
    console.log('Hello ..not found page')
  }

  render() {
    return (
      <div className="not-found-container">
        <h1 className="heading">Lost Your Way?</h1>
        <p className="para">
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <button type="button" className="link-btn">
          <Link to="/" className="link-text">
            Go To Home
          </Link>
        </button>
      </div>
    )
  }
}

export default NotFoundPage
