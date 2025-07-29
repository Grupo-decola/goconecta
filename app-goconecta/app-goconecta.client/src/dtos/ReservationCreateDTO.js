import PackageDTO from "./PackageDTO";

class ReservationDTO {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.packageId = data.packageId;
    this.reservationDate = data.reservationDate;
    this.status = data.status;
    this.totalAmount = data.totalAmount;
    this.package = data.package ? new PackageDTO(data.package) : null;
  }
}

export default ReservationDTO;