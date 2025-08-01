import { HotelDTO } from "./HotelDTO";

// DTO para detalhes de pacote
export class PackageDetailDTO {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.destination = data.destination;
    this.durationDays = data.durationDays;
    this.priceAdults = data.priceAdults;
    this.priceChildren = data.priceChildren;
    this.availabilityStartDate = data.availabilityStartDate;
    this.availabilityEndDate = data.availabilityEndDate;
    this.amenities = data.amenities;
    this.hotel = data.hotel ? new HotelDTO(data.hotel) : null;
    this.images = data.images;
    this.videos = data.videos;
  }
}
