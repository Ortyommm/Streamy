import React, { useEffect } from 'react'
import Modal from '../Modal'
import history from '../../history'
import { deleteStream, fetchStream } from '../../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const StreamDelete = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id)
  })

  const actions = (
    <>
      <button
        className="ui button negative"
        onClick={() => props.deleteStream(props.match.params.id)}
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </>
  )

  function renderContent() {
    if (!props.stream)
      return <span>Are you sure you want to delete the stream?</span>

    return (
      <span>
        Are you sure you want to delete the stream with title:{' '}
        <strong>{props.stream.title}</strong>
      </span>
    )
  }

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={actions}
      onDismiss={(e) => history.push('/')}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
)
