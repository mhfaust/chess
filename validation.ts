// type BooleanFn<T> = (input: T) => boolean;

type SimpleValidator<T> = (input: T) => string | null;

type FormValidationFn<T> = (input: T) => [true, null] | [false, string];


const maxLength = (length: number, errString: string): SimpleValidator<string> => {
    return (input: string) => input.length > length ? errString : null
};
const minLength = (length: number, errString: string): SimpleValidator<string> => {
    return (input: string) => input.length < length ? errString : null
};

const matches = (regex: RegExp, errStr: string): SimpleValidator<string> => {
    return (input: string) => input.match(regex) ? null : errStr;
}

function makeValidationFn<T> (...simpleValidationFns: SimpleValidator<T>[]) {
    const fn: FormValidationFn<T> = (input:T) => {
        const errStr = simpleValidationFns.map(v => (v(input))).find(errStr => Boolean(errStr));
        if (errStr){
            return [false, errStr]
        }
        return [true, null];
    }
    return fn;
}

const copy: any = "";

const dobFieldIsValid = makeValidationFn(
    minLength(0, copy.tooShort),
    maxLength(7, copy.tooLong),
    matches(/ddd-dd-dddd/, "Not right format")
);

export default makeValidationFn;