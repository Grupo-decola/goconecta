class HotelDTO {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.rating = data.rating;
    this.region = data.region;
    this.address = data.address;
  }
}

export default HotelDTO;