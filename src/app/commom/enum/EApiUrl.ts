export enum LOGIN_ENDPOINT {
  LOGIN = 'auth/login',
  REGISTER = 'auth/register',
}

export enum FRIEND_ENDPOINT {
  GET_FRIENDS = 'friends/list',
  SUGGEST_FRIENDS = 'friends/suggest',
  PROCESS_REQUEST = 'friends/request',
  PENDING_REQUEST = 'friends/pending',
  REJECT_REQUEST = 'friends/reject-request'
}


export enum ROLE_ENDPOINT {
  GET_ROLES = 'role/list',
}

export enum POST_ENDPOINT {
  CREATE = 'posts/create',
  GET_ALL='posts/get-all',
  DELETE = 'posts/delete',
  UPDATE = 'posts/update',

}
