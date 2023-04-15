import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingNow extends Component {
  state = {trendingMovies: [], status: apiStatus.initial}

  componentDidMount() {
    this.fetchData()
  }

  renderSuccess = () => {
    const {trendingMovies} = this.state

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
    return (
      <div className="trending-now-container">
        {trendingMovies && (
          <Slider {...settings}>
            {trendingMovies.map(items => (
              <li key={items.id}>
                <Link to={`/movies/${items.id}`}>
                  <img
                    src={items.posterPath}
                    alt={items.title}
                    className="trending-poster"
                  />
                </Link>
              </li>
            ))}
          </Slider>
        )}
      </div>
    )
  }

  renderFailure = () => (
    <div className="trending-failure-view">
      <div className="trending-failure-box">
        <img
          src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1681031102/alert-triangle_bive9d.png"
          alt="failure view"
          className="alert"
        />
        <p className="trending-failure-para">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="trending-alert-btn"
          onClick={this.fetchData}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoading = () => (
    <div className="trending-failure-view">
      <div className="trending-failure-box" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderDefault = () => (
    <div className="trending-failure-view">
      <div className="trending-failure-box">
        <></>
      </div>
    </div>
  )

  renderOutput = status => {
    switch (status) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'LOADING':
        return this.renderLoading()
      default:
        return this.renderDefault()
    }
  }

  fetchData = async () => {
    this.setState({status: apiStatus.loading})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        const trendingData = data.results

        const trendingNowData = trendingData.map(item => ({
          id: item.id,
          backdropPath: item.backdrop_path,
          overview: item.overview,
          posterPath: item.poster_path,
          title: item.title,
        }))

        this.setState({
          trendingMovies: [...trendingNowData],
          status: apiStatus.success,
        })
      } else {
        this.setState({status: apiStatus.failure})
      }
    } catch (e) {
      this.setState({status: apiStatus.failure})
    }
  }

  render() {
    const {status} = this.state
    return <>{this.renderOutput(status)}</>
  }
}

export default TrendingNow
