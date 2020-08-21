import React, {Component} from 'react';
import './App.css';
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Toc from "./components/Toc";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
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
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var i = 0;
              let _contents = Array.from(this.state.contents);
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }

              this.setState({
                mode: 'welcome',
                contents: _contents
              })
              alert('deleted!');
            }
          } else {
            this.setState({
              mode: _mode
            })
          }

        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }

  getContent() {
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _title = _content.title;
      _desc = _content.desc;
      _article = <ReadContent title={_title} sub={_desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent
        onSubmit={function (_title, _desc) {
          this.max_content_id++;

          // let _contents = this.state.contents.concat({id: this.max_content_id, title: _title, desc: _desc});
          let _contents = Array.from(this.state.contents);
          _contents.push({id: this.max_content_id, title: _title, desc: _desc});

          this.setState({
            contents: _contents,
            mode: 'read',
            selected_content_id: this.max_content_id
          })


        }.bind(this)}></CreateContent>

    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = <UpdateContent data={_content}
                                onSubmit={function (_id, _title, _desc) {
                                  // 복제 해서 새로운 배열을 만듬. 불변.
                                  let _contents = Array.from(this.state.contents);
                                  let i = 0;
                                  while (i < _contents.length) {
                                    if (_contents[i].id === _id) {
                                      _contents[i] = {id: _id, title: _title, desc: _desc}
                                    }
                                    i++;
                                  }
                                  this.setState({
                                    contents: _contents,
                                    mode: 'read'
                                  })


                                }.bind(this)}></UpdateContent>

    }
    return _article;
  }

  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i++;
    }
  }
}

export default App;
