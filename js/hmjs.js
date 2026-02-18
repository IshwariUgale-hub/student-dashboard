/* =========================
   CHECK LOGIN
========================= */
const loggedInUser = JSON.parse(localStorage.getItem("studentUser"));
if (!loggedInUser) window.location.href = "index.html";

/* =========================
   LOAD USER DATA
========================= */
let subjects = JSON.parse(localStorage.getItem(loggedInUser.email + "_subjects")) || [];
let profileData = JSON.parse(localStorage.getItem(loggedInUser.email + "_profile")) || {};

const profileDetails = document.getElementById("profileDetails");
const profilePreview = document.getElementById("profilePreview");

/* =========================
   PROFILE DISPLAY
========================= */
function renderProfile() {
    if (!profileDetails) return;

    profileDetails.innerHTML = `
        <p><strong>Name:</strong> ${loggedInUser.name}</p>
        <p><strong>Email:</strong> ${loggedInUser.email}</p>
        <p><strong>Branch:</strong> ${profileData.branch || "-"}</p>
        <p><strong>Year:</strong> ${profileData.year || "-"}</p>
        <p><strong>Section:</strong> ${profileData.section || "-"}</p>
        <p><strong>Gender:</strong> ${profileData.gender || "-"}</p>
        <p><strong>DOB:</strong> ${profileData.dob || "-"}</p>
        <p><strong>Mobile:</strong> ${profileData.mobile || "-"}</p>
    `;
}
renderProfile();

/* =========================
   ADD SUBJECT
========================= */
function addSubject() {
    const subjectInput = document.getElementById("subject");
    const marksInput = document.getElementById("marks");
    const attendanceInput = document.getElementById("attendance");

    const subject = subjectInput.value.trim();
    const marks = parseFloat(marksInput.value);
    const attendance = parseFloat(attendanceInput.value);

    if (!subject || isNaN(marks) || isNaN(attendance)) {
        alert("Please enter valid data");
        return;
    }

    subjects.push({ subject, marks, attendance });

    localStorage.setItem(
        loggedInUser.email + "_subjects",
        JSON.stringify(subjects)
    );

    subjectInput.value = "";
    marksInput.value = "";
    attendanceInput.value = "";

    renderTable();
    renderChart();
}

/* =========================
   RENDER TABLE
========================= */
function renderTable() {
    const tableBody = document.querySelector("#subjectTable tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";
    let totalMarks = 0;

    subjects.forEach((sub, index) => {
        totalMarks += sub.marks;

        tableBody.innerHTML += `
            <tr>
                <td>${sub.subject}</td>
                <td>${sub.marks}</td>
                <td>${sub.attendance}%</td>
                <td><button onclick="deleteSubject(${index})">🗑️</button></td>
            </tr>
        `;
    });

    let percentage = subjects.length
        ? (totalMarks / subjects.length).toFixed(2)
        : 0;

    document.getElementById("percentage").innerText = percentage;
    document.getElementById("grade").innerText = getGrade(percentage);
}


/* =========================
   DELETE SUBJECT
========================= */
function deleteSubject(index) {
    subjects.splice(index, 1);

    localStorage.setItem(
        loggedInUser.email + "_subjects",
        JSON.stringify(subjects)
    );

    renderTable();
    renderChart();
}

/* =========================
   GRADE
========================= */
function getGrade(p) {
    p = parseFloat(p);
    if (p >= 90) return "A+ 🏆";
    if (p >= 75) return "A";
    if (p >= 60) return "B";
    if (p >= 40) return "C";
    return "Fail";
}

/* =========================
   PIE CHART
========================= */
let chart;
function renderChart() {
    const ctx = document.getElementById("pieChart");
    if (!ctx) return;

    let total = 0;
    subjects.forEach(x => total += x.marks);

    let percent = subjects.length ? (total / subjects.length) : 0;

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Percentage", "Remaining"],
            datasets: [{
                data: [percent, 100 - percent],
                backgroundColor: ["#4e73df", "#e74a3b"]
            }]
        },
        options: {
            animation: {
                animateRotate: true,
                duration: 1500
            }
        }
    });
}

/* =========================
   DARK MODE
========================= */
function toggleMode() {
    document.body.classList.toggle("dark");
}

/* =========================
   LOGOUT
========================= */
function logout() {
    localStorage.removeItem("studentUser");
    window.location.href = "index.html";
}

/* =========================
   INITIAL LOAD
========================= */
renderTable();
renderChart();
