import React, {Component} from 'react';
import './App.css';
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Toc from "./components/Toc";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
      selected_content_id: 2,
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
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      let i = 0;
      while (i < this.state.contents.length) {
        let data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i++;
      }
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        console.log(_title, _desc)
        this.max_content_id++;
        let _contents = this.state.contents.concat({id: this.max_content_id, title: _title, desc: _desc});
        this.setState({
          contents: _contents
        })


      }.bind(this)}></CreateContent>

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
        <Toc data={this.state.contents}
             onChangePage={function (id) {
               this.setState({
                 mode: 'read',
                 selected_content_id: Number(id)
               })
             }.bind(this)}
        ></Toc>
        <Control onChangeMode={function (_mode) {
          this.setState({
            mode: _mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
