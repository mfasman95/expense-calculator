// These calculations make a few key assumptions
// 7 days per week
// 30 days per month
// 365 days per year
// Every amount is initially converted into days
// From there, the amount is converted to the other time periods
module.exports = class MoneyDuration {
  constructor(amount, duration) {
    // Make sure amount has been converted to an int
    let daily = parseInt(amount, 10);

    switch (duration) {
      case 'weekly': {
        // Convert to weekly, rounded to nearest int
        daily /= 7;
        break;
      }
      case 'monthly': {
        // Convert to monthly, rounded to nearest int
        daily /= 30;
        break;
      }
      case 'yearly': {
        // Convert to yearly, rounded to nearest int
        daily /= 365;
        break;
      }
      // Assume daily is the default case
      default: { // ('daily')
        // No conversion needed for daily, round to nearest int
        daily = amount;
        break;
      }
    }

    // This sets all the iniial values
    this.convert(daily);
  }

  // Initial calculation to convert daily amount to proper amounts for each duration
  convert(amount) {
    this.daily = amount;
    this.weekly = amount * 7;
    this.monthly = amount * 30;
    this.yearly = amount * 365;
  }

  get getDaily() { return this.daily; }
  get getWeekly() { return this.weekly; }
  get getMonthly() { return this.monthly; }
  get getYearly() { return this.yearly; }
};
