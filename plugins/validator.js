class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== "button" &&
      item.type !== "button";
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener("change", this.checkIt.bind(this)));
    //Это для отправки по submit без XML запроса
    if (!this.XMLRequest) {
      this.form.addEventListener("submit", e => {
      //e.preventDefault();
       if (!this.isValidation()) {
         e.preventDefault();        
       }
     });
    }

    
  }

  isValidation() {
    this.elementsForm.forEach(elem => this.checkIt({target: elem}));
    if (this.error.size) {
      return false;
    } else {
      return true;
    }
  }

  isValid(elem) {
    const validatorMethod = {
      noEmpty(elem) {
        if (elem.value.trim() === "") {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];
      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn("Необходимо передать id полей ввода и методы проверки этих полей")
    }
    
    return true;
  };

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove("success")
    elem.classList.add("error");
    if (elem.nextElementSibling) {
      if (elem.nextElementSibling.classList.contains("validator-error")) {
        return;
      }
    }
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Неверный формат ввода";
    errorDiv.classList.add("validator-error");
    elem.insertAdjacentElement("afterend", errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove("error")
    elem.classList.add("success");
    if (elem.nextElementSibling) {
      if (elem.nextElementSibling.classList.contains("validator-error")) {
       elem.nextElementSibling.remove();
     }
    }
  }

  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
      input.success {
        border: 2px solid rgba(83, 72, 117, 0.6); !important
      }
      input.error {
        border: 2px solid red !important
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-serif;
        color: red;
      }
    `;
    document.head.appendChild(style);
  }

  //паттерны по умолчанию
  setPattern() {

    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^[\w\.\_\-]+@[\w\.\_\-]+\.\w{2,}$/;
    }
  }
}