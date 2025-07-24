import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// A custom hook that builds on useDispatch from react-redux
// to dispatch an action only when the component mounts.
// It’s safe to omit dispatch from the useEffect dependency list.
// https://stackoverflow.com/questions/54930197/react-hooks-dispatch-action-from-useeffect

export default function useFetchOnce(someFetchActionCreator) {
  const dispatch = useDispatch();
  useEffect(() => dispatch(someFetchActionCreator()), []);
}