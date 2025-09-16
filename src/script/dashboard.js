// جلب عناصر الصفحة
const userNameEl = document.getElementById('user-name');
const roleTextEl = document.getElementById('role-text');
const contentArea = document.getElementById('content-area');
const logoutLink = document.getElementById('logout-link');
const profileLink = document.getElementById('profile-link');
const usersLink = document.getElementById('users-link');

// جلب المستخدمين من localStorage
const users = JSON.parse(localStorage.getItem('users') || '[]');

// آخر مستخدم قام بتسجيل الدخول
const currentUser = users[users.length - 1];

// إذا لم يوجد مستخدم → تحويل لصفحة تسجيل الدخول
if (!currentUser) window.location.href = '/index/login.html';

// تحديد الدور
let role = 'User';
if (currentUser.email === 'admin@admin.com') {
  role = 'Admin';
  document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'block');
}

// تحديث عنوان المستخدم والدور
userNameEl.textContent = currentUser.email;
roleTextEl.textContent = `Role: ${role}`;

// دالة عرض Dashboard الافتراضي
function renderDashboard() {
  contentArea.innerHTML = `
    <h2>Dashboard Overview</h2>
    <p>Welcome, ${currentUser.email}!</p>
    <div class="dashboard-info">
      <p><strong>Email:</strong> ${currentUser.email}</p>
      <p><strong>Password:</strong> ${'*'.repeat(currentUser.password.length)}</p>
      <p><strong>Role:</strong> ${role}</p>
    </div>
  `;
}

// عند الضغط على Profile
profileLink.addEventListener('click', () => {
  contentArea.innerHTML = `
    <h2>Profile</h2>
    <p>Email: ${currentUser.email}</p>
    <p>Password: ${'*'.repeat(currentUser.password.length)}</p>
    <p>Role: ${role}</p>
  `;
});

// عند الضغط على Users (Admin فقط)
if (usersLink) {
  usersLink.addEventListener('click', () => {
    let html = `<h2>All Users</h2>`;
    if (users.length === 0) html += `<p>No users found</p>`;
    else {
      html += `<ul>`;
      users.forEach(u => {
        html += `<li>${u.email} - ${'*'.repeat(u.password.length)}</li>`;
      });
      html += `</ul>`;
    }
    contentArea.innerHTML = html;
  });
}

// زر Logout
logoutLink.addEventListener('click', () => {
  localStorage.removeItem('users'); // يمكن تعديل حسب الحاجة
  window.location.href = '/index/login.html';
});

// عرض Dashboard عند التحميل
renderDashboard();
