import React from 'react'

const getNotification = (message, style, setter) => {
  if (message) {
    setTimeout(() => setter(null), 5000)
    return (
      <div style={style}>{message}</div>
    )
  }
  return null
}

const InfoNotification = ({ message, setter }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return getNotification(message, notificationStyle, setter)
}

const ErrorNotification = ({ message, setter }) => {
  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return getNotification(message, notificationStyle, setter)
}

export {InfoNotification, ErrorNotification}
