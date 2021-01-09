export enum Roles {
  CASE_CREATE = 'create case',
  CASE_VIEW = 'view case',
  FEES_CREATE = 'create fees',
  FEES_RECEIVED = 'received fees',
  FEES_VIEW = 'view fees',
  BOARD_VIEW = 'view board',
  STATS_VIEW = 'view fees stats',
  ADMIN = 'admin',
}

export const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'string'},
    email: {type: 'string'},
    name: {type: 'string'},
  },
};

const CredentialsSchema = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    }
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};
