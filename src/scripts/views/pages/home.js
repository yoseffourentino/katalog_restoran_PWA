import banner from '../../../public/images/heros/hero-image_4.jpg';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate} from '../temp/template-creator';

const Home = {
    async render() {
        return `
        <div class="banner">
            <img src=${banner} alt="food photo with decoration" >
        </div>
        <div class="content">
            <h2 class="title-content">Explore Restaurants</h2>
            <div id="restaurants" class="restaurants">
                
            </div>
        </div>
        `
    },

    async afterRender() {
        const restaurants = await RestaurantDbSource.listRestaurants();
        const restaurantContainer = document.querySelector('#restaurants');
        restaurants.forEach((restaurant) => {
            restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        })
    }
}

export default Home;