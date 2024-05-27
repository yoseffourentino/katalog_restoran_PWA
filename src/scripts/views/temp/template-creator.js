/* eslint-disable indent */
import CONFIG from "../../globals/config";

const createRestaurantItemTemplate = (restaurant) => `
        <div class="card">
            <div>
                <img class="resto-img" src="${CONFIG.BASE_MEDIUM_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name} restaurant">
                <h3 class="resto-name">${restaurant.name}</h3>
                <h5 class="rating"><i class="fa-solid fa-star"></i> ${restaurant.rating}</h5>
                <h4 class="city"><i class="fa-solid fa-location-dot"></i> ${restaurant.city}</h4>
                <a href="#/detail/${restaurant.id}" class="detail-button">Detail</a>
            </div>
        </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
    <div>
        <img src="${CONFIG.BASE_LARGE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name} restaurant">
        <h3 class="resto-name">${restaurant.name}</h3>
        <h5 class="rating"><i class="fa-solid fa-star"></i> ${restaurant.rating}</h5>
        <p class="desc">${restaurant.description}</p>
        <h4 class="city"><i class="fa-solid fa-location-dot"></i> ${restaurant.city}</h4>
    </div>
`;
const createFavoriteButtonTemplate = () => `
    <button aria-label="like this restaurant" id="fav-btn" class="favorite">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
    `;

const createFavoritedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="fav-btn" class="favorite">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
    `;

export {
    createRestaurantItemTemplate,
    createRestaurantDetailTemplate,
    createFavoriteButtonTemplate,
    createFavoritedButtonTemplate,
};
