import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiCallStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Popular extends Component {
  state = {
    currentPage: 'POPULAR',
    popular: [],
    apiStatus: apiCallStatus.initial,
  }

  componentDidMount() {
    const token = Cookies.get('jwt_token')
    this.fetchPopularMovies(token)
  }

  fetchPopularMovies = async token => {
    this.setState({apiStatus: apiCallStatus.loading})
    console.log(token, 'token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        console.log(data, 'data')
        const popularData = data.results.map(item => ({
          id: item.id,
          backdropPath: item.backdrop_path,
          posterPath: item.poster_path,
          item: item.title,
        }))

        this.setState({popular: popularData})
        this.setState({apiStatus: apiCallStatus.success})
      } else {
        this.setState({apiStatus: apiCallStatus.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiCallStatus.failure})
    }
  }

  renderSuccessBlock = () => {
    const {popular} = this.state
    console.log(popular)
    return (
      <div className="popular-data-container">
        <ul className="popular-data-box">
          {popular &&
            popular.map(item => (
              <li key={item.id} className="popular-list-box">
                <Link
                  to={`/movies/${item.id}`}
                  className="img-link"
                  key={item.id}
                >
                  <img
                    src={item.posterPath}
                    alt={item.title}
                    className="popular-item-img"
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )
  }

  renderFailureBlock = () => {
    const token = Cookies.get('jwt_token')

    return (
      <div className="popular-failure-page">
        <img
          src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1680763091/Group_gl7dt2.png"
          alt="failure view"
          className="popular-failure-page-img"
        />
        <p className="failure-para">Something went wrong. Please try again</p>
        <button
          type="button"
          className="try-again-btn"
          onClick={() => this.fetchPopularMovies(token)}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderLoadingBlock = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderDefaultBlock = () => (
    <div className="popular-results-box">
      <></>
    </div>
  )

  renderPopularPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessBlock()
      case 'FAILURE':
        return this.renderFailureBlock()
      case 'LOADING':
        return this.renderLoadingBlock()
      default:
        return this.renderDefaultBlock()
    }
  }

  render() {
    const {currentPage, popular} = this.state
    console.log(popular)
    return (
      <div className="popular-page-container">
        <Header status={currentPage} />
        {this.renderPopularPage()}
        <Footer />
      </div>
    )
  }
}

export default withRouter(Popular)
