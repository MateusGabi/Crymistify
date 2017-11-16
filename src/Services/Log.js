import __ from 'lodash'

export default class Log {

    apiKey;
    user = "anonymous";

    static init(apiKey: string) {
        Log.apiKey = apiKey;
        Log.log('initialized app', {apiKey: apiKey});
    }

    static setUser(user: Object) {
        Log.user = user

        Log.log('user connected', {user: user});
    }

    static log(message: string, payload?: Object) {
        let obj = {message: message, payload: payload};
        Log.next('log', obj);
    }

    static info() {

    }

    static warning() {

    }

    static error(message: string, payload: Object) {
        let obj = {message: message, payload: payload};
        Log.next('error', obj);
    }

    static trace(action: string) {

    }

    static next(type: string, obj: Object) {
        let storageLog = {
            user: Log.user,
            type: type,
            message: obj.message,
            payload: obj.payload,
            time: (new Date()).toISOString()
        };

        storageLog = Log.purify(storageLog);

        if(type === 'log') console.log(storageLog);
        else if(type === 'error') console.error(storageLog);
    }

    static purify(obj: Object) {
        return __.pickBy(obj, undefined || null)
    }

}