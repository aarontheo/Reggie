export class Time {
    // The Time class represents a time of day, in military time.
    hour;
    minute;
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }
    toString() {
        return `${String(this.hour).padStart(2, "0")}:${String(this.minute).padStart(2, "0")}`;
    }
    static fromString(time_string) {
        let [hour, minute] = time_string.split(":");
        return new Time(parseInt(hour), parseInt(minute));
    }
    static fromMinutes(minutes) {
        let hour = Math.floor(minutes / 60);
        let minute = minutes % 60;
        return new Time(hour, minute);
    }
}
export class Interval {
    start_time;
    end_time;
    constructor(start_time, end_time) {
        this.start_time = start_time;
        this.end_time = end_time;
    }
    toString() {
        return `${this.start_time.toString()}-${this.end_time.toString()}`;
    }
    contains(time) {
        return time >= this.start_time && time <= this.end_time;
    }
    hasOverlap(interval) {
        return this.contains(interval.start_time) || this.contains(interval.end_time);
    }
    static fromJSON(interval_json) {
        return new Interval(Time.fromString(interval_json.start_time), Time.fromString(interval_json.end_time));
    }
}
