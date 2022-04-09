import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'

const STRAPI_HOST = process.env.REACT_APP_STRAPI_HOST
const api = '/api/articles'
const query = '?populate=categories,cover'
// TODO
// http://localhost:1337/api/articles?sort=rating:desc&populate=categories,cover

// http://localhost:1337/api/articles?populate=cover
// http://localhost:1337/api/categories/2?populate[articles][populate][0]=cover
// http://localhost:1337/api/articles?populate[categories][sort][0]=name%3Aasc&populate[categories][filters][id][$eq]=1
// http://localhost:1337/api/articles?populate[categories][filters][id][$eq]=1
const Homepage = () => {
  const { loading, error, data } = useFetch(`${STRAPI_HOST}${api}${query}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>

  // console.log(data)

  return (
    <main className="uk-flex-auto uk-section">
      <article className="uk-container uk-container-small">
        <ul className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
          {data.map(article => (
            <li key={article.id}>
              <Link to={`/article/${article.attributes.slug}`} className="uk-link-reset uk-card uk-card-default uk-card-hover uk-card-body">
                <div>
                  <div className="uk-flex uk-flex-middle uk-text-meta">
                    <span>Categories:</span>{' '}
                    <ul className="uk-list uk-flex">
                      {article.attributes.categories.data.map(cat => (
                        <li key={cat.id}>{cat.attributes.name}</li>
                      ))}
                    </ul>
                  </div>
                  {/* <figure>
                    <img src={article.attributes.cover.data.attributes.url} alt={article.attributes.cover.data.attributes.alternativeText} />
                    <figcaption className="uk-text-small">{article.attributes.cover.data.attributes.caption}</figcaption>
                  </figure> */}
                  <h3>{article.attributes.title}</h3>
                </div>
                <div>
                  <p>{article.attributes.description.substring(0, 250)} ...</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}

export default Homepage
