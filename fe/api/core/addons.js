import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';


const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/addons`;

/**
 * Fetch list of addons
 * @returns {Promise}
 */
export function getAddons() {
	return doFetchCall(CORE_END_POINT_URL);
}


/**
 * Fetch addon details
 * @param {string} id - Addon ID for which we fetch details
 * @returns {Promise}
 */
export function getAddon(id) {
	return doFetchCall(`CORE_END_POINT_URL/${id}`);
}
