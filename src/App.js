import React, {Component} from 'react';
import './App.css';
import Content from "./components/Content";
import Subject from "./components/Subject";
import Nav from "./components/Nav";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'welcome',
            subject: {title: 'WEB', sub: 'test'},
            welcome: {title: 'Welcome', sub: 'Hello react!!'},
            contents: [
                {id: 1, title: 'HTML', desc: 'HTML is for Information'},
                {id: 2, title: 'CSS', desc: 'CSS is for design'},
                {id: 3, title: 'Javascript', desc: 'Javascript is for Interactive'}
            ]

        }
    }

    render() {
        return (
            <div className="App">
                <Subject
                    title={this.state.subject.title}
                    sub={this.state.subject.sub}>
                </Subject>
                <Subject title="React" sub="For UI"></Subject>
                <Nav data={this.state.contents}></Nav>
                <Content title="HTML" sub="HTML is HyperText Markup Language."></Content>
            </div>
        );
    }
}

export default App;
