import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';


const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/thingTypes`;

/**
 * Fetch list of thing types
 * @returns {Promise}
 */
export function getThingTypes() {
	return doFetchCall(CORE_END_POINT_URL);
}


/**
 * Fetch thing type details
 * @param {string} id - Thing Type ID for which we fetch details
 * @returns {Promise}
 */
export function getThingType(id) {
	return doFetchCall(`${CORE_END_POINT_URL}/${id}`);
}
