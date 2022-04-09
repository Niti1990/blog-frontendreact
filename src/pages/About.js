import useFetch from '../hooks/useFetch'
import ReactMarkdown from 'react-markdown'

const STRAPI_HOST = process.env.REACT_APP_STRAPI_HOST
const api = '/api/about'

const About = () => {
  const { loading, error, data } = useFetch(`${STRAPI_HOST}${api}`)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error </p>

  return (
    <main className="uk-flex-auto uk-section">
      <article className="uk-container uk-container-small">
        <h1>{data.attributes.title}</h1>
        <div>
          <ReactMarkdown>{data.attributes.body}</ReactMarkdown>
        </div>
      </article>
    </main>
  )
}
export default About
