// (너가 올린 메인 코드 파일) 수정본
import { getData, dataLoading } from "./model.js";
import { uiWorks, chatBot } from "./main.js";
import fire from "./firebase-init.js";

getData("./assets/data/data.json").then(async (res) => {
  let prd = await dataLoading(res.projects);
  const cont01Prd = document.querySelector(".cont01 .projects");

  prd.forEach((p) => {
    const hashesHtml = (p.hashes || []).map((e) => ` <span>#${e}</span> `).join("");

    const art = document.createElement("article");
    art.className = "project";

    art.setAttribute("data-month", p.month);
    art.setAttribute("data-year", p.year);
    art.setAttribute("data-cat", p.company);
    art.setAttribute("data-main", p.cat);
    art.setAttribute("data-hasy", (p.hashes || []).join(","));
    art.setAttribute("data-cat2", p.path); // 여기 값을 “Firestore 문서 ID”로 쓸 거면, Firestore doc.id가 p.path여야 함

    art.innerHTML = `
      <div class="image" style="background:url('${p.icon}') #fff no-repeat center left; background-size:contain">projects image</div>
      <div class="texts">
        <h3>${p.name}</h3>
        <h4>${hashesHtml}</h4>
        <div class="months">${p.month}</div>
        <div class="stmonth">1</div>
      </div>
    `;

    cont01Prd.append(art);

    // 나중에 ranks에 넣을 때 쓰기 위해 "표시용" hashes를 따로 저장
    p.hashesHtml = hashesHtml;
  });

  let prj = Array.from(document.querySelectorAll(".project"));

  prj.forEach((el) => {
    el.addEventListener("click", async () => {
      const projectId = el.dataset.cat2;

      // 여기서 안 올라간다면 대부분 두 가지야:
      // 1) projectId가 Firestore 문서 ID가 아니라서, 엉뚱한 문서에 쓰거나(새 문서 생김), 규칙에 막힘
      // 2) Firestore 보안 규칙(permission-denied) 또는 clicks 타입 문제로 업데이트 실패

      await fire.cntUpdate("projects", projectId, "clicks");
    });
  });

  // 랭킹은 “로컬에 존재하는 프로젝트만” 골라서 1~5로 다시 매기기
  fire.startRanking(20, (rank) => {
    const ranks = document.querySelector(".ranks");
    ranks.innerHTML = "";

    let shown = 0;

    for (const e of rank) {
      if (shown >= 5) break;

      const matchPrd = prd.find((el) => el.path === e.id);
      if (!matchPrd) continue;

      shown += 1;

      const ele = document.createElement("p");
      ele.innerHTML = `
        <i>${shown}</i>
        <span>${matchPrd.name}</span>
        <span>${(e.clicks ?? 0)}회</span>
      `;

      ele.setAttribute("data-name", matchPrd.name);
      ele.setAttribute("data-year", matchPrd.year);
      ele.setAttribute("data-company", matchPrd.company);
      ele.setAttribute("data-month", matchPrd.month);
      ele.setAttribute("data-path", matchPrd.path);
      ele.setAttribute("data-goal", matchPrd.goal);
      ele.setAttribute("data-hashes", matchPrd.hashesHtml || "");

      ranks.append(ele);
    }
  });

  return uiWorks(prd);
});



getData("./assets/data/que.json").then(async (res) => {
  let prd = await dataLoading(res.questions);
  const resQue = document.querySelector(".robot-response .others");

  prd.forEach((e) => {
    resQue.innerHTML += `<span>${e.que}</span>`;
  });

  return chatBot(prd);
});

// 방문자 카운트
fire.cntUpdate("stats", "visits");

// 방문자수 표시
fire.getVisit((data) => {
  if (!data) return;

  const dts = document.querySelectorAll(".cnts p");
  const cat = ["total", "today"];

  dts.forEach((e, i) => {
    const dt = data[cat[i]] ?? 0;

    e.querySelector(".val").textContent = `${dt}명`;

    const icons = e.querySelector(".icons");
    icons.innerHTML = ""; // 이거 없으면 onSnapshot 때문에 계속 누적됨

    String(dt).split("").forEach(() => {
      const ele = document.createElement("i");
      icons.append(ele);
    });
  });
});

// npm 다운로드
const today = new Date().toISOString().slice(0, 10);
const packages = [
  { name: "scss-cleans", id: "scss-cleans-count", start: "2023-10-18" },
  { name: "style-crawl", id: "style-crawl-count", start: "2024-01-01" },
];

packages.forEach((pkg) => {
  const url = `https://api.npmjs.org/downloads/point/${pkg.start}:${today}/${pkg.name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const dwNum = Number(data.downloads) || 0;
      const dw = dwNum.toLocaleString();
      const pkname = String(data.package || "");

      const sp = document.createElement("p");
      sp.innerHTML = `
        <a href="https://www.npmjs.com/package/${pkname}" target="_blank">
          <span>${pkname}</span>
          <span>${dw}</span>
          <span class="prog"><i></i></span>
        </a>
      `;

      document.querySelector(".hdr-exp .npm").append(sp);
      sp.querySelector("i").style.width = `${Math.min(dwNum / 10, 100)}%`;
    })
    .catch(() => {});
});
