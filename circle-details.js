// تحميل فهرس الجمعية الحالية من localStorage
const currentCircleIndex = localStorage.getItem("currentCircle");
const circles = JSON.parse(localStorage.getItem("circles") || "[]");

if (currentCircleIndex === null || !circles[currentCircleIndex]) {
  alert("لم يتم العثور على الجمعية!");
  window.location.href = "dashboard.html";  // إعادة توجيه إلى صفحة اللوحة الرئيسية
} else {
  const circle = circles[currentCircleIndex];
  displayCircleDetails(circle);
}

// دالة لعرض تفاصيل الجمعية
function displayCircleDetails(circle) {
  const circleDetailsDiv = document.getElementById("circle-details");

  // إنشاء الجدول لعرض تفاصيل الأعضاء
  let tableHTML = `
    <h4 class="text-center">${circle.name}</h4>
    <p class="text-center">عدد الأعضاء: ${circle.members.length}</p>
    <p class="text-center">المبلغ لكل عضو: ${circle.amount} جنيه</p>
    <p class="text-center">المدة: ${circle.duration} شهور</p>
    <h5>تفاصيل الأعضاء</h5>
    <table class="table table-bordered table-responsive">
      <thead>
        <tr>
          <th>العضو</th>
          <th>الحالة</th>
          <th>تاريخ الاستحقاق</th>
          <th>إجراء</th>
        </tr>
      </thead>
      <tbody>
  `;

  let totalPaid = 0; // مجموع المدفوعات

  // إضافة تفاصيل الأعضاء إلى الجدول
  circle.members.forEach((member, index) => {
    tableHTML += `
      <tr>
        <td class="member-name" id="member-name-${index}">${member.name}</td>
        <td>${member.status}</td>
        <td>${member.dueDate}</td>
        <td>
          ${member.status === "لم يدفع" ? 
            `<button class="btn btn-success" onclick="payMember(${currentCircleIndex}, ${index})">دفع</button>
            <button class="btn btn-warning" onclick="markAsNotPaid(${currentCircleIndex}, ${index})">لم يدفع</button>` : 
            `<span>تم الدفع</span>`
          }
          <button class="btn btn-secondary" onclick="editMemberName(${currentCircleIndex}, ${index})">تعديل الاسم</button>
        </td>
      </tr>
    `;

    // حساب مجموع المدفوعات
    if (member.status === "تم الدفع") {
      totalPaid += circle.amount; // إضافة المبلغ المدفوع لكل عضو تم دفعه
    }
  });

  tableHTML += `
      </tbody>
    </table>
    <h5 class="text-center">المجموع الكلي المدفوع: ${totalPaid} جنيه</h5>
  `;

  circleDetailsDiv.innerHTML = tableHTML;
}

// دالة لتعديل اسم العضو
function editMemberName(circleIndex, memberIndex) {
  const newName = prompt("ادخل الاسم الجديد للعضو:");
  if (newName) {
    const circles = JSON.parse(localStorage.getItem("circles"));
    circles[circleIndex].members[memberIndex].name = newName;
    localStorage.setItem("circles", JSON.stringify(circles));
    window.location.reload();  // إعادة تحميل الصفحة لعرض التغييرات
  }
}

// دالة لدفع عضو
function payMember(circleIndex, memberIndex) {
  const circles = JSON.parse(localStorage.getItem("circles"));
  const circle = circles[circleIndex];
  circle.members[memberIndex].status = "تم الدفع";
  localStorage.setItem("circles", JSON.stringify(circles));
  window.location.reload();  // إعادة تحميل الصفحة لعرض التغييرات
}

// دالة لتغيير حالة العضو إلى "لم يدفع"
function markAsNotPaid(circleIndex, memberIndex) {
  const circles = JSON.parse(localStorage.getItem("circles"));
  const circle = circles[circleIndex];
  circle.members[memberIndex].status = "لم يدفع";
  localStorage.setItem("circles", JSON.stringify(circles));
  window.location.reload();  // إعادة تحميل الصفحة لعرض التغييرات
}
