import Memact from 'memact';
import { Component } from 'memact';

import * as cn from './styles.module.scss';
/** @jsx Memact.createElement */

export class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, onComplete, onDelete } = this.props;
    const { label, isCompleted, isDeleted } = item;
    return (
      <div className={`${cn.root} ${isDeleted ? cn.deleted : ''}`}>
        <div className={cn.square} onClick={onComplete}>
          <span>{isCompleted ? '✓' : null}</span>
        </div>
        <span>{label}</span>
        <button onClick={onDelete}>❌</button>
      </div>
    );
  }
}
