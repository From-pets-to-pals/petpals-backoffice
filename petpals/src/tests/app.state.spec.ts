import * as store from '../app/stores/app.state';
import {getToken} from "../app/stores/app.state";

describe('Store tests', () => {
	it('should register and retrieve token', () => {
		// arrange
		const token = "123456789";
		const expectedState: store.AppState = {
			...store.initialAppState,
			token
		};
		const result = store.reducer(store.initialAppState, store.updateToken(token));    // assert
		expect(result).toEqual(expectedState);
		expect(result.token === getToken(result)).toBeTruthy()
	});
});