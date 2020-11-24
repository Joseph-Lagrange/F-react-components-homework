import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      input: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit() {
    this.props.handleChatMessage(this.state.input);
    this.setState({ input: '' });
  }

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={this.state.input}
          onChange={(event) => this.handleInputChange(event)}
        />
        <button type="button" onClick={this.handleSubmit}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
