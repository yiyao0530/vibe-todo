const themeBtn = document.getElementById('themeBtn');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearAllBtn = document.getElementById('clearAll');
const totalEl = document.getElementById('total');
const doneEl = document.getElementById('done');

// 每日抽签
const drawBtn = document.getElementById('drawBtn');
const lotteryResult = document.getElementById('lotteryResult');

let todos = JSON.parse(localStorage.getItem('vibeTodo')) || [];
let isLight = localStorage.getItem('theme') === 'light';
let currentFilter = 'all';

// 治愈签文库
const quotes = [
  "今天的你，比昨天更勇敢一点 ✨",
  "所有努力，都在悄悄开花 🌱",
  "慢慢来，你走的每一步都算数 🚀",
  "你很棒，不必焦虑，不必着急 ⭐",
  "生活温柔，万事可期 🍀",
  "保持热爱，奔赴山海 🌊",
  "今天也是被世界爱着的一天 💛",
  "放松一点，你已经做得很好了 🫶",
  "好运正在向你飞奔而来 🎐",
  "心有光芒，必有远方 ✨",
  "善待自己，一切都会顺利 🌿",
  "你值得所有美好与温柔 💫"
];

// 初始化主题
if (isLight) {
  document.body.classList.add('light');
  themeBtn.innerText = '切换暗黑模式';
}

// 检查今日是否已抽签
checkTodayLottery();

function checkTodayLottery() {
  const lastDate = localStorage.getItem('lastLotteryDate');
  const today = new Date().toDateString();

  if (lastDate === today) {
    const text = localStorage.getItem('todayLottery');
    lotteryResult.innerText = text;
    drawBtn.disabled = true;
    drawBtn.innerText = "今日已抽签";
  } else {
    drawBtn.disabled = false;
    drawBtn.innerText = "点击抽签";
  }
}

// 抽签
drawBtn.addEventListener('click', () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  lotteryResult.innerText = random;

  localStorage.setItem('todayLottery', random);
  localStorage.setItem('lastLotteryDate', new Date().toDateString());

  drawBtn.disabled = true;
  drawBtn.innerText = "今日已抽签";
});

// 更新统计
function updateCount() {
  const total = todos.length;
  const done = todos.filter(item => item.done).length;
  totalEl.innerText = total;
  doneEl.innerText = done;
}

// 渲染待办
function renderTodos() {
  todoList.innerHTML = '';
  let showList = todos;

  if (currentFilter === 'undone') {
    showList = todos.filter(item => !item.done);
  } else if (currentFilter === 'done') {
    showList = todos.filter(item => item.done);
  }

  showList.forEach((item, realIndex) => {
    const li = document.createElement('li');
    li.className = `todo-item ${item.done ? 'done' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${item.done ? 'checked' : ''} data-index="${realIndex}">
      <span class="todo-text">${item.content}</span>
      <button class="del-btn" data-index="${realIndex}">删除</button>
    `;
    todoList.appendChild(li);
  });

  localStorage.setItem('vibeTodo', JSON.stringify(todos));
  updateCount();
}

renderTodos();

// 添加
addBtn.addEventListener('click', () => {
  const val = todoInput.value.trim();
  if (!val) return;
  todos.push({ content: val, done: false });
  todoInput.value = '';
  renderTodos();
});

todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});

// 勾选 & 删除
todoList.addEventListener('click', e => {
  const idx = Number(e.target.dataset.index);
  if (e.target.tagName === 'INPUT') {
    todos[idx].done = e.target.checked;
    renderTodos();
  }
  if (e.target.classList.contains('del-btn')) {
    todos.splice(idx, 1);
    renderTodos();
  }
});

// 主题切换
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const nowLight = document.body.classList.contains('light');
  localStorage.setItem('theme', nowLight ? 'light' : 'dark');
  themeBtn.innerText = nowLight ? '切换暗黑模式' : '切换浅色模式';
});

// 筛选
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

// 清空
clearAllBtn.addEventListener('click', () => {
  if (confirm('确定清空所有待办？')) {
    todos = [];
    renderTodos();
  }
});
