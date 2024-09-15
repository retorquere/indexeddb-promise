/**
 * Indexed DB promise cursor with value.
 * Wrapper of the IDBCursorWithValue IndexedDB API object.
 */
import { Cursor } from "./cursor.js";

export class CursorWithValue extends Cursor {
    private _iDbCursorWithValue: IDBCursorWithValue

    /**
     * Cursor with value constructor.
     * @param {IDBCursorWithValue} iDbCursorWithValue The cursor with value interface object.
     * @param {IDBRequest} iDbRequest The request interface object used to open the cursor with.
     */
    constructor(iDbCursorWithValue: IDBCursorWithValue, iDbRequest: IDBRequest) {
        // Call super
        super(iDbCursorWithValue, iDbRequest);

        // Set cursor with value interface object
        this._iDbCursorWithValue = iDbCursorWithValue;
    }

    /**
     * Get cursor with value interface object.
     * @return {IDBCursorWithValue} The cursor with value object.
     */
    get iDbCursorWithValue() {
        // Return the cursor with value interface object
        return this._iDbCursorWithValue;
    }

    /**
     * Get the cursor's current object value.
     * @return {*} The current object value.
     */
    get value() {
        // Return the value
        return this._iDbCursorWithValue.value;
    }

    /**
     * Delete the cursor's current record/object.
     * 
     * **WARNING:** Must be used with `async/await`.
     * @return {Promise} A promise.
     */
    delete(): Promise<void> {
        // Create promise
        const promise: Promise<void> = new Promise((resolve, reject) => {
            // Delete the current record/object
            const request = this._iDbCursorWithValue.delete();

            // Handle the on error event
            request.onerror = () => {
                // Reject the promise with the error
                reject(request.error);
            };

            // Handle on success event
            request.onsuccess = () => {
                // Resolve the promise
                resolve();
            };
        });

        // Return the promise
        return promise;
    }

    /**
     * Update the cursor's current record/object with the new value.
     * 
     * **WARNING:** Must be used with `async/await`.
     * @param {*} value The new object to update with.
     * @return {Promise<*>} A promise that resolves with the new key value.
     */
    update(value: any): Promise<IDBValidKey> {
        // Create promise
        const promise: Promise<IDBValidKey> = new Promise((resolve, reject) => {
            // Update the current record with the new value
            const request = this._iDbCursor.update(value);

            // Handle the on error event
            request.onerror = () => {
                // Reject the promise with the error
                reject(request.error);
            };

            // Handle the on success event
            request.onsuccess = () => {
                // Resolve the promise with the key value
                resolve(request.result);
            };
        });

        // Return the promise
        return promise;
    }
}
