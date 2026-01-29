const $ = (id) => document.getElementById(id);

const fields = {
  templateType: $("templateType"),
  templateSearch: $("templateSearch"),
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
const templateList = $("templateList");
const templateCount = $("templateCount");

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
  default: [
    "핵심 내용 위주로 간결하게 정리했습니다.",
    "사실 관계를 기준으로 명확하게 작성했습니다.",
    "필요한 정보만 담아 제출용 문서로 구성했습니다.",
  ],
};

const templateCatalog = [
  { id: "intro", title: "자기소개서", tags: ["자기소개", "지원"] },
  { id: "reason", title: "사유서", tags: ["사유", "보고"] },
  { id: "reflection", title: "반성문", tags: ["반성", "사과"] },
  { id: "absence", title: "결석 사유서", tags: ["결석", "학교"] },
  { id: "club", title: "동아리 지원서", tags: ["동아리", "지원"] },
  { id: "request", title: "요청서", tags: ["요청", "업무"] },
  { id: "application", title: "신청서", tags: ["신청", "접수"] },
  { id: "withdrawal", title: "철회서", tags: ["철회", "취소"] },
  { id: "appeal", title: "이의신청서", tags: ["이의", "신청"] },
  { id: "report", title: "보고서", tags: ["보고", "정리"] },
  { id: "proposal", title: "제안서", tags: ["제안", "기획"] },
  { id: "plan", title: "계획서", tags: ["계획", "정리"] },
  { id: "agenda", title: "회의 안건서", tags: ["회의", "안건"] },
  { id: "minutes", title: "회의록", tags: ["회의", "기록"] },
  { id: "budget", title: "예산안", tags: ["예산", "계획"] },
  { id: "expense", title: "지출결의서", tags: ["지출", "결의"] },
  { id: "reimbursement", title: "비용 청구서", tags: ["비용", "청구"] },
  { id: "invoice", title: "청구서", tags: ["청구", "결제"] },
  { id: "receipt", title: "영수증 설명서", tags: ["영수증", "설명"] },
  { id: "consent", title: "동의서", tags: ["동의", "확인"] },
  { id: "pledge", title: "서약서", tags: ["서약", "약속"] },
  { id: "agreement", title: "합의서", tags: ["합의", "협의"] },
  { id: "contract", title: "계약서", tags: ["계약", "약정"] },
  { id: "nda", title: "비밀유지 서약서", tags: ["보안", "비밀"] },
  { id: "reference", title: "추천서", tags: ["추천", "검증"] },
  { id: "attendance", title: "출석 확인서", tags: ["출석", "확인"] },
  { id: "tardy", title: "지각 사유서", tags: ["지각", "사유"] },
  { id: "leave", title: "조퇴 사유서", tags: ["조퇴", "사유"] },
  { id: "sick", title: "병결 사유서", tags: ["병결", "사유"] },
  { id: "makeup", title: "보충학습 계획서", tags: ["보충", "학습"] },
  { id: "apology", title: "사과문", tags: ["사과", "반성"] },
  { id: "incident", title: "경위서", tags: ["경위", "사건"] },
  { id: "statement", title: "진술서", tags: ["진술", "사건"] },
  { id: "complaint", title: "민원 접수서", tags: ["민원", "접수"] },
  { id: "response", title: "답변서", tags: ["답변", "회신"] },
  { id: "notice", title: "공지문", tags: ["공지", "안내"] },
  { id: "invitation", title: "초대장", tags: ["초대", "행사"] },
  { id: "certification", title: "확인서", tags: ["확인", "증명"] },
  { id: "proof_enrollment", title: "재학 증명 요청서", tags: ["재학", "증명"] },
  { id: "certificate_request", title: "증명서 발급 요청서", tags: ["증명", "발급"] },
  { id: "scholarship", title: "장학금 신청서", tags: ["장학금", "신청"] },
  { id: "internship", title: "인턴 지원서", tags: ["인턴", "지원"] },
  { id: "volunteer", title: "봉사활동 신청서", tags: ["봉사", "신청"] },
  { id: "leave_of_absence", title: "휴학 신청서", tags: ["휴학", "신청"] },
  { id: "return_school", title: "복학 신청서", tags: ["복학", "신청"] },
  { id: "transfer", title: "전학 신청서", tags: ["전학", "신청"] },
  { id: "lab_request", title: "실습 신청서", tags: ["실습", "신청"] },
  { id: "equipment_loan", title: "장비 대여 신청서", tags: ["장비", "대여"] },
  { id: "room_booking", title: "공간 대관 신청서", tags: ["대관", "공간"] },
  { id: "event_plan", title: "행사 기획서", tags: ["행사", "기획"] },
  { id: "event_report", title: "행사 결과 보고서", tags: ["행사", "보고"] },
  { id: "budget_request", title: "예산 신청서", tags: ["예산", "신청"] },
  { id: "sponsorship", title: "후원 요청서", tags: ["후원", "요청"] },
  { id: "donation", title: "기부금 요청서", tags: ["기부", "요청"] },
  { id: "marketing", title: "홍보 요청서", tags: ["홍보", "요청"] },
  { id: "partnership", title: "협력 제안서", tags: ["협력", "제안"] },
  { id: "training_plan", title: "교육 계획서", tags: ["교육", "계획"] },
  { id: "training_report", title: "교육 보고서", tags: ["교육", "보고"] },
  { id: "evaluation", title: "평가서", tags: ["평가", "점검"] },
  { id: "feedback", title: "피드백 제출서", tags: ["피드백", "제출"] },
  { id: "survey", title: "설문 요청서", tags: ["설문", "요청"] },
  { id: "resignation", title: "사직서", tags: ["사직", "인사"] },
  { id: "appointment", title: "임명장", tags: ["임명", "인사"] },
  { id: "job_offer", title: "채용 제안서", tags: ["채용", "제안"] },
  { id: "performance", title: "성과 보고서", tags: ["성과", "보고"] },
  { id: "kpi", title: "성과 목표서", tags: ["목표", "성과"] },
  { id: "risk", title: "리스크 분석서", tags: ["리스크", "분석"] },
  { id: "swot", title: "SWOT 분석서", tags: ["분석", "전략"] },
  { id: "schedule", title: "일정표", tags: ["일정", "관리"] },
  { id: "checklist", title: "체크리스트", tags: ["체크", "관리"] },
  { id: "memo", title: "업무 메모", tags: ["메모", "업무"] },
  { id: "handover", title: "인수인계서", tags: ["인수인계", "업무"] },
  { id: "progress", title: "진행 상황 보고서", tags: ["진행", "보고"] },
  { id: "issue", title: "이슈 보고서", tags: ["이슈", "보고"] },
  { id: "bug", title: "버그 리포트", tags: ["버그", "리포트"] },
  { id: "change", title: "변경 요청서", tags: ["변경", "요청"] },
  { id: "release", title: "릴리스 노트", tags: ["릴리스", "배포"] },
  { id: "policy", title: "정책 문서", tags: ["정책", "기준"] },
  { id: "guideline", title: "가이드라인", tags: ["가이드", "기준"] },
  { id: "faq", title: "FAQ 문서", tags: ["질문", "응답"] },
  { id: "terms", title: "서비스 약관 초안", tags: ["약관", "서비스"] },
  { id: "privacy", title: "개인정보 처리방침 초안", tags: ["개인정보", "정책"] },
  { id: "cookie", title: "쿠키 정책", tags: ["쿠키", "정책"] },
  { id: "incident_response", title: "사고 대응 보고서", tags: ["사고", "대응"] },
  { id: "safety", title: "안전 점검표", tags: ["안전", "점검"] },
  { id: "compliance", title: "컴플라이언스 체크리스트", tags: ["규정", "점검"] },
  { id: "purchase", title: "구매 요청서", tags: ["구매", "요청"] },
  { id: "vendor", title: "업체 선정서", tags: ["업체", "선정"] },
  { id: "quotation", title: "견적 요청서", tags: ["견적", "요청"] },
  { id: "delivery", title: "납품 확인서", tags: ["납품", "확인"] },
  { id: "inventory", title: "재고 확인서", tags: ["재고", "확인"] },
  { id: "maintenance", title: "유지보수 요청서", tags: ["유지보수", "요청"] },
  { id: "repair", title: "수리 요청서", tags: ["수리", "요청"] },
  { id: "travel", title: "출장 신청서", tags: ["출장", "신청"] },
  { id: "travel_report", title: "출장 보고서", tags: ["출장", "보고"] },
  { id: "leave_request", title: "휴가 신청서", tags: ["휴가", "신청"] },
  { id: "overtime", title: "초과근무 신청서", tags: ["초과근무", "신청"] },
  { id: "expense_report", title: "경비 정산서", tags: ["경비", "정산"] },
  { id: "payment", title: "지급 요청서", tags: ["지급", "요청"] },
  { id: "invoice_request", title: "세금계산서 발급 요청서", tags: ["세금계산서", "발급"] },
];

const templateTitles = templateCatalog.reduce((acc, item) => {
  acc[item.id] = item.title;
  return acc;
}, {});

const formatKoreanDate = (value) => {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${y}년 ${m}월 ${d}일`;
};

const formatDateForFilename = (value) => {
  if (!value) return "";
  return value.replace(/-/g, "");
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

const buildGeneric = (type) => {
  const title = templateTitles[type] || "문서";
  const recipient = getValue(fields.recipient) || "담당자";
  const name = getValue(fields.name) || "작성자";
  const background = getValue(fields.background);
  const event = getValue(fields.event);
  const reason = getValue(fields.reason);
  const details = getValue(fields.details);
  const plan = getValue(fields.plan);
  const date = formatKoreanDate(fields.date.value);

  const lines = [
    title,
    "",
    `수신: ${recipient}`,
    date ? `작성일: ${date}` : null,
    background ? `소속: ${background}` : null,
    "",
    event ? `주요 내용: ${event}` : "주요 내용:",
    reason ? `사유/배경: ${reason}` : null,
    details || null,
    plan ? `후속 계획: ${plan}` : null,
    "",
    name,
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
  const list = sentenceBank[key] || sentenceBank.default;
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
    if (key === "templateType" || key === "templateSearch") return false;
    return field.value.trim();
  });
};

const renderTemplateOptions = (list) => {
  fields.templateType.innerHTML = "";
  list.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.title;
    fields.templateType.appendChild(option);
  });
};

const renderTemplateList = (list) => {
  templateList.innerHTML = "";
  list.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "template-chip";
    btn.textContent = item.title;
    btn.addEventListener("click", () => {
      fields.templateType.value = item.id;
      renderSuggestions();
      renderResult();
    });
    templateList.appendChild(btn);
  });
  templateCount.textContent = String(list.length);
};

const filterTemplates = () => {
  const query = fields.templateSearch.value.trim().toLowerCase();
  if (!query) return templateCatalog;
  return templateCatalog.filter((item) => {
    const haystack = `${item.title} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(query);
  });
};

const renderResult = () => {
  if (!hasAnyInput()) {
    result.innerHTML = '<p class="placeholder">입력 후 문장 생성을 눌러주세요.</p>';
    return;
  }
  const type = fields.templateType.value;
  const builder = builders[type] || (() => buildGeneric(type));
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
  const title = templateTitles[fields.templateType.value];
  const datePart = formatDateForFilename(fields.date.value) || formatDateForFilename(new Date().toISOString().slice(0, 10));
  const docTitle = datePart ? `${title}_${datePart}` : title;
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(`\n    <!doctype html>\n    <html lang=\"ko\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <title>${docTitle}</title>\n        <style>\n          body { font-family: \"Nanum Myeongjo\", serif; padding: 40px; line-height: 1.7; }\n          h1 { font-size: 20px; margin-bottom: 24px; }\n        </style>\n      </head>\n      <body>${content}</body>\n    </html>\n  `);
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

fields.templateSearch.addEventListener("input", () => {
  const filtered = filterTemplates();
  const current = fields.templateType.value;
  renderTemplateOptions(filtered);
  renderTemplateList(filtered);
  if (filtered.some((item) => item.id === current)) {
    fields.templateType.value = current;
  } else if (filtered.length > 0) {
    fields.templateType.value = filtered[0].id;
  }
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
renderTemplateOptions(templateCatalog);
renderTemplateList(templateCatalog);
fields.templateType.value = templateCatalog[0].id;
renderSuggestions();
renderResult();

Object.values(fields).forEach((field) => {
  const eventName = field.tagName === "SELECT" ? "change" : "input";
  field.addEventListener(eventName, renderResult);
});
