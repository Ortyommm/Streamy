import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import flv from 'flv.js'

const StreamShow = (props) => {
  const videoRef = useRef(null)
  let player = null

  useEffect(() => {
    const { id } = props.match.params
    props.fetchStream(id)
  }, [])

  useEffect(() => {
    buildPlayer()
    return () => {
      player.destroy()
    }
  })

  function buildPlayer() {
    if (player || !props.stream) return
    const { id } = props.match.params
    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    })
    player.attachMediaElement(videoRef.current)
    player.load()
  }

  if (!props.stream) return <div>Loading...</div>
  const { title, description } = props.stream
  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
