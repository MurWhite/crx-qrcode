import './js/qrcode-img.js';
import './js/setting-schema.js';
import {
  SCHEMA_PATTERN,
  urlConvert
} from './js/url-converter.js';
import {
  sampleSchema
} from './js/schema.js'

let OriginalLink = location.href;
let QRCode = $('#QRCode')[0];
let $OriginalLink = $('#OriginalLink');
let $OriginalLinkTip = $('#OriginalLinkTip');
let $ResetBtn = $('#ResetBtn');
let $Env = $('#Env')[0];
let $Opts = $('#Opts')[0];
let $SettingPage = $('#SettingPage');
let $SchemaWrap = $('#SettingPage .schema-wrap');

function modifyLink(text) {
  let link = text || $OriginalLink.val();
  $OriginalLink.val(link);
  const qrText = urlConvert(link, {
    schema: $Env.active,
    valuedOpts: {
      ...$Opts.value
    }
  });
  if (link === OriginalLink) {
    $ResetBtn.hide();
    $OriginalLinkTip.text('页面链接');
    $OriginalLink.removeClass('modified');
  } else {
    $ResetBtn.show();
    $OriginalLinkTip.text('修改的链接');
    $OriginalLink.addClass('modified');
  }
  QRCode.content = qrText;
}

function showSettingPage() {
  let schema = window.ALL_SCHEMA;
  $SchemaWrap[0].innerHTML = schema.map(s =>
    `<schema-setting-item name="${s.name}" opts="${s.opts.join(',')}" pattern="${s.pattern}"></schema-setting-item>`
  ).join('');
  $SettingPage.toggleClass('show');
}

function readSchemasFromSetting() {
  let arr = [].slice.call($SchemaWrap[0].children).map(schema => ({
    name: schema.name,
    opts: schema.opts,
    pattern: schema.pattern
  }))
  return arr;
}

function updateAllSchema(schemas) {
  window.ALL_SCHEMA = schemas;
  $Env.tabs = schemas;
}

$OriginalLink.on('change', _ => {
  modifyLink($OriginalLink.val());
});
$OriginalLink.on('input', _ => {
  modifyLink($OriginalLink.val());
})
$ResetBtn.on('click', () => {
  modifyLink(OriginalLink);
});
$Env.addEventListener('change', e => {
  modifyLink();
  $Opts.opts = e.detail.opts;
});
$Opts.addEventListener('change', e => {
  modifyLink();
});
$('.setting-entry').on('click', _ => {
  showSettingPage();
})
$("#SaveSchema").on('click', _ => {
  updateAllSchema(readSchemasFromSetting());
})

updateAllSchema(sampleSchema);
$Env.active = sampleSchema[0].name;
modifyLink(OriginalLink);