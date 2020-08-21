import React, {Component} from "react";

class Toc extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.data === nextProps.data) {
      return false;
    }
    return true;
  }

  render() {
    console.log('Toc render!!')
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(<li key={data[i].id}>
        <a
          data-id={data[i].id}
          href={"/contents/" + data[i].id}
          onClick={function (id, e) {
            e.preventDefault();
            // this.props.onChangePage(e.target.dataset.id);
            this.props.onChangePage(id);
          }.bind(this, data[i].id)}
        >{data[i].title}</a></li>)
      i = i + 1;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default Toc;