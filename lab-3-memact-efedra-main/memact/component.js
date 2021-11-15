import {reconcile} from './render';

export  class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
    this._internalInstance = null;
  }

   updateInstance() {
      this._internalInstance.children[0] = reconcile(this._internalInstance.dom.parentNode,
        this._internalInstance.children[0], this.render())

  }

  render(){
    throw  new Error( (" Method not implemented"))
  }

  setState(partialState) {
    this.state = {...this.state, ...partialState}
    this.updateInstance()
  }



}
