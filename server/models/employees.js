import bcrypt from 'bcrypt';
import Database from '../db'; // Line of code added

class EmployeeModel {
  static async createEmployee({
    firstname,
    lastname,
    password,
    email,
    address,
    department,
    jobrole,
    gender,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [
      email,
      firstname,
      lastname,
      department,
      gender,
      jobrole,
      address,
      hashedPassword,
    ];
    const response = await Database.query(
      'INSERT INTO employees (email, firstname, lastname, department, gender, jobrole, address, password) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      values,
    ).catch((error) => {
      throw new Error(error.message, 400);
    });
    return response;
  }

  static async getUserEmail(email) {
    const value = [email];
    const response = await Database.query(
      'SELECT * FROM employees WHERE email = $1',
      value,
    ).catch((err) => {
      throw new Error(err.message, 400);
    });
    if (!response) {
      throw new Error('User email not found', 404);
    }
    return response;
  }
}

export default EmployeeModel;
