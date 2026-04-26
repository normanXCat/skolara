"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = generateRandomPassword;
/**
 * Génère un mot de passe aléatoire sécurisé.
 * Critères : 12 caractères, au moins 1 majuscule, 1 chiffre, 1 caractère spécial.
 */
function generateRandomPassword(length = 12) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const allChars = uppercase + lowercase + numbers + symbols;
    let password = "";
    // Garantir les critères
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    // Remplir le reste
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    // Mélanger le mot de passe
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}
//# sourceMappingURL=password.js.map