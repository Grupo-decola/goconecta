export const API_URL = "http://localhost:5062/api";

export class PackageDetailDTO{
    id;
    title;
    description;
    destination;
    durationDays;
    priceAdults;
    priceChildren;
    hotel;
    images;
    videos;
    constructor({ id, title, description, destination, durationDays, priceAdults, priceChildren, hotel, images, videos }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.destination = destination;
        this.durationDays = durationDays;   
        this.priceAdults = priceAdults;
        this.priceChildren = priceChildren;
        this.hotel = new HotelDTO(hotel);
        this.images = images;
        this.videos = videos;
    }
}


export class HotelDTO {
    id;
    name;
    description;
    rating;
    region;
    address;
    constructor({ id, name, description, rating, region, address }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.region = region;
        this.address = address;
    }
}
