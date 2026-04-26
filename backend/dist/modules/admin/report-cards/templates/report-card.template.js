"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportCardHtml = getReportCardHtml;
function getReportCardHtml(data) {
    const { student, class: schoolClass, gradesBySubject = [], overallAverage = 0, mention = "N/A", absencesCount = 0, semester = 1, schoolYear = "2024-2025", } = data;
    const studentFirstName = student?.firstName || student?.user?.firstName || "";
    const studentLastName = student?.lastName || student?.user?.name || "";
    const className = schoolClass?.name || "—";
    const feedback = data.reportCard?.generalAppreciation || "Conseil de classe favorable.";
    const rows = gradesBySubject
        .map((g) => `
      <tr>
        <td class="subject-name">${g.subjectName || "—"}</td>
        <td class="avg-cell">${typeof g.average === "number" ? g.average.toFixed(2) : "—"}</td>
        <td style="font-style: italic; opacity: 0.8">${g.teacherFeedback || "—"}</td>
      </tr>`)
        .join("");
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
    body { font-family:'Inter',sans-serif; color:#1a1a1a; margin:0; padding:40px; line-height:1.4; }
    .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:60px; border-bottom:4px solid #000; padding-bottom:20px; }
    .logo { font-size:32px; font-weight:900; letter-spacing:-2px; text-transform:uppercase; }
    .school-info { text-align:right; font-weight:600; font-size:14px; color:#666; }
    .title-section { text-align:center; margin-bottom:40px; }
    .title { font-size:48px; font-weight:900; margin:0; letter-spacing:-2px; text-transform:uppercase; }
    .subtitle { font-size:18px; font-weight:700; color:#888; margin-top:5px; }
    .student-box { background:#f4f4f4; padding:30px; border-radius:20px; display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:40px; }
    .info-item label { display:block; text-transform:uppercase; font-size:10px; font-weight:900; color:#aaa; letter-spacing:1px; margin-bottom:4px; }
    .info-item .value { font-size:20px; font-weight:700; }
    table { width:100%; border-collapse:collapse; margin-bottom:40px; }
    th { text-align:left; padding:15px; background:#000; color:#fff; text-transform:uppercase; font-size:11px; font-weight:900; letter-spacing:1px; }
    td { padding:15px; border-bottom:1px solid #eee; font-size:14px; }
    .subject-name { font-weight:700; }
    .avg-cell { text-align:center; font-weight:900; font-size:18px; }
    .footer-section { display:grid; grid-template-columns:1fr 250px; gap:40px; }
    .feedback-box { border:2px solid #eee; border-radius:20px; padding:20px; }
    .feedback-title { font-weight:900; font-size:12px; text-transform:uppercase; margin-bottom:10px; color:#888; }
    .stats-box { background:#000; color:#fff; padding:30px; border-radius:20px; text-align:center; }
    .main-avg { font-size:54px; font-weight:900; margin:0; line-height:1; }
    .mention { font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:2px; opacity:0.6; margin-top:10px; }
    .absences { margin-top:20px; font-size:12px; font-weight:700; }
    .signatures { margin-top:80px; display:grid; grid-template-columns:repeat(2,1fr); gap:100px; text-align:center; }
    .sig-line { border-top:2px solid #000; padding-top:10px; font-size:12px; font-weight:900; text-transform:uppercase; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Skolara.</div>
    <div class="school-info">
      Établissement Scolaire Skolara<br>
      Direction des Études<br>
      Année Académique ${schoolYear}
    </div>
  </div>

  <div class="title-section">
    <h1 class="title">Bulletin Scolaire</h1>
    <div class="subtitle">Semestre ${semester} &bull; Rapport de Performance Académique</div>
  </div>

  <div class="student-box">
    <div class="info-item">
      <label>Élève</label>
      <div class="value">${studentFirstName} ${studentLastName}</div>
    </div>
    <div class="info-item">
      <label>Classe</label>
      <div class="value">${className}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:40%">Matière</th>
        <th style="width:15%;text-align:center">Moyenne</th>
        <th style="width:45%">Appréciation du professeur</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="footer-section">
    <div class="feedback-box">
      <div class="feedback-title">Avis du Conseil de Classe / Direction</div>
      <div style="font-size:16px;font-weight:600;line-height:1.6;">${feedback}</div>
    </div>
    <div class="stats-box">
      <div class="main-avg">${typeof overallAverage === "number" ? overallAverage.toFixed(2) : "0.00"}</div>
      <div class="mention">${mention}</div>
      <div class="absences">ABSENCES : ${absencesCount} Heures</div>
    </div>
  </div>

  <div class="signatures">
    <div>
      <div style="height:60px"></div>
      <div class="sig-line">L'Élève</div>
    </div>
    <div>
      <div style="height:60px"></div>
      <div class="sig-line">Le Chef d'Établissement</div>
    </div>
  </div>
</body>
</html>`;
}
//# sourceMappingURL=report-card.template.js.map