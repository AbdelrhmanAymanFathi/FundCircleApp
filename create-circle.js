document.getElementById("new-circle-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("new-circle-name").value;
    const membersCount = parseInt(document.getElementById("new-circle-members").value);
    const amount = parseFloat(document.getElementById("new-circle-amount").value);
    const duration = parseInt(document.getElementById("new-circle-duration").value);  // مدة الجمعية
  
    const members = [];
    for (let i = 1; i <= membersCount; i++) {
      members.push({ name: `عضو ${i}`, status: "لم يدفع", dueDate: getNextMonthDate(i) });
    }
  
    const circles = JSON.parse(localStorage.getItem("circles") || "[]");
    circles.push({ name, amount, duration, members });
    localStorage.setItem("circles", JSON.stringify(circles));
  
    alert("تم إنشاء الجمعية بنجاح!");
    window.location.href = "dashboard.html";  // العودة إلى صفحة الـ Dashboard بعد إنشاء الجمعية
  });
  
  // الحصول على التاريخ التالي
  function getNextMonthDate(offset) {
    const today = new Date();
    today.setMonth(today.getMonth() + offset);
    return today.toISOString().split("T")[0];
  }
  