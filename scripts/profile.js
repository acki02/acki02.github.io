
document.addEventListener("DOMContentLoaded", () => {
const GRAPHQL_ENDPOINT = "https://01.gritlab.ax/api/graphql-engine/v1/graphql";
const token = localStorage.getItem("token");

// console.log("Token:", token);


const userLogin = localStorage.getItem("username");
console.log("userLogin:", userLogin);

fetchName(token, GRAPHQL_ENDPOINT);+
fetchXP(token, GRAPHQL_ENDPOINT);
fetchAudit(token, GRAPHQL_ENDPOINT);
fetchAttempts(token, GRAPHQL_ENDPOINT, userLogin);




// logout functions
// --------------------------------------------------
const logOutButton = document.getElementById("logOutBtn");

function logOutFunc() {

  const logOutModal = document.getElementById("logOutModal");
  const logOutConfirm = document.getElementById("logOutConfirm");
  const closeLogOutModal = document.querySelector(".close");


  logOutModal.style.display = "flex";

  function onCloseClick() {

    logOutModal.style.display = "none";
    closeLogOutModal.removeEventListener("click", onCloseClick);
  }

  closeLogOutModal.removeEventListener("click", onCloseClick);
  closeLogOutModal.addEventListener("click", onCloseClick);

  logOutConfirm.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.href = "./index.html";
  });
}

logOutButton.addEventListener("click", () => {
  logOutFunc();
});
// --------------------------------------------------










});



