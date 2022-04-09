import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const host = process.env.REACT_APP_STRAPI_HOST
const api = '/api/categories'

const SiteHeader = () => {
  const { loading, error, data } = useFetch(`${host}${api}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>

  return (
    <header className="uk-section uk-section-default uk-flex uk-flex-middle uk-flex-between uk-padding-small">
      <h1 className="uk-h4 uk-margin-remove-vertical uk-padding">
        <span>The Five Recipies Blog</span>
      </h1>
      <nav className="uk-padding">
        <ul className="uk-nav uk-flex uk-flex-middle">
          <li className="uk-inline uk-padding-small">
            <Link to="/" className="uk-link-text">
              Home
            </Link>
          </li>
          <li className="uk-inline uk-padding-small">
            <span className="uk-link-text" type="button">
              Categories
            </span>
            <div data-uk-dropdown="pos: bottom-center; mode: click">
              <ul className="uk-nav uk-dropdown-nav">
                {data.map(category => (
                  <li key={category.id}>
                    <Link to={`/category/${category.attributes.slug}`} className="uk-link-text">
                      {category.attributes.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className="uk-margin-remove uk-padding-small">
            <Link to="/about/" className="uk-link-text">
              About
            </Link>
          </li>
          <li className="uk-margin-remove uk-padding-small">
            <Link to="/login/" className="uk-link-text">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
