import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdOutlineMenuOpen} from 'react-icons/md'
import {CgClose} from 'react-icons/cg'
import {Link, withRouter} from 'react-router-dom'
import ContextValues from '../../context/ContextValues'

import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    const {search, status} = this.props
    this.state = {
      searchBox: search,
      menuBox: false,
      active: status,
    }
  }

  showInputBox = () => {
    this.setState({searchBox: true})
  }

  showMenuDetails = () => {
    this.setState({menuBox: true})
  }

  closeMenuBar = () => {
    this.setState({menuBox: false})
  }

  render() {
    const {searchBox, menuBox, active} = this.state
    const inputBox = searchBox ? 'search-display-border' : ''
    const searchBg = searchBox ? 'search-icon-bg' : ''
    console.log(searchBox, '*&*&')

    const activeHome = active === 'HOME' ? 'active-text' : ''
    const activePopular = active === 'POPULAR' ? 'active-text' : ''
    const activeAccount = active === 'ACCOUNT' ? 'active-text' : ''

    const accountPage = active === 'ACCOUNT' ? 'account-bg-color' : ''

    console.log(active, activeHome, activePopular, activeAccount)

    return (
      <ContextValues.Consumer>
        {value => {
          const {
            openMenu,
            closeMenu,
            menu,
            searchVal,
            updateSearchVal,
            setSearchVal,
          } = value

          return (
            <div className={`header ${accountPage}`}>
              <div className="header-flex">
                <ul className="header-logo-links-box">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1679509045/logo_iwa96c.png"
                      className="header-logo"
                      alt="website logo"
                    />
                  </Link>
                  <Link to="/" className={`home-btn ${activeHome}`}>
                    <li>Home</li>
                  </Link>

                  <Link
                    to="/popular"
                    className={`popular-btn ${activePopular}`}
                  >
                    <li>Popular</li>
                  </Link>
                </ul>
                <div to="/search" className="header-profile-search-box">
                  <Link
                    to="/search"
                    className={`search-icon-box ${inputBox}`}
                    onClick={this.showInputBox}
                  >
                    <input
                      type="search"
                      className="search-box-block"
                      value={searchVal}
                      onChange={updateSearchVal}
                    />
                    <button
                      type="button"
                      className={`search-box ${searchBg}`}
                      onClick={setSearchVal}
                      testid="searchButton"
                    >
                      <HiOutlineSearch />
                    </button>
                  </Link>
                  <Link to="/account" className="account-btn">
                    <img
                      src="https://res.cloudinary.com/dxnnsbh2u/image/upload/v1679652216/Avatar_peiq15.png"
                      className="avatar"
                      alt="profile"
                    />
                  </Link>
                  <div className="menu-bar">
                    <MdOutlineMenuOpen size={30} onClick={openMenu} />
                  </div>
                </div>
              </div>
              {menu && (
                <div className="menu-details">
                  <div className="menu-close-box">
                    <Link to="/" className={`menu-link-btn ${activeHome}`}>
                      Home
                    </Link>
                    <Link
                      to="/popular"
                      className={`menu-link-btn ${activePopular}`}
                    >
                      Popular
                    </Link>
                    <Link
                      to="/account"
                      className={`menu-link-btn ${activeAccount}`}
                    >
                      Account
                    </Link>
                    <button
                      type="button"
                      className="close-button"
                      onClick={closeMenu}
                    >
                      <CgClose className="close-btn" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </ContextValues.Consumer>
    )
  }
}

export default withRouter(Header)
