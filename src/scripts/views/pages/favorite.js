/* eslint-disable indent */
import FavouriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import { createRestaurantItemTemplate } from "../temp/template-creator";

const Favourites = {
    async render() {
        return `
        <h1>Favourite Restaurants</h1>
        
        <section class="cards-container"></section>

        `;
    },

    async afterRender() {
        const cardsContainer = document.querySelector(".cards-container");
        const loadingIndicator = document.querySelector(".loading-indicator");

        const renderFavouriteRestaurants = async () => {
            const restaurants = await FavouriteRestaurantIdb.getAllRestaurant();
            cardsContainer.innerHTML = '';

            restaurants.forEach((restaurant) => {
                cardsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
            });
        };

        await renderFavouriteRestaurants();

        FavouriteRestaurantIdb.addChangeListener(renderFavouriteRestaurants);
    },

};

export default Favourites;
