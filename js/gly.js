
const yzm=document.querySelector('.yzm')
// console.log(axios.defaults)
function getCaptcha() {
  axios.get('http://47.99.54.81:8081/kaptcha/image', {
    responseType: 'blob'
  })
    .then(response => {
    // console.log(Object.prototype.toString.call(response.data))
      // 检查 response.data 是否为 Blob 类型
      // console.log(response)
      // if (response.data instanceof Blob) {
        const blobUrl = URL.createObjectURL(response.data);
        yzm.src = blobUrl;
     
    }).catch(error => {
      console.error('获取验证码失败', error);
    })
}
getCaptcha()
// window.onload=getCaptcha
document.querySelector('.gh').addEventListener('click',e=>{
  // console.log(1)
  getCaptcha()
})
document.querySelector('.c').addEventListener('click', () => {
  // 跳转并带滚动参数
  location.href = '../html/index.html?scroll=300';
});
document.querySelector('.cyber-btn').addEventListener('click',e=>{
  // 阻止默认提交行为
  e.preventDefault()
  const adminId=document.querySelector('.id').value
  if(adminId.length===0){
    myAlert(false,'请输入id')
    return
  }
  const password = document.querySelector('.code').value
  if (password.length === 0) {
    myAlert(false, '请输入密码')
    return
  }

  const kaptcha=document.querySelector('.d').value
  if(kaptcha.length===0){
    myAlert(false, '请输入验证码')
    return

  }
  
  
  
  const xhr = new XMLHttpRequest();
  xhr.open('POST','http://47.99.54.81:8081/admin/login');
  xhr.addEventListener('loadend',()=>{
    console.log(xhr.response)
  })
  xhr.setRequestHeader('Content-Type','application/json')
 const data={
  adminId,
  password,
  kaptcha
 }
  const datastr=JSON.stringify(data)
  xhr.send(datastr)
})