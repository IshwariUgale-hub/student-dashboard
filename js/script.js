// Select Elements
const subjectName = document.getElementById("subjectName");
const subjectMarks = document.getElementById("subjectMarks");
const addBtn = document.getElementById("addBtn");
const subjectTable = document.getElementById("subjectTable");
const percentageDisplay = document.getElementById("percentage");
const gradeDisplay = document.getElementById("grade");

// Load data from LocalStorage
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

// Function to Save Data
function saveToLocalStorage() {
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

// Function to Calculate Grade
function calculateGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
}

// Function to Update Results
function updateResults() {
    let total = 0;

    subjects.forEach(sub => {
        total += sub.marks;
    });

    let percentage = subjects.length
        ? (total / subjects.length).toFixed(2)
        : 0;

    percentageDisplay.textContent = percentage + "%";
    gradeDisplay.textContent = calculateGrade(percentage);
}

// Function to Render Table
function renderTable() {
    subjectTable.innerHTML = "";

    subjects.forEach((sub, index) => {
        let row = `
            <tr>
                <td>${sub.name}</td>
                <td>${sub.marks}</td>
                <td>
                    <button onclick="deleteSubject(${index})">Delete</button>
                </td>
            </tr>
        `;
        subjectTable.innerHTML += row;
    });

    updateResults();
}

// Add Subject
addBtn.addEventListener("click", function () {

    const name = subjectName.value.trim();
    const marks = parseFloat(subjectMarks.value);

    if (name === "" || isNaN(marks) || marks < 0 || marks > 100) {
        alert("Please enter valid subject and marks (0-100)");
        return;
    }

    subjects.push({ name: name, marks: marks });

    saveToLocalStorage();
    renderTable();

    subjectName.value = "";
    subjectMarks.value = "";
});

// Delete Subject
function deleteSubject(index) {
    subjects.splice(index, 1);
    saveToLocalStorage();
    renderTable();
}

// Dark Mode Toggle
document.querySelector(".site-header").insertAdjacentHTML(
    "beforeend",
    `<button id="darkToggle" style="margin-left:15px;padding:6px 10px;border:none;border-radius:5px;cursor:pointer;">🌙</button>`
);

const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Load Saved Theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// Initial Render
renderTable();
