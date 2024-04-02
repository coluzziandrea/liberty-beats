export class DrumMachinePatternUtil {
  /**
   * Given a zero-based index, returns the pattern name.
   * The final name is a letter from A to Z.
   */
  static getPatternNameByIndex(index: number) {
    return String.fromCharCode(64 + index + 1)
  }
}
