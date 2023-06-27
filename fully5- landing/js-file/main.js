// function for all active
function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}
// ----------------

let settingBox = document.querySelector(".setting-box .fa-gear");
settingBox.onclick = function () {
  // adding class "fa-spin"
  this.classList.toggle("fa-spin");
  // adding class open
  document.querySelector(".setting-box").classList.toggle("open");
};

// ----------------------------------------------------------------

// هنا انا بثبت اللون واخليه يتضاف للوكال ستوريج لما بتدوس عليه يعني لو  عملت ريفريش هيفضل اللون ال اختارته
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main--color", mainColor);

  // remove active from class list li
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataset.color === mainColor) {
      // add active for chosen li
      element.classList.add("active");
    }
  });
}

// to change color page by click on any color from settings box
let colorList = document.querySelectorAll(".color-list li");
colorList.forEach((li) => {
  li.addEventListener("click", (el) => {
    // set color in root
    document.documentElement.style.setProperty(
      "--main--color",
      el.target.dataset.color //dataset.color (from html) data-color ""
    );

    // set  color in local storage
    localStorage.setItem("color_option", el.target.dataset.color);

    // remove active class from all li and add it by handleactive
    handleActive(el);
  });
});

/*
ال عملته ف لوكال ستوريج باختصار
اني ف الأول بسأله عندك قيمة باسم كولور اوبشن؟
فلو قالي لأ معنديش 
فهقوله خلاص ضيفلي قيمة ف الماين كولور اسمها كولور اوبشن..

وبعدين هنزل تحت اضيف قيمة الكولور اوبشن بإني هقوله سيت ايتيمز  اسمها كولور أوبشن بالألوان الموجودة
ف الداتا سيت كولور
*/
let backRandom = document.querySelectorAll(".random-background span");
let backgroundOption = true;
let backgroundInterval;
let localBackRandom = localStorage.getItem("background_option");

if (localBackRandom !== null) {
  backRandom.forEach((element) => {
    element.classList.remove("active");
  });

  if (localBackRandom === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;

    document.querySelector(".random-background .no").classList.add("active");
  }
}
// --------------------
let randomBack = document.querySelectorAll(".random-background span");

randomBack.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.back === "yes") {
      backgroundOption = true;
      ranfomizeBackground();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
// --------------------------------------------------------------------------------------------
// change background imgs

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.JPG.jpg", "02.JPG.jpg", "03.JPG.jpg", "04.JPG.jpg"];

function ranfomizeBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 1000);
  }
}
ranfomizeBackground();

// ------------------------------------------------------

// skill section

// select skill section
let skillSection = document.querySelector(".skill-section");

// on scroll section

window.onscroll = function () {
  // skill offSeTop
  let skillOfSetTop = skillSection.offsetTop;

  // skill offsetHeight
  let skillOuterHeight = skillSection.offsetHeight;

  // window.innerHeight
  let windowInner = window.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop >= skillOfSetTop + skillOuterHeight - windowInner) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup img
let ourGallery = document.querySelectorAll(".imgs-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let textImgs = document.createTextNode(img.alt);
      imgHeading.appendChild(textImgs);
      popupBox.appendChild(imgHeading);
    }

    let popupImgs = document.createElement("img");
    popupImgs.src = img.src;

    popupBox.appendChild(popupImgs);

    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

// close by using closing span
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    document.querySelector(".popup-box").remove();

    document.querySelector(".popup-overlay").remove();
  }
});
// closing by using escape on keyboard
document.onkeydown = function (e) {
  // console.log(e.key);
  if (e.key === "Escape") {
    document.querySelector(".popup-box").remove();

    document.querySelector(".popup-overlay").remove();
  }
};
// ------------------------------------------------

// active links and bullets

// sellct bullet
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select links
let allLinks = document.querySelectorAll(".links a");

function moveSomeWhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
moveSomeWhere(allBullets);
moveSomeWhere(allLinks);

// -------------------------------------------------------------------------------

// active bullet in settings option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletContainer.style.display = "block";
      localStorage.setItem("bullets_option", "yes");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "no");
    }
    handleActive(e);
  });
});

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "yes") {
    bulletContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

// ------------------------

// reset button
let buttonReset = document.querySelector(".reset-all-settings");

buttonReset.onclick = function () {
  // localStorage.clear(); //or

  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};
// --------------------------------------------------------------------

// toogle menue
let toogleBtn = document.querySelector(".toogle-menue");
let tLinks = document.querySelector(".links");

toogleBtn.onclick = function (e) {
  e.stopPropagation(); //شان لما ادوس على اي حتة ف التوجل يفتح ولو مضفتهاش لازم ادوس على السبان نفسها
  toogleBtn.classList.toggle("menue-active");
  tLinks.classList.toggle("open");
};

// click anywhere to close toogle menue
document.addEventListener("click", (e) => {
  if (e.target !== toogleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toogleBtn.classList.toggle("menue-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation(); //لو معملتش الخطوة دي التوجل هيقفل لو دوست جوا التوجل مينيو
};

// ---------------------------------------------------------
// ------------------------------------------------- for learning-------------------------

/*
// create popup img
let ourGallery = document.querySelectorAll(".imgs-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");

    // create class on this element
    overlay.className = "popup-overlay";

    // adding this element on body
    document.body.appendChild(overlay);

    // create element for popup box
    let popupBox = document.createElement("div");

    // create class
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // adding heading text when img open
      let imgHeading = document.createElement("h3");

      // adding text
      let imgText = document.createTextNode(img.alt);

      // adding text in heading
      imgHeading.appendChild(imgText);

      // adding imgHeading in popup box
      popupBox.appendChild(imgHeading);
    }

    // create imgs box
    let popupImgs = document.createElement("img");

    // create popupImgs source
    popupImgs.src = img.src;

    // adding imgs in popup box
    popupBox.appendChild(popupImgs);

    // adding popup box to body
    document.body.appendChild(popupBox);

    // create close span
    let closeButton = document.createElement("span");

    // create text for span button
    let textButton = document.createTextNode("X");

    // appen text to close button
    closeButton.appendChild(textButton);

    // adding class to close button
    closeButton.className = "close-button";

    // adding close button to popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove to current popup
    document.querySelector(".popup-box ").remove();
    // e.target.parentNode.remove() // another solution to remove popup box

    // remove overlay popup
    document.querySelector(".popup-overlay").remove();
  }
});
*/

// ---------------------------------------------------------

/*
button is used to scroll to top
*/
let btn2 = document.querySelector(".scroll-up");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 200) {
    btn2.style.display = "block";
  } else {
    btn2.style.display = "none";
  }
});

btn2.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// ---------------------------------------------------------------------
