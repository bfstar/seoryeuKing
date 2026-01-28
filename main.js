const $ = (id) => document.getElementById(id);

const fields = {
  templateType: $("templateType"),
  name: $("name"),
  date: $("date"),
  recipient: $("recipient"),
  title: $("title"),
  background: $("background"),
  event: $("event"),
  absenceDate: $("absenceDate"),
  club: $("club"),
  reason: $("reason"),
  details: $("details"),
  plan: $("plan"),
  strengths: $("strengths"),
  experience: $("experience"),
  goal: $("goal"),
  contact: $("contact"),
};

const result = $("result");
const suggestionsBox = $("suggestions");
const submitStatus = $("submitStatus");

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgokjrnr";

const sentenceBank = {
  intro: [
    "새로운 환경에서도 빠르게 적응하며 협업하는 편입니다.",
    "꾸준히 배우고 기록하며 성장하는 태도를 중요하게 생각합니다.",
    "작은 약속을 지키는 성실함이 가장 큰 장점입니다.",
  ],
  reason: [
    "불가피한 일정으로 인해 사전에 충분히 공유하지 못했습니다.",
    "업무 조율 과정에서 제 판단이 미흡했습니다.",
    "앞으로는 일정 공유와 준비 시간을 더 철저히 확보하겠습니다.",
  ],
  reflection: [
    "제 행동이 주변에 불편을 줄 수 있다는 점을 늦게 인지했습니다.",
    "같은 일이 반복되지 않도록 체크리스트를 만들겠습니다.",
    "책임을 회피하지 않고 끝까지 개선하겠습니다.",
  ],
  absence: [
    "컨디션 난조로 충분한 휴식이 필요했습니다.",
    "진료 및 치료로 인해 등교가 어려웠습니다.",
    "수업 내용을 확인하고 보충 학습을 진행하겠습니다.",
  ],
  club: [
    "협업을 통해 의미 있는 결과물을 만드는 과정에 끌립니다.",
    "프로젝트 경험을 쌓으며 팀에 기여하고 싶습니다.",
    "정기적인 활동에 성실히 참여하겠습니다.",
  ],
};

const templateTitles = {
  intro: "자기소개서",
  reason: "사유서",
  reflection: "반성문",
  absence: "결석 사유서",
  club: "동아리 지원서",
};

const formatKoreanDate = (value) => {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${y}년 ${m}월 ${d}일`;
};

const getValue = (field) => field.value.trim();

const buildIntro = () => {
  const name = getValue(fields.name) || "홍길동";
  const background = getValue(fields.background);
  const strengths = getValue(fields.strengths);
  const experience = getValue(fields.experience);
  const goal = getValue(fields.goal);
  const details = getValue(fields.details);

  const lines = [
    templateTitles.intro,
    "",
    `안녕하세요. ${name}입니다.`,
  ];

  if (background) lines.push(`저는 ${background} 소속입니다.`);
  if (strengths) lines.push(`저의 강점은 ${strengths}입니다.`);
  if (experience) lines.push(`관련 경험으로는 ${experience}가 있습니다.`);
  if (details) lines.push(details);
  if (goal) lines.push(`앞으로 ${goal}를 목표로 꾸준히 성장하겠습니다.`);
  lines.push("감사합니다.");

  return lines.join("\n");
};

const buildReason = () => {
  const title = getValue(fields.title) || templateTitles.reason;
  const recipient = getValue(fields.recipient) || "담당자";
  const event = getValue(fields.event) || "관련 사항";
  const reason = getValue(fields.reason);
  const details = getValue(fields.details);
  const plan = getValue(fields.plan);
  const date = formatKoreanDate(fields.date.value);
  const name = getValue(fields.name) || "작성자";

  const lines = [
    title,
    "",
    `수신: ${recipient}`,
    date ? `작성일: ${date}` : null,
    "",
    `본인은 ${event}와 관련하여 다음과 같은 사유를 제출합니다.`,
    reason || "사유를 간단히 정리해 작성했습니다.",
  ].filter(Boolean);

  if (details) lines.push(details);
  if (plan) lines.push(`재발 방지 및 개선 계획: ${plan}`);
  lines.push("", `${name} 드림`);

  return lines.join("\n");
};

const buildReflection = () => {
  const event = getValue(fields.event) || "해당 상황";
  const details = getValue(fields.details);
  const plan = getValue(fields.plan);
  const date = formatKoreanDate(fields.date.value);
  const name = getValue(fields.name) || "작성자";

  const lines = [
    templateTitles.reflection,
    "",
    date ? `${date}에 발생한 ${event}에 대해 깊이 반성합니다.` : `${event}에 대해 깊이 반성합니다.`,
    details || "상황을 정확히 인지하지 못한 책임이 제게 있습니다.",
    plan ? `개선 약속: ${plan}` : "앞으로 동일한 문제가 발생하지 않도록 주의하겠습니다.",
    "",
    name,
  ];

  return lines.join("\n");
};

const buildAbsence = () => {
  const recipient = getValue(fields.recipient) || "담임 선생님";
  const name = getValue(fields.name) || "학생";
  const background = getValue(fields.background);
  const absenceDate = formatKoreanDate(fields.absenceDate.value) || formatKoreanDate(fields.date.value);
  const reason = getValue(fields.reason);
  const plan = getValue(fields.plan);

  const lines = [
    templateTitles.absence,
    "",
    `수신: ${recipient}`,
    `학생: ${name}${background ? ` (${background})` : ""}`,
    absenceDate ? `결석일: ${absenceDate}` : "결석일:",
    `사유: ${reason || "사유를 간단히 작성해주세요."}`,
  ];

  if (plan) lines.push(`보완 계획: ${plan}`);

  return lines.join("\n");
};

const buildClub = () => {
  const name = getValue(fields.name) || "지원자";
  const club = getValue(fields.club) || "동아리";
  const reason = getValue(fields.reason);
  const strengths = getValue(fields.strengths);
  const experience = getValue(fields.experience);
  const plan = getValue(fields.plan);
  const contact = getValue(fields.contact);

  const lines = [
    templateTitles.club,
    "",
    `지원 동아리: ${club}`,
    `지원자: ${name}`,
    "",
    `지원 동기: ${reason || "해당 분야에 대한 관심과 열정이 있습니다."}`,
    strengths ? `역량: ${strengths}` : null,
    experience ? `경험: ${experience}` : null,
    plan ? `활동 계획: ${plan}` : null,
    contact ? `연락처: ${contact}` : null,
  ].filter(Boolean);

  return lines.join("\n");
};

const builders = {
  intro: buildIntro,
  reason: buildReason,
  reflection: buildReflection,
  absence: buildAbsence,
  club: buildClub,
};

const renderSuggestions = () => {
  const key = fields.templateType.value;
  const list = sentenceBank[key];
  suggestionsBox.innerHTML = "";
  list.forEach((sentence) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "suggestion";
    btn.textContent = sentence;
    btn.addEventListener("click", () => {
      const current = fields.details.value.trim();
      fields.details.value = current ? `${current}\n${sentence}` : sentence;
    });
    suggestionsBox.appendChild(btn);
  });
};

const hasAnyInput = () => {
  return Object.entries(fields).some(([key, field]) => {
    if (key === "templateType") return false;
    return field.value.trim();
  });
};

const renderResult = () => {
  if (!hasAnyInput()) {
    result.innerHTML = '<p class="placeholder">입력 후 문장 생성을 눌러주세요.</p>';
    return;
  }
  const type = fields.templateType.value;
  const builder = builders[type];
  const content = builder();
  result.textContent = content;
};

const resetAll = () => {
  Object.values(fields).forEach((field) => {
    if (field.tagName === "SELECT") {
      field.selectedIndex = 0;
    } else {
      field.value = "";
    }
  });
  initDates();
  renderSuggestions();
  result.innerHTML = '<p class="placeholder">입력 후 문장 생성을 눌러주세요.</p>';
};

const copyResult = async () => {
  const text = result.textContent.trim();
  if (!text) return;
  await navigator.clipboard.writeText(text);
};

const downloadPdf = () => {
  const text = result.textContent.trim();
  if (!text) return;
  const content = text.replace(/\n/g, "<br>");
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(`\n    <!doctype html>\n    <html lang=\"ko\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <title>문서 PDF</title>\n        <style>\n          body { font-family: \"Nanum Myeongjo\", serif; padding: 40px; line-height: 1.7; }\n          h1 { font-size: 20px; margin-bottom: 24px; }\n        </style>\n      </head>\n      <body>${content}</body>\n    </html>\n  `);
  win.document.close();
  win.focus();
  win.print();
};

const downloadTxt = () => {
  const text = result.textContent.trim();
  if (!text) return;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${templateTitles[fields.templateType.value]}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const submitForm = async () => {
  const text = result.textContent.trim();
  if (!text) return;
  submitStatus.textContent = "전송 중...";
  try {
    const payload = {
      templateType: fields.templateType.value,
      name: getValue(fields.name),
      date: fields.date.value,
      recipient: getValue(fields.recipient),
      title: getValue(fields.title),
      background: getValue(fields.background),
      event: getValue(fields.event),
      absenceDate: fields.absenceDate.value,
      club: getValue(fields.club),
      reason: getValue(fields.reason),
      details: getValue(fields.details),
      plan: getValue(fields.plan),
      strengths: getValue(fields.strengths),
      experience: getValue(fields.experience),
      goal: getValue(fields.goal),
      contact: getValue(fields.contact),
      result: text,
    };
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("submit failed");
    submitStatus.textContent = "전송 완료! 감사합니다.";
  } catch (err) {
    submitStatus.textContent = "전송에 실패했습니다. 다시 시도해주세요.";
  }
};

const initDates = () => {
  const today = new Date();
  const toInput = (d) => d.toISOString().slice(0, 10);
  fields.date.value = toInput(today);
};

fields.templateType.addEventListener("change", () => {
  renderSuggestions();
  renderResult();
});

$("applyTemplate").addEventListener("click", renderResult);
$("resetAll").addEventListener("click", resetAll);
$("copyResult").addEventListener("click", copyResult);
$("downloadTxt").addEventListener("click", downloadTxt);
$("downloadPdf").addEventListener("click", downloadPdf);
$("submitForm").addEventListener("click", submitForm);

initDates();
renderSuggestions();
renderResult();

Object.values(fields).forEach((field) => {
  const eventName = field.tagName === "SELECT" ? "change" : "input";
  field.addEventListener(eventName, renderResult);
});
