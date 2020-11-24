import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleCustomerMessage = (text) => {
    return {
      text: [text],
      role: ROLE.CUSTOMER,
    };
  };

  handleRobotMessage = (text) => {
    let robotMessage = answersData.find((answer) => answer.tags.includes(text));
    if (robotMessage === undefined) {
      robotMessage = {
        role: ROLE.ROBOT,
        text: '无法识别，请联系人工客服~',
      };
    }
    return robotMessage;
  };

  handleSetState = (message, time) => {
    setTimeout(() => {
      this.setState((prev) => ({
        messages: prev.messages.concat(message),
      }));
    }, time);
  };

  handleChatMessage = (text) => {
    this.handleSetState(this.handleCustomerMessage(text), 500);
    this.handleSetState(this.handleRobotMessage(text), 1000);
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleChatMessage={this.handleChatMessage} />
      </main>
    );
  }
}

export default Chat;
