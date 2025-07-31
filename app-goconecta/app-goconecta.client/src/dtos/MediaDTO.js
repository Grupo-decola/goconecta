// DTO para mídia
export class MediaDTO {
  /**
   * @param {Object} params
   * @param {string|number} params.id
   * @param {string} params.name
   * @param {string} params.url
   * @param {string|number} params.packageId
   */
  constructor({ id, name, url, packageId }) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.packageId = packageId;
  }
}
