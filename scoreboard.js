/** @format */

function loadScoreBoard({ newlyInsertedId }) {
  const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
  if (Array.isArray(leaderBoard)) {
    var template = document.createElement("template");
    const sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score);

    for (const record in sortedLeaderBoard) {
      const date = leaderBoard[record].date;
      const score = leaderBoard[record].score;
      const id = leaderBoard[record].id;
      template.innerHTML += `
      <div class="tableRow ${
        newlyInsertedId === id ? "activeRow" : ""
      }" id=${id}>
        <span> ${parseFloat(record) + parseFloat(1)}</span>
        <span> ${formatDate(new Date(date))}</span>
        <span> ${score}</span>
       </div> `;
    }
    document.querySelector("#table #tableBody").innerHTML = template.innerHTML;
    if (newlyInsertedId) {
      window.location.href = `#${newlyInsertedId}`;
    }
  }
}

function formatDate(date) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  return `
  ${hours.toString().length === 1 ? 0 : ''}${hours}:${minutes}:${seconds},
  ${day} ${monthNames[monthIndex]}`;
}
