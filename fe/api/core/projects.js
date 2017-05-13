import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';


const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/projects`;

/**
 * Fetch list of projects
 * @returns {Promise}
 */
export function getProjects() {
	return doFetchCall(CORE_END_POINT_URL);
}

/**
 * Fetch details of particular projects
 * @param {string} id - Project ID for which we fetch details
 * @returns {Promise}
 */
export function getProject(id) {
	return doFetchCall(`${CORE_END_POINT_URL}/${id}`);
}

/**
 * API request to create new project
 * @param {string} applicationId Application ID for which we create project
 * @param {string} name Project name
 * @returns {Promise}
 */
export function createProject(applicationId, name) {
	return doFetchCall(CORE_END_POINT_URL, {
		method: 'POST',
		body: JSON.stringify({ applicationId, name }),
	});
}
