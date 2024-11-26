export class Time {
  // The Time class represents a time of day, in military time.
  private hour: number;
  private minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  toString(): string {
    return `${String(this.hour).padStart(2, "0")}:${String(this.minute).padStart(2, "0")}`;
  }

  static fromString(time_string: string): Time {
    let [hour, minute] = time_string.split(":");
    return new Time(parseInt(hour), parseInt(minute));
  }

  static fromMinutes(minutes: number) {
    let hour = Math.floor(minutes / 60);
    let minute = minutes % 60;
    return new Time(hour, minute);
  }
}

export class Interval {
  public start_time: Time;
  public end_time: Time;

  constructor(start_time: Time, end_time: Time) {
    this.start_time = start_time;
    this.end_time = end_time;
  }

  toString(): string {
    return `${this.start_time.toString()}-${this.end_time.toString()}`;
  }

  contains(time: Time): boolean {
    return time >= this.start_time && time <= this.end_time;
  }

  hasOverlap(interval: Interval): boolean {
    return this.contains(interval.start_time) || this.contains(interval.end_time);
  }

  static fromJSON(interval_json) {
    return new Interval(
      Time.fromString(interval_json.start_time),
      Time.fromString(interval_json.end_time),
    );
  }
}
