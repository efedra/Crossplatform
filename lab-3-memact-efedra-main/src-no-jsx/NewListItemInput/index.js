import Memact from "../../memact";
import { Component } from "../../memact";
import * as cn from "./styles.module.scss";
/** @jsx Memact.createElement */

export class NewListItemInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    if (event.key === 'Enter' && this.props.onItemCreate) {
      this.props.onItemCreate(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  render() {
    return Memact.createElement("input", {
      className: cn.root,
      type: "text",
      value: this.state.value,
      onChange: event => this.setState({
        value: event.target.value
      }),
      onKeyUp: this.handleKeyUp,
      placeholder: "What's next, cap?"
    });
  }

}