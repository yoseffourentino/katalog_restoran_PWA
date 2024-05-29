/* eslint-disable indent */
import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore('restaurant', { keyPath: "id" });
    },
});

const FavouriteRestaurantIdb = {
    async getRestaurant(id) {
        console.log(`Getting restaurant with id: ${id}`);
        return (await dbPromise).get('restaurant', id);
    },
    async getAllRestaurant() {
        return (await dbPromise).getAll('restaurant');
    },
    async putRestaurant(restaurant) {
        console.log('restaurant:', restaurant);
        return (await dbPromise).put('restaurant', restaurant);
    },
    async deleteRestaurant(id) {
        return (await dbPromise).delete('restaurant', id);
    },
};

export default FavouriteRestaurantIdb;
