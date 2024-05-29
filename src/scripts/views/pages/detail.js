/* eslint-disable indent */
import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../temp/template-creator';
import FavButtonInitiator from '../../utils/favorite-btn-initiator';

const Detail = {
    async render() {
        return `
            <div id="restaurant" class="restaurant"></div>
            <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender() {
        try {
            const url = UrlParser.parseActiveUrlWithoutCombiner();
            const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
            const restaurantContainer = document.querySelector('#restaurant');
            restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

            FavButtonInitiator.init({
                favoriteButtonContainer: document.querySelector('#likeButtonContainer'),
                restaurant: {
                    id: restaurant.id,
                    name: restaurant.name,
                    city: restaurant.city,
                    rating: restaurant.rating,
                    pictureId: restaurant.pictureId,
                    description: restaurant.description,
                    address: restaurant.address,
                    menu: restaurant.menus,
                },
            });
        } catch (error) {
            console.error('Error rendering detail page:', error);
        }
    },
};

export default Detail;
