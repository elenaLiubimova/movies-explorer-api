const URL_PATTERN = /https?:\/\/(www\.)?[-0-9a-zA-Z@:%._+~#=]{1,256}\.[-0-9a-zA-Z()]{1,6}\b([-0-9a-zA-Z()@:%_+.~#?&//=]*)/;
const OK_STATUS = 200;
const CREATED_STATUS = 201;
const DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  URL_PATTERN,
  OK_STATUS,
  CREATED_STATUS,
  DB,
};
