import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';


const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/applications`;

/**
 * Fetch list of applications
 * @returns {Promise}
 */
export function getApplications() {
	return doFetchCall(CORE_END_POINT_URL);
}

/**
 * Fetch details of a particular application
 * @param {string} id - Application ID for which we fetch details
 * @returns {Promise}
 */
export function getApplication(id) {
	return doFetchCall(`${CORE_END_POINT_URL}/${id}`);
}

/**
 * Fetch list of pipelines for particular application
 * @param {string} applicationId - Application ID for which we fetch pipelines
 * @returns {Promise}
 */
export function getApplicationPipelines(applicationId) {
	return doFetchCall(`${CORE_END_POINT_URL}/${applicationId}/pipelines`);
}

/**
 * Fetch particular pipeline details for application
 * @param {string} applicationId - Application ID for which we fetch pipelines
 * @param {string} pipelineId - Pipeline ID for which we fetch details
 * @returns {Promise}
 */
export function getApplicationPipeline(applicationId, pipelineId) {
	return doFetchCall(`${CORE_END_POINT_URL}/${applicationId}/pipelines/${pipelineId}`);
}

/**
 * Fetch logo for particular application
 * @param {string} applicationId - Application ID for which we fetch logo
 * @returns {Promise}
 */
export function getApplicationLogo(applicationId) {
	return doFetchCall(`${CORE_END_POINT_URL}/${applicationId}/logo`);
}

/**
 * API request to create new application
 * @param {string} name Application name
 * @param {string} name Application stage (dev, staging, live, etc.)
 * @returns {Promise}
 */
export function createApplication(name, stage) {
	return doFetchCall(CORE_END_POINT_URL, {
		method: 'POST',
		body: JSON.stringify({ name, stage }),
	});
}
