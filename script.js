/* ==========================================================
   DATA
   ========================================================== */


/*
    ข้อมูลรายได้แต่ละ Scenario

    index 0 = ปีที่ 1
    index 1 = ปีที่ 2
    ...
    index 9 = ปีที่ 10
*/


const incomeData = {

    base: [

        60400,
        60400,
        134000,
        133000,
        133000,
        133000,
        133000,
        133000,
        133000,
        133000

    ],


    normal: [

        72000,
        72000,
        160000,
        158000,
        158000,
        158000,
        158000,
        158000,
        158000,
        158000

    ],


    high: [

        90000,
        90000,
        198000,
        195000,
        195000,
        195000,
        195000,
        195000,
        195000,
        195000

    ]

};



/* ==========================================================
   CROP DATA
   ========================================================== */

const crops = [

    {

        name: "มะพร้าวแก่",

        price: 1500,

        description:
            "เริ่มให้ผลผลิตเด่นตั้งแต่ปีที่ 4-5"

    },

   
    {

        name: "ยางพารา",

        price: 80,

        description:
            "เริ่มให้ผลผลิตเด่นตั้งแต่ปีที่ 3"

    },


    {

        name: "กล้วยหอมทอง",

        price: 15,

        description:
            "ให้ผลผลิตเร็วและต่อเนื่อง"

    },

   
    {

        name: "กาแฟโรบัสตา",

        price: 15,

        description:
            "ให้ผลผลิตเร็วและต่อเนื่อง"

    },

   
    {

        name: "กระชายขาว",

        price: 15,

        description:
            "ให้ผลผลิตเร็วและต่อเนื่อง"

    },

   
    {

        name: "ขมิ้นเหลือง",

        price: 60,

        description:
            "เหมาะสำหรับสร้างรายได้ระยะสั้น"

    }

];



/* ==========================================================
   DOM ELEMENTS
   ========================================================== */

const scenario =
    document.getElementById("scenario");


const yearSlider =
    document.getElementById("yearSlider");


const farmGrid =
    document.getElementById("farmGrid");


const plantInfo =
    document.getElementById("plantInfo");



/* ==========================================================
   FORMAT MONEY
   ========================================================== */

function formatMoney(number) {

    return number.toLocaleString("th-TH")
        + " ฿";

}



/* ==========================================================
   CREATE FARM
   ========================================================== */


/*
    สร้างแปลง 10 × 10

    10 × 10 = 100 ช่อง
*/

function createFarm() {

    for (
        let i = 1;
        i <= 100;
        i++
    ) {


        const plant =
            document.createElement("div");


        plant.className =
            "plant";


        /*
            เก็บหมายเลขต้น
        */

        plant.dataset.number =
            i;


        plant.title =
            "ต้นที่ " + i;


        /*
            เมื่อคลิกต้นพืช
        */

        plant.addEventListener(
            "click",
            function () {

                showPlantInfo(i);

            }
        );


        farmGrid.appendChild(
            plant
        );

    }

}



/* ==========================================================
   SHOW PLANT INFORMATION
   ========================================================== */

function showPlantInfo(number) {


    /*
        กระจายชนิดพืช

        ต้น 1 = มะพร้าวแก่
        ต้น 2 = ยางพารา
        ต้น 3 = กล้วยหอมทอง
        ต้น 4 = กาแฟโรบัสตา
        ต้น 5 = กระชายขาว
        ต้น 6 = ขมิ้นเหลือง
        ต้น 7 = มะพร้าวแก่
        ...
    */

    const cropIndex =
        (number - 1) % crops.length;


    const crop =
        crops[cropIndex];


    plantInfo.innerHTML = `

        <strong>
            ต้นที่ ${number}
        </strong>

        <br>

        ชนิดพืช:
        ${crop.name}

        <br>

        ${crop.description}

        <br>

        ราคาสมมติ:
        ${crop.price.toLocaleString()}
        บาท/กก.

    `;

}



/* ==========================================================
   CALCULATE DASHBOARD
   ========================================================== */

function updateDashboard() {


    /*
        ปีปัจจุบัน

        Slider เริ่ม 1

        แต่ Array เริ่ม index 0

        ดังนั้นต้อง -1
    */

    const year =
        Number(yearSlider.value);


    const selectedScenario =
        scenario.value;


    /*
        ดึงข้อมูลรายได้
    */

    const data =
        incomeData[selectedScenario];


    /*
        รายได้ของปีปัจจุบัน
    */

    const currentIncome =
        data[year - 1];


    /*
        รายได้สะสม

        เช่น เลือกปี 3

        จะรวม

        ปี 1
        +
        ปี 2
        +
        ปี 3
    */

    let cumulativeIncome = 0;


    for (
        let i = 0;
        i < year;
        i++
    ) {

        cumulativeIncome +=
            data[i];

    }


    /*
        รายได้รวม 10 ปี
    */

    let totalIncome = 0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        totalIncome +=
            data[i];

    }



    /* ======================================================
       UPDATE CARD
       ====================================================== */


    document.getElementById(
        "cardYear"
    ).textContent = year;


    document.getElementById(
        "cardYear2"
    ).textContent = year;


    document.getElementById(
        "yearIncome"
    ).textContent =
        formatMoney(currentIncome);


    document.getElementById(
        "cumIncome"
    ).textContent =
        formatMoney(cumulativeIncome);


    document.getElementById(
        "tenYear"
    ).textContent =
        formatMoney(totalIncome);


    document.getElementById(
        "yearText"
    ).textContent = year;



    /*
        วาดกราฟใหม่
    */

    drawChart(
        data,
        year
    );

}



/* ==========================================================
   DRAW CHART
   ========================================================== */

function drawChart(
    data,
    selectedYear
) {


    const svg =
        document.getElementById(
            "incomeChart"
        );


    /*
        ล้างกราฟเดิม
    */

    svg.innerHTML = "";



    /* ======================================================
       CHART SIZE
       ====================================================== */

    const width = 800;

    const height = 400;


    const margin = {

        left: 65,

        right: 25,

        top: 25,

        bottom: 50

    };


    const chartWidth =
        width -
        margin.left -
        margin.right;


    const chartHeight =
        height -
        margin.top -
        margin.bottom;



    /* ======================================================
       MAX VALUE
       ====================================================== */

    const maxData =
        Math.max(...data);


    /*
        ปัดขึ้นให้แกนอ่านง่าย
    */

    const maxValue =
        Math.ceil(
            maxData / 20000
        ) * 20000;



    /* ======================================================
       GRID
       ====================================================== */

    const numberOfGrid =
        5;


    for (
        let i = 0;
        i <= numberOfGrid;
        i++
    ) {


        const value =
            maxValue *
            i /
            numberOfGrid;


        const y =
            margin.top +
            chartHeight -
            (value / maxValue) *
            chartHeight;


        /*
            เส้นแนวนอน
        */

        const line =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );


        line.setAttribute(
            "x1",
            margin.left
        );


        line.setAttribute(
            "x2",
            width - margin.right
        );


        line.setAttribute(
            "y1",
            y
        );


        line.setAttribute(
            "y2",
            y
        );


        line.setAttribute(
            "class",
            "grid-line"
        );


        svg.appendChild(line);



        /*
            ตัวเลขแกน Y
        */

        const label =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );


        label.setAttribute(
            "x",
            margin.left - 10
        );


        label.setAttribute(
            "y",
            y + 4
        );


        label.setAttribute(
            "text-anchor",
            "end"
        );


        label.setAttribute(
            "class",
            "chart-label"
        );


        label.textContent =
            value.toLocaleString()
            + " ฿";


        svg.appendChild(label);

    }



    /* ======================================================
       X AXIS
       ====================================================== */

    const axis =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );


    axis.setAttribute(
        "x1",
        margin.left
    );


    axis.setAttribute(
        "x2",
        width - margin.right
    );


    axis.setAttribute(
        "y1",
        margin.top + chartHeight
    );


    axis.setAttribute(
        "y2",
        margin.top + chartHeight
    );


    axis.setAttribute(
        "class",
        "axis-line"
    );


    svg.appendChild(axis);



    /* ======================================================
       CREATE POINTS
       ====================================================== */

    const points = [];


    data.forEach(
        (value, index) => {


            const x =
                margin.left +
                index *
                (
                    chartWidth / 9
                );


            const y =
                margin.top +
                chartHeight -
                (
                    value /
                    maxValue
                ) *
                chartHeight;


            points.push({
                x: x,
                y: y
            });


        }
    );



    /* ======================================================
       DRAW LINE
       ====================================================== */

    let pointsString = "";


    points.forEach(
        point => {

            pointsString +=
                `${point.x},${point.y} `;

        }
    );


    const polyline =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );


    polyline.setAttribute(
        "points",
        pointsString
    );


    polyline.setAttribute(
        "class",
        "chart-line"
    );


    svg.appendChild(
        polyline
    );



    /* ======================================================
       DRAW POINTS
       ====================================================== */

    points.forEach(
        (point, index) => {


            /*
                จุดของกราฟ
            */

            const circle =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "circle"
                );


            circle.setAttribute(
                "cx",
                point.x
            );


            circle.setAttribute(
                "cy",
                point.y
            );


            /*
                ปีที่เลือกให้ใหญ่กว่า
            */

            const radius =
                index + 1 === selectedYear
                    ? 7
                    : 5;


            circle.setAttribute(
                "r",
                radius
            );


            circle.setAttribute(
                "class",
                "chart-point"
            );


            svg.appendChild(
                circle
            );



            /*
                Label ปี
            */

            const yearLabel =
                document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                );


            yearLabel.setAttribute(
                "x",
                point.x
            );


            yearLabel.setAttribute(
                "y",
                height - 18
            );


            yearLabel.setAttribute(
                "text-anchor",
                "middle"
            );


            yearLabel.setAttribute(
                "class",
                "chart-label"
            );


            yearLabel.textContent =
                "ปีที่ " +
                (index + 1);


            svg.appendChild(
                yearLabel
            );

        }
    );

}



/* ==========================================================
   EVENT
   ========================================================== */


/*
    เมื่อเลื่อน Slider
*/

yearSlider.addEventListener(
    "input",
    updateDashboard
);



/*
    เมื่อเปลี่ยน Scenario
*/

scenario.addEventListener(
    "change",
    updateDashboard
);



/* ==========================================================
   START APPLICATION
   ========================================================== */


/*
    สร้างแปลง 100 ต้น
*/

createFarm();


/*
    โหลด Dashboard ครั้งแรก
*/

updateDashboard();
