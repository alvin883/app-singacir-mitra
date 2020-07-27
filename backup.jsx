import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-community/async-storage";
import store from "../store";
import { Loading } from "_views";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { auth } from "_actions";
import * as Resto from "./Resto";
import { role } from "_types";
import _ from "lodash";
import JwtDecode from "jwt-decode";
import { asyncHandle } from "_utils";
import axios from "axios";
import { role_api } from "../types/role";

const Root = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isLoading: true,
        isLogin: false,
        role: null,
        hasSetup: false,
    });

    const [authState, setAuthState] = useState({
        token: null,
        userId: null,
        username: null,
        role: null,
        hasSetup: false,
        hasApproved: false,
    });

    // AsyncStorage.clear()

    const checkLogin = async () => {
        // const restoreKeys = ["token", "mitraRole", "mitraSetup"]
        // const restorePromise = AsyncStorage.multiGet(restoreKeys)
        // let [restore, restoreErr] = await asyncHandle(restorePromise)
        const [token, tokenErr] = await asyncHandle(restorePromise);

        if (tokenErr) {
            console.log("RootNavigation.js - checkLogin: error", err);
            return setState({
                ...state,
                isLogin: false,
                isLoading: false,
            });
        }

        // let restoreData = {}
        // restore.map((val, i) => {
        //   const key = val[0]
        //   const value = val[1]
        //   restoreData[key] = value
        // })

        const token = restoreData.token;
        const mitraRole = restoreData.mitraRole;
        const hasSetup = restoreData.mitraSetup;

        // Mitra Role
        const roleParams = { mitraId: data.mitraId };
        console.log("roleParams", roleParams);
        const rolePromise = axios.get("mitras/showMitra", {
            params: roleParams,
        });
        const [mitraRole, mitraRoleErr] = await asyncHandle(rolePromise);
        console.log(mitraRoleErr);
        if (mitraRoleErr) return onError(null);

        console.log("token: ", token);
        console.log("data: ", data);
        console.log("mitraRole: ", mitraRole);

        console.log("token", { token, mitraRole, hasSetup });

        if (!token) {
            console.log("checkLogin: not logged-in");
            return setState({
                ...state,
                isLoading: false,
                isLoading: false,
            });
        }

        const data = JwtDecode(token);
        data.token = token;
        data.role = mitraRole;
        data.hasSetup = hasSetup;
        data.hasApproved = false;

        axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

        setState({
            ...state,
            isLogin: true,
            isLoading: false,
            role: mitraRole ? mitraRole : role.RESTO,
            hasSetup: hasSetup ? hasSetup : false,
        });
        dispatch(auth.login(data));
    };

    const handleStoreChange = () => {
        const prevState = state;
        const user = store.getState().authReducer;
        const isLogin = user?.mitraId ? true : false;
        const shouldUpdate = isLogin !== prevState.isLogin;

        console.log("login:", isLogin);

        if (shouldUpdate) {
            setState({
                ...state,
                isLogin: isLogin,
                isLoading: false,
                role: mitraRole ? mitraRole : role.RESTO,
                hasSetup: hasSetup ? hasSetup : false,
            });
        }

        console.log("handleStoreChange:", user);
    };

    const unsubscribe = store.subscribe(handleStoreChange);

    // Equal to componentDidMount
    useEffect(() => {
        SplashScreen.hide();
        checkLogin();
    }, []);

    // Equal to componentDidUpdate
    useEffect(() => {
        // unsubscribe when componentUnmout
        return () => unsubscribe();
    });

    if (state.isLoading) return <Loading />;
    if (!state.isLogin || !state.role || !state.hasSetup) return <AuthStack />;

    return <AppStack role={state.role} hasSetup={state.hasSetup} />;

    // return state.isLogin ? <AppStack /> : <AuthStack />
};

export default Root;
