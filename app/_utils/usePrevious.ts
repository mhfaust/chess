import { useEffect, useRef } from 'react';

// Influenced by https://usehooks.com/usePrevious/
// and https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious(value: any) {
	const ref = useRef();

	// Store current value in ref
	useEffect(() => {
		ref.current = value;
	}, [value]); // Only re-run if value changes

	// Return previous value (happens before update in useEffect above)
	return ref.current;
}

export default usePrevious;
