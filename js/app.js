const firebaseConfig = {
    apiKey: "AIzaSyDbtnjDKjCjwqjlBrKGT90oJ3sxWvznHtw",
    authDomain: "grimdev-b19a4.firebaseapp.com",
    databaseURL: "https://grimdev-b19a4-default-rtdb.firebaseio.com",
    projectId: "grimdev-b19a4",
    storageBucket: "grimdev-b19a4.appspot.com",
    messagingSenderId: "824367308466",
    appId: "1:824367308466:web:5a6baa6a4c8b0cac22f3ab",
    measurementId: "G-CE127YXYQ3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.database().ref('quiz');
var finish = false;
const ele = document.getElementsByName('quizz');

function ready() {
    localStorage.clear();
    var page = document.getElementById('num').innerHTML;
    setquiz(page);
    start();
}

var elem = document.getElementById('msec');

function setquiz(num) {
    console.log(num)
    // firebase.database().ref('quiz').on('value', (a)=>{console.log(a.val().1)})
    db.child(num).once('value', (a) => {
        document.getElementById("ques").innerHTML = a.val().q;
        let array = a.val().opt.split(',');
        for (let i = 1; i < 5; i++) {
            document.getElementById(i).innerHTML = array[i - 1];

        }

        // for (i = 0; i < ele.length; i++) {
        //     if (ele[i].checked) {
        //         localStorage.setItem(num, )
        //     }
        // }

    })
}


function compile(num) {
    // console.log(num)
    db.child(num).once('value', (a) => {
        document.getElementById("ques").innerHTML = a.val().q;
        let array = a.val().opt.split(',');
        for (let i = 1; i < 5; i++) {
            document.getElementById(i).innerHTML = array[i - 1];
            // console.log(array[a.val().ans])
            // console.log(document.querySelector('input[name="answer5"]:checked').innerHTML)

        }
        ele[a.val().ans].style.border = "3px solid green";
        // console.log(array[a.val().ans])
        // console.log(document.querySelector('input[name="answer5"]:checked').innerHTML)
    })

    finish = true;
    total();
    document.getElementById("res").style.display = 'block';

}

function total() {
    let score = 0;
    // let tobj=
    // console.log(tobj)
    for (let i = 1; i < 11; i++) {
        db.child(i).once('value', (a) => {
            console.log(localStorage.getItem(i) == a.val().ans)
            if (localStorage.getItem(i) == a.val().ans) {
                score += 1;
                console.log(score);
                document.getElementById("score").innerHTML = score;
            }
        })
    }
}


function start() {
    let m = document.getElementById("m");
    let s = document.getElementById("s");


    setInterval(() => {
        let min = parseInt(m.innerHTML);
        let sec = parseInt(s.innerHTML);

        s.innerHTML = (sec -= 1);
        if (sec < 1) {
            m.innerHTML = (min -= 1);
            document.getElementById("sc").style.display="none"
            s.innerHTML = 59;
        }

        if (min < 1 && sec < 1) {
            document.getElementById("time").innerHTML = "Time Up";
        }

        if(min<10){
            document.getElementById("hc").style.display="inline-block"
            
        }
        if(sec<10 && sec>0){
            document.getElementById("sc").style.display="inline-block"
        }// }else{
        //     document.getElementById("sc").style.display="none"
        // }
    }, 1000);
}

ready();

function save(id) {
    console.log(id);
    let tnum = document.getElementById('num');
    localStorage.setItem(tnum.innerHTML, id);
    //    let tnum = document.getElementById('num');

    // if(localStorage.length==1){
    //     localStorage.setItem("mine", JSON.stringify(obj));
    // }
    // else{
    //     localStorage.setItem("mine", JSON.stringify(Object.assign(JSON.parse(localStorage.getItem("mine")), obj)));
    // }
}


function next() {
    let ele = document.getElementsByName('quizz');
    let tnum = document.getElementById('num');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            ele[i].checked = false;
        }
    }
    tnum.innerHTML = parseInt(tnum.innerHTML) + 1;

    if (finish) {
        ele[0].style.border = "1px solid grey";
        ele[1].style.border = "1px solid grey";
        ele[2].style.border = "1px solid grey";
        ele[3].style.border = "1px solid grey";
        compile(tnum.innerHTML);
    }
    else { setquiz(tnum.innerHTML) };

}
function prev() {
    let tnum = document.getElementById('num');
    if (tnum.innerHTML > 1) tnum.innerHTML = parseInt(tnum.innerHTML) - 1;
    if (finish) {
        ele[0].style.border = "1px solid grey";
        ele[1].style.border = "1px solid grey";
        ele[2].style.border = "1px solid grey";
        ele[3].style.border = "1px solid grey";
        compile(tnum.innerHTML);
    }
    else { setquiz(tnum.innerHTML) }
}

