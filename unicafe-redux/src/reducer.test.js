import reducer from './reducer';
import deepFreeze from 'deep-freeze';
//test if reducer is a pure function with deep-freeze
describe("unicafe reducer", () => {
    const initialState = {
        good: 0,
        okay: 0,
        bad: 0
    }

    test("should return the proper state when called with an an undefined state", () => {
        const state = {};
        const action = { type: 'DO_NOTHING' };

        deepFreeze(state);
        const newState = reducer(undefined, action);

        expect(newState).toEqual(initialState);
    });

    test("dispatching good increments good", () => {
        const state = initialState;
        const action = { type: 'GOOD' };

        deepFreeze(state);
        const newState = reducer(state, action);

        expect(newState).toEqual({
            good: 1,
            okay: 0,
            bad: 0
        });
    });

    test("dispatching okay increments okay", () => {
        const state = initialState;
        const action = { type: 'OKAY' };

        deepFreeze(state);
        const newState = reducer(state, action);

        expect(newState).toEqual({
            good: 0,
            okay: 1,
            bad: 0
        });
    });

    test("dispatching bad increments bad", () => {
        const state = initialState;
        const action = { type: 'BAD' };

        deepFreeze(state);
        const newState = reducer(state, action);

        expect(newState).toEqual({
            good: 0,
            okay: 0,
            bad: 1
        });
    });
}); 