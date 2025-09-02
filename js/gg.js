let v = 0
document.querySelector('.zj').addEventListener('click', e => {
  if (v === 0) {
    document.querySelector('.yingcang').style.display = 'block'
    // console.log(1)
    v = 1
  }
  else {
    document.querySelector('.yingcang').style.display = 'none'
    v = 0
  }
})




