import { CORE_CONNECT_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';


const CORE_END_POINT_URL = `${CORE_CONNECT_DOMAIN}/account`;

/**
 * Fetch user account details
 * @returns {Promise}
 */
export function getAccountDetails() {
	return doFetchCall(CORE_END_POINT_URL);
}
