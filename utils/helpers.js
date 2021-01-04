const crypto = require('crypto');

const algorithm = 'aes-192-cbc'; // algorithm to use
const password = 'ssn encrypted';
const key = crypto.scryptSync(password, 'salt', 24); // create key
const iv = 'ca08480ef63029e8ac9e9794ee0fe2f2';

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
};

exports.decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
  const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
};
