import React, { useRef, useState } from 'react'

const STRAPI_HOST = process.env.REACT_APP_STRAPI_HOST

const Login = () => {
  const [userData, setUserData] = useState()
  const emailRef = useRef()
  const passwRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    const email = emailRef.current.value
    const passw = passwRef.current.value

    fetch(STRAPI_HOST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: passw,
      }),
    })
      .then(response => response.json())
      .then(data => setUserData(data))
    emailRef.current.value = null
    passwRef.current.value = null
  }
  console.log(userData)
  return (
    <main className="uk-flex-auto uk-section uk-flex uk-flex-column uk-flex-center">
      <article className="uk-container uk-container-xsmall">
        <h1 className="uk-h4 uk-text-center">
          <span>Login Page!</span>
        </h1>
        <form onSubmit={handleSubmit} className="uk-form uk-flex uk-flex-center">
          <fieldset className="uk-fieldset">
            <div className="uk-margin-small">
              <div className="uk-inline uk-width-1-1">
                <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
                <input ref={emailRef} type="email" name="email" className="uk-input" autoFocus required placeholder="E-Mail" />
              </div>
            </div>
            <div className="uk-margin-small">
              <div className="uk-inline uk-width-1-1">
                <span className="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
                <input ref={passwRef} type="password" name="password" className="uk-input" required placeholder="Password" />
              </div>
            </div>
            <div className="uk-margin-bottom">
              <button type="submit" className="uk-button uk-button-primary uk-border-pill uk-width-1-1">
                LOG IN
              </button>
            </div>
          </fieldset>
        </form>
      </article>
    </main>
  )
}

export default Login
