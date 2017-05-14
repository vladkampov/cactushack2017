import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/diff`;

export function getDiff(oldCommit, newCommit) {
	return doFetchCall(`${CORE_END_POINT_URL}?old_commit=${oldCommit}&new_commit=${newCommit}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
