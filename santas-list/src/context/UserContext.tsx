import { createContext } from "react";
import firebase from 'firebase/app';

// 1. Create context
type UserCtx = {
	// User => logged in
	// null => logged out
	// undefined => state loading
	user: firebase.User | null | undefined;
};

// 2. Add initial values
const defaultUserCtx: UserCtx = {
	user: undefined,
};

const UserContext = createContext<UserCtx>(defaultUserCtx);

export default UserContext;