function getElapsedTime(overDate) {
  if (overDate.getUTCFullYear() - 1970 >= 1)
    return `${overDate.getUTCFullYear() - 1970}년`;
  if (overDate.getUTCMonth() - 1 >= 1) return `${overDate.getUTCMonth() - 1}월`;
  if (overDate.getUTCDate() - 1 >= 1) return `${overDate.getUTCDate() - 1}일`;
  if (overDate.getUTCHours() >= 1) return `${overDate.getUTCHours()}시간`;
  if (overDate.getUTCMinutes() >= 1) return `${overDate.getUTCMinutes()}분`;
  if (overDate.getUTCSeconds() >= 1) return `${overDate.getUTCSeconds()}초`;
  return "방금";
}

function renderData(data) {
  const list = document.querySelector("main>.wrapper");

  data.forEach((obj) => {
    const item = document.createElement("li");
    list.appendChild(item);
    item.className = "item";
    const overDate = new Date(new Date().getTime() - obj.insertAt);

    // 이미지 추가는 일단 생략
    item.innerHTML = `<img
      src="https://th.bing.com/th/id/OIP.JWQUUG1FfHqOEGA5vrvj4AHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7"
      alt="대충 레깅스 사진"
      class="image"
    />
    <div class="contents">
      <div class="title">${obj.title}</div>
      <div class="sub-info">
        <span class="location">${obj.place}</span>
        <span>·</span>
        <span class="time">${getElapsedTime(overDate)} 전</span>
      </div>
      <div class="price">${obj.price.toLocaleString("ko-KR")}원</div>
      <div class="comunity">
        <div class="forum">
          <span class="material-icons-outlined icon"> forum </span>
          <span class="count">5252</span>
        </div>
        <div class="favorite">
          <span class="material-icons-outlined icon">
            favorite_border
          </span>
          <span class="count">1004</span>
        </div>
      </div>
    </div>`;
  });
}

async function fetchList() {
  const res = await fetch("/items");
  const data = await res.json();

  console.log(data);
  renderData(data);
}

fetchList();
