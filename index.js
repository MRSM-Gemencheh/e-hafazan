const maxPages = 604
const maxJuzuk = 30
const maxSemesters = 60

function getFormData() {
    let inputName = document.getElementById('inputName').value
    let inputCollegeId = document.getElementById('inputCollegeId').value
    let inputClass = document.getElementById('inputClass').value
    let inputHomeroom = document.getElementById('inputHomeroom').value
    let inputTeacherName = document.getElementById('inputTeacherName').value
    let inputPages = document.getElementById('inputPages').value

    return { inputName, inputCollegeId, inputClass, inputHomeroom, inputTeacherName, inputPages }
}

function generateReport() {
    let outputNameElement = document.getElementById('outputName')
    let outputCollegeIdElement = document.getElementById('outputCollegeId')
    let outputClassElement = document.getElementById('outputClass')
    let outputHomeroomElement = document.getElementById('outputHomeroom')
    let outputTeacherNameElement = document.getElementById('outputTeacherName')

    let currentDateElement = document.getElementById('currentDate')
    let currentPagesElement = document.getElementById('currentPages')
    let currentJuzukElement = document.getElementById('currentJuzuk')

    let currentDate = Date.now()
    let currentJuzuk = Math.ceil(getFormData().inputPages / 20)

    outputNameElement.textContent = getFormData().inputName
    outputCollegeIdElement.textContent = getFormData().inputCollegeId
    outputClassElement.textContent = getFormData().inputClass
    outputHomeroomElement.textContent = getFormData().inputHomeroom
    outputTeacherNameElement.textContent = getFormData().inputTeacherName

    currentPagesElement.textContent = getFormData().inputPages
    currentJuzukElement.textContent = currentJuzuk
    currentDateElement.textContent = currentDate.toString()

    let monthlyAveragePagesElement = document.getElementById('monthlyAveragePages')
    let pagesLeftElement = document.getElementById('pagesLeft')
    let monthsLeftElement = document.getElementById('monthsLeft')

    monthlyAveragePagesElement.textContent = mainCalculation().monthlyAveragePages
    pagesLeftElement.textContent = mainCalculation().pagesLeft
    monthsLeftElement.textContent = mainCalculation().monthsLeft
}

function determineStudentCurrentForm() {
    let currentForm

    if (getFormData().inputClass > 500) {
        currentForm = 5
    } else if (getFormData().inputClass > 400) {
        currentForm = 4
    } else if (getFormData().inputClass > 300) {
        currentForm = 3
    } else if (getFormData().inputClass > 200) {
        currentForm = 2
    } else {
        currentForm = 1
    }

    return currentForm
}

function mainCalculation() {
    let currentSemesters = determineStudentCurrentForm() * 12
    let monthlyAveragePages = Math.ceil(getFormData().inputPages / currentSemesters)

    let pagesLeft = maxPages - getFormData().inputPages
    let monthsLeft = Math.ceil(pagesLeft / monthlyAveragePages)

    return { monthlyAveragePages, pagesLeft, monthsLeft }
}

// // mrsm1234
// // mrsmgemencheh@123
// // ilovemrsm



