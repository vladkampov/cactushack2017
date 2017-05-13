import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils/fetch';


const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/swagger.json`;

/**
 * Fetch swagger meta data about API
 * @returns {Promise}
 */
export function getApiDefinition() {
	return doFetchCall(CORE_END_POINT_URL);
}
