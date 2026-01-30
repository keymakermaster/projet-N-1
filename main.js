const koreaTimeElement = document.getElementById('korea-time');
const usaTimeElement = document.getElementById('usa-time');

function updateTimes() {
  const now = new Date();

  // Korea Time (KST)
  const koreaTimeString = now.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  koreaTimeElement.textContent = koreaTimeString;

  // USA Time (New York - EST/EDT)
  const usaTimeString = now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  usaTimeElement.textContent = usaTimeString;
}

// Update the times every second
setInterval(updateTimes, 1000);

// Initial call to display times immediately
updateTimes();
