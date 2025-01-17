// التعامل مع نموذج إنشاء الحساب
document.getElementById("create-account-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (password !== confirmPassword) {
      alert("كلمة المرور وتأكيد كلمة المرور غير متطابقتين.");
      return;
    }
  
    // التأكد من أن اسم المستخدم غير موجود مسبقًا
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert("اسم المستخدم موجود بالفعل. يرجى اختيار اسم آخر.");
      return;
    }
  
    // إضافة المستخدم الجديد
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("تم إنشاء الحساب بنجاح!");
    window.location.href = "index.html"; // العودة إلى صفحة تسجيل الدخول بعد التسجيل
  });
  