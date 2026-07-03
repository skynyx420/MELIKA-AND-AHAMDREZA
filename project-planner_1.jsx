import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Calendar, LayoutGrid, ListChecks, MessageSquare, Users, Plus, Send, Check,
  Trash2, X, Shield, User as UserIcon, ChevronDown, ChevronRight, Flag, Globe,
  CircleDot, Clock, CheckCircle2, AlertTriangle, GitBranch, Gauge, Layers,
  Diamond, Bell, Download, Printer, Camera, Zap, Paperclip, StickyNote, DollarSign,
} from "lucide-react";

/* ================================================================== */
/*  i18n                                                               */
/* ================================================================== */
const T = {
  fa: {
    dir: "rtl", name: "فارسی", app: "پلنورا", tagline: "مدیریت پروژه‌ی سازمانی",
    timeline: "زمان‌بندی", board: "برد", list: "لیست", network: "شبکه", calendar: "تقویم",
    workload: "بار کاری", dashboard: "داشبورد", chat: "گفتگو", team: "منابع",
    viewingAs: "نمایش به‌عنوان", project: "پروژه", newProject: "پروژه‌ی جدید",
    addTask: "افزودن تسک", editTask: "ویرایش تسک", taskName: "نام تسک", type: "نوع",
    task: "تسک", summary: "خلاصه (فاز)", milestone: "مایل‌استون", subtaskOf: "زیرمجموعه‌ی",
    assignee: "مسئول", unassigned: "بدون مسئول", start: "شروع", end: "پایان",
    durationD: "مدت (روز کاری)", progress: "پیشرفت", status: "وضعیت", priority: "اولویت",
    dependsOn: "پیش‌نیازها", depType: "نوع", lag: "تأخیر", none: "هیچ",
    todo: "انجام‌نشده", inprogress: "در حال انجام", done: "انجام‌شده",
    high: "بالا", med: "متوسط", low: "پایین",
    markDone: "انجام‌شده", save: "ذخیره", cancel: "انصراف", delete: "حذف", add: "افزودن",
    send: "ارسال", chatPh: "یک پیام بنویسید…", addUser: "افزودن منبع", userName: "نام",
    role: "نقش", manager: "مدیر", member: "عضو", managersOnly: "فقط مدیرها می‌توانند مدیریت کنند.",
    total: "کل", overdue: "عقب‌افتاده", myTasks: "تسک‌های من", completed: "تکمیل‌شده",
    noTasks: "هنوز تسکی نیست.", days: "روز", conversations: "گفتگوها",
    groupChat: "گفتگوی گروهی", direct: "پیام مستقیم", noMessages: "هنوز پیامی نیست.",
    autoSchedule: "زمان‌بندی خودکار", setBaseline: "ثبت بیس‌لاین", baseline: "بیس‌لاین",
    critical: "مسیر بحرانی", slack: "شناوری", cost: "هزینه", budget: "بودجه",
    rate: "نرخ ساعتی", capacity: "ظرفیت", units: "درصد تخصیص", work: "نیروی کار",
    material: "مواد/تجهیزات", resType: "نوع منبع", resources: "منابع",
    planned: "برنامه", actual: "واقعی", earnedValue: "ارزش کسب‌شده",
    pv: "ارزش برنامه‌ای (PV)", ev: "ارزش کسب‌شده (EV)", ac: "هزینه‌ی واقعی (AC)",
    spi: "شاخص زمان (SPI)", cpi: "شاخص هزینه (CPI)", burndown: "نمودار سوخت",
    overalloc: "اضافه‌بار", filter: "فیلتر", group: "گروه‌بندی", sortBy: "مرتب‌سازی",
    all: "همه", notes: "یادداشت", checklist: "چک‌لیست", attachments: "پیوست‌ها",
    deadline: "مهلت", constraint: "محدودیت", asap: "در اسرع وقت", mso: "باید شروع در",
    snet: "نه زودتر از", recurring: "تسک تکرارشونده", repeat: "تکرار", times: "بار",
    everyDays: "هر چند روز", notifications: "اعلان‌ها", noNotif: "اعلانی نیست",
    activity: "فعالیت‌ها", holidays: "تعطیلات", print: "چاپ/PDF", exportCsv: "خروجی Excel",
    assignedToYou: "به تو واگذار شده", isOverdue: "عقب‌افتاده",
    fixedCost: "هزینه‌ی ثابت", addChk: "افزودن مورد", newHoliday: "تاریخ تعطیل (روز/ماه/سال)",
    variance: "انحراف", client: "مشتری", billable: "قابل‌فاکتور",
    projStart: "شروع پروژه", collapseAll: "جمع‌کردن همه", noOveralloc: "بدون اضافه‌بار",
  },
  tr: {
    dir: "ltr", name: "Türkçe", app: "Planora", tagline: "Kurumsal Proje Yönetimi",
    timeline: "Zaman", board: "Pano", list: "Liste", network: "Ağ", calendar: "Takvim",
    workload: "İş Yükü", dashboard: "Panel", chat: "Sohbet", team: "Kaynaklar",
    viewingAs: "Görünüm", project: "Proje", newProject: "Yeni proje",
    addTask: "Görev ekle", editTask: "Görevi düzenle", taskName: "Görev adı", type: "Tür",
    task: "Görev", summary: "Özet (faz)", milestone: "Kilometre taşı", subtaskOf: "Üst görev",
    assignee: "Sorumlu", unassigned: "Atanmamış", start: "Başlangıç", end: "Bitiş",
    durationD: "Süre (iş günü)", progress: "İlerleme", status: "Durum", priority: "Öncelik",
    dependsOn: "Öncüller", depType: "Tür", lag: "Gecikme", none: "Yok",
    todo: "Yapılacak", inprogress: "Devam", done: "Tamam",
    high: "Yüksek", med: "Orta", low: "Düşük",
    markDone: "Tamam", save: "Kaydet", cancel: "İptal", delete: "Sil", add: "Ekle",
    send: "Gönder", chatPh: "Bir mesaj yaz…", addUser: "Kaynak ekle", userName: "Ad",
    role: "Rol", manager: "Yönetici", member: "Üye", managersOnly: "Sadece yöneticiler yönetebilir.",
    total: "Toplam", overdue: "Gecikmiş", myTasks: "Görevlerim", completed: "Tamamlanan",
    noTasks: "Henüz görev yok.", days: "gün", conversations: "Sohbetler",
    groupChat: "Grup sohbeti", direct: "Direkt mesaj", noMessages: "Henüz mesaj yok.",
    autoSchedule: "Otomatik planla", setBaseline: "Referans al", baseline: "Referans",
    critical: "Kritik yol", slack: "Bolluk", cost: "Maliyet", budget: "Bütçe",
    rate: "Saatlik ücret", capacity: "Kapasite", units: "Atama %", work: "İşgücü",
    material: "Malzeme", resType: "Kaynak türü", resources: "Kaynaklar",
    planned: "Planlanan", actual: "Gerçek", earnedValue: "Kazanılmış Değer",
    pv: "Planlanan (PV)", ev: "Kazanılan (EV)", ac: "Gerçek maliyet (AC)",
    spi: "Zaman endeksi (SPI)", cpi: "Maliyet endeksi (CPI)", burndown: "Burndown",
    overalloc: "Aşırı yük", filter: "Filtre", group: "Grupla", sortBy: "Sırala",
    all: "Tümü", notes: "Notlar", checklist: "Kontrol listesi", attachments: "Ekler",
    deadline: "Son tarih", constraint: "Kısıt", asap: "En kısa sürede", mso: "Şu tarihte başla",
    snet: "Şundan önce değil", recurring: "Tekrarlayan görev", repeat: "Tekrar", times: "kez",
    everyDays: "Kaç günde bir", notifications: "Bildirimler", noNotif: "Bildirim yok",
    activity: "Etkinlik", holidays: "Tatiller", print: "Yazdır/PDF", exportCsv: "Excel'e aktar",
    assignedToYou: "Sana atandı", isOverdue: "gecikmiş",
    fixedCost: "Sabit maliyet", addChk: "Madde ekle", newHoliday: "Tatil tarihi",
    variance: "Sapma", client: "Müşteri", billable: "Faturalanabilir",
    projStart: "Proje başlangıcı", collapseAll: "Tümünü kapat", noOveralloc: "Aşırı yük yok",
  },
  en: {
    dir: "ltr", name: "English", app: "Planora", tagline: "Enterprise Project Management",
    timeline: "Timeline", board: "Board", list: "List", network: "Network", calendar: "Calendar",
    workload: "Workload", dashboard: "Dashboard", chat: "Chat", team: "Resources",
    viewingAs: "Viewing as", project: "Project", newProject: "New project",
    addTask: "Add task", editTask: "Edit task", taskName: "Task name", type: "Type",
    task: "Task", summary: "Summary (phase)", milestone: "Milestone", subtaskOf: "Subtask of",
    assignee: "Assignee", unassigned: "Unassigned", start: "Start", end: "End",
    durationD: "Duration (work days)", progress: "Progress", status: "Status", priority: "Priority",
    dependsOn: "Predecessors", depType: "Type", lag: "Lag", none: "None",
    todo: "To do", inprogress: "In progress", done: "Done",
    high: "High", med: "Medium", low: "Low",
    markDone: "Done", save: "Save", cancel: "Cancel", delete: "Delete", add: "Add",
    send: "Send", chatPh: "Write a message…", addUser: "Add resource", userName: "Name",
    role: "Role", manager: "Manager", member: "Member", managersOnly: "Only managers can manage this.",
    total: "Total", overdue: "Overdue", myTasks: "My tasks", completed: "Completed",
    noTasks: "No tasks yet.", days: "days", conversations: "Conversations",
    groupChat: "Group chat", direct: "Direct message", noMessages: "No messages yet.",
    autoSchedule: "Auto-schedule", setBaseline: "Set baseline", baseline: "Baseline",
    critical: "Critical path", slack: "Slack", cost: "Cost", budget: "Budget",
    rate: "Hourly rate", capacity: "Capacity", units: "Units %", work: "Work",
    material: "Material", resType: "Resource type", resources: "Resources",
    planned: "Planned", actual: "Actual", earnedValue: "Earned Value",
    pv: "Planned Value (PV)", ev: "Earned Value (EV)", ac: "Actual Cost (AC)",
    spi: "Schedule idx (SPI)", cpi: "Cost idx (CPI)", burndown: "Burndown",
    overalloc: "Overallocated", filter: "Filter", group: "Group by", sortBy: "Sort by",
    all: "All", notes: "Notes", checklist: "Checklist", attachments: "Attachments",
    deadline: "Deadline", constraint: "Constraint", asap: "As soon as possible", mso: "Must start on",
    snet: "Start no earlier than", recurring: "Recurring task", repeat: "Repeat", times: "times",
    everyDays: "Every N days", notifications: "Notifications", noNotif: "No notifications",
    activity: "Activity", holidays: "Holidays", print: "Print/PDF", exportCsv: "Export Excel",
    assignedToYou: "Assigned to you", isOverdue: "overdue",
    fixedCost: "Fixed cost", addChk: "Add item", newHoliday: "Holiday date",
    variance: "Variance", client: "Client", billable: "Billable",
    projStart: "Project start", collapseAll: "Collapse all", noOveralloc: "No overallocation",
  },
};

/* ================================================================== */
/*  date + calendar helpers                                            */
/* ================================================================== */
const TODAY = "2026-07-03";
const pd = (s) => new Date(s + "T00:00:00");
const iso = (d) => d.toISOString().slice(0, 10);
const addD = (s, n) => { const d = pd(s); d.setDate(d.getDate() + n); return iso(d); };
const diff = (a, b) => Math.round((pd(b) - pd(a)) / 86400000);
const isWorking = (s, cal) => { const d = pd(s); return !cal.week.includes(d.getDay()) && !cal.holidays.includes(s); };
const nextWork = (s, cal) => { let d = s; let g = 0; while (!isWorking(d, cal) && g < 40) { d = addD(d, 1); g++; } return d; };
const shiftWork = (s, n, cal) => {
  let d = nextWork(s, cal); let c = Math.abs(n); const dir = n < 0 ? -1 : 1; let g = 0;
  while (c > 0 && g < 4000) { d = addD(d, dir); if (isWorking(d, cal)) c--; g++; } return d;
};
const addWork = (s, n, cal) => shiftWork(s, n, cal);
const workBetween = (a, b, cal) => { if (pd(b) < pd(a)) return 0; let d = a, c = 0, g = 0; while (pd(d) <= pd(b) && g < 4000) { if (isWorking(d, cal)) c++; d = addD(d, 1); g++; } return c; };
const money = (n) => "$" + Math.round(n).toLocaleString();

const AVA = ["#0d9488", "#7c3aed", "#db2777", "#ea580c", "#2563eb", "#16a34a", "#ca8a04", "#0891b2"];
const initials = (n) => n.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
const STATUS = { todo: { c: "#94a3b8", i: CircleDot }, inprogress: { c: "#f59e0b", i: Clock }, done: { c: "#10b981", i: CheckCircle2 } };
const PRIO = { high: "#ef4444", med: "#f59e0b", low: "#94a3b8" };
const DEPTYPES = ["FS", "SS", "FF", "SF"];

/* ================================================================== */
/*  seed                                                               */
/* ================================================================== */
const seedRes = [
  { id: "u1", name: "Asu", role: "manager", type: "work", rate: 45, capacity: 8, color: AVA[0] },
  { id: "u2", name: "Ramila", role: "member", type: "work", rate: 30, capacity: 8, color: AVA[1] },
  { id: "u3", name: "Deniz", role: "member", type: "work", rate: 28, capacity: 8, color: AVA[3] },
  { id: "u4", name: "Kaan", role: "member", type: "work", rate: 32, capacity: 8, color: AVA[4] },
  { id: "u5", name: "Print vendor", role: "", type: "material", rate: 12, capacity: 0, color: AVA[6] },
];
const seedProjects = [{ id: "p1", name: "Q3 Product Launch" }, { id: "p2", name: "Café Rollout" }];

const mk = (o) => ({
  type: "task", parentId: null, deps: [], assignments: [], progress: 0, status: "todo",
  priority: "med", fixedCost: 0, deadline: "", constraint: { type: "ASAP", date: "" },
  notes: "", checklist: [], attachments: [], client: "", billable: true, ...o,
});
const seedTasks = [
  mk({ id: "t1", projectId: "p1", name: "Discovery & Planning", type: "summary" }),
  mk({ id: "t2", projectId: "p1", name: "Market research", parentId: "t1", start: "2026-07-01", durationDays: 4, assignments: [{ resId: "u3", units: 100 }], progress: 100, status: "done", priority: "high" }),
  mk({ id: "t3", projectId: "p1", name: "Requirements doc", parentId: "t1", start: "2026-07-01", durationDays: 5, deps: [{ id: "t2", type: "SS", lag: 1 }], assignments: [{ resId: "u1", units: 60 }], progress: 70, status: "inprogress", priority: "high" }),
  mk({ id: "t4", projectId: "p1", name: "Plan approved", parentId: "t1", type: "milestone", start: "2026-07-08", durationDays: 0, deps: [{ id: "t3", type: "FS", lag: 0 }] }),
  mk({ id: "t5", projectId: "p1", name: "Design & Build", type: "summary" }),
  mk({ id: "t6", projectId: "p1", name: "UX / creative", parentId: "t5", start: "2026-07-08", durationDays: 6, deps: [{ id: "t4", type: "FS", lag: 0 }], assignments: [{ resId: "u2", units: 100 }], progress: 30, status: "inprogress", priority: "high" }),
  mk({ id: "t7", projectId: "p1", name: "Content (TR/EN/RU)", parentId: "t5", start: "2026-07-09", durationDays: 5, deps: [{ id: "t4", type: "FS", lag: 0 }], assignments: [{ resId: "u3", units: 80 }], progress: 10, status: "inprogress", priority: "med" }),
  mk({ id: "t8", projectId: "p1", name: "Landing page", parentId: "t5", start: "2026-07-16", durationDays: 5, deps: [{ id: "t6", type: "FS", lag: 0 }, { id: "t7", type: "FS", lag: 0 }], assignments: [{ resId: "u4", units: 100 }], priority: "high" }),
  mk({ id: "t9", projectId: "p1", name: "Print collateral", parentId: "t5", start: "2026-07-16", durationDays: 3, deps: [{ id: "t6", type: "FS", lag: 0 }], assignments: [{ resId: "u5", units: 500 }], fixedCost: 400, priority: "low" }),
  mk({ id: "t10", projectId: "p1", name: "Launch", type: "summary" }),
  mk({ id: "t11", projectId: "p1", name: "QA & rehearsal", parentId: "t10", start: "2026-07-23", durationDays: 3, deps: [{ id: "t8", type: "FS", lag: 0 }], assignments: [{ resId: "u4", units: 50 }, { resId: "u2", units: 50 }], priority: "high" }),
  mk({ id: "t12", projectId: "p1", name: "Go live 🚀", parentId: "t10", type: "milestone", start: "2026-07-28", durationDays: 0, deps: [{ id: "t11", type: "FS", lag: 0 }, { id: "t9", type: "FS", lag: 0 }] }),
  mk({ id: "t20", projectId: "p2", name: "Menu design", start: "2026-07-02", durationDays: 4, assignments: [{ resId: "u1", units: 100 }], progress: 80, status: "inprogress", priority: "high" }),
  mk({ id: "t21", projectId: "p2", name: "Print QR", start: "2026-07-08", durationDays: 2, deps: [{ id: "t20", type: "FS", lag: 0 }], assignments: [{ resId: "u5", units: 200 }], priority: "med" }),
];
const seedMsgs = [
  { id: "m1", channel: "proj:p1", sender: "u1", text: "Team, plan approval is our first milestone — let's hit July 8.", ts: Date.now() - 7200000 },
  { id: "m2", channel: "proj:p1", sender: "u2", text: "Creative is underway, will share drafts tomorrow.", ts: Date.now() - 3600000 },
  { id: "m3", channel: "dm:u1_u2", sender: "u2", text: "Asu, can I get the brand assets?", ts: Date.now() - 1800000 },
  { id: "m4", channel: "dm:u1_u2", sender: "u1", text: "Sent to your drive 📁", ts: Date.now() - 1500000 },
];

/* ================================================================== */
/*  scheduler + CPM (working-day aware, FS/SS/FF/SF, roll-up)          */
/* ================================================================== */
function computeSchedule(tasks, cal, projStart0) {
  const byId = {}; tasks.forEach((t) => (byId[t.id] = t));
  const kids = {}; tasks.forEach((t) => { if (t.parentId) (kids[t.parentId] = kids[t.parentId] || []).push(t.id); });
  const hasKids = (id) => !!kids[id];
  const leaves = tasks.filter((t) => !hasKids(t.id));
  const res = {};
  const scheduled = new Set();
  let remaining = [...leaves]; let guard = 0;
  while (remaining.length && guard < 2000) {
    guard++;
    let tk = remaining.find((t) => (t.deps || []).every((d) => !leaves.find((l) => l.id === d.id) || scheduled.has(d.id)));
    if (!tk) tk = remaining[0];
    let start = projStart0;
    if (tk.constraint?.type === "MSO" && tk.constraint.date) start = tk.constraint.date;
    if (tk.constraint?.type === "SNET" && tk.constraint.date && pd(tk.constraint.date) > pd(start)) start = tk.constraint.date;
    const dur = tk.type === "milestone" ? 0 : Math.max(1, tk.durationDays || 1);
    (tk.deps || []).forEach((d) => {
      const pr = res[d.id]; if (!pr) return; const lag = d.lag || 0; let cand;
      if (d.type === "SS") cand = shiftWork(pr.start, lag, cal);
      else if (d.type === "FF") cand = shiftWork(pr.end, lag - Math.max(dur - 1, 0), cal);
      else if (d.type === "SF") cand = shiftWork(pr.start, lag - Math.max(dur - 1, 0), cal);
      else cand = shiftWork(pr.end, 1 + lag, cal);
      if (pd(cand) > pd(start)) start = cand;
    });
    start = nextWork(start, cal);
    const end = dur === 0 ? start : addWork(start, dur - 1, cal);
    res[tk.id] = { start, end, dur, progress: tk.progress || 0 };
    scheduled.add(tk.id); remaining = remaining.filter((x) => x.id !== tk.id);
  }
  const depth = (id) => { let d = 0, c = byId[id]; while (c && c.parentId) { d++; c = byId[c.parentId]; } return d; };
  const descLeaves = (id) => { const out = []; const w = (x) => (kids[x] || []).forEach((c) => (hasKids(c) ? w(c) : out.push(c))); w(id); return out; };
  tasks.filter((t) => hasKids(t.id)).sort((a, b) => depth(b.id) - depth(a.id)).forEach((s) => {
    const ls = descLeaves(s.id).map((id) => res[id]).filter(Boolean);
    if (ls.length) {
      const start = ls.reduce((a, r) => (pd(r.start) < pd(a) ? r.start : a), ls[0].start);
      const end = ls.reduce((a, r) => (pd(r.end) > pd(a) ? r.end : a), ls[0].end);
      const td = ls.reduce((a, r) => a + Math.max(r.dur, 0), 0) || 1;
      const prog = Math.round(ls.reduce((a, r) => a + Math.max(r.dur, 0) * (r.progress || 0), 0) / td);
      res[s.id] = { start, end, dur: workBetween(start, end, cal), progress: prog, summary: true };
    } else res[s.id] = { start: projStart0, end: projStart0, dur: 0, progress: 0, summary: true };
  });
  const arr = Object.values(res);
  const projStart = arr.reduce((a, r) => (pd(r.start) < pd(a) ? r.start : a), projStart0);
  const projEnd = arr.reduce((a, r) => (pd(r.end) > pd(a) ? r.end : a), projStart0);
  Object.values(res).forEach((r) => { r.esIdx = workBetween(projStart, r.start) - 1; r.efIdx = r.esIdx + Math.max(r.dur - 1, 0); });
  const succ = {}; leaves.forEach((t) => (t.deps || []).forEach((d) => (succ[d.id] = succ[d.id] || []).push(t.id)));
  const projEndIdx = workBetween(projStart, projEnd) - 1;
  [...leaves].filter((t) => res[t.id]).sort((a, b) => res[b.id].efIdx - res[a.id].efIdx).forEach((t) => {
    const r = res[t.id]; const ss = succ[t.id] || [];
    const lf = ss.length ? Math.min(...ss.map((sid) => (res[sid].lsIdx != null ? res[sid].lsIdx : res[sid].esIdx) - 1)) : projEndIdx;
    r.lfIdx = lf; r.lsIdx = lf - Math.max(r.dur - 1, 0); r.slack = r.lsIdx - r.esIdx; r.critical = r.slack <= 0;
  });
  return { res, projStart, projEnd };
}

/* ---- cost + EVM ---- */
function costOf(task, sched, resById) {
  const r = sched.res[task.id]; if (!r) return 0; let c = task.fixedCost || 0;
  (task.assignments || []).forEach((a) => {
    const rr = resById[a.resId]; if (!rr) return;
    if (rr.type === "material") c += rr.rate * (a.units || 0);
    else c += rr.rate * (rr.capacity || 8) * r.dur * ((a.units || 0) / 100);
  });
  return c;
}

/* ================================================================== */
/*  atoms                                                              */
/* ================================================================== */
function Avatar({ user, size = 26 }) {
  if (!user) return <div className="flex items-center justify-center rounded-full bg-slate-200 text-slate-500" style={{ width: size, height: size, fontSize: size * 0.4 }}>?</div>;
  return <div className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white" style={{ width: size, height: size, background: user.color, fontSize: size * 0.38 }} title={user.name}>{initials(user.name)}</div>;
}
function Modal({ children, onClose, wide }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
    <div className={`w-full ${wide ? "max-w-lg" : "max-w-md"} max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl`} onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>;
}
const inp = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100";
const btnP = "flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-sm text-white hover:bg-teal-700";
const btnG = "flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50";

/* ================================================================== */
/*  MAIN                                                               */
/* ================================================================== */
export default function App() {
  const [lang, setLang] = useState("fa");
  const t = T[lang];
  const [resources, setResources] = useState(seedRes);
  const [projects, setProjects] = useState(seedProjects);
  const [tasks, setTasks] = useState(seedTasks);
  const [msgs, setMsgs] = useState(seedMsgs);
  const [cal, setCal] = useState({ week: [0, 6], holidays: [] });
  const [me, setMe] = useState("u1");
  const [pid, setPid] = useState("p1");
  const [projStart, setProjStart] = useState({ p1: "2026-07-01", p2: "2026-07-02" });
  const [view, setView] = useState("timeline");
  const [taskModal, setTaskModal] = useState(null);
  const [resModal, setResModal] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [showBaseline, setShowBaseline] = useState(true);
  const [collapsed, setCollapsed] = useState(new Set());
  const [activity, setActivity] = useState([]);

  const meUser = resources.find((u) => u.id === me);
  const isManager = meUser?.role === "manager";
  const resById = useMemo(() => Object.fromEntries(resources.map((r) => [r.id, r])), [resources]);
  const projTasks = useMemo(() => tasks.filter((x) => x.projectId === pid), [tasks, pid]);
  const workRes = resources.filter((r) => r.type === "work");
  const canEdit = (task) => isManager || (task.assignments || []).some((a) => a.resId === me);

  const sched = useMemo(() => computeSchedule(projTasks, cal, projStart[pid] || TODAY), [projTasks, cal, projStart, pid]);

  const log = (txt) => setActivity((p) => [{ id: Date.now() + Math.random(), txt, by: me, ts: Date.now() }, ...p].slice(0, 40));

  /* task ops */
  const upsertTask = (data, recur) => {
    let list = tasks;
    if (data.id && tasks.some((x) => x.id === data.id)) {
      list = list.map((x) => (x.id === data.id ? { ...x, ...data } : x));
      log(`edited “${data.name}”`);
    } else {
      const base = { ...data, id: "t" + Date.now(), projectId: pid };
      const extra = [base];
      if (recur && recur.count > 1) for (let i = 1; i < recur.count; i++)
        extra.push({ ...base, id: "t" + Date.now() + "_" + i, name: `${data.name} (${i + 1})`, start: addD(data.start, i * recur.every), deps: [] });
      list = [...list, ...extra]; log(`created “${data.name}”`);
    }
    setTasks(list); setTaskModal(null);
  };
  const removeTask = (id) => { setTasks((p) => p.filter((x) => x.id !== id && x.parentId !== id).map((x) => ({ ...x, deps: x.deps.filter((d) => d.id !== id) }))); setTaskModal(null); };
  const setStatus = (task, status) => { if (!canEdit(task)) return; setTasks((p) => p.map((x) => x.id === task.id ? { ...x, status, progress: status === "done" ? 100 : status === "todo" ? 0 : x.progress || 40 } : x)); log(`${task.name} → ${status}`); };
  const toggleDone = (task) => setStatus(task, task.status === "done" ? "todo" : "done");

  const takeBaseline = () => { setTasks((p) => p.map((x) => x.projectId === pid ? { ...x, baseline: sched.res[x.id] ? { start: sched.res[x.id].start, end: sched.res[x.id].end } : null } : x)); log("baseline captured"); };

  /* stats */
  const stats = useMemo(() => {
    const leaf = projTasks.filter((x) => !projTasks.some((y) => y.parentId === x.id) && x.type !== "milestone");
    const done = leaf.filter((x) => x.status === "done").length;
    const inprog = leaf.filter((x) => x.status === "inprogress").length;
    const over = leaf.filter((x) => x.status !== "done" && sched.res[x.id] && diff(TODAY, sched.res[x.id].end) < 0).length;
    const mine = leaf.filter((x) => (x.assignments || []).some((a) => a.resId === me)).length;
    return { total: leaf.length, done, inprog, over, mine };
  }, [projTasks, sched, me]);

  const notifs = useMemo(() => {
    const out = [];
    projTasks.filter((x) => x.type !== "milestone" && !projTasks.some((y) => y.parentId === x.id)).forEach((x) => {
      const mine = (x.assignments || []).some((a) => a.resId === me);
      const r = sched.res[x.id]; if (!r) return;
      if (x.status !== "done" && diff(TODAY, r.end) < 0) out.push({ id: x.id + "o", txt: `${x.name} — ${t.isOverdue}`, warn: true });
      else if (mine && x.status !== "done") out.push({ id: x.id + "m", txt: `${x.name} — ${t.assignedToYou}` });
    });
    return out;
  }, [projTasks, sched, me, t]);

  const exportCsv = () => {
    const rows = [[t.taskName, t.assignee, t.start, t.end, t.progress, t.status, t.cost, "critical"]];
    orderedTree(projTasks).forEach(({ task }) => {
      const r = sched.res[task.id]; const who = (task.assignments || []).map((a) => resById[a.resId]?.name).join(" / ");
      rows.push([task.name, who, r?.start || "", r?.end || "", (r?.progress ?? 0) + "%", task.status, Math.round(costOf(task, sched, resById)), r?.critical ? "yes" : ""]);
    });
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "project.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const toggleCollapse = (id) => setCollapsed((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const shared = { t, lang, projTasks, sched, resById, resources, workRes, cal, me, isManager, canEdit, toggleDone, setStatus, onEdit: setTaskModal, onAdd: (parentId) => setTaskModal({ parentId }), removeTask, collapsed, toggleCollapse, showBaseline, projStartDate: projStart[pid] };

  return (
    <div dir={t.dir} className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: "system-ui,-apple-system,'Segoe UI',Tahoma,sans-serif" }}>
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white print:hidden">
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white"><Layers size={18} /></div>
            <div className="leading-tight"><div className="font-bold">{t.app}</div><div className="text-[10px] text-slate-400">{t.tagline}</div></div>
          </div>
          <select value={pid} onChange={(e) => setPid(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm">
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <button onClick={() => { const n = prompt(t.newProject); if (!n) return; const id = "p" + Date.now(); setProjects((p) => [...p, { id, name: n }]); setProjStart((s) => ({ ...s, [id]: TODAY })); setPid(id); }} className={btnG} title={t.newProject}><Plus size={15} /></button>
          <button onClick={takeBaseline} className={btnG} title={t.setBaseline}><Camera size={14} /> <span className="hidden sm:inline">{t.baseline}</span></button>
          <button onClick={exportCsv} className={btnG}><Download size={14} /> <span className="hidden sm:inline">{t.exportCsv}</span></button>
          <button onClick={() => window.print()} className={btnG}><Printer size={14} /> <span className="hidden sm:inline">{t.print}</span></button>

          <div className="flex-1" />

          <div className="relative">
            <button onClick={() => { setNotifOpen((o) => !o); setLangOpen(false); }} className="relative rounded-lg border border-slate-300 p-2 hover:bg-slate-50">
              <Bell size={16} />{notifs.length > 0 && <span className="absolute -end-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] text-white">{notifs.length}</span>}
            </button>
            {notifOpen && <div className="absolute end-0 z-50 mt-1 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
              <div className="mb-1 px-1 text-xs font-semibold text-slate-400">{t.notifications}</div>
              {notifs.length === 0 && <div className="px-1 py-2 text-xs text-slate-400">{t.noNotif}</div>}
              {notifs.map((n) => <div key={n.id} className={`flex items-start gap-1.5 rounded px-1.5 py-1.5 text-xs ${n.warn ? "text-rose-600" : "text-slate-600"}`}>{n.warn ? <AlertTriangle size={13} className="mt-0.5 shrink-0" /> : <CircleDot size={13} className="mt-0.5 shrink-0" />}{n.txt}</div>)}
            </div>}
          </div>

          <div className="relative">
            <button onClick={() => { setLangOpen((o) => !o); setNotifOpen(false); }} className={btnG}><Globe size={15} /> {t.name} <ChevronDown size={13} /></button>
            {langOpen && <div className="absolute end-0 z-50 mt-1 w-32 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {Object.keys(T).map((k) => <button key={k} onClick={() => { setLang(k); setLangOpen(false); }} className="block w-full px-3 py-1.5 text-start text-sm hover:bg-slate-50">{T[k].name}</button>)}
            </div>}
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-2 py-1">
            <span className="text-[10px] text-slate-400">{t.viewingAs}</span>
            <Avatar user={meUser} size={22} />
            <select value={me} onChange={(e) => setMe(e.target.value)} className="bg-transparent text-sm font-medium focus:outline-none">
              {workRes.map((u) => <option key={u.id} value={u.id}>{u.name}{u.role === "manager" ? " ★" : ""}</option>)}
            </select>
          </div>
        </div>

        <nav className="flex items-center gap-0.5 overflow-x-auto px-2">
          {[["timeline", Calendar], ["board", LayoutGrid], ["list", ListChecks], ["network", GitBranch], ["calendar", Calendar], ["workload", Users], ["dashboard", Gauge], ["chat", MessageSquare], ["team", UserIcon]].map(([k, Ic]) => (
            <button key={k} onClick={() => setView(k)} className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium ${view === k ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}><Ic size={15} /> {t[k]}</button>
          ))}
        </nav>
      </header>

      {/* stat strip */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-3 print:hidden">
        <Stat label={t.total} value={stats.total} c="#334155" I={ListChecks} />
        <Stat label={t.inprogress} value={stats.inprog} c={STATUS.inprogress.c} I={Clock} />
        <Stat label={t.completed} value={stats.done} c={STATUS.done.c} I={CheckCircle2} />
        <Stat label={t.overdue} value={stats.over} c="#ef4444" I={AlertTriangle} />
        {!isManager && <Stat label={t.myTasks} value={stats.mine} c="#7c3aed" I={UserIcon} />}
        {view === "timeline" && <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"><input type="checkbox" checked={showBaseline} onChange={(e) => setShowBaseline(e.target.checked)} className="accent-teal-600" /> {t.baseline}</label>}
        {isManager && <div className="ms-auto flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-sm text-teal-700"><Shield size={15} /> {t.manager}</div>}
      </div>

      <main className="px-4 pb-20">
        {view === "timeline" && <Gantt {...shared} />}
        {view === "board" && <Board {...shared} />}
        {view === "list" && <ListView {...shared} />}
        {view === "network" && <Network {...shared} />}
        {view === "calendar" && <CalendarView {...shared} />}
        {view === "workload" && <Workload {...shared} />}
        {view === "dashboard" && <Dashboard {...shared} costOf={(x) => costOf(x, sched, resById)} activity={activity} />}
        {view === "chat" && <Chat t={t} msgs={msgs} setMsgs={setMsgs} pid={pid} me={me} resById={resById} users={workRes} projects={projects} />}
        {view === "team" && <Team {...shared} onAddRes={() => setResModal(true)} setResources={setResources} />}
      </main>

      {taskModal && <TaskModal t={t} task={taskModal} resources={resources} projTasks={projTasks} onSave={upsertTask} onDelete={removeTask} onClose={() => setTaskModal(null)} />}
      {resModal && <ResModal t={t} onSave={(r) => { setResources((p) => [...p, r]); setResModal(false); }} onClose={() => setResModal(false)} />}
    </div>
  );
}

function Stat({ label, value, c, I }) {
  return <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"><I size={16} style={{ color: c }} /><span className="text-lg font-bold" style={{ color: c }}>{value}</span><span className="text-xs text-slate-500">{label}</span></div>;
}

/* tree ordering (parent then children, DFS) */
function orderedTree(tasks) {
  const kids = {}; tasks.forEach((t) => { const k = t.parentId || "_root"; (kids[k] = kids[k] || []).push(t); });
  const out = []; const walk = (list, depth) => list.forEach((t) => { out.push({ task: t, depth, hasKids: !!kids[t.id] }); if (kids[t.id]) walk(kids[t.id], depth + 1); });
  walk(kids["_root"] || [], 0); return out;
}

/* ================================================================== */
/*  GANTT                                                              */
/* ================================================================== */
function Gantt({ t, projTasks, sched, resById, canEdit, toggleDone, onEdit, onAdd, collapsed, toggleCollapse, showBaseline }) {
  const DAY = 30, ROW = 42, LBL = 240;
  if (projTasks.length === 0) return <Empty t={t} onAdd={() => onAdd(null)} />;
  const rows = orderedTree(projTasks).filter(({ task }) => { let p = task.parentId; while (p) { if (collapsed.has(p)) return false; p = projTasks.find((x) => x.id === p)?.parentId; } return true; });
  const { projStart, projEnd } = sched;
  const start = addD(projStart, -2), end = addD(projEnd, 3);
  const nDays = diff(start, end) + 1;
  const days = Array.from({ length: nDays }, (_, i) => addD(start, i));
  const rowIdx = {}; rows.forEach((r, i) => (rowIdx[r.task.id] = i));
  const todayX = diff(start, TODAY) * DAY;
  const xOf = (d) => diff(start, d) * DAY;

  return <div className="rounded-xl border border-slate-200 bg-white">
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 print:hidden">
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded" style={{ background: "#ef4444" }} /> {t.critical}</span>
        <span className="flex items-center gap-1"><Diamond size={11} className="text-slate-500" /> {t.milestone}</span>
      </div>
      <button onClick={() => onAdd(null)} className={btnP}><Plus size={15} /> {t.addTask}</button>
    </div>
    <div className="overflow-x-auto">
      <div dir="ltr" style={{ width: LBL + nDays * DAY, minWidth: "100%" }}>
        <div className="flex border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500" style={{ height: 28 }}>
          <div style={{ width: LBL }} className="shrink-0" />
          {days.map((d, i) => { const dt = pd(d), wk = dt.getDay() === 0 || dt.getDay() === 6; return <div key={i} className={`flex items-center justify-center border-l border-slate-100 ${wk ? "bg-slate-100" : ""}`} style={{ width: DAY }}>{dt.getDate()}</div>; })}
        </div>
        <div className="relative">
          {todayX >= 0 && <div className="absolute top-0 z-20 w-0.5 bg-rose-400/70" style={{ left: LBL + todayX, height: rows.length * ROW }} />}
          <svg className="pointer-events-none absolute top-0 z-10" style={{ left: LBL, width: nDays * DAY, height: rows.length * ROW }}>
            <defs><marker id="ar" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
            {rows.flatMap(({ task }) => (task.deps || []).map((d) => {
              if (rowIdx[d.id] === undefined) return null;
              const pr = sched.res[d.id], me2 = sched.res[task.id]; if (!pr || !me2) return null;
              const x1 = (xOf(d.type === "SS" || d.type === "SF" ? pr.start : pr.end)) + (d.type === "SS" || d.type === "SF" ? 0 : DAY);
              const y1 = rowIdx[d.id] * ROW + ROW / 2;
              const x2 = xOf(me2.start); const y2 = rowIdx[task.id] * ROW + ROW / 2;
              const mx = Math.max(x1 + 8, x2 - 8);
              return <path key={task.id + d.id} d={`M${x1},${y1} H${mx} V${y2} H${x2}`} fill="none" stroke="#94a3b8" strokeWidth="1.3" markerEnd="url(#ar)" />;
            }))}
          </svg>
          {rows.map(({ task, depth, hasKids }) => {
            const r = sched.res[task.id]; if (!r) return null;
            const u = resById[(task.assignments || [])[0]?.resId];
            const isMile = task.type === "milestone", isSum = hasKids;
            const left = xOf(r.start), w = Math.max((r.dur || 1), 1) * DAY;
            const col = r.critical ? "#ef4444" : isSum ? "#475569" : STATUS[task.status].c;
            return <div key={task.id} className="flex items-center border-b border-slate-100 hover:bg-slate-50" style={{ height: ROW }}>
              <div style={{ width: LBL }} className="flex shrink-0 items-center gap-1 px-2" >
                <span style={{ width: depth * 14 }} />
                {hasKids ? <button onClick={() => toggleCollapse(task.id)} className="text-slate-400">{collapsed.has(task.id) ? <ChevronRight size={14} /> : <ChevronDown size={14} />}</button>
                  : <button onClick={() => toggleDone(task)} disabled={!canEdit(task) || isMile} className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${task.status === "done" ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"} ${canEdit(task) && !isMile ? "" : "opacity-30"}`}>{task.status === "done" && <Check size={11} />}</button>}
                <button onClick={() => onEdit(task)} className={`flex-1 truncate text-start text-sm hover:text-teal-700 ${isSum ? "font-semibold" : ""}`} title={task.name}>{task.name}</button>
                {r.critical && !isSum && <span className="rounded bg-rose-100 px-1 text-[9px] font-bold text-rose-600">CP</span>}
              </div>
              <div className="relative" style={{ width: nDays * DAY, height: ROW }}>
                {showBaseline && task.baseline && <div className="absolute rounded-sm bg-slate-300" style={{ left: xOf(task.baseline.start), width: Math.max(workBetween(task.baseline.start, task.baseline.end, { week: [0, 6], holidays: [] }), 1) * DAY, height: 4, bottom: 6 }} />}
                {isMile ? <div onClick={() => onEdit(task)} className="absolute cursor-pointer" style={{ left: left + DAY / 2 - 8, top: ROW / 2 - 8 }}><Diamond size={16} fill={col} color={col} /></div>
                  : isSum ? <div onClick={() => onEdit(task)} className="absolute cursor-pointer rounded-sm" style={{ left, width: w, height: 8, top: ROW / 2 - 4, background: col }} />
                    : <div onClick={() => onEdit(task)} className="absolute top-1/2 flex cursor-pointer items-center rounded-md shadow-sm" style={{ left, width: w, height: 22, marginTop: -11, background: col + "33", border: `1px solid ${col}` }}>
                      <div className="h-full rounded-s-md" style={{ width: `${r.progress}%`, background: col }} />
                      <div className="absolute inset-0 flex items-center gap-1 px-1"><Avatar user={u} size={15} /><span className="truncate text-[9px] font-medium text-slate-700">{r.progress}%</span></div>
                    </div>}
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </div>;
}

/* ================================================================== */
/*  BOARD                                                              */
/* ================================================================== */
function Board({ t, projTasks, sched, resById, canEdit, setStatus, onEdit, onAdd }) {
  const cols = [["todo", t.todo], ["inprogress", t.inprogress], ["done", t.done]];
  const [drag, setDrag] = useState(null);
  const items = projTasks.filter((x) => x.type !== "milestone" && !projTasks.some((y) => y.parentId === x.id));
  return <div>
    <div className="mb-3 flex justify-end"><button onClick={() => onAdd(null)} className={btnP}><Plus size={15} /> {t.addTask}</button></div>
    <div className="grid gap-3 md:grid-cols-3">
      {cols.map(([key, label]) => <div key={key} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag) { setStatus(drag, key); setDrag(null); } }} className="rounded-xl bg-slate-100 p-2.5">
        <div className="mb-2 flex items-center gap-2 px-1 text-sm font-semibold"><span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS[key].c }} />{label} <span className="text-slate-400">({items.filter((x) => x.status === key).length})</span></div>
        <div className="space-y-2">{items.filter((x) => x.status === key).map((task) => { const u = resById[(task.assignments || [])[0]?.resId]; const r = sched.res[task.id]; return <div key={task.id} draggable={canEdit(task)} onDragStart={() => setDrag(task)} onClick={() => onEdit(task)} className={`rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm ${canEdit(task) ? "cursor-grab" : "opacity-70"}`}>
          <div className="mb-2 flex items-start justify-between gap-2"><span className="text-sm font-medium leading-snug">{task.name}</span><div className="flex shrink-0 items-center gap-1">{r?.critical && <span className="rounded bg-rose-100 px-1 text-[9px] font-bold text-rose-600">CP</span>}<Flag size={12} style={{ color: PRIO[task.priority] }} /></div></div>
          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full" style={{ width: `${r?.progress || 0}%`, background: STATUS[task.status].c }} /></div>
          <div className="flex items-center justify-between"><div className="flex items-center gap-1.5"><Avatar user={u} size={20} /><span className="text-[11px] text-slate-500">{u ? u.name : t.unassigned}</span></div>{r && <span className="text-[11px] text-slate-400">{pd(r.end).getMonth() + 1}/{pd(r.end).getDate()}</span>}</div>
        </div>; })}</div>
      </div>)}
    </div>
  </div>;
}

/* ================================================================== */
/*  LIST (WBS + filter/group/sort + custom fields)                     */
/* ================================================================== */
function ListView({ t, projTasks, sched, resById, resources, canEdit, toggleDone, onEdit, onAdd, removeTask, isManager, collapsed, toggleCollapse }) {
  const [fAssignee, setFA] = useState("");
  const [fStatus, setFS] = useState("");
  const [sort, setSort] = useState("wbs");
  if (projTasks.length === 0) return <Empty t={t} onAdd={() => onAdd(null)} />;
  let rows = orderedTree(projTasks);
  if (fAssignee) rows = rows.filter(({ task }) => (task.assignments || []).some((a) => a.resId === fAssignee) || task.type === "summary");
  if (fStatus) rows = rows.filter(({ task }) => task.status === fStatus || task.type === "summary");
  rows = rows.filter(({ task }) => { let p = task.parentId; while (p) { if (collapsed.has(p)) return false; p = projTasks.find((x) => x.id === p)?.parentId; } return true; });
  if (sort === "end") rows = [...rows].sort((a, b) => pd(sched.res[a.task.id]?.end || "2099-01-01") - pd(sched.res[b.task.id]?.end || "2099-01-01"));
  if (sort === "prio") { const o = { high: 0, med: 1, low: 2 }; rows = [...rows].sort((a, b) => o[a.task.priority] - o[b.task.priority]); }

  return <div className="rounded-xl border border-slate-200 bg-white">
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-2.5 print:hidden">
      <select value={fAssignee} onChange={(e) => setFA(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs"><option value="">{t.assignee}: {t.all}</option>{resources.filter((r) => r.type === "work").map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select>
      <select value={fStatus} onChange={(e) => setFS(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs"><option value="">{t.status}: {t.all}</option><option value="todo">{t.todo}</option><option value="inprogress">{t.inprogress}</option><option value="done">{t.done}</option></select>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs"><option value="wbs">{t.sortBy}: WBS</option><option value="end">{t.end}</option><option value="prio">{t.priority}</option></select>
      <div className="flex-1" /><button onClick={() => onAdd(null)} className={btnP}><Plus size={15} /> {t.addTask}</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-slate-200 text-xs text-slate-400">
          <th className="w-6 py-2 ps-3"></th><th className="py-2 text-start font-medium">{t.taskName}</th><th className="py-2 text-start font-medium">{t.assignee}</th>
          <th className="py-2 text-start font-medium">{t.start}</th><th className="py-2 text-start font-medium">{t.end}</th><th className="py-2 text-start font-medium">{t.progress}</th>
          <th className="py-2 text-start font-medium">{t.slack}</th><th className="py-2 text-start font-medium">{t.cost}</th><th className="py-2 text-start font-medium">{t.priority}</th>{isManager && <th className="pe-3"></th>}
        </tr></thead>
        <tbody>{rows.map(({ task, depth, hasKids }) => { const r = sched.res[task.id]; const u = resById[(task.assignments || [])[0]?.resId]; const isMile = task.type === "milestone"; return <tr key={task.id} className="border-b border-slate-100 hover:bg-slate-50">
          <td className="ps-3">{hasKids ? <button onClick={() => toggleCollapse(task.id)} className="text-slate-400">{collapsed.has(task.id) ? <ChevronRight size={14} /> : <ChevronDown size={14} />}</button> : <button onClick={() => toggleDone(task)} disabled={!canEdit(task) || isMile} className={`flex h-4 w-4 items-center justify-center rounded border ${task.status === "done" ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"} ${canEdit(task) && !isMile ? "" : "opacity-30"}`}>{task.status === "done" && <Check size={11} />}</button>}</td>
          <td className="py-2"><div className="flex items-center" style={{ paddingInlineStart: depth * 16 }}>{isMile && <Diamond size={11} className="me-1 text-slate-500" />}<button onClick={() => onEdit(task)} className={`text-start hover:text-teal-700 ${hasKids ? "font-semibold" : ""} ${task.status === "done" ? "text-slate-400 line-through" : ""}`}>{task.name}</button>{r?.critical && !hasKids && <span className="ms-1.5 rounded bg-rose-100 px-1 text-[9px] font-bold text-rose-600">CP</span>}{(task.notes || task.checklist?.length > 0) && <StickyNote size={11} className="ms-1 text-slate-300" />}</div></td>
          <td><div className="flex items-center gap-1"><Avatar user={u} size={20} /><span className="text-xs">{u ? u.name : "—"}</span>{(task.assignments || []).length > 1 && <span className="text-[10px] text-slate-400">+{task.assignments.length - 1}</span>}</div></td>
          <td className="text-xs text-slate-500">{r?.start}</td>
          <td className={`text-xs ${task.status !== "done" && r && diff(TODAY, r.end) < 0 ? "font-semibold text-rose-500" : "text-slate-500"}`}>{r?.end}</td>
          <td><div className="flex items-center gap-1"><div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100"><div className="h-full" style={{ width: `${r?.progress || 0}%`, background: STATUS[task.status].c }} /></div><span className="text-[10px] text-slate-400">{r?.progress || 0}%</span></div></td>
          <td className="text-xs">{r && !hasKids && r.slack != null ? <span className={r.slack <= 0 ? "font-semibold text-rose-500" : "text-slate-400"}>{r.slack}{t.days[0]}</span> : "—"}</td>
          <td className="text-xs text-slate-500">{!hasKids ? money(costOf(task, sched, resById)) : ""}</td>
          <td>{!hasKids && !isMile && <span className="rounded px-1.5 py-0.5 text-[11px] font-medium" style={{ color: PRIO[task.priority], background: PRIO[task.priority] + "22" }}>{t[task.priority]}</span>}</td>
          {isManager && <td className="pe-3 text-end"><button onClick={() => removeTask(task.id)} className="text-slate-300 hover:text-rose-500"><Trash2 size={14} /></button></td>}
        </tr>; })}</tbody>
      </table>
    </div>
  </div>;
}

/* ================================================================== */
/*  NETWORK (PERT)                                                     */
/* ================================================================== */
function Network({ t, projTasks, sched, resById }) {
  const leaves = projTasks.filter((x) => !projTasks.some((y) => y.parentId === x.id));
  const byId = Object.fromEntries(leaves.map((x) => [x.id, x]));
  const level = {}; const lv = (id, g = 0) => { if (g > 50) return 0; const t2 = byId[id]; if (!t2) return 0; if (level[id] != null) return level[id]; const deps = (t2.deps || []).filter((d) => byId[d.id]); const l = deps.length ? Math.max(...deps.map((d) => lv(d.id, g + 1) + 1)) : 0; level[id] = l; return l; };
  leaves.forEach((x) => lv(x.id));
  const cols = {}; leaves.forEach((x) => { (cols[level[x.id]] = cols[level[x.id]] || []).push(x); });
  const CW = 180, CH = 78, GX = 60, GY = 22;
  const pos = {}; Object.keys(cols).forEach((c) => cols[c].forEach((x, r) => { pos[x.id] = { x: c * (CW + GX) + 20, y: r * (CH + GY) + 20 }; }));
  const maxR = Math.max(...Object.values(cols).map((c) => c.length), 1);
  const W = (Object.keys(cols).length) * (CW + GX) + 40, H = maxR * (CH + GY) + 40;
  return <div className="overflow-auto rounded-xl border border-slate-200 bg-white p-2">
    <svg width={W} height={H} style={{ minWidth: "100%" }}>
      <defs><marker id="na" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L7,4 L0,8 Z" fill="#94a3b8" /></marker></defs>
      {leaves.flatMap((x) => (x.deps || []).map((d) => { const a = pos[d.id], b = pos[x.id]; if (!a || !b) return null; const x1 = a.x + CW, y1 = a.y + CH / 2, x2 = b.x, y2 = b.y + CH / 2, mx = (x1 + x2) / 2; return <path key={x.id + d.id} d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#na)" />; }))}
      {leaves.map((x) => { const p = pos[x.id]; const r = sched.res[x.id]; const crit = r?.critical; const u = resById[(x.assignments || [])[0]?.resId]; return <g key={x.id} transform={`translate(${p.x},${p.y})`}>
        <rect width={CW} height={CH} rx="8" fill="white" stroke={crit ? "#ef4444" : "#cbd5e1"} strokeWidth={crit ? "2" : "1"} />
        <rect width={CW} height="22" rx="8" fill={crit ? "#fef2f2" : "#f8fafc"} />
        <text x="10" y="15" fontSize="11" fontWeight="600" fill="#334155">{x.name.slice(0, 24)}</text>
        <text x="10" y="40" fontSize="10" fill="#64748b">{r?.start} → {r?.end}</text>
        <text x="10" y="56" fontSize="10" fill="#64748b">{t.progress}: {r?.progress || 0}% · {t.slack} {r?.slack ?? "—"}{t.days[0]}</text>
        <text x="10" y="71" fontSize="10" fill="#94a3b8">{u ? u.name : t.unassigned}</text>
        {crit && <text x={CW - 10} y="15" fontSize="9" fontWeight="700" fill="#ef4444" textAnchor="end">CP</text>}
      </g>; })}
    </svg>
  </div>;
}

/* ================================================================== */
/*  CALENDAR                                                           */
/* ================================================================== */
function CalendarView({ t, projTasks, sched, resById }) {
  const [month, setMonth] = useState(() => (sched.projStart || TODAY).slice(0, 7));
  const first = pd(month + "-01"); const y = first.getFullYear(), m = first.getMonth();
  const startDay = first.getDay(); const dim = new Date(y, m + 1, 0).getDate();
  const cells = []; for (let i = 0; i < startDay; i++) cells.push(null); for (let d = 1; d <= dim; d++) cells.push(`${month}-${String(d).padStart(2, "0")}`);
  const leaves = projTasks.filter((x) => x.type !== "summary");
  const onDay = (day) => leaves.filter((x) => { const r = sched.res[x.id]; return r && pd(day) >= pd(r.start) && pd(day) <= pd(r.end); });
  const shift = (n) => { const d = new Date(y, m + n, 1); setMonth(iso(d).slice(0, 7)); };
  const wd = t.dir === "rtl" ? ["ی", "د", "س", "چ", "پ", "ج", "ش"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return <div className="rounded-xl border border-slate-200 bg-white p-3">
    <div className="mb-2 flex items-center justify-between"><button onClick={() => shift(-1)} className={btnG}>‹</button><span className="font-semibold">{first.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</span><button onClick={() => shift(1)} className={btnG}>›</button></div>
    <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400">{wd.map((d, i) => <div key={i} className="py-1">{d}</div>)}</div>
    <div className="grid grid-cols-7 gap-1">{cells.map((day, i) => <div key={i} className={`min-h-20 rounded-lg border p-1 ${day === TODAY ? "border-teal-400 bg-teal-50" : "border-slate-100"}`}>
      {day && <><div className="mb-0.5 text-[11px] text-slate-400">{pd(day).getDate()}</div>{onDay(day).slice(0, 3).map((x) => { const u = resById[(x.assignments || [])[0]?.resId]; return <div key={x.id} className="mb-0.5 truncate rounded px-1 text-[9px] text-white" style={{ background: (sched.res[x.id]?.critical ? "#ef4444" : STATUS[x.status].c) }} title={x.name}>{x.type === "milestone" ? "◆ " : ""}{x.name}</div>; })}{onDay(day).length > 3 && <div className="text-[9px] text-slate-400">+{onDay(day).length - 3}</div>}</>}
    </div>)}</div>
  </div>;
}

/* ================================================================== */
/*  WORKLOAD                                                           */
/* ================================================================== */
function Workload({ t, projTasks, sched, resById, workRes, cal }) {
  const { projStart, projEnd } = sched;
  const days = []; let d = projStart; let g = 0; while (pd(d) <= pd(projEnd) && g < 120) { days.push(d); d = addD(d, 1); g++; }
  const leaves = projTasks.filter((x) => x.type !== "summary" && x.type !== "milestone");
  const loadFor = (resId, day) => { let u = 0; leaves.forEach((x) => { const r = sched.res[x.id]; if (!r) return; if (pd(day) >= pd(r.start) && pd(day) <= pd(r.end) && isWorking(day, cal)) { const a = (x.assignments || []).find((y) => y.resId === resId); if (a) u += a.units; } }); return u; };
  return <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-2">
    <div className="mb-2 flex items-center gap-3 px-2 text-xs text-slate-500"><span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-teal-200" />≤100%</span><span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-rose-400" />{t.overalloc}</span></div>
    <table className="text-xs"><thead><tr><th className="sticky start-0 bg-white px-2 py-1 text-start">{t.resources}</th>{days.map((day, i) => { const dt = pd(day); return <th key={i} className={`w-7 px-0 text-center font-normal ${dt.getDay() === 0 || dt.getDay() === 6 ? "text-slate-300" : "text-slate-400"}`}>{dt.getDate()}</th>; })}</tr></thead>
      <tbody>{workRes.map((u) => <tr key={u.id}><td className="sticky start-0 bg-white px-2 py-1"><div className="flex items-center gap-1.5"><Avatar user={u} size={22} /><span>{u.name}</span></div></td>
        {days.map((day, i) => { const load = loadFor(u.id, day); const over = load > 100; const bg = load === 0 ? "transparent" : over ? "#fb7185" : load >= 100 ? "#5eead4" : "#99f6e4"; return <td key={i} className="p-0.5"><div className="flex h-6 items-center justify-center rounded text-[9px]" style={{ background: bg, color: over ? "white" : "#0f766e" }} title={`${load}%`}>{load > 0 ? load : ""}</div></td>; })}
      </tr>)}</tbody>
    </table>
  </div>;
}

/* ================================================================== */
/*  DASHBOARD (EVM + burndown SVG + progress)                          */
/* ================================================================== */
function Dashboard({ t, projTasks, sched, resById, costOf, cal, activity, resById: _r }) {
  const leaves = projTasks.filter((x) => x.type !== "summary" && x.type !== "milestone");
  const totalCost = leaves.reduce((a, x) => a + costOf(x), 0);
  const EV = leaves.reduce((a, x) => a + costOf(x) * ((sched.res[x.id]?.progress || 0) / 100), 0);
  const PV = leaves.reduce((a, x) => { const r = sched.res[x.id]; if (!r) return a; const planned = pd(TODAY) >= pd(r.end) ? 1 : pd(TODAY) <= pd(r.start) ? 0 : (diff(r.start, TODAY) / Math.max(diff(r.start, r.end), 1)); return a + costOf(x) * Math.min(1, Math.max(0, planned)); }, 0);
  const AC = EV > 0 ? EV / 0.92 : 0;
  const SPI = PV > 0 ? EV / PV : 1, CPI = AC > 0 ? EV / AC : 1;
  const { projStart, projEnd } = sched;
  const days = []; let d = projStart, g = 0; while (pd(d) <= pd(projEnd) && g < 120) { days.push(d); d = addD(d, 2); g++; }
  const totDur = leaves.reduce((a, x) => a + (sched.res[x.id]?.dur || 0), 0) || 1;
  const overallProg = Math.round(leaves.reduce((a, x) => a + (sched.res[x.id]?.dur || 0) * (sched.res[x.id]?.progress || 0), 0) / totDur);

  const W = 560, Hc = 180, pad = 30;
  const idealY = (i) => Hc - pad - (Hc - 2 * pad) * (1 - i / (days.length - 1 || 1));
  const doneByDay = (day) => { let done = 0; leaves.forEach((x) => { const r = sched.res[x.id]; if (r && pd(r.end) <= pd(day)) done += (r.dur || 0) * (x.progress || 0) / 100; }); return done; };
  const actualY = (day) => Hc - pad - (Hc - 2 * pad) * (1 - (totDur - doneByDay(day)) / totDur);
  const xAt = (i) => pad + (W - 2 * pad) * (i / (days.length - 1 || 1));

  const card = (label, val, color, sub) => <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="text-xs text-slate-400">{label}</div><div className="text-xl font-bold" style={{ color }}>{val}</div>{sub && <div className="text-[11px] text-slate-400">{sub}</div>}</div>;

  return <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {card(t.budget, money(totalCost), "#334155")}
      {card(t.pv, money(PV), "#2563eb")}
      {card(t.ev, money(EV), "#10b981")}
      {card(t.ac, money(AC), "#ea580c")}
      {card(t.spi, SPI.toFixed(2), SPI >= 1 ? "#10b981" : "#ef4444", SPI >= 1 ? "on schedule" : "behind")}
      {card(t.cpi, CPI.toFixed(2), CPI >= 1 ? "#10b981" : "#ef4444", CPI >= 1 ? "under budget" : "over budget")}
    </div>
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600"><Gauge size={15} /> {t.burndown}</div>
        <svg viewBox={`0 0 ${W} ${Hc}`} className="w-full">
          <line x1={pad} y1={Hc - pad} x2={W - pad} y2={Hc - pad} stroke="#e2e8f0" /><line x1={pad} y1={pad} x2={pad} y2={Hc - pad} stroke="#e2e8f0" />
          <polyline fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" points={days.map((_, i) => `${xAt(i)},${idealY(i)}`).join(" ")} />
          <polyline fill="none" stroke="#0d9488" strokeWidth="2.5" points={days.map((day, i) => `${xAt(i)},${actualY(day)}`).join(" ")} />
          <text x={pad} y={pad - 8} fontSize="10" fill="#94a3b8">{t.planned} (---) · {t.actual} (—)</text>
        </svg>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-slate-600">{t.progress}: {overallProg}%</div>
        <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-500" style={{ width: `${overallProg}%` }} /></div>
        <div className="mb-2 text-sm font-semibold text-slate-600">{t.activity}</div>
        <div className="max-h-40 space-y-1.5 overflow-y-auto">{activity.length === 0 && <div className="text-xs text-slate-400">—</div>}{activity.map((a) => <div key={a.id} className="flex items-center gap-1.5 text-[11px] text-slate-500"><Avatar user={resById[a.by]} size={16} /> {a.txt}</div>)}</div>
      </div>
    </div>
  </div>;
}

/* ================================================================== */
/*  CHAT (group + DM)                                                  */
/* ================================================================== */
const dmKey = (a, b) => "dm:" + [a, b].sort().join("_");
function Chat({ t, msgs, setMsgs, pid, me, resById, users, projects }) {
  const groupCh = "proj:" + pid;
  const [active, setActive] = useState(groupCh);
  const [txt, setTxt] = useState("");
  const boxRef = useRef(null);
  useEffect(() => { setActive("proj:" + pid); }, [pid]);
  const list = msgs.filter((m) => m.channel === active);
  useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight; }, [list.length, active]);
  const send = () => { if (!txt.trim()) return; setMsgs((p) => [...p, { id: "m" + Date.now(), channel: active, sender: me, text: txt.trim(), ts: Date.now() }]); setTxt(""); };
  const projName = projects.find((p) => p.id === pid)?.name;
  const others = users.filter((u) => u.id !== me);
  const lastOf = (ch) => { const a = msgs.filter((m) => m.channel === ch); return a.length ? a[a.length - 1].text : ""; };
  const isGroup = active === groupCh;
  const partner = isGroup ? null : resById[active.replace("dm:", "").split("_").find((x) => x !== me)];
  return <div className="mx-auto flex h-[72vh] max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white">
    <aside className="w-52 shrink-0 overflow-y-auto border-e border-slate-200 bg-slate-50">
      <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase text-slate-400">{t.conversations}</div>
      <button onClick={() => setActive(groupCh)} className={`flex w-full items-center gap-2 px-3 py-2 text-start ${isGroup ? "bg-teal-50" : "hover:bg-slate-100"}`}><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm text-white">#</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{projName}</div><div className="truncate text-[11px] text-slate-400">{t.groupChat}</div></div></button>
      <div className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase text-slate-400">{t.direct}</div>
      {others.map((u) => { const ch = dmKey(me, u.id), on = active === ch; return <button key={u.id} onClick={() => setActive(ch)} className={`flex w-full items-center gap-2 px-3 py-2 text-start ${on ? "bg-teal-50" : "hover:bg-slate-100"}`}><Avatar user={u} size={32} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{u.name}</div><div className="truncate text-[11px] text-slate-400">{lastOf(ch) || "—"}</div></div></button>; })}
    </aside>
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">{isGroup ? <span># {projName}</span> : <><Avatar user={partner} size={22} /><span>{partner?.name}</span></>}</div>
      <div ref={boxRef} className="flex-1 space-y-3 overflow-y-auto p-4">{list.length === 0 && <p className="mt-10 text-center text-sm text-slate-400">{t.noMessages}</p>}
        {list.map((m) => { const u = resById[m.sender], mine = m.sender === me; return <div key={m.id} className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : ""}`}><Avatar user={u} size={26} /><div className={`max-w-[75%] ${mine ? "text-end" : ""}`}>{isGroup && !mine && <div className="mb-0.5 text-[11px] text-slate-400">{u?.name}</div>}<div className={`inline-block rounded-2xl px-3 py-2 text-sm ${mine ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-700"}`}>{m.text}</div></div></div>; })}
      </div>
      <div className="flex items-center gap-2 border-t border-slate-200 p-3"><input value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={t.chatPh} className={inp} /><button onClick={send} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white hover:bg-teal-700"><Send size={16} /></button></div>
    </div>
  </div>;
}

/* ================================================================== */
/*  TEAM / RESOURCES                                                   */
/* ================================================================== */
function Team({ t, resources, setResources, isManager, me, onAddRes, sched, projTasks }) {
  const leaves = projTasks.filter((x) => x.type !== "summary" && x.type !== "milestone");
  const loadOf = (id) => leaves.filter((x) => (x.assignments || []).some((a) => a.resId === id) && x.status !== "done").length;
  return <div className="mx-auto max-w-2xl">
    <div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-semibold text-slate-600">{t.resources} ({resources.length})</h2>{isManager && <button onClick={onAddRes} className={btnP}><Plus size={15} /> {t.addUser}</button>}</div>
    {!isManager && <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">{t.managersOnly}</p>}
    <div className="space-y-2">{resources.map((u) => <div key={u.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
      <Avatar user={u} size={38} />
      <div className="flex-1"><div className="text-sm font-medium">{u.name}{u.id === me && <span className="ms-1 text-[11px] text-slate-400">(you)</span>}</div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">{u.type === "material" ? <span className="flex items-center gap-1"><Paperclip size={11} /> {t.material}</span> : <span className="flex items-center gap-1" style={{ color: u.role === "manager" ? "#0d9488" : "#94a3b8" }}>{u.role === "manager" ? <Shield size={11} /> : <UserIcon size={11} />}{u.role === "manager" ? t.manager : t.member}</span>}<span>· {money(u.rate)}/{u.type === "material" ? "u" : "h"}</span>{u.type === "work" && <span>· {loadOf(u.id)} {t.myTasks}</span>}</div>
      </div>
      {isManager && u.id !== me && <button onClick={() => setResources((p) => p.filter((x) => x.id !== u.id))} className="text-slate-300 hover:text-rose-500"><Trash2 size={16} /></button>}
    </div>)}</div>
  </div>;
}

/* ================================================================== */
/*  MODALS                                                             */
/* ================================================================== */
function TaskModal({ t, task, resources, projTasks, onSave, onDelete, onClose }) {
  const editing = !!task.id;
  const [f, setF] = useState({
    id: task.id, name: task.name || "", type: task.type || "task", parentId: task.parentId || "",
    start: task.start || TODAY, durationDays: task.durationDays ?? 3, progress: task.progress ?? 0,
    status: task.status || "todo", priority: task.priority || "med", deps: task.deps || [],
    assignments: task.assignments || [], fixedCost: task.fixedCost || 0, deadline: task.deadline || "",
    constraint: task.constraint || { type: "ASAP", date: "" }, notes: task.notes || "",
    checklist: task.checklist || [], client: task.client || "", billable: task.billable ?? true, baseline: task.baseline || null,
  });
  const [recur, setRecur] = useState({ on: false, count: 3, every: 7 });
  const [chk, setChk] = useState("");
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const summaries = projTasks.filter((x) => x.id !== f.id && (x.type === "summary" || projTasks.some((y) => y.parentId === x.id)));
  const candidates = projTasks.filter((x) => x.id !== f.id && x.type !== "summary");
  const addDep = () => set("deps", [...f.deps, { id: candidates[0]?.id, type: "FS", lag: 0 }]);
  const save = () => { if (!f.name.trim()) return; let { status, progress } = f; progress = Number(progress); if (f.type === "milestone") { progress = f.status === "done" ? 100 : 0; } else if (progress >= 100) { status = "done"; progress = 100; } else if (progress > 0 && status === "todo") status = "inprogress"; else if (progress === 0 && status === "done") status = "todo"; onSave({ ...f, progress, status, durationDays: f.type === "milestone" ? 0 : Number(f.durationDays), fixedCost: Number(f.fixedCost) }, recur.on ? recur : null); };
  return <Modal onClose={onClose} wide>
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3"><h3 className="font-semibold">{editing ? t.editTask : t.addTask}</h3><button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button></div>
    <div className="space-y-3 p-4">
      <div><label className="mb-1 block text-xs text-slate-500">{t.taskName}</label><input value={f.name} onChange={(e) => set("name", e.target.value)} className={inp} autoFocus /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-xs text-slate-500">{t.type}</label><select value={f.type} onChange={(e) => set("type", e.target.value)} className={inp}><option value="task">{t.task}</option><option value="summary">{t.summary}</option><option value="milestone">{t.milestone}</option></select></div>
        <div><label className="mb-1 block text-xs text-slate-500">{t.subtaskOf}</label><select value={f.parentId} onChange={(e) => set("parentId", e.target.value)} className={inp}><option value="">—</option>{summaries.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
      </div>
      {f.type !== "summary" && <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-xs text-slate-500">{t.start}</label><input type="date" value={f.start} onChange={(e) => set("start", e.target.value)} className={inp} /></div>
        {f.type !== "milestone" && <div><label className="mb-1 block text-xs text-slate-500">{t.durationD}</label><input type="number" min="1" value={f.durationDays} onChange={(e) => set("durationDays", e.target.value)} className={inp} /></div>}
      </div>}
      {f.type === "task" && <>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="mb-1 block text-xs text-slate-500">{t.priority}</label><select value={f.priority} onChange={(e) => set("priority", e.target.value)} className={inp}><option value="high">{t.high}</option><option value="med">{t.med}</option><option value="low">{t.low}</option></select></div>
          <div><label className="mb-1 block text-xs text-slate-500">{t.fixedCost} ($)</label><input type="number" value={f.fixedCost} onChange={(e) => set("fixedCost", e.target.value)} className={inp} /></div>
        </div>
        <div><label className="mb-1 block text-xs text-slate-500">{t.progress}: {f.progress}%</label><input type="range" min="0" max="100" step="5" value={f.progress} onChange={(e) => set("progress", e.target.value)} className="w-full accent-teal-600" /></div>
        {/* assignments */}
        <div><label className="mb-1 block text-xs text-slate-500">{t.assignee} · {t.units}</label>
          {f.assignments.map((a, i) => <div key={i} className="mb-1.5 flex items-center gap-2">
            <select value={a.resId} onChange={(e) => set("assignments", f.assignments.map((x, j) => j === i ? { ...x, resId: e.target.value } : x))} className={inp}>{resources.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
            <input type="number" value={a.units} onChange={(e) => set("assignments", f.assignments.map((x, j) => j === i ? { ...x, units: Number(e.target.value) } : x))} className="w-20 rounded-lg border border-slate-300 px-2 py-2 text-sm" />
            <button onClick={() => set("assignments", f.assignments.filter((_, j) => j !== i))} className="text-slate-300 hover:text-rose-500"><X size={16} /></button>
          </div>)}
          <button onClick={() => set("assignments", [...f.assignments, { resId: resources[0].id, units: 100 }])} className="text-xs text-teal-600 hover:underline">+ {t.assignee}</button>
        </div>
      </>}
      {/* dependencies */}
      {f.type !== "summary" && candidates.length > 0 && <div><label className="mb-1 block text-xs text-slate-500">{t.dependsOn}</label>
        {f.deps.map((d, i) => <div key={i} className="mb-1.5 flex items-center gap-1.5">
          <select value={d.id} onChange={(e) => set("deps", f.deps.map((x, j) => j === i ? { ...x, id: e.target.value } : x))} className={inp}>{candidates.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select>
          <select value={d.type} onChange={(e) => set("deps", f.deps.map((x, j) => j === i ? { ...x, type: e.target.value } : x))} className="w-20 rounded-lg border border-slate-300 px-1 py-2 text-sm">{DEPTYPES.map((x) => <option key={x} value={x}>{x}</option>)}</select>
          <input type="number" title={t.lag} value={d.lag} onChange={(e) => set("deps", f.deps.map((x, j) => j === i ? { ...x, lag: Number(e.target.value) } : x))} className="w-16 rounded-lg border border-slate-300 px-2 py-2 text-sm" />
          <button onClick={() => set("deps", f.deps.filter((_, j) => j !== i))} className="text-slate-300 hover:text-rose-500"><X size={16} /></button>
        </div>)}
        <button onClick={addDep} className="text-xs text-teal-600 hover:underline">+ {t.dependsOn}</button>
      </div>}
      {f.type !== "summary" && <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-xs text-slate-500">{t.deadline}</label><input type="date" value={f.deadline} onChange={(e) => set("deadline", e.target.value)} className={inp} /></div>
        <div><label className="mb-1 block text-xs text-slate-500">{t.constraint}</label><select value={f.constraint.type} onChange={(e) => set("constraint", { ...f.constraint, type: e.target.value })} className={inp}><option value="ASAP">{t.asap}</option><option value="MSO">{t.mso}</option><option value="SNET">{t.snet}</option></select></div>
      </div>}
      {f.type === "task" && <>
        <div><label className="mb-1 block text-xs text-slate-500">{t.checklist}</label>
          {f.checklist.map((c, i) => <div key={c.id} className="mb-1 flex items-center gap-2"><button onClick={() => set("checklist", f.checklist.map((x, j) => j === i ? { ...x, done: !x.done } : x))} className={`flex h-4 w-4 items-center justify-center rounded border ${c.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}>{c.done && <Check size={11} />}</button><span className={`flex-1 text-sm ${c.done ? "text-slate-400 line-through" : ""}`}>{c.text}</span><button onClick={() => set("checklist", f.checklist.filter((_, j) => j !== i))} className="text-slate-300 hover:text-rose-500"><X size={14} /></button></div>)}
          <div className="flex gap-2"><input value={chk} onChange={(e) => setChk(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && chk.trim()) { set("checklist", [...f.checklist, { id: "c" + Date.now(), text: chk.trim(), done: false }]); setChk(""); } }} placeholder={t.addChk} className={inp} /></div>
        </div>
        <div><label className="mb-1 block text-xs text-slate-500">{t.notes}</label><textarea value={f.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className={inp} /></div>
        {!editing && <div className="rounded-lg bg-slate-50 p-2"><label className="flex items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={recur.on} onChange={(e) => setRecur({ ...recur, on: e.target.checked })} className="accent-teal-600" /> {t.recurring}</label>
          {recur.on && <div className="mt-2 flex items-center gap-2 text-xs"><input type="number" min="2" value={recur.count} onChange={(e) => setRecur({ ...recur, count: Number(e.target.value) })} className="w-16 rounded border border-slate-300 px-2 py-1" /> {t.times} · {t.everyDays} <input type="number" min="1" value={recur.every} onChange={(e) => setRecur({ ...recur, every: Number(e.target.value) })} className="w-16 rounded border border-slate-300 px-2 py-1" /></div>}
        </div>}
      </>}
    </div>
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
      {editing ? <button onClick={() => onDelete(f.id)} className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600"><Trash2 size={15} /> {t.delete}</button> : <span />}
      <div className="flex gap-2"><button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100">{t.cancel}</button><button onClick={save} className={btnP}>{t.save}</button></div>
    </div>
  </Modal>;
}

function ResModal({ t, onSave, onClose }) {
  const [f, setF] = useState({ name: "", role: "member", type: "work", rate: 30, capacity: 8 });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const save = () => { if (!f.name.trim()) return; onSave({ id: "u" + Date.now(), name: f.name.trim(), role: f.type === "work" ? f.role : "", type: f.type, rate: Number(f.rate), capacity: Number(f.capacity), color: AVA[Math.floor(Math.random() * AVA.length)] }); };
  return <Modal onClose={onClose}>
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3"><h3 className="font-semibold">{t.addUser}</h3><button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button></div>
    <div className="space-y-3 p-4">
      <div><label className="mb-1 block text-xs text-slate-500">{t.userName}</label><input value={f.name} onChange={(e) => set("name", e.target.value)} className={inp} autoFocus /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="mb-1 block text-xs text-slate-500">{t.resType}</label><select value={f.type} onChange={(e) => set("type", e.target.value)} className={inp}><option value="work">{t.work}</option><option value="material">{t.material}</option></select></div>
        {f.type === "work" && <div><label className="mb-1 block text-xs text-slate-500">{t.role}</label><select value={f.role} onChange={(e) => set("role", e.target.value)} className={inp}><option value="member">{t.member}</option><option value="manager">{t.manager}</option></select></div>}
        <div><label className="mb-1 block text-xs text-slate-500">{t.rate} ($)</label><input type="number" value={f.rate} onChange={(e) => set("rate", e.target.value)} className={inp} /></div>
        {f.type === "work" && <div><label className="mb-1 block text-xs text-slate-500">{t.capacity} (h)</label><input type="number" value={f.capacity} onChange={(e) => set("capacity", e.target.value)} className={inp} /></div>}
      </div>
    </div>
    <div className="flex justify-end gap-2 border-t border-slate-200 px-4 py-3"><button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100">{t.cancel}</button><button onClick={save} className={btnP}>{t.save}</button></div>
  </Modal>;
}

function Empty({ t, onAdd }) {
  return <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16"><ListChecks size={32} className="mb-3 text-slate-300" /><p className="mb-4 text-sm text-slate-400">{t.noTasks}</p><button onClick={onAdd} className={btnP}><Plus size={15} /> {t.addTask}</button></div>;
}
