module.exports = {
  JWT_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  REFRESH_JWT_SECRET: '1111111111111111111',
  ACCESS_TOKEN_TIME: '1m',
  REFRESH_TOKEN_TIME: 100 * 60,
  SALT_ROUNDS: 5,
  SQUADHELP_BANK_NUMBER: '4564654564564564',
  SQUADHELP_BANK_NAME: 'SquadHelp',
  SQUADHELP_BANK_CVC: '453',
  SQUADHELP_BANK_EXPIRY: '11/20',
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  CREATOR_ENTRIES: 'creator_entries',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_PENDING: 'pending',
  OFFER_STATUS_APPROVED: 'approved',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_REJECTED_MODERATOR: 'rejected_moderator',
  OFFER_STATUS_WON: 'won',
  FILES_PATH: 'public/',
  SOCKET_CONNECTION: 'connection',
  SOCKET_SUBSCRIBE: 'subscribe',
  SOCKET_UNSUBSCRIBE: 'unsubscribe',
  NOTIFICATION_ENTRY_CREATED: 'onEntryCreated',
  NOTIFICATION_CHANGE_MARK: 'changeMark',
  NOTIFICATION_CHANGE_OFFER_STATUS: 'changeOfferStatus',
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ERROR_LOG_FILE: 'ErrorLogs.txt',
  WRITE_TIME: ['23:43', 'HH-mm'],
  ARCHIVE_DIRECTORY: '../',
  LOST_PASS_MESSAGE: (ip, accessToken) =>`<p>To complete update password click <a href="http://${ip
  }:3000/recover/${accessToken}">here</a></p>`,
  REJECT_OFFER_BY_MODERATOR: 'Some of yours offers was rejected',
  APPROVE_OFFER_BY_MODERATOR: 'Some of yours offers was approved',
};