import React, { Component } from 'react'
import io from 'socket.io-client'
import shortid from 'shortid'

export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  sendMessage = e => {
    this.socket.emit('SEND_MESSAGE', {
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
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange('userName')}
        />
        <br />
        <input
          type="text"
          placeholder="Message"
          value={this.state.message}
          onChange={this.handleChange('message')}
        />
        <br />
        <button onClick={this.sendMessage}>Send</button>

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
