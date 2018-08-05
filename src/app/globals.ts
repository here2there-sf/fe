import { environment } from '../environments/environment';

export const globals = {
  // Api bases
  API_BASE: environment.API_BASE,

  AUTH_BASE: environment.AUTH_BASE,

  ORG_BASE: environment.ORG_BASE,

  FORCE_BASE: environment.FORCE_BASE,


  // Api endpoints
  CREATE_USER: '/user',

  LOGIN: '/auth/login',

  FETCH_METADATA_TYPES: '/metadata/list',

  ONE_OFF_PULL: '/one-off/pull',

  ONE_OFF_PUSH: '/one-off/push',

  CHECK_RETRIEVE_STATUS: '/one-off/status/retrieve',

  CHECK_DEPLOY_STATUS: '/one-off/status/deploy',

  FETCH_ORGANIZATIONS: '/organizations',

  CREATE_ORGANIZATION: '/organization',

  UPDATE_ORGANIZATION: '/organization',

  DELETE_ORGANIZATION: '/organization',

  FETCH_ONE_OFF_PULLS: '/metadata',

  DOWNLOAD_METADATA: '/metadata/download',

  SCHEDULE_BACKUP: '/backup',

  UPDATE_BACKUP: '/backup',

  FETCH_BACKUPS: '/backups',

  DELETE_BACKUP: '/backup',

};
