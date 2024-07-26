//1. It displays the current
//2. A user can create any number of alarms by specifying the alarm time and day of the week and time when the alarm should
//3. A user can snooze an alarm maximum of 3 times at an interval of 5 minutes each
//4. A user can delete an alarm

/**
 * @namespace AlarmClockApp
 * @description Alarm Clock App
 */
namespace AlarmClockApp {
  /**
   * @class Alarm
   */
  class Alarm {
    alarmTime: Date;
    dayOfWeek: number;
    snoozeCount: number;
    isSnoozed: boolean;

    constructor(alarmTime: Date, dayOfWeek: number) {
      this.alarmTime = alarmTime;
      this.dayOfWeek = dayOfWeek;
      this.snoozeCount = 0;
      this.isSnoozed = false;
    }
    /**
     * @purpose snooze an alarm maximum of 3 times at an interval of 5 minutes each
     */
    snooze(): void {
      if (this.snoozeCount < 3) {
        this.alarmTime.setMinutes(this.alarmTime.getMinutes() + 5);
        this.snoozeCount += 1;
        this.isSnoozed = true;
        console.log(`Alarm snoozed at ${this.alarmTime.toLocaleTimeString()}`);
      } else {
        console.log("Alarm snooze limit reached");
      }
    }
  }

  /**
   * @class Alarmclock
   */
  class AlarmClock {
    alarms: Alarm[] = [];

    constructor() {}

   
    getCurrentClockTime(): void {
      setInterval(() => {
        const _currentTime: Date = new Date();
        console.log(_currentTime.toLocaleTimeString());
        this.checkAlarm(_currentTime);
      }, 1000);
    }
    /**
    * @purpose create alarms 
    */
    addNewAlaram(alarmTime: Date, dayOfWeek: number): void {
      const _newAlarm: Alarm = new Alarm(alarmTime, dayOfWeek);
      this.alarms.push(_newAlarm);
      console.log(`New Alarm Added`);
    }

    /**
     * @purpose remove alarms by index 
     */
    removeAlarmByIndex(index: number): void {
      if (index >= 0 && index < this.alarms.length) {
        this.alarms.splice(index, 1);
        console.log("Alarm Removed" + index);
      } else {
        console.log("Invalid Index");
      }
    }

    /**
     * @purpose check if any alarms are set for the current time. if its true console the message and snooze after 1 minute
     */
    checkAlarm(currentTime: Date): void {
      this.alarms.forEach((alarm: Alarm, index: number) => {
        if (
          currentTime.getDay() === alarm.dayOfWeek &&
          currentTime.getHours() === alarm.alarmTime.getHours() &&
          currentTime.getMinutes() === alarm.alarmTime.getMinutes()
        ) {
          console.log("Alarm Ringing");
          if (!alarm.isSnoozed) {
            setTimeout(() => alarm.snooze(), 60000);
          }
        } else {
          alarm.isSnoozed = false;
        }
      });
    }
  }

  const alarmClock: AlarmClock = new AlarmClock();
  alarmClock.getCurrentClockTime();
  const alarmTime: Date = new Date();
  // alarmTime.setSeconds(alarmTime.getSeconds() + 20);
  alarmTime.setSeconds(alarmTime.getHours() + 1);
  alarmClock.addNewAlaram(alarmTime, alarmTime.getDay());

  // setTimeout((): void => alarmClock.removeAlarmByIndex(0), 5000);
}
