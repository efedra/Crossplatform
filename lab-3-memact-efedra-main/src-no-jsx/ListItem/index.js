import Memact from "../../memact";
import { Component } from "../../memact";
import * as cn from "./styles.module.scss";
/** @jsx Memact.createElement */

export class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      item,
      onComplete,
      onDelete
    } = this.props;
    const {
      label,
      isCompleted,
      isDeleted
    } = item;
    return Memact.createElement("div", {
      className: `${cn.root} ${isDeleted ? cn.deleted : ''}`
    }, Memact.createElement("div", {
      className: cn.square,
      onClick: onComplete
    }, Memact.createElement("span", null, isCompleted ? '✓' : null)), Memact.createElement("span", null, label), Memact.createElement("button", {
      onClick: onDelete
    }, "\u274C"));
  }

}