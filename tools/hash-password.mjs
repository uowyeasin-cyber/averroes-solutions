// Usage: node tools/hash-password.mjs "your password"  ->  value for OWNER_PASSWORD_HASH
import { hashPassword } from "../api/_lib.js";
const pw = process.argv[2];
if (!pw) { console.error('Usage: node tools/hash-password.mjs "your password"'); process.exit(1); }
console.log(hashPassword(pw));
