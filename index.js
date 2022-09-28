let predictionDatePicker = document.getElementById("predictionDatePicker")
let getResultsButton = document.getElementById("getResultsButton")
let mainHero = document.getElementById("hero-main")
let resultHeader = document.getElementById("resultHeader")
let resultDescription = document.getElementById("resultDescription")
let resultDateHolder = document.getElementById("resultDateHolder")
let resultDate = document.getElementById("resultDate")
let currentPagesText = document.getElementById("currentPages")

let form1 = document.getElementById("form1")
let form2 = document.getElementById("form2")
let form3 = document.getElementById("form3")
let form4 = document.getElementById("form4")
let form5 = document.getElementById("form5")

let sem1 = document.getElementById("sem1")
let sem2 = document.getElementById("sem2")
let sem3 = document.getElementById("sem3")
let sem4 = document.getElementById("sem4")
let sem5 = document.getElementById("sem5")
let sem6 = document.getElementById("sem6")

let jansem1 = document.getElementById("jansem1").value
let febsem1 = document.getElementById("febsem1").value
let macsem1 = document.getElementById("macsem1").value
let aprsem1 = document.getElementById("aprsem1").value
let meisem1 = document.getElementById("meisem1").value
let junsem1 = document.getElementById("junsem1").value

let predictionDate = new Date()
let monthVelocity = 0
let maxPages = 0

let tarikhSem1 = new Date("2021-01-01")

function weeksBetween(date1, date2) {
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000))
}

function monthsBetween(date1, date2) {
    return Math.round((date2 - date1) / (4 * 7 * 24 * 60 * 60 * 1000))
}

function fetchTasmikData() {
    jansem1 = document.getElementById("jansem1").value
    febsem1 = document.getElementById("febsem1").value
    macsem1 = document.getElementById("macsem1").value
    aprsem1 = document.getElementById("aprsem1").value
    meisem1 = document.getElementById("meisem1").value
    junsem1 = document.getElementById("junsem1").value
}

function determineSem1EndDate() {
    if(form1.checked) {
        tarikhSem1 = new Date("2022-06-01")
    }
    
    if(form2.checked) {
        tarikhSem1 = new Date("2021-06-01")
    }
    
    if(form3.checked) {
        tarikhSem1 = new Date("2020-06-01")
    }
    
    if(form4.checked) {
        tarikhSem1 = new Date("2019-06-01")
    }
    
    if(form5.checked) {
        tarikhSem1 = new Date("2018-06-01")
    }
}

async function getResults() {
    
    fetchTasmikData()
    
    determineSem1EndDate()
    
    predictionDate = new Date(predictionDatePicker.value)
    
    semester1Array = [jansem1, febsem1, macsem1, aprsem1, meisem1, junsem1]
    semester1Array = semester1Array.map(Number)
    
    monthVelocity = semester1Array.reduce((a, b) => a + b, 0) / 6
    let currentPages = semester1Array.reduce((a, b) => a + b, 0)
    let tarikhKhatam = new Date()
    
    if (monthVelocity > 0) {
        for (let monthsToKhatam = 0; currentPages < 604; monthsToKhatam += 1) {
            currentPages += monthVelocity
            tarikhKhatam = new Date(tarikhSem1.setMonth(tarikhSem1.getMonth() + 1))
        }
    }

    if (predictionDatePicker.value != '' && new Date(predictionDatePicker.value) < tarikhKhatam) {
        monthsToPredictionDate = monthsBetween(tarikhSem1, predictionDate)
        predictionPages = Math.floor(currentPages + (monthsToPredictionDate * monthVelocity))
        predictionJuzuk = Math.ceil(predictionPages / 20)

        currentPagesText.textContent = "Muka surat: " + predictionPages + " || Juzu' : " + predictionJuzuk
    }

    if (predictionDate > tarikhKhatam) {
        currentPagesText.textContent = "Muka surat: 604 || Juzu': 30" 
    }

    maxPages = monthVelocity * 60

    if(maxPages >= 604) {
        mainHero.className = 'hero is-success'
        resultDateHolder.style.display = 'block'
        resultHeader.textContent = 'Khatam'
        resultDescription.textContent = 'Pelajar akan sempat khatam pada tarikh di bawah. Teruskan usaha cemerlang!'
        resultDate.textContent = tarikhKhatam.toDateString()
    } else {
        mainHero.className = 'hero is-warning'

        resultHeader.textContent = 'Tidak Khatam'
        resultDescription.textContent = 'Pelajar tidak akan sempat khatam dalam pengajian. Usaha dengan lebih lagi.'
    }
    
}

getResultsButton.onclick = () => getResults()