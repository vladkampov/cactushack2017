import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/user/`;

export function getUser(username, password) {
	return doFetchCall(CORE_END_POINT_URL, {
		'Content-Type': 'application/json'
	});
}
