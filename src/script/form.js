import { Cart } from "/src/script/cart.js";

const cart = new Cart();
const dropmenu = document.getElementById("dropmenu");
const menuIcon = document.getElementById("menu-icon");

// زر القائمة المنسدلة
menuIcon.addEventListener("click", () => {
  cart.toggleVisibility(dropmenu);
});

// كلاس المستخدم
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  // حفظ المستخدم في localStorage (مثلاً للأغراض المحلية)
  saveLocal() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(this);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// عناصر الصفحة
const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageEl = document.getElementById("message");

// حدث الإرسال

const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const AdminRegex = /^admin@admin\.com$/;
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  messageEl.textContent = "";
  // التحقق من صحة الإدخالات
  if (!email || !password) {
    messageEl.textContent = "Please fill in all fields.";
  } else if (!regex.test(email)) {
    messageEl.textContent = "Please enter a valid email address.";
  } else if (AdminRegex.test(email) && password === "admin123") {
    messageEl.textContent = "Admin login successful!";
    window.location.href = "/src/index/dashboard.html";
  } else {
    messageEl.textContent = "Login successful!";
    window.location.href = "/index/home.html";
    const user = new User(email, password);
    user.saveLocal();
  }
});
