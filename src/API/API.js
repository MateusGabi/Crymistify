import * as firebase from 'firebase'
import {Observable, ReplaySubject} from 'rxjs'

const config = {
    apiKey: "AIzaSyAkww8x2nbDwsB9MjUltMn43Erft3LVYCE",
    authDomain: "todo-app-b2a7b.firebaseapp.com",
    databaseURL: "https://todo-app-b2a7b.firebaseio.com",
    storageBucket: "todo-app-b2a7b.appspot.com",
};



const database = firebase
.initializeApp(config)
.database()
.ref();


export default class Service {

    static getUser() : Observable<any> {

        let subject = new ReplaySubject();
        firebase.auth().onAuthStateChanged(user => {
            subject.next(user);
        });
        return subject.asObservable();
    }

    static addTodo(todo) : Promise<boolean> {

        database.child('privateTodos').push(todo);

        return Promise.resolve(true);

    }

    static getTodosRef() {
        return database.child('privateTodos');
    }

    static getTodos() : Observable<any[]> {

        let result = new ReplaySubject();

        Service.getTodosRef().on('value', (dataSnapshot) => {
            var tasks = [];
            dataSnapshot.forEach((child) => {
                tasks.push({
                    titulo: child.val().titulo,
                    data: child.val().data,
                    estado: child.val().estado,
                    descricao: child.val().descricao,
                    _key: child.key
                });
            });
            result.next(tasks);
        });

        return result.asObservable();
    }

    static remover(todo) {
        database.child('privateTodos').child(todo._key).remove();
    }

    static loginWithGoogle() : Observable<boolean> {

        let result = new ReplaySubject();

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(r => result.next(true))
                    .catch(err => result.error(err));

            })
            .catch(err => result.error(err));

        return result.asObservable();
    }

    static logout() : Observable<boolean> {
        let result = new ReplaySubject();

        firebase
            .auth()
            .signOut()
            .then(() => result.next(true))
            .catch(err => result.error(err))

        return result.asObservable();
    }

}
