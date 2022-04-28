class DomElement {
  constructor(tag_name, options) {
    this.options = options;
    this.tag_name = tag_name;
    this.child = null;
    this.text = null;
    this.list = null;

  }

  draw() {

    const tag = document.createElement(this.tag_name);
    if (this.child) {
      const child = this.child.draw();
      tag.appendChild(child);
    }

    if (this.list) {
      this.list.forEach((element) => {
        let elements_tag_in_list = document.createElement(element.tag_name);
        elements_tag_in_list.innerHTML = element.text;
        if (element.options.for) {
          elements_tag_in_list.for = element.options.for;
        }
        if (element.options.id) {
          elements_tag_in_list.id = element.options.id;
        }
        if (element.options.name) {
          elements_tag_in_list.name = element.options.name;
        }
        if (element.options.submit) {
          elements_tag_in_list.submit = element.options.submit;
        }
        if (element.options.value) {
          elements_tag_in_list.value = element.options.value;
        }
        if (element.options.type) {
          elements_tag_in_list.type = element.options.type;
        }
        tag.appendChild(elements_tag_in_list);
      })
    }
    return tag
  }
}

class SpanElement extends DomElement {
  draw() {
    const tag = super.draw();
    if (this.text) {
      tag.innerHTML = this.text;
    }
    return tag
  }
}

class DivElement extends DomElement {
  draw() {
    const tag = super.draw();
    if (this.text) {
      tag.innerHTML = this.text;
    }
    if (this.options.class) {
      tag.classList.add(this.options.class);
    }
    if (this.options.id) {
      tag.classList.add(this.options.id);
    }
    return tag
  }
}

class UlElement extends DomElement {
  draw() {
    const tag = super.draw();
    if (this.text) {
      tag.innerHTML = this.text;
    }
    return tag
  }
}

class LiElement extends DomElement {
  draw() {
    if (this.text) {
      tag.innerHTML = this.text;
    }
    return tag
  }
}


class FormElement extends DomElement {
  draw() {
    const tag = super.draw();
    if (this.text) {
      tag.innerHTML = this.text;
    }
    if (this.options.class) {
      tag.classList.add(this.options.class);
    }
    if (this.options.id) {
      tag.id = this.options.id;
    }
    if (this.options.action) {
      tag.action = this.options.action;
    }
    return tag
  }
}
class LabelElement extends DomElement {
  draw() {
    const tag = super.draw();
    let tag1 = document.createElement(this.tag_name)
    console.log("mtnuma lable draw",this,tag1)
    if (this.text) {
      tag.innerHTML = this.text;
    }
    return tag
  }
}
class BrElement extends DomElement {
  draw() {
    const tag = super.draw();
    return tag
  }
}
class InputElement extends DomElement {
  draw() {
    const tag = super.draw();
    if (this.text) {
      tag.innerHTML = this.text;
    }
    if (this.options.class) {
      tag.classList.add(this.options.class);
    }
    if (this.options.class) {
      tag.id = this.options.id;
    }
    if (this.options.action) {
      tag.action = this.options.action;
    }
    if (this.options.submit) {
      tag.submit = this.options.submit;
    }
    if (this.options.value) {
      tag.value = this.options.value;
    }
    return tag
  }
}

function el(tag_name, attrs = null, fn) {

  switch (tag_name) {
    case "span":
      instance = new SpanElement(tag_name, attrs);
      break;
    case "div":
      instance = new DivElement(tag_name, attrs);
      break;
    case "ul":
      instance = new UlElement(tag_name, attrs);
      break;
    case "li":
      instance = new LiElement(tag_name, attrs);
      break;
    case "form":
      instance = new FormElement(tag_name, attrs);
      break;
    case "label":
      instance = new LabelElement(tag_name, attrs);
      break;
    case "br":
      instance = new BrElement(tag_name, attrs);
      break;
    case "input":
      instance = new InputElement(tag_name, attrs);
      break;
    default:
      console.log("No value found");
  }

  if (Array.isArray(fn)) {
    instance.list = fn;
  }

  if (typeof fn !== 'string') {
    if (Array.isArray(fn)) {} else {
      instance.child = fn;
    }
  }

  if (typeof fn === 'string') {
    instance.text = fn;
  }
  return instance;
}




const tree1 =
    el("div", { "class": "some_classname", "id": "some_id" }, 
    el("span", {}, 
    el('div', {id: 'test'}, 'hello from div')));

const tree2 =
el("div", {},
  el("ul", {}, [
    el("li", {}, "Item 1"),
    el("li", {}, "Item 2"),
    el("li", {}, "Item 3")
  ])
);

const tree3 =
el("form", {action: '/some_action'}, [
  el("label", {for: 'name'}, "First name:"),
  el("br", {}, null),
  el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
  el("br", {}, null),
  el("label", {for: 'last_name'}, "Last name:"),
  el("br", {}, null),
  el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
  el("br", {}, null),
  el("input", {type: 'submit', value: "Submit"}, null),
]);
document.getElementById("root").appendChild(tree2.draw());