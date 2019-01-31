import $ from "jquery";
import { of } from "rxjs/observable/of";
import { from } from "rxjs/observable/from";

export function printf(x, interpolate) {
  if (interpolate) {
    print(x + `: ${interpolate}`);
  } else {
    print(x);
  }
}

export function getGitHubUser(userName) {
  return $.ajax({
    url: "https://api.github.com/users/" + userName,
    dataType: "jsonp"
  }).promise();
}

export function getNames() {
  return $.ajax({
    url: "http://localhost:3004/names",
    dataType: "jsonp"
  }).promise();
}

export const http = {
  getAwesomeMessagesObservable(names) {
    let data = [];
    names.forEach(name => {
      data.push(`${name.name} is awesome! `);
    });
    return of(data);
  }
};

let pre = document.createElement("PRE");

export function print(val) {
  pre.innerText = val;
  document.body.appendChild(pre);
}

export function clear() {
  pre.innerText = "";
  $("#posts").text("");
}

export function testPostData() {
  $("#posts").append("test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> " + "test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> " + "test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> test</br> ");
}
export class FakeWebSocket {
  constructor(url) {
    this.url = url;
    console.log("connecting to " + url);
    let i = 0;
    this.id = setInterval(() => this.triggerMessage(i++), 500);
  }

  close() {
    console.log("closing connection to " + this.url);
    clearInterval(this.id);
  }

  addEventListener(name, handler) {
    const listeners = (this.listeners = this.listeners || {});
    const handlers = (listeners[name] = listeners[name] || []);
    handlers.push(handler);
  }

  addEventListener(name, handler) {
    const listeners = (this.listeners = this.listeners || {});
    const handlers = (listeners[name] = listeners[name] || []);
    handlers.push(handler);
  }

  triggerMessage(msg) {
    const listeners = this.listeners;
    if (listeners) {
      const handlers = listeners["message"];
      handlers.forEach(handler => handler({ target: this, data: JSON.stringify(msg) }));
    }
  }
}
