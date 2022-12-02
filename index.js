
const maxPages = 604
const maxJuzuk = 30
const maxSemesters = 60
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const statisticsChart = document.getElementById('statisticsChart')

let generatedChart = false

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}

function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    for (i = 0; i < count; ++i) {
        value = MONTHS[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
    }

    return values;
}

function getFormData() {
    let inputName = document.getElementById('inputName').value
    let inputCollegeId = document.getElementById('inputCollegeId').value
    let inputClass = document.getElementById('inputClass').value
    let inputHomeroom = document.getElementById('inputHomeroom').value
    let inputTeacherName = document.getElementById('inputTeacherName').value
    let inputPages = document.getElementById('inputPages').value

    let override = document.getElementById('override').checked
    let overrideMonthlyAverage

    if (override) {
        overrideMonthlyAverage = Number(document.getElementById('overrideMonthlyAverage').value)
    } else {
        overrideMonthlyAverage = false
    }

    return { inputName, inputCollegeId, inputClass, inputHomeroom, inputTeacherName, inputPages, override, overrideMonthlyAverage }
}

function generateChartData() {
    let pastDataArray = []
    let previousMonthData = determineStudentCurrentForm() * 12
    let futureMonthData = (5 - determineStudentCurrentForm()) * 12
    let futureDataArray = []

    for (i = 0; i < previousMonthData; i++) {
        let additive = mainCalculation().monthlyAveragePages * i
        if (additive > 604) {
            pastDataArray.push(604)
        } else {
            pastDataArray.push(Math.ceil(additive))
        }
        futureDataArray.push(0)
    }

    additive = pastDataArray.at(-1) + mainCalculation().monthlyAveragePages

    if (getFormData().override) {
        for (i = 0; i < futureMonthData; i++) {
            additived = getFormData().overrideMonthlyAverage * i + additive
            if (additived >= 604) {
                futureDataArray.push(604)
            } else {
                futureDataArray.push(Math.ceil(additived))
            }
        }

    } else {
        for (i = 0; i < futureMonthData; i++) {
            additived = mainCalculation().monthlyAveragePages * i + additive
            if (additived >= 604) {
                futureDataArray.push(604)
            } else {
                futureDataArray.push(Math.ceil(additived))
            }
        }

    }
    
    return { pastDataArray, futureDataArray }
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

    let currentDate = new Date()
    let currentJuzuk = Math.ceil(getFormData().inputPages / 20)

    outputNameElement.textContent = getFormData().inputName
    outputCollegeIdElement.textContent = getFormData().inputCollegeId
    outputClassElement.textContent = getFormData().inputClass
    outputHomeroomElement.textContent = getFormData().inputHomeroom
    outputTeacherNameElement.textContent = getFormData().inputTeacherName

    currentPagesElement.textContent = getFormData().inputPages
    currentJuzukElement.textContent = currentJuzuk
    currentDateElement.textContent = currentDate

    let khatamDateElement = document.getElementById('khatamDate')

    khatamDateElement.textContent = mainCalculation().khatamDate

    let monthlyAveragePagesElement = document.getElementById('monthlyAveragePages')
    let pagesLeftElement = document.getElementById('pagesLeft')
    let monthsLeftElement = document.getElementById('monthsLeft')

    monthlyAveragePagesElement.textContent = mainCalculation().monthlyAveragePages.toPrecision(4)
    pagesLeftElement.textContent = mainCalculation().pagesLeft
    monthsLeftElement.textContent = mainCalculation().monthsLeft

    let khatamDuringStudyElement = document.getElementById('khatamDuringStudy')
    let khatamFormElement = document.getElementById('khatamForm')

    if (mainCalculation().khatamDuringStudy) {
        khatamDuringStudyElement.textContent = "Ya"
    } else {
        khatamDuringStudyElement.textContent = "Tidak"
    }

    if (mainCalculation().determinedKhatamForm <= 5) {
        khatamFormElement.textContent = String(mainCalculation().determinedKhatamForm)
    } else {
        khatamFormElement.textContent = "5++"
    }

    const monthLabels = months({ count: 60 });

    const data = {
        labels: monthLabels,
        datasets: [{
            label: 'Tasmik Sebelum',
            data: generateChartData().pastDataArray,
            fill: true,
            borderColor: '#2191FF',
            backgroundColor: '#2191FB',
            tension: 0.1
        },
        {
            label: 'Ramalan Tasmik',
            data: generateChartData().futureDataArray,
            fill: false,
            borderColor: '#399E5A',
            backgroundColor: '#399E5A',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
    };

    if(generatedChart) {
        generatedChart.destroy()
    }

    generatedChart = new Chart(statisticsChart, config, data)
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
    let currentMonths = determineStudentCurrentForm() * 12
    let monthlyAveragePages = getFormData().inputPages / currentMonths

    let pagesLeft = maxPages - getFormData().inputPages
    let monthsLeft = Math.ceil(pagesLeft / monthlyAveragePages)

    if (getFormData().override) {
        monthsLeft = Math.ceil(pagesLeft / getFormData().overrideMonthlyAverage)
    }

    let formToAdd = Math.round(monthsLeft / 12)
    let determinedKhatamForm = determineStudentCurrentForm() + formToAdd

    let khatamDuringStudy

    if (determinedKhatamForm > 5) {
        khatamDuringStudy = false
    } else {
        khatamDuringStudy = true
    }

    let khatamDate = new Date();
    addMonths(khatamDate, monthsLeft)

    return { monthlyAveragePages, pagesLeft, monthsLeft, khatamDuringStudy, determinedKhatamForm, khatamDate }
}

// // mrsm1234
// // mrsmgemencheh@123
// // ilovemrsm



