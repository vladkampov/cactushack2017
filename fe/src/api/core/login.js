import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/login/`;

export function logIn(username, password) {
	return doFetchCall(CORE_END_POINT_URL, {
		method: 'POST',
		body: JSON.stringify({ username, password })
	});
}
