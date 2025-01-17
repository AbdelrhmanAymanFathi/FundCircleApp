// التعامل مع نموذج تسجيل الدخول
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // تحميل بيانات المستخدمين من localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // البحث عن المستخدم في الـ localStorage
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // تخزين المستخدم الحالي في localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html"; // إعادة التوجيه إلى صفحة اللوحة الرئيسية بعد النجاح
  } else {
    alert("اسم المستخدم أو كلمة المرور غير صحيحة.");
  }
});
