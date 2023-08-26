document.querySelector('.change-mode').addEventListener('click', function () {
  if (document.querySelector('body').classList.contains('dark-theme')) {
    document.querySelector('body').classList.add("light-theme")
    document.querySelector('body').classList.remove("dark-theme")
  } else {
    document.querySelector('body').classList.add("dark-theme")
    document.querySelector('body').classList.remove("light-theme")
  }
})

document.addEventListener('keydown', function (event) {
  // console.log(event.code);
  if (event.code == 'Digit0' || event.code == 'Numpad0') {
    click('num-0')
  } else if (event.code == 'Digit1' || event.code == 'Numpad1') {
    click('num-1')
  } else if (event.code == 'Digit2' || event.code == 'Numpad2') {
    click('num-2')
  } else if (event.code == 'Digit3' || event.code == 'Numpad3') {
    click('num-3')
  } else if (event.code == 'Digit4' || event.code == 'Numpad4') {
    click('num-4')
  } else if (event.code == 'Digit5' || event.code == 'Numpad5') {
    click('num-5')
  } else if (event.code == 'Digit6' || event.code == 'Numpad6') {
    click('num-6')
  } else if (event.code == 'Digit7' || event.code == 'Numpad7') {
    click('num-7')
  } else if (event.code == 'Digit8' || event.code == 'Numpad8') {
    click('num-8')
  } else if (event.code == 'Digit9' || event.code == 'Numpad9') {
    click('num-9')
  } else if (event.code == 'NumpadAdd') {
    click('plus')
  } else if (event.code == 'NumpadDivide') {
    click('div')
  } else if (event.code == 'Escape') {
    click('esc')
  } else if (event.code == 'Backspace') {
    click('backspace')
  }
})

document.addEventListener('keyup', function (event) {
  console.log(event.code);
  if (event.code == 'Digit0' || event.code == 'Numpad0') {
    clicked('num-0')
  } else if (event.code == 'Digit1' || event.code == 'Numpad1') {
    clicked('num-1')
  } else if (event.code == 'Digit2' || event.code == 'Numpad2') {
    clicked('num-2')
  } else if (event.code == 'Digit3' || event.code == 'Numpad3') {
    clicked('num-3')
  } else if (event.code == 'Digit4' || event.code == 'Numpad4') {
    clicked('num-4')
  } else if (event.code == 'Digit5' || event.code == 'Numpad5') {
    clicked('num-5')
  } else if (event.code == 'Digit6' || event.code == 'Numpad6') {
    clicked('num-6')
  } else if (event.code == 'Digit7' || event.code == 'Numpad7') {
    clicked('num-7')
  } else if (event.code == 'Digit8' || event.code == 'Numpad8') {
    clicked('num-8')
  } else if (event.code == 'Digit9' || event.code == 'Numpad9') {
    clicked('num-9')
  } else if (event.code == 'NumpadAdd') {
    clicked('plus')
  } else if (event.code == 'NumpadDivide') {
    clicked('div')
  } else if (event.code == 'Escape') {
    clicked('esc')
  } else if (event.code == 'Backspace') {
    clicked('backspace')
  }
})

function click(buttonName) {
  document.querySelector('button[name=' + buttonName + ']').classList.add("clicking")
}

function clicked(buttonName) {
  document.querySelector('button[name=' + buttonName + ']').click()
  document.querySelector('button[name=' + buttonName + ']').classList.remove("clicking")
}
