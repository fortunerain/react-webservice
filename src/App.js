import React, {Component} from 'react';
import './App.css';
import Content from "./components/Content";
import Subject from "./components/Subject";
import Nav from "./components/Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      subject: {title: 'WEB', sub: 'test sub title'},
      welcome: {title: 'Welcome', desc: 'Hello react!!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is for Information'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'Javascript', desc: 'Javascript is for Interactive'}
      ]

    }
  }

  render() {
    console.log('App render!!')
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
          this.setState({
            mode: 'welcome'
          })
        }.bind(this)}>
        </Subject>
        <Nav data={this.state.contents}></Nav>
        <Content title={_title} sub={_desc}></Content>
      </div>
    );
  }
}

export default App;
