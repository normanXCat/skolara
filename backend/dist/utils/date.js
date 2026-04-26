"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSchoolYear = getCurrentSchoolYear;
/**
 * Retourne l'année scolaire actuelle formatée (ex: "2025-2026").
 */
function getCurrentSchoolYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    if (month >= 8) {
        return `${year}-${year + 1}`;
    }
    else {
        return `${year - 1}-${year}`;
    }
}
//# sourceMappingURL=date.js.map