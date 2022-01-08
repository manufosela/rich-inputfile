import { html, LitElement } from 'lit';
import { RichInputfileStyles } from './rich-inputfile-styles.js';

export class RichInputfile extends LitElement {


  static get is() {
    return 'rich-inputfile';
  }

  static get properties() {
    return {
      name: {
        type: String
      },
      allowedExtensions: {
        type: Array, 
        attribute: 'allowed-extensions',
        converter(value) {
          return value.split(',');
        }
      },
      value: {
        type: String,
      }, 
      file: {
        type: String,
      },
      fileAllowed: {
        type: Boolean,
      },
      thumbnailWidth: {
        type: Number,
      },
      showLabel: {
        type: Boolean,
        attribute: 'show-label',
      },
      showThumbnail: {
        type: Boolean,
        attribute: 'show-thumbnail',
      },
      urlFile: {
        type: String,
      },
      fileArrayBuffer: {
        type: Array,
      },
      fileArrayUint8: {
        type: Array,
      },
    };
  }

  static get styles() {
     return [RichInputfileStyles];
  }

  constructor() {
    super();
    this.id = `uploadFile-${Math.random().toString(36).substring(2, 9)}`;
    this.name = `name-${Math.random().toString(36).substring(2, 9)}`;
    this.deleteBtn = false;
    this.value = '';
    this.allowedExtensions = [];
    this.fileAllowed = false;
    this.errorMsg = '';
    this.thumbnailWidth = 50;
    this.urlFilePath = '';
    this.fileArrayBuffer = null;
    this.fileArrayUint8 = null;
    this.showLabel = false;
    this.showThumbnail = false;
    this._fileValueChange = this._fileValueChange.bind(this);
    this._deleteValue = this._deleteValue.bind(this);
  }

  firstUpdated() {
    this.typesRegExp = new RegExp(`(?:${this.allowedExtensions.join('|')})$`);
    this.sdomMsgLayer = this.shadowRoot.querySelector('#msg');
    const componentCreatedEvent = new CustomEvent('wc-ready', {
      detail: {
        id: this.id,
        componentName: this.tagName,
        component: this,
      },
    });
    document.dispatchEvent(componentCreatedEvent);
    this._main();
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'value') {
        this.fileAllowed = (this.value !== '') ? (this.value.search(this.typesRegExp) !== -1) : false;
        this.errorMsg = ``;
        if (this.value !== '') {
          if (!this.fileAllowed) {
            this.errorMsg = `${this.value} is not allowed. Files allowed: ${this.allowedExtensions.join(',')}`;
            this.value = '';
            this.urlFilePath = '';
          }
        }
      }
    });
  }

  _deleteValue() {
    this.value = '';
    this.urlFilePath = '';
    this.shadowRoot.querySelector('.bloque1 button').classList.add('invisible');
    this.shadowRoot.querySelector('#fileButton').value = '';
  }

  _fileValueChange(e) {
    const file = e.target.files[0];
    if (file) {
      this._getFileArrayBuffer();
      this.urlFilePath = URL.createObjectURL(file);
      this.value = file.name;
      this.shadowRoot.querySelector('.bloque1 button').classList.remove('invisible');
    }
  }

  _getFileArrayBuffer() {
    const fileData = this.shadowRoot.querySelector('input').files[0];
    // console.log(file);
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.fileArrayBuffer = e.target.result;
      this.fileArrayUint8 = new Uint8Array(this.fileArrayBuffer);
    };           
    fileReader.readAsArrayBuffer(fileData);
  }

  _getImgThumbnail(name) {
    this.fileAllowed = (this.value !== '') ? (this.value.search(this.typesRegExp) !== -1) : false;
    return (this.fileAllowed && this.showThumbnail) ? html`<img src="${this.urlFilePath}" alt="file ${name}" title="${this.value}" width="${this.thumbnailWidth}">` : html``;
  }

  _main() {
    const fileButton = this.shadowRoot.querySelector('#fileButton');
    this.shadowRoot.querySelector('.bloque1 button').addEventListener('click', this._deleteValue);
    fileButton.addEventListener('change', this._fileValueChange);
  }

  setValue(urlFilePath) {
    this.urlFilePath = urlFilePath;
    this.value = urlFilePath.replace(/^.*[\\\/]/, '');
    const xhr = new XMLHttpRequest();
    xhr.open("GET", urlFilePath, true);
    xhr.responseType = "arraybuffer";
    const self = this;
    xhr.onload = function() {
      self.fileArrayUint8= new Uint8Array(this.response);
    };
    xhr.send();
  }

  getFileValue() {
    return this.shadowRoot.querySelector('input').files[0];
  }

  getFileArrayUint8() {
    return this.fileArrayUint8;
  }

  render() {
    const name = this.name.split('/').pop();
    const deleteBtnClass = (this.value !== '') ? '': 'invisible';
    const labelClass = (!this.showLabel) ? 'invisible': '';
    return html`
      <section class="wrapper">
        <div class="bloque1">
          <label class="${labelClass}">${name}</label>
          <div style="display:flex">
            <label for="fileButton">Selecciona un fichero
            <input type="file" value="upload" id="fileButton">
            </label>
            <button id="delete" class="${deleteBtnClass}">Delete</button>
          </div>
        </div>
        <div class="bloque2">
          ${(this.value !== '') ? this._getImgThumbnail(name) : html``}
        </div>
      </section>
      <div id="filelink"></div>
      ${this.errorMsg}
    `;
  }
}
