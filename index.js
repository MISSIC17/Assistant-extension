//***some assignments required */
var toDoListArr = [];
var notesArr = [];
var current = "to-do-list";
const toDoListAddBtn = document.getElementById("to-do-list-add-btn");
const notesAddBtn = document.getElementById("notes-add-btn");

const prevList = JSON.parse(localStorage.getItem("to-do-list"));
if (prevList) {
  toDoListArr = prevList;
  renderList("to-do-list", toDoListArr);
}
const prevNotes = JSON.parse(localStorage.getItem("notes"));
if (prevNotes) {
  notesArr = prevNotes;
  renderList("notes", notesArr);
}
window.addEventListener('load', (event) => {
  document.getElementById(`to-do-list-value`).focus();

});


//*****adding lists functionality*****
toDoListAddBtn.addEventListener("click", () => {
  addList("to-do-list", toDoListArr,65);
});
document.querySelector('#to-do-list-value').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addList("to-do-list", toDoListArr,65);
      document.getElementById('to-do-list-value').focus()
      
    }
});

notesAddBtn.addEventListener("click", () => {
  addList("notes", notesArr,138);
});
document.getElementById("notes-value").addEventListener("keyup", ({ key }) => {
  if (key === "Insert") {
    addList("notes", notesArr,138);
  }
});

function addList(type, typeArr,size) {
  var listValue = document.getElementById(`${type}-value`).value;
  if (listValue != "") {
    typeArr.push(listValue);
    localStorage.setItem(`${type}`, JSON.stringify(typeArr));
    document.getElementById(`${type}-value`).value = "";
    renderList(type, typeArr);
    strikeNdel(type, typeArr);    
    var forScroll = document.getElementById(`${type}-list`);
    forScroll.scroll(0,size+forScroll.scrollTop);
    document.getElementById(`${type}-value`).focus();

  }
}

// ***deleting functionlity***
delTotalList("to-do-list", toDoListArr);
function delTotalList(type, typeArr) {
  document.getElementById(`${type}-clear-btn`).addEventListener("click", () => {
    document.getElementById(`${type}-list`).innerHTML = "";
    typeArr.splice(0, typeArr.length);
    localStorage.setItem(`${type}`, null);
    localStorage.removeItem(`${type}`);
  });
}
/** rendering lists */
function renderList(type, typeArr) {
  var toInsert = "";
  for (var i = 0; i < typeArr.length; i++) {
    toInsert += `
        <div class='${type}-component' id="${i + 1}${type}-component">        
            <div class="${type}-item">
                <div class="${type}-number">     ${i + 1}     </div>
                <div class="${type}-main">${typeArr[i]}</div>
            </div> 
            <button class="${type}-Check  hover:text-red-700" id="${type}-Check-${i + 1}">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
            </button>
        </div>        
        `;
  }
  console.log("hello from render");

  document.getElementById(`${type}-list`).innerHTML = toInsert;
}

// *** striking the list item functionality ***
strikeNdel("to-do-list", toDoListArr);
strikeNdel("notes", notesArr);

function strikeNdel(type, typeArr) {
  document.querySelectorAll(`.${type}-Check`).forEach((item) => {
    item.addEventListener("click", () => {
      var toStrike = document.getElementById(item.id);
      toStrike.parentElement.firstElementChild.classList.add(
        "line-through",
        "transition-all",
        "bg-red-600"
      );
      var typeId = toStrike.parentElement.id.toString();
      var typeIdNo = parseFloat(typeId);
      setTimeout(() => {
        typeArr.splice(typeIdNo - 1, 1);
        renderList(type, typeArr);
        strikeNdel(type, typeArr);
        localStorage.setItem(`${type}`, JSON.stringify(typeArr));
      }, 250);
    });
  });
}
// ***switching between the functionalitites***
const goToNotes = document.getElementById("goto-notes");
const goToList = document.getElementById("goto-to-do-list");
const functionality = document.getElementById("functionality-wrapper");
goToNotes.addEventListener("click", () => {
  animateFunctionality(-90, "notes");
});
goToList.addEventListener("click", () => {
  animateFunctionality(0, "to-do-list");
});
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "37") {
    // left arrow
    if (current === "notes") {
      animateFunctionality(0, "to-do-list");
    }
  } else if (e.keyCode == "39") {
    // right arrow
    if (current === "to-do-list") {
      animateFunctionality(-90, "notes");
    }
  }
}
function animateFunctionality(degree, goto) {
  current = goto;
  document.getElementById(`${goto}-value`).focus();
  functionality.animate([{ transform: `rotateY(${degree}deg)` }], {
    duration: 500,
    easing: "ease-out",
    iterations: 1,
    fill: "forwards",
  });
}
// /* overlown part*/
// const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
//   return scrollHeight > clientHeight || scrollWidth > clientWidth;
// }
// document.querySelector('#notes-value').addEventListener('keypress', function (e) {
  
  //   if (e.key === 'Alt') {
  //     e.preventDefault();
  //     addList("notes", notesArr,138);
      
  //   }
  // });
  //window.location.hash = `#${goto}-value`;  
