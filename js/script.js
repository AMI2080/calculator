const maxLength = 13;
const calculation = {
  current: 'first',
  first: '0',
  operator: '',
  second: '',
  result: '',
  displayFunction: '',
  error: '',
  resest() {
    this.switch('first');
    this.first = '0';
    this.operator = '';
    this.second = '';
    this.result = '';
    this.displayFunction = '';
    this.error = '';
    this.display();
  },
  switch(current) {
    this.current = current;
    document.querySelector('input#display').setAttribute('data-current', current);
  },
  display() {
    if (this.current === 'first' || this.current === 'second' || this.current === 'result') {
      let displayedNumber = '0';
      if (this[this.current].length > maxLength) {
        const ePosition = this[this.current].indexOf('e+');
        if (ePosition > -1) {
          const numberWithoutE = this[this.current].slice(0, ePosition);
          const e = this[this.current].slice(ePosition);
          displayedNumber = numberWithoutE.slice(0, maxLength - ePosition - e.length) + e;
        } else {
          displayedNumber = this[this.current].slice(0, maxLength);
        }
      }
      document.getElementById('display').value = this[this.current].length > maxLength ? displayedNumber : this[this.current];
    } else if (this.current === 'operator') {
      document.getElementById('display').value = this[this.second] ?? 0;
    } else if (this.current === 'error') {
      document.getElementById('display').value = this.error;
    }
    document.querySelector('.display-function').textContent = this.displayFunction;
  },
  keyEvent(key) {
    if (key !== null && key >= 0 && key <= 9 || key === '00' || key === '.') {
      if (this.current === 'operator') {
        this.switch('second')
      };
      if (this.current === 'result') {
        this.resest();
      };
      if (this.current === 'first' || this.current === 'second') {
        if (this[this.current].length < maxLength) {
          if (Number(this[this.current]) === 0 && this[this.current].indexOf('.') === -1) {
            this[this.current] = '';
          }
          if (key >= 0 && key <= 9) {
            this[this.current] += `${key}`;
          } else if (key == '.') {
            if (this[this.current].indexOf('.') === -1) {
              this[this.current] += (this[this.current].length === 0 ? '0' : '') + String(key);
            }
          }
        }
      }
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      if (this.current !== 'error') {
        if (this.current === 'first' || this.current === 'result') {
          this.switch('operator');
        } else if (this.current === 'second') {
          this.calculate();
          this.switch('operator');
          this.second = '0';
        }
        this.second = '';
        this.operator = key;
        this.displayFunction = `${this.first} ${this.operator.replace('/', '÷').replace('*', '×')}`;
      }
    } else if (key === 'Escape') {
      this.resest();
    } else if (key === 'Backspace') {
      if ((this.current === 'first' || this.current === 'second') && this[this.current].length > 1) {
        this[this.current] = this[this.current].substring(0, this[this.current].length - 1);
      } else if ((this.current === 'first' || this.current === 'second') && this[this.current].length === 1) {
        this[this.current] = '0';
      }
    } else if (key === '=') {
      if (this.first.length > 0 && this.operator.length > 0 && this.second.length === 0) {
        this.second = `${this.first}`;
      }
      this.displayFunction = `${this.first} ${this.operator.replace('/', '÷').replace('*', '×')} ${this.second} =`;
      this.calculate();
    }
    this.display();
  },
  calculate() {
    this.error = '';
    this.switch('result');
    let operatorSign = '';
    switch (this.operator) {
      case '+':
        operatorSign = 'add';
        break;
      case '-':
        operatorSign = 'subtract';
        break;
      case '*':
        operatorSign = 'multiply';
        break;
      case '/':
        operatorSign = 'divide';
        break;
      default:
        break;
    }
    if (this.second == 0 && this.operator === '/') {
      this.result = '0';
      this.error = 'Cannot divide by zero';
      this.switch('error');
    } else if (this.first.length > 0 && this.operator.length > 0 && this.second.length > 0) {
      const result = bigDecimal[operatorSign](this.first, this.second, 30);
      if (result.length > 300) {
        this.error = 'Overflow';
        this.switch('error');
      } else {
        this.result = `${result * 1}`;
      }
    } else if (this.first.length > 0 && this.operator.length === 0 && this.second.length === 0) {
      this.result = `${this.first}`;
    } else {
      this.result = `${this.result.length > 0 ? this.result : 0}`;
    }
    if (this.current !== 'error') {
      this.first = `${this.result.length > 0 ? this.result : 0}`;
    }
    this.display();
  }
};
document.querySelector('.change-mode').addEventListener('click', function () {
  if (document.querySelector('body').classList.contains('dark-theme')) {
    document.querySelector('body').classList.add("light-theme");
    document.querySelector('body').classList.remove("dark-theme");
  } else {
    document.querySelector('body').classList.add("dark-theme");
    document.querySelector('body').classList.remove("light-theme");
  }
});
document.addEventListener('keydown', function (event) {
  const key = event.key
    .replace('Enter', '=');
  document.querySelector(`button[data-btn="${key}"]`)?.classList.add("clicking");
});
document.addEventListener('keyup', function (event) {
  const key = event.key
    .replace('Enter', '=');
  calculation.keyEvent(key);
  document.querySelector(`button[data-btn="${key}"]`)?.classList.remove("clicking");
});
document.querySelectorAll('button').forEach(function (button) {
  button.addEventListener('click', function () {
    const inputName = this.getAttribute('data-btn');
    calculation.keyEvent(inputName);
  });
});
