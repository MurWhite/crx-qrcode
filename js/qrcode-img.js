const styleTag = document.createElement('style');
styleTag.innerText = `
  canvas {
    display: block;
    margin: 5px auto;
  }
`;

export default class QRCodeImg extends HTMLElement {
  constructor(width = 100, height = 100) {
    super();
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
    <style>
      :host{ display: block; position: relative;  }
      .container {height: 200px;}
      canvas{ display: block; width: 200px; height: 200px; margin: 0 auto;}
      div.qrcode {
        position:absolute; 
        width: 100%;
        opacity: 0; 
        height: 200px;
        top: 0;
        transition: opacity 300ms ease;
      }
      div.qrcode.active { opacity: 1; }
      p.title {margin: 0;font-size: 14px; color: #999999;user-select: none;}
      p.qrtext {word-break: break-all; max-height: 150px; overflow-y: auto;user-select: text;}
      .qrcode-content {margin: 0 auto; background-color: #fff; padding: 0 5px;}
      .qrcode-content:hover {opacity: 1;}
      .corner{ 
        user-select: none;
        cursor: pointer;
        position: absolute;
        right: 0; top: 0;
        width: 20px; height: 20px;
        transition: all 300ms ease;
        background-color: #333;
        border-radius: 10px 0 0 10px;
        color: #999; font-size: 12px;
        white-space: nowrap; overflow: hidden;
        padding-left: 3px;
        display: flex; align-items: center; justify-content: center;
      }
      .corner>svg { fill: #999; transition: all 300ms ease;position: absolute;}
      .corner:hover { padding-left: 2px; width: 30px; color: #fff; }
      .corner:hover>svg { fill: #fff }
      svg.qrcode {opacity: 0;}
      .corner.text>svg.text {opacity: 0;}
      .corner.text>svg.qrcode {opacity: 1;}
    </style>
    <div class="container"></div>
    <div class="qrcode qrcode-container active"></div>
    <div class="qrcode qrcode-content"></div>
    <div class="corner">
      <svg class="text" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
        <g display="none">
          <g id="ui_x5F_spec_x5F_header_copy_3" display="inline">
          </g>
          <rect display="inline" fill="none" width="24" height="24"/>
        </g>
        <g>
          <g id="ui_x5F_spec_x5F_header_copy_4">
          </g>
          <path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z"/>
        </g>
      </svg>
      <svg class="qrcode" t="1535425797019" viewBox="0 0 1024 1024" width="20px" height="20px"><path d="M597.333333 597.333333h85.333334v-85.333333h85.333333v128h-85.333333v42.666667h-85.333334v-42.666667h-85.333333v-128h85.333333v85.333333z m-384-85.333333h256v256H213.333333v-256z m85.333334 85.333333v85.333334h85.333333v-85.333334H298.666667zM213.333333 213.333333h256v256H213.333333V213.333333z m85.333334 85.333334v85.333333h85.333333V298.666667H298.666667z m213.333333-85.333334h256v256h-256V213.333333z m85.333333 85.333334v85.333333h85.333334V298.666667h-85.333334z m85.333334 384h85.333333v85.333333h-85.333333v-85.333333z m-170.666667 0h85.333333v85.333333h-85.333333v-85.333333z" p-id="1659"/></svg>
    </div>
    `;
    this.qrcodeCanvas = shadowRoot.querySelector('.qrcode-container');
    this.qrcodeContent = shadowRoot.querySelector('.qrcode-content');
    // shadowRoot.querySelector('.corner').addEventListener('click', e => {
    //   this.qrcodeCanvas.classList.toggle('active');
    //   this.qrcodeContent.classList.toggle('active');
    //   shadowRoot.querySelector('.corner').classList.toggle('text');
    // });
    this.renderQRCode();
  }

  static get observedAttributes() {
    return ['content']
  }

  get content() {
    return this.getAttribute('content') || '';
  }

  set content(val) {
    this.setAttribute('content', val)
  }

  attributeChangedCallback(attr, from, to) {
    if (attr === 'content' && from !== to) {
      this.renderQRCode();
    }
  }

  renderQRCode(text) {
    let contentText = text || this.content;
    this.qrcodeCanvas.innerHTML = '';
    $(this.qrcodeCanvas).qrcode({
      'render': 'canvas',
      text: contentText,
      background: '#ffffff',
      size: 400
    });
    this.updateQRText();
  }

  updateQRText() {
    this.qrcodeContent.innerHTML = `
    <p class="title">二维码内容</p>
    <p class="qrtext">${this.content}</p>
    `;
  }
}

window.customElements.define('qrcode-img', QRCodeImg);