import {HttpErrors} from '@loopback/rest';
import isemail from 'isemail';

export function validateCredentials(credentials: {email: string}) {
  // Validate Email
  if (!isemail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid email');
  }

}
