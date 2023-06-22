<script setup>
import Navbar from '../../components/Navbar.vue'
import Footer from '../../components/Footer.vue'
import { Chart } from 'chart.js/auto'

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



document.body.onload = function () {
    const statisticsChart = document.getElementById('myChart')
}

let generatedChart = false

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + + months);
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
    let futureDataArray = []

    // Calculates how many months to generate data for
    let previousMonthData = determineStudentCurrentForm() * 12 + 6
    let futureMonthData = (5 - determineStudentCurrentForm()) * 12 + 6

    for (let i = 0; i < previousMonthData; i++) {
        let additive = mainCalculation().monthlyAveragePages * i
        if (additive > 604) {
            pastDataArray.push(604)
        } else {
            pastDataArray.push(Math.ceil(additive))
        }
        futureDataArray.push(0)
    }

    let additive = pastDataArray.at(-1) + mainCalculation().monthlyAveragePages

    if (getFormData().override) {
        for (let i = 0; i < futureMonthData; i++) {
            let additived = getFormData().overrideMonthlyAverage * i + additive
            if (additived >= 604) {
                futureDataArray.push(604)
            } else {
                futureDataArray.push(Math.ceil(additived))
            }
        }

    } else {
        for (let i = 0; i < futureMonthData; i++) {
            let additived = mainCalculation().monthlyAveragePages * i + additive
            if (additived >= 604) {
                futureDataArray.push(604)
            } else {
                futureDataArray.push(Math.ceil(additived))
            }
        }

    }
    console.log(futureDataArray)
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
            yAxisID: 'y',
            label: 'Tasmik Sebelum',
            data: generateChartData().pastDataArray,
            fill: true,
            borderColor: '#2191FF',
            backgroundColor: '#2191FB',
            tension: 0.1
        },
        {
            yAxisID: 'y2',
            label: 'Ramalan Tasmik',
            data: generateChartData().futureDataArray,
            fill: false,
            borderColor: '#399E5A',
            backgroundColor: '#399E5A',
            tension: 0.1
        }],

    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            stacked: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                    max: 604
                },
    
                y2: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 604
                }
            }

        }
    };

    if (generatedChart) {
        generatedChart.destroy()
    }



    generatedChart = new Chart(statisticsChart, config, data)

    // Hide the forms when the report is generated

    let formContainer = document.getElementById('formContainer')

    formContainer.style.display = "none"
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
    let monthlyAveragePages = getFormData().inputPages / (currentMonths - 6) // TEMPORARY FIX: -6 months

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

</script>

<template>
    <Navbar />
    <center>
        <div id="app">

            <div class="results">

                <section id="hero-main" class="hero is-link">
                    <div class="hero-body">
                        <img src="@/icon.png" alt="" style="width: 10%;">
                        <h1 id="resultHeader" class="title is-4">RamTas 2022</h1>
                        <h3 id="resultDescription" class="subtitle is-6">Sistem Pengiraan dan Ramalan Tasmik bagi
                            kegunaan Pelajar dan Guru</h3>

                        <!-- <div id="statistics">
                            <h3 class="title is-4">Statistik</h3>
                            <div class="box">
                                <canvas id="myChart" style="width: 45vw; height: 18vh;"></canvas>
                            </div>

                        </div> -->

                    </div>
                </section>
                <hr>
            </div>

            <div id="formContainer">

                <div class="columns">
                    <div class="column">
                        <p>Nama Pelajar:</p>
                        <input id="inputName" type="text" style="width: 35vw;">
                    </div>
                    <div class="column">
                        <p>No. Maktab:</p>
                        <input id="inputCollegeId" type="text">
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <p>Kelas:</p>
                        <input id="inputClass" type="number" min="100" max="506">
                    </div>
                    <div class="column">
                        <p>Homeroom:</p>
                        <input id="inputHomeroom" type="text">
                    </div>
    
                </div>



                <hr>
    
    
                <div class="columns">
                    <div class="column">
                        <p>Guru Tasmik:</p>
                        <input id="inputTeacherName" type="text" style="width: 35vw;">
                    </div>
                    <div class="column">
                        <p>Muka Surat Terkini:</p>
                        <input id="inputPages" type="number" min="1" max="604">
                    </div>
                </div>
    
                <hr>
            </div>




            <br><br>

            <button @click="generateReport" class="button is-link" id="getResultsButton">Jana Laporan</button><br><br>
        </div>

    </center>

    <div class="box has-background-info-light" id="generatedReport" style="width: 100%;">


        <p class="subtitle">Nama Pelajar:
            <strong id="outputName"></strong>
        </p>
        <p class="subtitle">No. Maktab:
            <strong id="outputCollegeId"></strong>
        </p>
        <p class="subtitle">Kelas:
            <strong id="outputClass"></strong>
        </p>
        <p class="subtitle">Homeroom:
            <strong id="outputHomeroom"></strong>
        </p>
        <p class="subtitle">Tarikh Laporan Dijana:
            <strong id="currentDate"></strong>
        </p>

        <hr>

        <p class="subtitle">Guru Tasmik:
        <strong id="outputTeacherName"></strong>
        </p>
        <p class="subtitle">Muka Surat Terkini Pelajar:
        <strong id="currentPages"></strong>
        </p>
        <p class="subtitle">Juzu' Terkini Pelajar:
        <strong id="currentJuzuk"></strong>
        </p>

        <p class="subtitle is-6">Berdasarkan data yang diterima, berikut merupakan hasil pengiraan dan ramalan bagi
            pelajar</p>

        <hr>

        <!-- <p class="subtitle is-6">Pelajar akan berjaya menamatkan 30 Juzu' hafalan pada tarikh ini</p> -->
        <p class="subtitle">Tarikh Pelajar Khatam: <strong id="khatamDate"></strong></p>

        <!-- <p class="subtitle is-6">Jumlah bulan sebelum pelajar akan berjaya menamatkan 30 Juzu' hafalan</p> -->
        <p class="subtitle">Jumlah Bulan untuk Pelajar Khatam: <strong id="monthsLeft"></strong></p>

        <!-- <p class="subtitle is-6">Pelajar akan khatam sewaktu dia berada di tingkatan ini</p> -->
        <p class="subtitle">Tingkatan Pelajar akan Khatam: <strong id="khatamForm"></strong></p>

        <p class="subtitle">Purata Muka Surat Bulanan Pelajar: <strong id="monthlyAveragePages"></strong></p>

        <p class="subtitle">Jumlah Muka Surat Diperlukan untuk Khatam: <strong id="pagesLeft"></strong></p>

        <p class="subtitle">Adakah Pelajar akan Khatam dalam Pengajian? <strong id="khatamDuringStudy"></strong></p>

        <hr>

        <h2 class="subtitle">Carta Tasmik Pelajar</h2>
        <div class="box">
            <canvas id="statisticsChart"></canvas>
        </div>


        <p class="subtitle is-6">Laporan ini dijana oleh komputer.</p>

    </div>

    <Footer />

    <div class="hideMe">

        <p class="subtitle"><input class="checkbox" type="checkbox" name=""
                        id="override"></p>
                <p><input type="number" id="overrideMonthlyAverage" min="1" max="603"></p>
    </div>
</template>

<style>

.hideMe {
    display: none;
}

</style>