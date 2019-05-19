/** @format */

import * as firebase from 'firebase';

import { Observable, ReplaySubject } from 'rxjs';

import __ from 'lodash';

const config = {
    apiKey: 'AIzaSyAkww8x2nbDwsB9MjUltMn43Erft3LVYCE',
    authDomain: 'todo-app-b2a7b.firebaseapp.com',
    projectId: 'todo-app-b2a7b',
    databaseURL: 'https://todo-app-b2a7b.firebaseio.com',
    storageBucket: 'todo-app-b2a7b.appspot.com',
};

const database = firebase
    .initializeApp(config)
    .database()
    .ref();


const PROXY = `http://cors-anywhere.herokuapp.com/<url>`
const URL_BASE = `https://us-central1-todo-app-b2a7b.cloudfunctions.net/<function>`
const API_ENDPOINT = PROXY.replace('<url>', URL_BASE)

export default class API {
    static getUser() {
        let subject = new ReplaySubject();
        firebase.auth().onAuthStateChanged(user => {
            subject.next(user);
        });
        return subject.asObservable();
    }

    static addTodo(todo) {
        // API.getUser().subscribe(user => {
        //     todo = API.purify(todo);

        //     /* eslint-disable */
        //     todo = { ...todo, user: user.uid, done: false };
        //     /* eslint-enable */

        //     database.child('privateTodos').push(todo);
        // });

        // return Promise.resolve(true);
        throw new Error('Not implemented yet.')
    }

    static editTodo(todo) {
        // API.getUser().subscribe(user => {
        //     todo = API.purify(todo);
        //     todo = { ...todo, user: user.uid, done: false };

        //     database
        //         .child('privateTodos')
        //         .child(todo._key)
        //         .set(todo);
        // });

        // return Promise.resolve(true);
        throw new Error('Not implemented yet.')
    }

    static getTodosRef({ uid }) {
        // return database.child(`users/${uid}/todos`);
    }

    static async getTodos() {
        const url = API_ENDPOINT.replace('<function>', 'todos')
        const token = await firebase.auth().currentUser.getIdToken(false)

        const response = await fetch(url, {
            headers: {
                Authorization: 'Bearer <token>'.replace('<token>', token)
            }
        }).then(res => res.json())

        return response;
    }

    static remover(todo) {
        // API.getUser().subscribe(user => {
        //     todo = API.purify(todo);
        //     todo = { ...todo, done: true };

        //     database
        //         .child(`users/${user.uid}/todos`)
        //         .child(todo._key)
        //         .set(todo);
        // });
        throw new Error('Not implemented yet.')
    }

    /**
     * Removes attributes that has null and undefined as value
     * @param {*} todo
     */
    static purify(obj: Object) {
        return __.pickBy(obj, undefined || null);
    }

    static loginWithGoogle(): Observable<boolean> {
        let result = new ReplaySubject();

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    // eslint-disable-next-line
                    .then(r => result.next(true))
                    .catch(err => result.error(err));
            })
            .catch(err => result.error(err));

        return result.asObservable();
    }

    static logout(): Observable<boolean> {
        let result = new ReplaySubject();

        firebase
            .auth()
            .signOut()
            .then(() => result.next(true))
            .catch(err => result.error(err));

        return result.asObservable();
    }

    static log(log) {
        database.child('log').push(log);
    }
}
