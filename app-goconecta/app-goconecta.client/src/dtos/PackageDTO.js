import HotelDTO from "./HotelDTO";
import MediaDTO from "./MediaDTO";

// DTO para pacote de viagem
export class PackageDTO {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.name
   * @param {string} params.description
   * @param {number} params.price
   * @param {string} params.startDate
   * @param {string} params.endDate
   * @param {Object} [params.hotel]
   * @param {Array} [params.media]
   */
  constructor({
    id,
    name,
    description,
    price,
    startDate,
    endDate,
    hotel,
    media,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.hotel = hotel ? new HotelDTO(hotel) : null;
    this.media = Array.isArray(media) ? media.map((m) => new MediaDTO(m)) : [];
  }
}
