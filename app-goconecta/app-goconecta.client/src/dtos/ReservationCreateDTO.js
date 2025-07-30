import PackageDTO from "./PackageDTO";

// DTO para criação de reserva
export class ReservationCreateDTO {
  /**
   * @param {Object} params
   * @param {string|number} params.userId
   * @param {string|number} params.packageId
   * @param {string} params.reservationDate
   * @param {string} params.status
   * @param {number} params.totalAmount
   * @param {Object} [params.package]
   */
  constructor({
    userId,
    packageId,
    reservationDate,
    status,
    totalAmount,
    package: pkg,
  }) {
    this.userId = userId;
    this.packageId = packageId;
    this.reservationDate = reservationDate;
    this.status = status;
    this.totalAmount = totalAmount;
    this.package = pkg ? new PackageDTO(pkg) : null;
  }
}
