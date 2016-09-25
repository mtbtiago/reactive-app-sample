import $ from "jquery";
import {ElementComponent} from "../../lib/component";


class PlayerComponent extends ElementComponent {
  constructor() {
    super();
  }

  _onAttach() {
    const $title = this._$mount.find("h1");
    $title.text("Player!");
    this.$element.append("<h2>HEY!</h2>");
  }
}

let component = new PlayerComponent();
component.attach($("section.player"));
