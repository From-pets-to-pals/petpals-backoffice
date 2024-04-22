import * as store from './app.state';
import {getToken} from "./app.state";

describe('Store tests', () => {
	it('shoulld register and retrieve token', () => {
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