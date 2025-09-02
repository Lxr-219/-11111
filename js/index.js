// document.documentElement.scrollTo(0, 400)




document.querySelector('.c').addEventListener('click', e => {

  document.documentElement.scrollTo(0, 300)
})
  
// 读取 URL 参数：?scroll=300
const scrollPos = new URLSearchParams(location.search).get('scroll');
// 如果有参数，就滚动
if (scrollPos) {
  window.scrollTo(0, scrollPos);
}




document.querySelector('.c').addEventListener('click',e=>{
  document.querySelector('.yingcang').style.display = 'none'
  v = 0
})


axios({
  url:'/home/awards',
  method:'GET',

}).then(response=>{
  // console.log(response.data.data);
  const strarr=response.data.data
   const arr=strarr.map(element=>{
      return `<li>${element}</li>`
   })
   const str=arr.join('')
   document.querySelector('.jx').innerHTML=str
    
})