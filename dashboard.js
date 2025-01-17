// تحميل بيانات الجمعيات من localStorage
const circles = JSON.parse(localStorage.getItem("circles") || "[]");
const circleList = document.getElementById("circle-list");

// عرض الجمعيات
function renderCircles() {
  circleList.innerHTML = "";
  if (circles.length > 0) {
    circles.forEach((circle, index) => {
      const div = document.createElement("div");
      div.classList.add("circle-card");
      div.innerHTML = `
        <h5>${circle.name}</h5>
        <p>عدد الأعضاء: ${circle.members.length}</p>
        <p>المبلغ لكل عضو: ${circle.amount} جنيه</p>
        <p>المدة: ${circle.duration} شهور</p>
        <button class="btn btn-info" onclick="viewCircle(${index})">عرض التفاصيل</button>
        <button class="btn btn-danger" onclick="deleteCircle(${index})">حذف الجمعية</button>
      `;
      circleList.appendChild(div);
    });
  } else {
    circleList.innerHTML = "<p>لا توجد جمعيات مسجلة بعد.</p>";
  }
}
renderCircles();

// عرض التفاصيل (تنقلك لصفحة التفاصيل)
function viewCircle(index) {
  localStorage.setItem("currentCircle", index);
  window.location.href = "circle-details.html";
}

// حذف جمعية
function deleteCircle(index) {
  if (confirm("هل أنت متأكد من حذف هذه الجمعية؟")) {
    circles.splice(index, 1);
    localStorage.setItem("circles", JSON.stringify(circles));
    renderCircles();
  }
}

// عند الضغط على زر "تسجيل الخروج"
document.getElementById("logout-btn").addEventListener("click", function () {
    // حذف بيانات المستخدم من localStorage
    localStorage.removeItem("loggedInUser");
    // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = "index.html";
  });
  