/**
 * Indexed DB promise fractory.
 * Wrapper of the IDBFactory IndexedDB API object. This uses the window.indexedDB object.
 * 
 * The Factory.open function is found in the Database.open function.
 */

export class Factory {
    /**
     * Get the list of databases.
     * @return {Promise<Object>} A promise that resolves to an array of objects with "name", "version" properties.
     */
    static databases() {
        // Get and return a promise to get the list of databases
        return window.indexedDB.databases();
    }

    /**
     * Delete a database.
     * 
     * **WARNING:** Must be used with `async/await`.
     * @param {String} name The name of the database to be deleted.
     * @param {Object} [options] Extra options if required.
     * @return {Promise} A promise.
     */
    static deleteDatabase(name, options) {
        // Create promise
        const promise = new Promise((resolve, reject) => {
            // Delete the database
            const openDbRequest = window.indexedDB.deleteDatabase(name, options);

            // Handle on error event
            openDbRequest.onerror = () => {
                // Reject the promise with the error
                reject(openDbRequest.error);
            };

            // Handle on success event
            openDbRequest.onsuccess = () => {
                // Resolve the promise
                resolve();
            };

            // Handle on blocked event
            openDbRequest.onblocked = () => {
                // Reject the promise with the error
                reject(openDbRequest.error);
            }
        });

        // Return the promise
        return promise;
    }
}