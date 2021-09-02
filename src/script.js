// Croquet Tutorial 1
// Hello World 
// Croquet Corporation 
// 2021
import { Model, View, Session } from "@croquet/croquet";

class MyModel extends Model {

  init() {
    this.count = 0;
    this.subscribe("counter", "reset", this.resetCounter);
    this.future(1000).tick();
  }

  resetCounter() {
    this.count = 0;
    this.publish("counter", "update", this.count);
  }

  tick() {
    this.count++;
    this.publish("counter", "update", this.count);
    this.future(1000).tick();
  }

}

MyModel.register("MyModel");

class MyView extends View {

  constructor(model) {
    super(model);
    countDisplay.onclick = event => this.onclick(event);
    this.subscribe("counter", "update", this.handleUpdate);
  }

  onclick() {
    this.publish("counter", "reset");
  }

  handleUpdate(data) {
    countDisplay.textContent = data;
  }

}

Session.join({
  appId: "in.jessmart.croquet.hello-world",
  apiKey: "1_bdoj07sd3kzujn95jhplk2pz8xuio3pbmxx3k7q6",
  name: "test-session",
  password: "secret",
  model: MyModel,
  view: MyView
});