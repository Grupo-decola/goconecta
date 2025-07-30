import PackageDTO from "./PackageDTO";

// DTO para reserva
export class ReservationDTO {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string|number} params.userId
   * @param {string|number} params.packageId
   * @param {string} params.reservationDate
   * @param {string} params.status
   * @param {number} params.totalAmount
   * @param {Object} [params.package]
   */
  constructor({
    id,
    userId,
    packageId,
    reservationDate,
    status,
    totalAmount,
    package: pkg,
  }) {
    this.id = id;
    this.userId = userId;
    this.packageId = packageId;
    this.reservationDate = reservationDate;
    this.status = status;
    this.totalAmount = totalAmount;
    this.package = pkg ? new PackageDTO(pkg) : null;
  }
}
