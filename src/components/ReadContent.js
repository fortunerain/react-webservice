import React, {Component} from "react";

class ReadContent extends Component {
    render() {
        console.log('ReadContent render!!')
        return (
            <article>
                <h2>{this.props.title}</h2>
                {this.props.sub}
            </article>
        );
    }
}

export default ReadContent;