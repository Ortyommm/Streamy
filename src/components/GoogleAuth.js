import React, { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

const GoogleAuth = (props) => {
  const [auth, setAuth] = useState()
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '285481230526-bta6sacp8fvr4h7f3sv0cbaar70ogkss.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          if (!auth) {
            setAuth(window.gapi.auth2.getAuthInstance())
            return
          }
          onAuthChange(auth.isSignedIn.get())
          auth.isSignedIn.listen(onAuthChange)
        }) //после выполнения загрузки auth2 будет выполнен колэк
    })
  })

  function onAuthChange(isSignedIn) {
    // console.log('onAuthChange')
    isSignedIn ? props.signIn(auth.currentUser.get().getId()) : props.signOut()
  }

  function onSignInClick() {
    auth.signIn()
  }
  function onSignOutClick() {
    auth.signOut()
  }

  function renderAuthButton() {
    switch (props.isSignedIn) {
      case null:
        return null
      case true:
        return (
          <button className="ui red google button" onClick={onSignOutClick}>
            <i className="google icon"></i>
            Sign out
          </button>
        )
      default:
        return (
          <button className="ui red google button" onClick={onSignInClick}>
            <i className="google icon"></i>
            Sign In with Google
          </button>
        )
    }
  }

  return <div>{renderAuthButton()}</div>
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)
