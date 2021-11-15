import Memact from 'memact';
import { List } from '../List';

import * as cn from './styles.module.scss';

const LIST_ITEMS = [
  { id: '1', label: 'Repair engine', isCompleted: false },
  { id: '2', label: 'Reinforce hull', isCompleted: false },
  { id: '3', label: 'Enable oxygen generation', isCompleted: false },
  { id: '4', label: 'Leave the system', isCompleted: false },
  { id: '5', label: 'Connect with base on Earth', isCompleted: false },
];

/** @jsx Memact.createElement */

export class App extends Memact.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cn.root}>
        <h1>Welcome captain</h1>
        <List items={LIST_ITEMS} />
      </div>
    );
  }
}
