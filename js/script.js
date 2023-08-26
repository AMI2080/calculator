document.querySelector('.change-mode').addEventListener('click', function () {
  if (document.querySelector('body').classList.contains('dark-theme')) {
    document.querySelector('body').classList.add("light-theme")
    document.querySelector('body').classList.remove("dark-theme")
  } else {
    document.querySelector('body').classList.add("dark-theme")
    document.querySelector('body').classList.remove("light-theme")
  }
})
