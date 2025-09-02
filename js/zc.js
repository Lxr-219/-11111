
axios({
  url:'/options/grades',
  method:'GET',
}).then(response=>{
  console.log(response.data)
  // 遍历数组，将数组渲染到表当上
  let arr=response.data
let strarr= arr.map(function(ele){
    return `<option>${ele}</option> `
  })
  let str=strarr.join('')
      document.querySelector('.nj').innerHTML = `<option> --请选择年级--</option>`
  document.querySelector('.nj').innerHTML+=str
})


const btn = document.querySelector('.hq');
// 标记是否正在倒计时，防止重复触发
let isCounting = false;
let timer
btn.addEventListener('click', e=> {
  e.preventDefault()
  const email = document.querySelector('.email').value.trim()
  if (email.length === 0) {
    myAlert(false, '请输入邮箱')
    return
  }
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailReg.test(email)) {
    myAlert(false, '邮箱格式错误')
    return
  }
  if(email.length!==0){
  if (isCounting) return; // 已有倒计时，直接返回
  isCounting = true;
    // 1. 用 URLSearchParams 处理参数
    const params = new URLSearchParams();
    params.append('email', email);
    axios({
      url: '/student/send-code',
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // 明确表单格式
      }
    }).then(response=>{
    
    console.log(response)
    let i = 60;
    // 记录初始文本（若需要动态恢复可这么做，也可直接写死 '点击获取'）
    const originalText = btn.textContent;
    btn.disabled = true; // 禁用按钮，避免重复点击
    const timer = setInterval(() => {
      btn.textContent = i;
      i--;

      if (i < 0) {
        clearInterval(timer);
        btn.textContent = originalText; // 恢复初始文本
        btn.disabled = false; // 恢复可点击
        isCounting = false; // 重置标记
      }
    }, 1000);
  }).catch(error=>{
    console.log(error)
  })
}


});


document.querySelector('.cyber-btn').addEventListener('click',e=>{
  e.preventDefault()
    const name=document.querySelector('.username').value
  if (name.length===0) {
    myAlert(false, '请输入姓名')
    return
  }
    const zy=document.querySelector('.zy').value
  if (zy.length === 0) {
    myAlert(false, '请输入专业')
    return
  }
  const  nj= document.querySelector('.nj').value
  if (nj!='大一'&&nj!='大二') {
    myAlert(false, '请输入年级')
    // console.log(1);
    return
  }
  const id = document.querySelector('.id').value
  if (id.length===0) {
    myAlert(false, '请输入学号')
    return
  }
  const num = document.querySelector('.num').value.trim()
  if (num.length === 0) {
    myAlert(false, '请输入电话')
    return
  }
  const telReg = /^1[3-9]\d{9}$/
   if (!telReg.test(num)){
    myAlert(false, '电话格式错误')
    return
   }
  const email = document.querySelector('.email').value.trim()
  if(email.length===0){
    myAlert(false, '请输入邮箱')
    return

  }
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailReg.test(email)) {
    myAlert(false, '邮箱格式错误')
    return
  }
const yzm=document.querySelector('.yzm').value
if(yzm.length===0){
  myAlert(false,'请输入验证码')
  return
}
const password1=document.querySelector('.password1').value
  const password2 = document.querySelector(".password2").value
  const passwordreg = /^[a-zA-Z0-9]{6,}$/
  if (password1.trim().length === 0) {
    myAlert(false, '请输入密码')
    return
  }
  if (password2.trim().length === 0) {
    myAlert(false, '请再次输入密码')
    return
  }
  if (!passwordreg.test(password1)) {
    myAlert(false, '密码格式错误或位数错误')
    return
  }
  if (!passwordreg.test(password2)) {
    myAlert(false, '密码格式错误或位数错误')
    return
  }

if(password1!==password2){
  myAlert(false,'两次密码输入不一致')
  return
}
   
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://47.99.54.81:8081/student/register',true);
  xhr.addEventListener('loadend', () => {
    console.log(xhr.response)
  })
  xhr.setRequestHeader('Content-Type', 'application/json')
  const data = {
    name,
    grade:nj,
    major:zy,
    studentId:id,
    phone:num,
    email,
    password:password1,
    confirmPassword:password2
  }
  const datastr = JSON.stringify(data)
  xhr.send(datastr)
})

