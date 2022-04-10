import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const STRAPI_HOST = process.env.REACT_APP_STRAPI_HOST
const api = '/api/categories?filters[slug][$eq]='
const query = '&populate[articles][populate]=categories,cover'

const Category = () => {
  const { slug } = useParams()
  const { loading, error, data } = useFetch(`${STRAPI_HOST}${api}${slug}${query}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>

  return (
    <main className="uk-flex-auto uk-section">
      <article className="uk-container uk-container-small">
        <h1>Category: {data[0].attributes.name}</h1>
        <ul className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
          {data[0].attributes.articles.data.map(article => (
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
                  <figure>
                    <img src={article.attributes.cover.data[0].attributes.url} alt={article.attributes.cover.data[0].attributes.alternativeText} />
                    <figcaption className="uk-text-small">{article.attributes.cover.data[0].attributes.caption}</figcaption>
                  </figure>
                  <h3>{article.attributes.title}</h3>
                </div>
                <div>
                  <p>{article.attributes.description.substring(0, 200)} ...</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  )
}

export default Category
