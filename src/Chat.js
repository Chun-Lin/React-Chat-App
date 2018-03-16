import React, { Component } from 'react'
import io from 'socket.io-client'
import shortid from 'shortid'

export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      room: '',
      userName: '',
      message: '',
      messages: [],
    }
    this.socket = io.connect('localhost:8080')
    this.socket.on('RECEIVE_MESSAGE', userData => {
      this.addMessage(userData)
    })
  }

  handleChange = keyword => e => {
    this.setState({ [keyword]: e.target.value })
  }

  sendRoom = e => {
    this.socket.emit('ROOM', {
      room: this.state.room,
      author: this.state.userName,
    })
  }

  sendMessage = e => {
    this.socket.emit('SEND_MESSAGE', {
      room: this.state.room,
      author: this.state.userName,
      message: this.state.message,
    })
    this.setState({ message: '' })
  }

  addMessage = data => {
    console.log(data)
    this.setState({ messages: [...this.state.messages, data] })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Room"
          value={this.state.room}
          onChange={this.handleChange('room')}
        />
        <br />
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange('userName')}
        />
        <br />
        <button onClick={this.sendRoom}>Send Room</button>
        <br />
        <input
          type="text"
          placeholder="Message"
          value={this.state.message}
          onChange={this.handleChange('message')}
        />
        <br />
        <button onClick={this.sendMessage}>Send Message</button>

        <div className="messages">
          {this.state.messages.map(message => {
            return (
              <div key={shortid.generate()}>
                {message.author}: {message.message}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
