import { useCallback } from 'react';

type FormValidationResult = [true, null] | [false, string];
type FormValidationFn<T> = (input: T) => FormValidationResult;

/**
 * Generic HOF that creates a FormValidationFn<T>, which in turn returns a FormValidationResult
 * @param test function of T returning a boolean value indicating whether the validation criteria is satisfied
 * @param errMessage error message expected to be returned when the test does not pass.
 * @returns FormValidationFn<T>, which can be passed into useFormValidation
 */
function makeValidationFn<T>(test: (input: T) => boolean, errMessage: string): FormValidationFn<T> {
	return ((input: T): FormValidationResult => test(input) ? [true, null] : [false, errMessage]);
}

/**
 * HOF for creating string validators asserting a maximum length.
 * @param max The maximum length of a string the resulting validator will pass
 * @param errMessage The error message returned if a string passed to the resulting validator is too long
 * @returns
 */
const maxLength = (max: number, errMessage: string) =>
	makeValidationFn<string>(input => input.length <= max, errMessage);

/**
 * HOF for creating string validators asserting a minimum length.
 * @param min The minimum length of a string the resulting validator will pass
 * @param errMessage The error message returned if a string passed to the resulting validator is too short
 * @returns
 */
const minLength = (min: number, errMessage: string) =>
	makeValidationFn<string>(input => input.length >= min, errMessage);

const lengthRange = (min: number, max: number, errMessage: string) =>
	combineValidators(
		minLength(min, errMessage),
		maxLength(max, errMessage),
	);

/**
 * HOF for creating string validators asserting a pattern (regex) match
 * @param pattern The regular expression the reslting validator will test the string with
 * @param errMessage The error message returnd if a string  passed to the resulting validator does not match the pattern
 * @returns
 */
const matches = (pattern: RegExp, errMessage: string) =>
	makeValidationFn<string>(input => Boolean(input.match(pattern)), errMessage);

function combineValidators<T>(...simpleValidationFns: FormValidationFn<T>[]): FormValidationFn<T> {
	return (input: T) => {
		const [isValid, errMessage] = simpleValidationFns.map(v => (v(input))).find(errStr => Boolean(errStr))
			|| [true, null];
		return isValid ? [true, null] : [false, errMessage];
	};
}

const copy: any = {};

const dobFieldIsValid = combineValidators(
	minLength(0, copy.page.form.dob.tooShort),
	maxLength(7, copy.page.form.dob.tooLong),
	matches(/ddd-dd-dddd/, copy.page.form.dob.wrongFormat),
	lengthRange(0, 4, copy.page.form.dob.outOfRange),
);
