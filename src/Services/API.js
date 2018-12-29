/** @format */

import * as firebase from 'firebase';

import { Observable, ReplaySubject } from 'rxjs';

import __ from 'lodash';

const config = {
    apiKey: 'AIzaSyAkww8x2nbDwsB9MjUltMn43Erft3LVYCE',
    authDomain: 'todo-app-b2a7b.firebaseapp.com',
    databaseURL: 'https://todo-app-b2a7b.firebaseio.com',
    storageBucket: 'todo-app-b2a7b.appspot.com',
};

const database = firebase
    .initializeApp(config)
    .database()
    .ref();

export default class API {
    static getUser() {
        let subject = new ReplaySubject();
        firebase.auth().onAuthStateChanged(user => {
            subject.next(user);
        });
        return subject.asObservable();
    }

    static addTodo(todo) {
        API.getUser().subscribe(user => {
            todo = API.purify(todo);

            /* eslint-disable */
            todo = { ...todo, user: user.uid, done: false };
            /* eslint-enable */

            database.child('privateTodos').push(todo);
        });

        return Promise.resolve(true);
    }

    static editTodo(todo) {
        API.getUser().subscribe(user => {
            todo = API.purify(todo);
            todo = { ...todo, user: user.uid, done: false };

            database
                .child('privateTodos')
                .child(todo._key)
                .set(todo);
        });

        return Promise.resolve(true);
    }

    static getTodosRef({ uid }) {
        return database.child(`users/${uid}/todos`);
    }

    static getTodos() {
        let result = new ReplaySubject();

        API.getUser().subscribe(user => {
            API.getTodosRef(user).on('value', dataSnapshot => {
                var tasks = [];
                dataSnapshot.forEach(child => {
                    tasks.push({
                        titulo: child.val().title,
                        created_at: child.val().created_at,
                        descricao: child.val().description,
                        until_at: child.val().expire_in,
                        done: child.val().done,
                        _key: child.key,
                    });
                });

                result.next(tasks);
            });
        });

        return result.asObservable();
    }

    static remover(todo) {
        API.getUser().subscribe(user => {
            todo = API.purify(todo);
            todo = { ...todo, done: true };

            database
                .child(`users/${user.uid}/todos`)
                .child(todo._key)
                .set(todo);
        });
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
