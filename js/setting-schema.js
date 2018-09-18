export class SchemaSettingItem extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
    <style>
      :host { width: 100%; display: block; }
      .container { display:flex; width: 100%; padding-top: 10px; }
      input { box-sizing: border-box; border: none; border-bottom: 1px solid #ccc; padding: 3px 5px; }
      .container>input { flex: 1; width: inherit; }
      input.pattern { width: 100%; }
    </style>
    <div class="container">
      <input class="name" type="text" placeholder="模式名称">
      <input class="opts" type="text" placeholder="模式选项">
    </div>
    <input class="pattern" type="text" placeholder="模式字符串">
    `;

    this.$name = shadowRoot.querySelector("input.name");
    this.$opts = shadowRoot.querySelector("input.opts");
    this.$pattern = shadowRoot.querySelector("input.pattern");

    this.$name.addEventListener('input', _ => this.name = this.$name.value);
    this.$opts.addEventListener('input', _ => this.opts = this.$opts.value);
    this.$pattern.addEventListener('input', _ => this.pattern = this.$pattern.value);
  }

  static get observedAttributes() {
    return ['name', 'opts', 'pattern'];
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    this.setAttribute('name', val);
    this.$name.value = val;
  }

  get opts() {
    return this.getAttribute('opts').split(',');
  }

  set opts(val) {
    if (typeof val === 'string') {
      this.setAttribute('opts', val);
      this.$opts.value = val;
    } else {
      this.setAttribute('opts', val.joins(','));
      this.$opts.value = val.joins(',');
    }
  }

  get pattern() {
    return this.getAttribute('pattern');
  }

  set pattern(val) {
    this.setAttribute('pattern', val);
    this.$pattern.value = val;
  }

  attributeChangedCallback(attr, from, to) {
    if (from !== to) {
      switch (attr) {
        case 'name':
          this.name = to;
          break;
        case 'opts':
          this.opts = to;
          break;
        case 'pattern':
          this.pattern = to;
      }
    }
  }

  watchName(from, to) {

  }
}

window.customElements.define('schema-setting-item', SchemaSettingItem);