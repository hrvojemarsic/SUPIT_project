var message1 = ["Budi izvrstan u onome što "];
var message2 = ["vidiš.", "voliš."];
var message3 = ["ZAISKRI"];

var msgIndex1 = 0;
var msgIndex2 = 0;
var msgIndex3 = 0;

var index = 0;
var interval;

var txt1 = document.querySelector("#text1");
var txt2 = document.querySelector("#text2");
var txt3 = document.querySelector("#text3");
var crsr1 = document.querySelector("#cursor1");
var crsr2 = document.querySelector("#cursor2");

function Typing() {
  crsr2.style.display = "none";
  var txt = message1[0].substring(0, msgIndex1 + 1);
  txt1.innerHTML = txt;
  msgIndex1++;

  if (msgIndex1 == 26) {
    clearInterval(interval);
    setTimeout(() => {
      interval = setInterval(TypingSecondPart, 100);
    }, 0);
  }
}

function DeleteMessage() {
  if (index == 0) {
    var txt = message2[0].substring(0, msgIndex2 - 1);
    txt2.innerHTML = txt;
    msgIndex2--;
  }

  if (txt === "") {
    index++;
    setTimeout(() => {
      crsr1.style.display = "inline-block";
      interval = setInterval(TypingSecondPart, 100);
    }, 200);
  }
}

function TypingSecondPart() {
  var txt = message2[index].substring(0, msgIndex2 + 1);
  txt2.innerHTML = txt;
  msgIndex2++;

  if (txt === message2[0]) {
    crsr1.style.display = "none";
    clearInterval(interval);
    setTimeout(() => {
      interval = setInterval(DeleteMessage, 50);
    }, 1000);
  }

  if (txt === message2[1]) {
    clearInterval(interval);
    setTimeout(() => {
      crsr1.style.display = "inline-block";
      crsr2.style.display = "inline-block";
      interval = setInterval(TypingThirdPart, 100);
    }, 200);
  }
}

function TypingThirdPart() {
  crsr1.style.display = "none";
  var txt = message3[0].substring(0, msgIndex3 + 1);
  txt3.innerHTML = txt;
  msgIndex3++;

  if (txt === message3[0]) {
    return;
  }
}

interval = setInterval(Typing, 100);
