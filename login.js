document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // هنا يمكن إضافة عملية التحقق من المستخدمين
    if (email === "user@example.com" && password === "password123") {
      const user = { email };
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  });
  