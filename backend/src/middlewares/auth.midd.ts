import {AuthorizationContext, AuthorizationDecision, AuthorizationMetadata} from '@loopback/authorization';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';

// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
export async function basicAuthorization(authorizationCtx: AuthorizationContext, metadata: AuthorizationMetadata): Promise<AuthorizationDecision> {
  // No access if authorization details are missing


  if (authorizationCtx.principals.length > 0) {

    return AuthorizationDecision.ALLOW;
  } else {
    return AuthorizationDecision.DENY;
  }

}
