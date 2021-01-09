import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {UserProfile} from '@loopback/security';
import {RequestHandler} from 'express-serve-static-core';
import {User} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services';

/**
 * Binding key for the file upload service
 */
export const FILE_UPLOAD_SERVICE = BindingKey.create<RequestHandler>(
  'services.FileUpload',
);

/**
 * Binding key for the storage directory
 */
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'secret ilies bourouh :3';
  export const TOKEN_EXPIRES_IN_VALUE = '9000000000';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
  export const CURRENT_USER = BindingKey.create<UserProfile | undefined>(
    'authentication.currentUser',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<User, Credentials>>(
    'services.user.service',
  );
}
