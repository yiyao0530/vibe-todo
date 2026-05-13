const themeBtn = document.getElementById('themeBtn');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearAllBtn = document.getElementById('clearAll');
const totalEl = document.getElementById('total');
const doneEl = document.getElementById('done');

let todos = JSON.parse(localStorage.getItem('vibeTodo')) || [];
let isLight = localStorage.getItem('theme') === 'light';
let currentFilter = 'all';

// 初始化主题
if (isLight) {
  document.body.classList.add('light');
  themeBtn.innerText = '切换暗黑模式';
}

// 更新统计数量
function updateCount() {
  const total = todos.length;
  const done = todos.filter(item => item.done).length;
  totalEl.innerText = total;
  doneEl.innerText = done;
}

// 渲染待办
function renderTodos() {
  todoList.innerHTML = '';

  // 筛选逻辑
  let showList = todos;
  if (currentFilter === 'undone') {
    showList = todos.filter(item => !item.done);
  } else if (currentFilter === 'done') {
    showList = todos.filter(item => item.done);
  }

  showList.forEach((item, index) => {
    const realIndex = todos.indexOf(item);
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

// 首次渲染
renderTodos();

// 添加待办
addBtn.addEventListener('click', () => {
  const val = todoInput.value.trim();
  if (!val) return;
  todos.push({ content: val, done: false });
  todoInput.value = '';
  renderTodos();
});

// 回车添加
todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addBtn.click();
});

// 勾选、删除
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

// 筛选按钮
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

// 清空全部
clearAllBtn.addEventListener('click', () => {
  if (confirm('确定要清空所有待办吗？')) {
    todos = [];
    renderTodos();
  }
});