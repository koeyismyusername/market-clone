function getElapsedTime(overDate) {
  if (overDate.getUTCFullYear() - 1970 >= 1)
    return `${overDate.getUTCFullYear() - 1970}년 전`;
  if (overDate.getUTCMonth() - 1 >= 1)
    return `${overDate.getUTCMonth() - 1}월 전`;
  if (overDate.getUTCDate() - 1 >= 1)
    return `${overDate.getUTCDate() - 1}일 전`;
  if (overDate.getUTCHours() >= 1) return `${overDate.getUTCHours()}시간 전`;
  if (overDate.getUTCMinutes() >= 1) return `${overDate.getUTCMinutes()}분 전`;
  if (overDate.getUTCSeconds() >= 1) return `${overDate.getUTCSeconds()}초 전`;
  return "방금 전";
}

function renderData(data) {
  const list = document.querySelector("main>.wrapper");

  data.forEach(async (obj) => {
    const item = document.createElement("li");
    list.appendChild(item);
    item.className = "item";
    const overDate = new Date(new Date().getTime() - obj.insertAt);

    let url = await fetch(`images/${obj.itemID}`)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));

    // 이미지 추가는 일단 생략
    item.innerHTML = `<img
      src="${url}"
      alt=""
      class="image"
    />
    <div class="contents">
      <div class="title">${obj.title}</div>
      <div class="sub-info">
        <span class="location">${obj.place}</span>
        <span>·</span>
        <span class="time">${getElapsedTime(overDate)}</span>
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
  renderData(data);
}

fetchList();
