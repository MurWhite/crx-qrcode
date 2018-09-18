export const SCHEMA_PATTERN = window.ALL_SCHEMA || [];

export function urlConvert(url, opts) {
  const s = window.ALL_SCHEMA.filter(schema => schema.name === opts.schema)[0];
  if (s && s.pattern) {
    let pattern = s.pattern;
    let valuedOpts = opts.valuedOpts;
    Object.keys(valuedOpts).map(key => {
      let value = valuedOpts[key];
      pattern = pattern.replace(`\${${key}}`, value);
    })
    pattern = pattern.replace('${url}', url)
    pattern = pattern.replace('${encodedUrl}', encodeURIComponent(url))
    return pattern;
  }
  return '发生异常，请联系开发者';
}

export class SchemaEnv extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
    <style>
      :host {display: block}
      #container { display: flex; align-items:flex-end; justify-content: center; height: 25px;}
      .tab-item { display: inline-block;padding: 0 10px; text-align: center; font-size: 12px; color: #999; cursor: pointer; user-select: none; transition: font-size 100ms linear; }
      .tab-item.active { color: #333; font-size: 18px; font-weight: bold;}
    </style>
    <div id="container">
    </div>
    `;
    this.$container = this.shadowRoot.querySelector('#container');
    this.$container.addEventListener('click', e => {
      const src = e.target;
      let key = src.getAttribute('key');
      if (src.classList.contains('tab-item') && key) {
        this.active = key;
        const event = new CustomEvent('change', {
          detail: {
            opts: window.ALL_SCHEMA.filter(schema => schema.name === key)[0].opts || ''
          }
        });
        this.dispatchEvent(event);
      }
    });
  }

  renderEnvTabs() {
    let renderHtml = '';
    this.tabs.map(schema => {
      renderHtml += `<span class="tab-item" key="${schema.name}">${schema.name}</span>`;
    });
    this.$container.innerHTML = renderHtml;
  }

  setActiveOpt(key) {
    [].slice.call(this.$container.children)
      .map(opt => opt.classList[opt.getAttribute('key') === key ? 'add' : 'remove']('active'));
  }

  static get observedAttributes() {
    return ['active', 'tabs'];
  }

  get tabs() {
    return JSON.parse(this.getAttribute('tabs'));
  }

  set tabs(val) {
    this.setAttribute('tabs', JSON.stringify(val));
  }

  get active() {
    return JSON.parse(this.getAttribute('active'));
  }

  set active(val) {
    this.setAttribute('active', JSON.stringify(val));
    this.setActiveOpt(val);
  }

  attributeChangedCallback(attr, from, to) {
    if (attr === 'tabs') {
      this.renderEnvTabs();
    }
  }
}

export class SchemaOpts extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
    <style>
      :host {display: block;}
      #container { display: flex; justify-content: center;}
      .opt-item { padding: 0 8px; text-align: center; font-size: 14px; color: #999; cursor: pointer; user-select: none;}
      .opt-item.active { color: #333; font-size: 14px; font-weight: bold;}
    </style>
    <div id="container">
    </div>
    `;
    this.$container = this.shadowRoot.querySelector('#container');
    this.$container.addEventListener('click', e => {
      const src = e.target;
      let key = src.getAttribute('key');
      if (src.classList.contains('opt-item') && key) {
        e.target.classList.toggle('active');
        this.updateVal();
      }
    });
  }

  renderOpts() {
    let optHtml = '';
    this.opts.map(opt => {
      optHtml += `<div class="opt-item" key="${opt}">${opt}</div>`;
    });
    this.$container.innerHTML = optHtml;
  }

  updateVal() {
    let opts = {};
    [].slice.call(this.$container.children).map(opt => opts[opt.getAttribute('key')] = opt.classList.contains('active') ? 1 : 0);
    this.value = opts;

    const event = new CustomEvent('change', {
      detail: {}
    });
    this.dispatchEvent(event);
  }

  static get observedAttributes() {
    return ['opts', 'value'];
  }

  get opts() {
    return JSON.parse(this.getAttribute('opts')) || [];
  }

  set opts(val) {
    if (Array.isArray(val)) {
      this.setAttribute('opts', JSON.stringify(val));
    } else {
      this.removeAttribute('opts');
    }
    this.updateVal();
  }

  get value() {
    return JSON.parse(this.getAttribute('value'));
  }

  set value(val) {
    this.setAttribute('value', JSON.stringify(val));
  }

  attributeChangedCallback(attr, from, to) {
    if (attr === 'opts') {
      this.renderOpts();
      const event = new CustomEvent('change', {
        detail: {
          from,
          to
        }
      });
      this.dispatchEvent(event);
    }
  }
}

window.customElements.define('schema-env', SchemaEnv);
window.customElements.define('schema-opts', SchemaOpts);