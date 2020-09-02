
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

if (isSafari)
{
  window.onload = function(){
    document.body.innerHTML = "<h3 style='margin:100px;color:#ffffff;font-weight:400'>К сожалению, браузер Safari не поддерживается сайтом. Вы можете скачать подходящий браузер по ссылке <a style='color:#f1f1f1' href='https://www.google.ru/intl/ru/chrome/'>https://www.google.ru/intl/ru/chrome/</a></h3>";
  }

  throw new Error("Браузер не поддерживается!");  
}

