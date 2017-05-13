import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/contentTypes`;

/**
 * Fetch list of content types
 * @returns {Promise}
 */
export function getContentTypes() {
	return doFetchCall(CORE_END_POINT_URL);
}


/**
 * Fetch content type details
 * @param {string} id - Content Type ID for which we fetch details
 * @returns {Promise}
 */
export function getContentType(id) {
	return doFetchCall(`${CORE_END_POINT_URL}/${id}`);
}
