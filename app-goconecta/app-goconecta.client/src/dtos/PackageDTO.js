import HotelDTO from "./HotelDTO";
import MediaDTO from "./MediaDTO";

class PackageDTO {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.hotel = data.hotel ? new HotelDTO(data.hotel) : null;
    this.media = Array.isArray(data.media) ? data.media.map(m => new MediaDTO(m)) : [];
  }
}

export default PackageDTO;