import { CORE_API_DOMAIN } from '../config';
import { doFetchCall, buildQueryString } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/things`;

/**
 * Fetch list of things
 * @returns {Promise}
 */
export function getThings() {
	return doFetchCall(CORE_END_POINT_URL);
}


/**
 * Fetch details of particular thing
 * @param {string} id - Thing ID for which we fetch details
 * @returns {Promise}
 */
export function getThing(id) {
	return doFetchCall(`${CORE_END_POINT_URL}/${id}`);
}

/**
 * Fetch messages for thing
 * @param {string} id - Thing ID for which we fetch messages
 * @param {object} [urlParams = {}] - Additional url parameters for request
 * @param {string} [urlParams.limit]   - How many messages to grab from server
 * @param {string} [urlParams.offset]  - How many messages newer messages to skip
 * @param {string} [urlParams.since]   - Since what time to fetch messages
 * @param {boolean} [urlParams.hydrate] - Hydrate large message content (takes longer)

 * @returns {Promise}
 */
export function getThingMessages(id, urlParams = { hydrate: false }) {
	const getParams = buildQueryString(urlParams);

	return doFetchCall(`${CORE_END_POINT_URL}/${id}/messages${getParams ? `?${getParams}` : ''}`);
}

/**
 * Fetch hydrated message (from s3) with full rawData and mediatedData
 * @param {string} thingId - Id of things for which we fetch message details
 * @param {string} messageId - Id of message to fetch data
 * @returns {Promise}
 */
export function getHydratedMessage(thingId, messageId) {
	return doFetchCall(`${CORE_END_POINT_URL}/${thingId}/messages/${messageId}`);
}
