let predictionDatePicker = document.getElementById("predictionDatePicker")
let getResultsButton = document.getElementById("getResultsButton")
let mainHero = document.getElementById("hero-main")
let resultHeader = document.getElementById("resultHeader")
let resultDescription = document.getElementById("resultDescription")
let resultDateHolder = document.getElementById("resultDateHolder")
let resultDate = document.getElementById("resultDate")
let currentPagesText = document.getElementById("currentPages")
let statistics = document.getElementById("statistics")
let myChartHolder = document.getElementById("myChart")
// let tingkatanPelajar = document.getElementById()

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

let bulan1sem1 = Number(document.getElementById("jansem1").value)
let bulan2sem1 = Number(document.getElementById("febsem1").value)
let bulan3sem1 = Number(document.getElementById("macsem1").value)
let bulan4sem1 = Number(document.getElementById("aprsem1").value)
let bulan5sem1 = Number(document.getElementById("meisem1").value)
let bulan6sem1 = Number(document.getElementById("junsem1").value)

let labels = []
let data = []
let config = []
let myChart = []
let predictionArray = []

let predictionPages = 0
let predictionDate = new Date()
let monthVelocity = 0
let maxPages = 0
let chartHasBeenDrawnBefore = false

let tarikhSem1 = new Date("2021-01-01")

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

function months(config) {
    var cfg = config || {};
    var count = cfg.count || 12;
    var section = cfg.section;
    var values = [];
    var i, value;

    if (form1.checked == true) {
        i = 2
    } else {
        i = 0
    }

    for (; i < count; ++i) {
        value = MONTHS[Math.ceil(i) % 12];
        values.push(value.substring(0, section));
    }

    return values;
}

function weeksBetween(date1, date2) {
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000))
}

function monthsBetween(date1, date2) {
    return Math.round((date2 - date1) / (4 * 7 * 24 * 60 * 60 * 1000))
}

function fetchSem1TasmikData() {
    bulan1sem1 = Number(document.getElementById("jansem1").value)
    bulan2sem1 = Number(document.getElementById("febsem1").value)
    bulan3sem1 = Number(document.getElementById("macsem1").value)
    bulan4sem1 = Number(document.getElementById("aprsem1").value)
    bulan5sem1 = Number(document.getElementById("meisem1").value)
    bulan6sem1 = Number(document.getElementById("junsem1").value)
}

function determineSem1EndDate() {
    if (form1.checked) {
        tarikhSem1 = new Date("2022-08-01")
    }

    if (form2.checked) {
        tarikhSem1 = new Date("2021-06-01")
    }

    if (form3.checked) {
        tarikhSem1 = new Date("2020-06-01")
    }

    if (form4.checked) {
        tarikhSem1 = new Date("2019-06-01")
    }

    if (form5.checked) {
        tarikhSem1 = new Date("2018-06-01")
    }
}

function drawChart() {
    labels = months({ count: 60 });

    data = {
        labels: labels,
        datasets: [{
            label: 'Semester 1',
            data: [bulan1sem1, a, b, c, d, e],
            fill: true,
            backgroundColor: 'rgb(5, 145, 80)',
            borderColor: 'rgb(200, 200, 200)',
            tension: 0.1
        },
        {
            label: 'Ramalan',
            data: predictionArray,
            fill: true,
            backgroundColor: 'rgb(40, 205, 140)',
            borderColor: 'rgb(200, 200, 200)',
            tension: 0.1
        }
        ]
    };

    config = {
        type: 'line',
        data: data,
        options: {}
    };

    if (chartHasBeenDrawnBefore != false) {
        myChart.destroy()
    }

    chartHasBeenDrawnBefore = true

    myChart = new Chart(
        document.getElementById("myChart"),
        config
    );
}

function determineIfAbleToKhatam(tarikhKhatam) {
    maxPages = monthVelocity * 60

    if (maxPages >= 604) {
        mainHero.className = 'hero is-success'

        statistics.style.display = 'block'
        resultDateHolder.style.display = 'block'
        resultHeader.textContent = 'Khatam ✔️'
        resultDescription.textContent = 'Pelajar akan sempat khatam pada tarikh di bawah. Teruskan usaha cemerlang!'
        resultDate.textContent = tarikhKhatam.toDateString()
    } else {
        mainHero.className = 'hero is-warning'

        resultDate.textContent = ""
        statistics.style.display = 'block'
        resultHeader.textContent = 'Tidak Khatam ❌'
        resultDescription.textContent = 'Pelajar tidak akan sempat khatam dalam pengajian. Usaha dengan lebih lagi.'
    }
}
// mrsm1234
// mrsmgemencheh@123
// ilovemrsm


function getResults() {

    fetchSem1TasmikData()

    determineSem1EndDate()
    
    semester1Array = [bulan1sem1, bulan2sem1, bulan3sem1, bulan4sem1, bulan5sem1, bulan6sem1]
    semester1Array = semester1Array.map(Number)
    
    monthVelocity = semester1Array.reduce((a, b) => a + b, 0) / 6
    let currentPages = semester1Array.reduce((a, b) => a + b, 0)
    let tarikhKhatam = new Date()
    
    predictionDate = new Date(predictionDatePicker.value)

    if (predictionDatePicker.value != '' && new Date(predictionDatePicker.value) < tarikhKhatam) {
        monthsToPredictionDate = monthsBetween(tarikhSem1, predictionDate)
        predictionPages = Math.floor(currentPages + (monthsToPredictionDate * monthVelocity))
        predictionJuzuk = Math.ceil(predictionPages / 20)

        currentPagesText.textContent = "Muka surat: ~" + predictionPages + " || Juzu' : " + predictionJuzuk
    }

    if (predictionDate > tarikhKhatam) {
        currentPagesText.textContent = "Muka surat: 604 || Juzu': 30"
    }

    a = bulan1sem1 + bulan2sem1
    b = a + bulan3sem1
    c = b + bulan4sem1
    d = c + bulan5sem1
    e = d + bulan6sem1

    if (monthVelocity > 0) {
        for (let monthsToKhatam = 0; currentPages < 604; monthsToKhatam += 1) {
            currentPages += monthVelocity
            tarikhKhatam = new Date(tarikhSem1.setMonth(tarikhSem1.getMonth() + 1))
        }

        iterator = semester1Array.reduce((a, b) => a + b, 0)
        predictionArray = [bulan1sem1, a, b, c, d, e]

        for (iterator += monthVelocity; iterator < 604; iterator += monthVelocity) {
            predictionArray.push(iterator)
        }

        predictionArray.push(604)

        drawChart()

        determineIfAbleToKhatam(tarikhKhatam)
    }


}

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
      const $notification = $delete.parentNode;
  
      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    });
  });

getResultsButton.onclick = () => getResults()
