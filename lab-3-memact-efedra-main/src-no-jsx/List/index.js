import Memact from "../../memact";
import { NewListItemInput } from "../NewListItemInput";
import { ListItem } from "../ListItem";
import * as cn from "./styles.module.scss";
/** @jsx Memact.createElement */

export class List extends Memact.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: this.props.items || []
    };
    this.handleItemCreation = this.handleItemCreation.bind(this);
    this.handleItemDeletion = this.handleItemDeletion.bind(this);
  }

  handleItemCompletion(itemIndex) {
    let updatedItems = [...this.state.listItems];
    const itemToUpdate = updatedItems[itemIndex];
    updatedItems[itemIndex] = { ...itemToUpdate,
      isCompleted: !itemToUpdate.isCompleted
    };
    this.setState({
      listItems: updatedItems
    });
  }

  handleItemDeletion(itemIndex) {
    let updatedItems = [...this.state.listItems];
    const itemToUpdate = updatedItems[itemIndex];
    updatedItems[itemIndex] = { ...itemToUpdate,
      isDeleted: true
    };
    this.setState({
      listItems: updatedItems
    });
    setTimeout(() => {
      updatedItems.splice(itemIndex, 1);
      this.setState({
        listItems: updatedItems
      });
    }, 500);
  }

  handleItemCreation(itemLabel) {
    this.setState({
      listItems: [...this.state.listItems, {
        id: Date.now().toString(),
        label: itemLabel
      }]
    });
  }

  render() {
    return Memact.createElement("div", {
      className: cn.root
    }, Memact.createElement("div", {
      className: cn.list
    }, this.state.listItems.map((item, index) => Memact.createElement(ListItem, {
      key: item.id,
      item: item,
      onComplete: () => this.handleItemCompletion(index),
      onDelete: () => this.handleItemDeletion(index)
    }))), Memact.createElement(NewListItemInput, {
      onItemCreate: this.handleItemCreation
    }));
  }

}