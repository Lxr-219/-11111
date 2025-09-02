const container = document.querySelector('.effect-container');
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// 适配目标区域大小
function resizeCanvas() {
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// 字符数组（可自定义）
const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const charDrops = [];
const numDrops = 10; // 字符数量（根据区域调整）

// 初始化字符位置和速度
function initDrops() {
  for (let i = 0; i < numDrops; i++) {
    charDrops.push({
      x: Math.floor(Math.random() * canvas.width), // 整数x坐标，避免字符模糊
      y: Math.floor(Math.random() * canvas.height),// 整数y坐标，减少绘制锯齿
      speed: Math.random() * 1.2 + 1, // 适中速度，拖影更均匀
      char: chars[Math.floor(Math.random() * chars.length)]
    });
  }
}
initDrops();

// 绘制核心：柔和拖影 + 清晰字符
function draw() {
  requestAnimationFrame(draw);
  
  // 【关键】半透明背景（控制alpha值=0.15，保留拖影但不模糊主体）
  // 背景色与页面背景一致（此处假设页面是黑色，可根据实际修改）
  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 【字符清晰化】高对比度+加粗+整数坐标
  ctx.fillStyle = '#5ca671'; // 明亮青绿色，对比强烈
  ctx.font = '18px bold Consolas, monospace'; // 加粗等宽字体，边缘锐利
  ctx.textBaseline = 'top'; // 统一文本基线，避免偏移模糊

  charDrops.forEach(drop => {
    // 绘制清晰字符（整数坐标消除抗锯齿）
    ctx.fillText(drop.char, Math.floor(drop.x), Math.floor(drop.y));
    // 字符下落更新
    drop.y += drop.speed;
    // 超出区域后重置（带随机偏移，避免重复）
    if (drop.y > canvas.height) {
      drop.y = -20; // 从顶部外开始，过渡更自然
      drop.x = Math.floor(Math.random() * canvas.width);
      drop.char = chars[Math.floor(Math.random() * chars.length)];
    }
  });
}
draw();