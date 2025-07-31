import { HotelDTO } from "./HotelDTO";

// DTO para detalhes de pacote
export class PackageDetailDTO {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.title
   * @param {string} params.description
   * @param {string} params.destination
   * @param {number} params.durationDays
   * @param {number} params.priceAdults
   * @param {number} params.priceChildren
   * @param {Object} params.hotel
   * @param {Array} params.images
   * @param {Array} params.videos
   */
  constructor({
    id,
    title,
    description,
    destination,
    durationDays,
    priceAdults,
    priceChildren,
    hotel,
    images,
    videos,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.destination = destination;
    this.durationDays = durationDays;
    this.priceAdults = priceAdults;
    this.priceChildren = priceChildren;
    this.hotel = hotel ? new HotelDTO(hotel) : null;
    this.images = images;
    this.videos = videos;
  }
}
