/** @format */

import Log from './Log';

export default class SnackbarService {
    instance;

    static setInstance() {
        if (SnackbarService.instance === undefined) {
            SnackbarService.instance = document.querySelector(
                '#demo-toast-example'
            );
        }
    }

    static showMessage(message) {
        SnackbarService.setInstance();

        let data = {
            message: message,
            timeout: 5000,
        };
        // SnackbarService.instance.MaterialSnackbar.showSnackbar(data)

        Log.log('message to user', { message: data.message });
    }
}
