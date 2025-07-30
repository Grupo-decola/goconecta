// DTO para cadastro de usuário
export default class RegisterUserDTO {
  /**
   * @param {Object} params
   * @param {string} params.name
   * @param {string} params.email
   * @param {string} params.password
   * @param {string} params.phone
   * @param {string} params.cpfPassport
   */
  constructor({ name, email, password, phone, cpfPassport }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.cpfPassport = cpfPassport;
  }
}
