import Memact, { render } from "../memact";
import { App } from "./App";
/** @jsx Memact.createElement */

render(Memact.createElement(App, null), document.getElementById('app'));