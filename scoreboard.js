/** @format */

function loadScoreBoard() {
  const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
  if (Array.isArray(leaderBoard)) {
    var template = document.createElement("template");
    const sortedLeaderBoard = leaderBoard.sort((a, b) => b.score - a.score);

    for (const record in sortedLeaderBoard) {
      const date = new Date(leaderBoard[record].date);
      template.innerHTML += `
      <div class="tableRow">
        <span> ${parseFloat(record) + parseFloat(1)}</span>
        <span> ${formatDate(date)}</span>
        <span> ${leaderBoard[record].score}</span>
       </div> `;
    }
    document.querySelector("#table #tableBody").innerHTML = template.innerHTML;
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
  ${hours.toString().length === 1 ? `0${hours}` : hours}:${minutes}:${seconds},
  ${day} ${monthNames[monthIndex]}`;
}
