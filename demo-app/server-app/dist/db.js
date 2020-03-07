const lodashId = require('lodash-id');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('../db.json');
const db = low(adapter);

lodashId.createId = c => Math.max(...c.map(c => c.id), 0) + 1;

db._.mixin(lodashId);

module.exports = db;