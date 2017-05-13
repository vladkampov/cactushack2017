import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/logs`;

/**
 * Fetch logs from Elasticsearch
 * @returns {Promise}
 */
export function getLogs(serviceIds, thingIds, size, from) {
	return doFetchCall(`${CORE_END_POINT_URL}/search`, {
		method: 'POST',
		body  : JSON.stringify({ serviceIds, thingIds, size, from })
	});
}
