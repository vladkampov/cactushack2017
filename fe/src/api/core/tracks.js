import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/tracks/`;

export function uploadFile(file, repository) {
	return doFetchCall(`${CORE_END_POINT_URL}`, {
		method: 'POST',
		body: file,
	});
}
export function pushCommit(file, repository) {
	return doFetchCall(`${CORE_END_POINT_URL}`, {
		method: 'PATCH',
		body: file,
	});
}
