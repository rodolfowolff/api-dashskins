import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class BcryptUtils {
  /**
   * Encrypts passwords
   * @param password Plain text password
   * @returns Encrypted password
   */
  static hashPassword(password: string): string {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  /**
   * Compare a plain text password with encrypted password stored in DB
   * @param password Plain text password
   * @param hash Encrypted password
   * @returns Whether passwords match or not
   */
  static isValidPassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
