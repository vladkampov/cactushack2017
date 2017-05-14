import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/repositories/`;

export function getRepositories(owner) {
	return doFetchCall(owner ? `${CORE_END_POINT_URL}?owner=${owner}` : CORE_END_POINT_URL);
}

export function getRepository(owner, repository) {
	return doFetchCall(owner ? `${CORE_END_POINT_URL}?owner=${owner}&title=${repository}` : CORE_END_POINT_URL);
}

export function createRepository(owner, title, description) {
	return doFetchCall(CORE_END_POINT_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			owner,
			title,
			description
		})
	});
}
