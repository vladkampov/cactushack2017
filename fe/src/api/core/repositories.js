import { CORE_API_DOMAIN } from '../config';
import { doFetchCall } from '../../utils';

const CORE_END_POINT_URL = `${CORE_API_DOMAIN}/repositories/`;

export function getRepositories(owner) {
	return doFetchCall(`${CORE_END_POINT_URL}?owner=${owner}`);
}
