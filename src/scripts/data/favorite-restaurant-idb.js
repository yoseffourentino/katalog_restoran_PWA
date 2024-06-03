/* eslint-disable no-return-await */
/* eslint-disable indent */
import { openDB, deleteDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
            database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
        }
    },
});

const FavouriteRestaurantIdb = {
    async getRestaurant(id) {
        console.log(`Getting restaurant with id: ${id}`);
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },
    async getAllRestaurant() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },
    async putRestaurant(restaurant) {
        console.log('Putting restaurant into database:', restaurant);
        if (!restaurant.id) {
            console.error('Restaurant object does not have a valid id:', restaurant);
            throw new Error('Invalid restaurant id');
        }
        if (typeof restaurant.id !== 'string' && typeof restaurant.id !== 'number') {
            console.error('Restaurant id is not of a valid type:', typeof restaurant.id, restaurant.id);
            throw new Error('Invalid restaurant id type');
        }
        try {
            const result = await (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
            console.log('Restaurant added successfully:', result);
            return result;
        } catch (error) {
            console.error('Failed to put restaurant into database:', error);
            throw error;
        }
    },
    async deleteRestaurant(id) {
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },
    async clearDatabase() {
        console.log('Clearing database');
        return await deleteDB(DATABASE_NAME);
    },
};

export default FavouriteRestaurantIdb;

// Usage example to clear and recreate the database
FavouriteRestaurantIdb.clearDatabase().then(() => {
    console.log('Database cleared');
    // Re-create a sample restaurant
    const sampleRestaurant = {
        id: '1',
        name: 'Sample Restaurant',
        cuisine: 'Italian',
        location: '123 Sample Street',
    };

    FavouriteRestaurantIdb.putRestaurant(sampleRestaurant)
        .then(() => console.log('Restaurant added successfully'))
        .catch((error) => console.error('Failed to add restaurant:', error));
});
