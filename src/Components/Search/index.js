import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import ContextValues from '../../context/ContextValues'
import './index.css'

class Search extends Component {
  renderSearchValueNotFound = searchWord => (
    <div className="search-failure-page">
      <img
        src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1680761491/searchNotFound_q4cdtx.png"
        alt="no movies"
        className="no-search-results-img"
      />
      <p className="no-search-results-para">
        Your search for {searchWord} did not find any matches.
      </p>
    </div>
  )

  renderWhenSuccess = (searchMovies, searchWord) => {
    if (searchMovies.length < 1) {
      return this.renderSearchValueNotFound(searchWord)
    }

    return (
      <div className="search-results-box">
        <ul className="search-results">
          {searchMovies &&
            searchMovies.map(item => (
              <li key={item.id} className="search-item">
                <Link to={`/movies/${item.id}`} className="img-link">
                  <img
                    src={item.posterPath}
                    alt={item.title}
                    className="search-img"
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )
  }

  renderWhenLoading = () => (
    <div className="search-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderWhenFailure = setSearchVal => (
    <div className="search-failure-page">
      <img
        src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1680763091/Group_gl7dt2.png"
        alt="failure view"
        className="search-failure-page-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button type="button" className="try-again-btn" onClick={setSearchVal}>
        Try Again
      </button>
    </div>
  )

  defaultPage = searchMovies => (
    <div className="search-results-box">{searchMovies && searchMovies}</div>
  )

  renderPage = (status, searchMovies, searchWord, setSearchVal) => {
    switch (status) {
      case 'SUCCESS':
        return this.renderWhenSuccess(searchMovies, searchWord)
      case 'FAILURE':
        return this.renderWhenFailure(setSearchVal)
      case 'LOADING':
        return this.renderWhenLoading()
      default:
        return this.defaultPage(searchMovies)
    }
  }

  render() {
    const search = true
    return (
      <ContextValues.Consumer>
        {value => {
          const {setSearchVal, searchMovies, searchWord, status} = value

          console.log(searchMovies, 'search page')

          return (
            <div className="search-bar-container">
              <Header search={search} />
              {this.renderPage(status, searchMovies, searchWord, setSearchVal)}
              <Footer />
            </div>
          )
        }}
      </ContextValues.Consumer>
    )
  }
}

export default withRouter(Search)
