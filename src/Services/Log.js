import __ from 'lodash'
import API from './../API/API'

const Logger = (log) => {
    console.log('[GabiWatcher]', log);
};

export default class Log {

    api_key;
    user_key = "anonymous";
    session_id = "";

    static init(api_key: string) {
        Log.api_key = api_key;
        
        Log.setSessionId();

        Log.log('initialized app', { api_key: api_key, session_id: Log.session_id });
    }

    static setSessionId() {

        let _sessionid = window.localStorage.getItem('Logger.session_id');

        Log.session_id = _sessionid;

        if(!_sessionid) {
            Log.session_id = Log.makeid(100);
            window.localStorage.setItem('Logger.session_id', Log.session_id);
        }

        
    }

    static setUser(user: Object) {
        Log.user_key = user.uid

        Log.log('user connected', { user: user.uid });
    }

    static log(message: string, payload?: Object) {
        let obj = { message: message, payload: payload };
        Log.next('log', obj);
    }

    static info() {

    }

    static warning() {

    }

    static error(message: string, payload: Object) {
        let obj = { message: message, payload: payload };
        Log.next('error', obj);
    }

    static trace(action: string) {

    }

    static next(type: string, obj: Object) {
        let storageLog = {
            api_key: Log.api_key,
            session_id: Log.session_id,
            user_key: Log.user_key,
            type: type,
            message: obj.message,
            payload: obj.payload,
            time: (new Date()).toISOString()
        };

        storageLog = Log.purify(storageLog);

        // if (type === 'log') console.log(storageLog);
        // else if (type === 'error') console.error(storageLog);

        Logger(storageLog);


        if(process.env.NODE_ENV !== "development") {
            API.log(storageLog);
        }
    }

    static purify(obj: Object) {
        return __.pickBy(obj, undefined || null)
    }

    static makeid(length: number) : string {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

}