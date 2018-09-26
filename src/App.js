/*global chrome*/

import React, { Component } from 'react';
import Prism from 'prismjs';
import './prism.css';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { snippets: [] }
  }

  componentDidMount() {
    Prism.highlightAll();

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "get_snippets"}, (response) => {
        this.setState({ snippets: response.snippets })
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Snippet List</h1>
        {this.state.snippets.map((snippet, index) => {
          return (
          <pre className = {snippet.language}>
            <code className = {snippet.language}>
              {snippet.code}
            </code>
          </pre>
          )
        })}
      </div>
    )}
}
export default App;

