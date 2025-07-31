// DTO para hotel
export class HotelDTO {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.name
   * @param {string} params.description
   * @param {number} params.rating
   * @param {string} params.region
   * @param {string} params.address
   */
  constructor({ id, name, description, rating, region, address }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.region = region;
    this.address = address;
  }
}
