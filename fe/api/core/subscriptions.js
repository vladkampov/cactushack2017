import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT = `${CORE_API_DOMAIN}/subscriptions`;

/**
 * Fetch list of subs
 * @returns {Promise}
 */
export function getSubscriptions() {
	return doFetchCall(CORE_END_POINT);
}



/**
 * Fetch subs details
 * @param {string} id - Subscription ID for which we fetch details
 * @returns {Promise}
 */
export function getSubscription(id) {
	return doFetchCall(`${CORE_END_POINT}/${id}`);
}

/**
 * Create new subscription
 * @param {string} addonId - addon id for which we create subscription
 * @param {string} applicationId - application id for which we create subscription
 * @returns {Promise}
 */
export function createSubscription(addonId, applicationId) {
	return doFetchCall(CORE_END_POINT, {
		method: 'POST',
		body  : JSON.stringify({ addonId, applicationId })
	});
}


export function deleteSubscription(id) {
	return doFetchCall(`${CORE_END_POINT}/${id}`, {
		method: 'DELETE'
	});
}
