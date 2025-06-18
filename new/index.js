// JavaScript to handle opening of modals
document.getElementById('open-signup-btn').addEventListener('click', function() {
    var signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
});

document.getElementById('open-login-btn').addEventListener('click', function() {
    var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
});
document.addEventListener("DOMContentLoaded", function () {
    function calculator() {
        let totalCredits = 0;
        let totalGradePoints = 0;

        document.querySelectorAll("tbody tr").forEach(row => {
            let credit = parseFloat(row.querySelector(".credit").value) || 0;
            let grade = parseFloat(row.querySelector(".grade").value) || 0;

            if (credit > 0 && grade >= 0) {
                totalCredits += credit;
                totalGradePoints += credit * grade;
            }
        });

        let gpa = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
        document.getElementById("semesterCreditDisplay").textContent = totalCredits;
        document.getElementById("gpaDisplay").textContent = gpa;

        updateCGPA(totalCredits, parseFloat(gpa));
    }

    function updateCGPA(semesterCredits, semesterGPA) {
        let currentCGPA = parseFloat(document.querySelector(".currentCGPA").value) || 0;
        let creditsCompleted = parseFloat(document.querySelector(".creditsCompleted").value) || 0;

        let totalCredits = creditsCompleted + semesterCredits;
        let totalGradePoints = (currentCGPA * creditsCompleted) + (semesterGPA * semesterCredits);

        let updatedCGPA = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
        document.getElementById("totalCreditDisplay").textContent = totalCredits;
        document.getElementById("cgpaDisplay").textContent = updatedCGPA;
    }

    function addSubjectRow() {
        let tbody = document.querySelector("tbody");
        if (!tbody) {
            console.error("Error: <tbody> not found!");
            return;
        }

        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="text" class="course-title" placeholder="Eg. MAT101"></td>
            <td>
                <select class="credit">
                    <option disabled selected value="--">--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </td>
            <td>
                <select class="grade">
                    <option disabled selected value="--">--</option>
                    <option value="5">A (5.0)</option>
                    <option value="4">B (4.0)</option>
                    <option value="3">C (3.0)</option>
                    <option value="2">D (2.0)</option>
                    <option value="1">E (1.0)</option>
                    <option value="0">F (0.0)</option>
                </select>
            </td>
            <td class="removeSubject-btn"><i class="fas fa-trash-alt"></i></td>
        `;
        tbody.appendChild(newRow);
    }

    let addButton = document.querySelector(".addSubject-btn");
    if (addButton) {
        addButton.addEventListener("click", addSubjectRow);
    } else {
        console.error("Error: 'Add Subject' button not found!");
    }

    document.querySelector("tbody").addEventListener("change", event => {
        if (event.target.classList.contains("credit") || event.target.classList.contains("grade")) {
            calculator();
        }
    });

    document.querySelector("tbody").addEventListener("click", event => {
        if (event.target.closest(".removeSubject-btn")) {
            event.target.closest("tr").remove();
            calculator();
        }
    });

    document.querySelectorAll(".currentCGPA, .creditsCompleted").forEach(input => {
        input.addEventListener("input", calculator);
    });
});

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Tab Functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to the clicked tab and its corresponding content
            tab.classList.add('active');
            const target = document.querySelector(tab.dataset.tabTarget);
            target.classList.add('active');
        });
    });

    // Dropdown Functionality for Levels
    const levelDropdown = document.querySelector('.dropdown-content');
    levelDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            const selectedLevel = e.target.getAttribute('data-level');
            console.log('Selected Level: ${selectedLevel}');
            alert('You selected: ${selectedLevel} Level');
        }
    });

    // Dropdown Functionality for Semesters
    const semesterDropdown = document.querySelectorAll('.dropdown-content')[1];
    semesterDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            const selectedSemester = e.target.getAttribute('data-semester');
            console.log('Selected Semester: ${selectedSemester}');
            alert('You selected: ${selectedSemester} Semester');
        }
    });
});

// Function to handle level selection
document.querySelectorAll('.dropdown-content a[data-level]').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const selectedLevelText = item.textContent; // Get the full text (e.g., "100 Level")
        document.getElementById('selected-level').textContent = selectedLevelText;
        console.log('Selected Level: ${selectedLevelText}');
    });
});

// Function to handle semester selection
document.querySelectorAll('.dropdown-content a[data-semester]').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const selectedSemesterText = item.textContent; // Get the full text (e.g., "1st Semester")
        document.getElementById('selected-semester').textContent = selectedSemesterText;
        console.log('Selected Semester: ${selectedSemesterText}');
    });
});

// Function to calculate required GPA to achieve target CGPA
function calculateRequiredGPA(currentCGPA, creditsCompleted, targetCGPA, additionalCredits) {
    let totalCurrentPoints = currentCGPA * creditsCompleted;
    let totalTargetPoints = targetCGPA * (creditsCompleted + additionalCredits);
    let requiredGPA = (totalTargetPoints - totalCurrentPoints) / additionalCredits;
    return requiredGPA.toFixed(2);
}

// Function to display advice on how to increase CGPA
function displayCGPAAdvice() {
    let currentCGPA = parseFloat(document.querySelector(".currentCGPA").value) || 0;
    let creditsCompleted = parseFloat(document.querySelector(".creditsCompleted").value) || 0;
    let targetCGPA = parseFloat(document.querySelector(".targetCGPA").value) || 0;
    let additionalCredits = parseFloat(document.querySelector(".additionalCredits").value) || 0;

if (currentCGPA > 0 && creditsCompleted > 0 && targetCGPA > 0 && additionalCredits > 0) {
        let requiredGPA = calculateRequiredGPA(currentCGPA, creditsCompleted, targetCGPA, additionalCredits);
        let adviceMessage = `To achieve a CGPA of ${targetCGPA}, you need to score an average GPA of ${requiredGPA} in the next ${additionalCredits} credits.`;


        // Additional advice
        adviceMessage += `
        \n\nHere are some tips to help you improve your CGPA:
        1. **Identify Weak Areas**: Focus on subjects where you have scored lower grades and try to improve in those areas.
        2. **Seek Help**: Don't hesitate to seek help from professors, tutors, or study groups.
        3. **Study Plan**: Create a structured study plan and stick to it.
        4. **Extra Credits**: Consider taking additional courses or extra credit assignments to boost your GPA.
        5. **Consistent Effort**: Consistent effort and regular study habits are key to improving your grades.
        6. **Time Management**: Manage your time effectively to balance study, rest, and extracurricular activities.
        7. **Healthy Lifestyle**: Maintain a healthy lifestyle with proper sleep, nutrition, and exercise to keep your mind sharp.
        `;

        document.getElementById("cgpaAdvice").textContent = adviceMessage;
    } else {
        document.getElementById("cgpaAdvice").textContent = "Please fill in all fields to get advice.";
    }
}


// Add event listener to the advice button
document.getElementById("getAdviceBtn").addEventListener("click", displayCGPAAdvice);