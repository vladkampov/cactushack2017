import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/track`;

export function uploadFile(file, repository) {
	return doFetchCall(`${CORE_END_POINT_URL}?repository=${repository}`, {
		method: 'POST',
		'Content-Type': 'application/octet-stream',
		body: file
	});
}

