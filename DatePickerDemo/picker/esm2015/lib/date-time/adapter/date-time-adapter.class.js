/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/adapter/date-time-adapter.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-adapter.class
 */
import { Subject } from 'rxjs';
import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
/**
 * InjectionToken for date time picker that can be used to override default locale code.
 * @type {?}
 */
export const OWL_DATE_TIME_LOCALE = new InjectionToken('OWL_DATE_TIME_LOCALE', {
    providedIn: 'root',
    factory: OWL_DATE_TIME_LOCALE_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function OWL_DATE_TIME_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/**
 * Provider for OWL_DATE_TIME_LOCALE injection token.
 * @type {?}
 */
export const OWL_DATE_TIME_LOCALE_PROVIDER = {
    provide: OWL_DATE_TIME_LOCALE,
    useExisting: LOCALE_ID
};
/**
 * @abstract
 * @template T
 */
export class DateTimeAdapter {
    constructor() {
        /**
         * A stream that emits when the locale changes.
         */
        this._localeChanges = new Subject();
        /**
         * total milliseconds in a day.
         */
        this.millisecondsInDay = 86400000;
        /**
         * total milliseconds in a minute.
         */
        this.milliseondsInMinute = 60000;
    }
    /**
     * @return {?}
     */
    get localeChanges() {
        return this._localeChanges;
    }
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     *
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compare(first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        const dateFirst = this.clone(first);
        /** @type {?} */
        const dateSecond = this.clone(second);
        /** @type {?} */
        const diff = this.getTime(dateFirst) - this.getTime(dateSecond);
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            // Return 0 if diff is 0; return NaN if diff is NaN
            return diff;
        }
    }
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     *
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compareYear(first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        const yearLeft = this.getYear(first);
        /** @type {?} */
        const yearRight = this.getYear(second);
        /** @type {?} */
        const diff = yearLeft - yearRight;
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        if (value == null ||
            (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    clampDate(date, min, max) {
        if (min && this.compare(date, min) < 0) {
            return min;
        }
        if (max && this.compare(date, max) > 0) {
            return max;
        }
        return date;
    }
}
if (false) {
    /**
     * The locale to use for all dates.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.locale;
    /**
     * A stream that emits when the locale changes.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype._localeChanges;
    /**
     * total milliseconds in a day.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.millisecondsInDay;
    /**
     * total milliseconds in a minute.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.milliseondsInMinute;
    /**
     * Get the year of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getYear = function (date) { };
    /**
     * Get the month of the given date
     * 0 -- January
     * 11 -- December
     *
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getMonth = function (date) { };
    /**
     * Get the day of the week of the given date
     * 0 -- Sunday
     * 6 -- Saturday
     *
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getDay = function (date) { };
    /**
     * Get the day num of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getDate = function (date) { };
    /**
     * Get the hours of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getHours = function (date) { };
    /**
     * Get the minutes of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getMinutes = function (date) { };
    /**
     * Get the seconds of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getSeconds = function (date) { };
    /**
     * Get the milliseconds timestamp of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getTime = function (date) { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Get the number of calendar days between the given dates.
     * If dateLeft is before dateRight, it would return positive value
     * If dateLeft is after dateRight, it would return negative value
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.differenceInCalendarDays = function (dateLeft, dateRight) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getYearName = function (date) { };
    /**
     * Get a list of month names
     * @abstract
     * @param {?} style
     * @return {?}
     */
    DateTimeAdapter.prototype.getMonthNames = function (style) { };
    /**
     * Get a list of week names
     * @abstract
     * @param {?} style
     * @return {?}
     */
    DateTimeAdapter.prototype.getDayOfWeekNames = function (style) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.getDateNames = function () { };
    /**
     * Return a Date object as a string, using the ISO standard
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.toIso8601 = function (date) { };
    /**
     * Check if the give dates are equal
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.isEqual = function (dateLeft, dateRight) { };
    /**
     * Check if the give dates are the same day
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.isSameDay = function (dateLeft, dateRight) { };
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.isValid = function (date) { };
    /**
     * Gets date instance that is not valid.
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.invalid = function () { };
    /**
     * Checks whether the given object is considered a date instance by this DateTimeAdapter.
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    DateTimeAdapter.prototype.isDateInstance = function (obj) { };
    /**
     * Add the specified number of years to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarYears = function (date, amount) { };
    /**
     * Add the specified number of months to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarMonths = function (date, amount) { };
    /**
     * Add the specified number of days to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarDays = function (date, amount) { };
    /**
     * Set the hours to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setHours = function (date, amount) { };
    /**
     * Set the minutes to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setMinutes = function (date, amount) { };
    /**
     * Set the seconds to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setSeconds = function (date, amount) { };
    /**
     * Creates a date with the given year, month, date, hour, minute and second. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.createDate = function (year, month, date) { };
    /**
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateTimeAdapter.prototype.createDate = function (year, month, date, hours, minutes, seconds) { };
    /**
     * Clone the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.clone = function (date) { };
    /**
     * Get a new moment
     *
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.now = function () { };
    /**
     * Formats a date as a string according to the given format.
     * @abstract
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Parse a user-provided value to a Date Object
     * @abstract
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.parse = function (value, parseFormat) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR2xFLE1BQU0sT0FBTyxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FDbEQsc0JBQXNCLEVBQ3RCO0lBQ0ksVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLDRCQUE0QjtDQUN4QyxDQUNKOzs7OztBQUdELE1BQU0sVUFBVSw0QkFBNEI7SUFDeEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsQ0FBQzs7Ozs7QUFHRCxNQUFNLE9BQU8sNkJBQTZCLEdBQUc7SUFDekMsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixXQUFXLEVBQUUsU0FBUztDQUN6Qjs7Ozs7QUFFRCxNQUFNLE9BQWdCLGVBQWU7SUFBckM7Ozs7UUFLYyxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7UUFNNUIsc0JBQWlCLEdBQUcsUUFBUSxDQUFDOzs7O1FBRzdCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztJQXNRbkQsQ0FBQzs7OztJQTlRRyxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7Ozs7Ozs7Ozs7SUF3TEQsT0FBTyxDQUFDLEtBQVEsRUFBRSxNQUFTO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQyxNQUFNLEtB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SUFLbEMsMERBQW9DOzs7Ozs7OztJQUtwQyx1RUFBcUQ7Ozs7Ozs7O0lBS3JELHlFQUF1RDs7Ozs7OztJQUt2RCx3REFBbUM7Ozs7OztJQUtuQyxvREFBc0I7Ozs7Ozs7SUFLdEIsOERBQTJDOzs7Ozs7OztJQUszQyx5RUFBc0Q7Ozs7Ozs7O0lBS3RELDBFQUF1RDs7Ozs7Ozs7SUFLdkQsd0VBQXFEOzs7Ozs7OztJQUtyRCxpRUFBOEM7Ozs7Ozs7O0lBSzlDLG1FQUFnRDs7Ozs7Ozs7SUFLaEQsbUVBQWdEOzs7Ozs7Ozs7O0lBTWhELHdFQUFrRTs7Ozs7Ozs7Ozs7SUFDbEUsaUdBT0s7Ozs7Ozs7SUFLTCxzREFBMkI7Ozs7Ozs7SUFLM0IsZ0RBQWtCOzs7Ozs7OztJQUtsQixzRUFBcUQ7Ozs7Ozs7O0lBS3JELG9FQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3NcbiAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgaW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgZGF0ZSB0aW1lIHBpY2tlciB0aGF0IGNhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIGRlZmF1bHQgbG9jYWxlIGNvZGUuICovXG5leHBvcnQgY29uc3QgT1dMX0RBVEVfVElNRV9MT0NBTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPihcbiAgICAnT1dMX0RBVEVfVElNRV9MT0NBTEUnLFxuICAgIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBPV0xfREFURV9USU1FX0xPQ0FMRV9GQUNUT1JZXG4gICAgfVxuKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBPV0xfREFURV9USU1FX0xPQ0FMRV9GQUNUT1JZKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGluamVjdChMT0NBTEVfSUQpO1xufVxuXG4vKiogUHJvdmlkZXIgZm9yIE9XTF9EQVRFX1RJTUVfTE9DQUxFIGluamVjdGlvbiB0b2tlbi4gKi9cbmV4cG9ydCBjb25zdCBPV0xfREFURV9USU1FX0xPQ0FMRV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBPV0xfREFURV9USU1FX0xPQ0FMRSxcbiAgICB1c2VFeGlzdGluZzogTE9DQUxFX0lEXG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZVRpbWVBZGFwdGVyPFQ+IHtcbiAgICAvKiogVGhlIGxvY2FsZSB0byB1c2UgZm9yIGFsbCBkYXRlcy4gKi9cbiAgICBwcm90ZWN0ZWQgbG9jYWxlOiBhbnk7XG5cbiAgICAvKiogQSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBsb2NhbGUgY2hhbmdlcy4gKi9cbiAgICBwcm90ZWN0ZWQgX2xvY2FsZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGdldCBsb2NhbGVDaGFuZ2VzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlQ2hhbmdlcztcbiAgICB9XG5cbiAgICAvKiogdG90YWwgbWlsbGlzZWNvbmRzIGluIGEgZGF5LiAqL1xuICAgIHByb3RlY3RlZCByZWFkb25seSBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xuXG4gICAgLyoqIHRvdGFsIG1pbGxpc2Vjb25kcyBpbiBhIG1pbnV0ZS4gKi9cbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWlsbGlzZW9uZHNJbk1pbnV0ZSA9IDYwMDAwO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0WWVhcihkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqIDAgLS0gSmFudWFyeVxuICAgICAqIDExIC0tIERlY2VtYmVyXG4gICAgICogKi9cbiAgICBhYnN0cmFjdCBnZXRNb250aChkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXkgb2YgdGhlIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKiAwIC0tIFN1bmRheVxuICAgICAqIDYgLS0gU2F0dXJkYXlcbiAgICAgKiAqL1xuICAgIGFic3RyYWN0IGdldERheShkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkYXkgbnVtIG9mIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0RGF0ZShkYXRlOiBUKTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBob3VycyBvZiB0aGUgZ2l2ZW4gZGF0ZVxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldEhvdXJzKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1pbnV0ZXMgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRNaW51dGVzKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHNlY29uZHMgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRTZWNvbmRzKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXRUaW1lKGRhdGU6IFQpOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXG4gICAgICogSWYgZGF0ZUxlZnQgaXMgYmVmb3JlIGRhdGVSaWdodCwgaXQgd291bGQgcmV0dXJuIHBvc2l0aXZlIHZhbHVlXG4gICAgICogSWYgZGF0ZUxlZnQgaXMgYWZ0ZXIgZGF0ZVJpZ2h0LCBpdCB3b3VsZCByZXR1cm4gbmVnYXRpdmUgdmFsdWVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG5hbWUgZm9yIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGdldFllYXJOYW1lKGRhdGU6IFQpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIG1vbnRoIG5hbWVzXG4gICAgICovXG4gICAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHdlZWsgbmFtZXNcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRhdGVzIG9mIHRoZSBtb250aC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBnZXREYXRlTmFtZXMoKTogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBEYXRlIG9iamVjdCBhcyBhIHN0cmluZywgdXNpbmcgdGhlIElTTyBzdGFuZGFyZFxuICAgICAqL1xuICAgIGFic3RyYWN0IHRvSXNvODYwMShkYXRlOiBUKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIGVxdWFsXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNFcXVhbChkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlIGRhdGVzIGFyZSB0aGUgc2FtZSBkYXlcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1NhbWVEYXkoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZSBpcyB2YWxpZC5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IFQpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyBkYXRlIGluc3RhbmNlIHRoYXQgaXMgbm90IHZhbGlkLlxuICAgICAqL1xuICAgIGFic3RyYWN0IGludmFsaWQoKTogVDtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIGRhdGUgaW5zdGFuY2UgYnkgdGhpcyBEYXRlVGltZUFkYXB0ZXIuXG4gICAgICovXG4gICAgYWJzdHJhY3QgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBnaXZlbiBkYXRlXG4gICAgICovXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgdG8gdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBhZGRDYWxlbmRhckRheXMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBob3VycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBzZXRIb3VycyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0TWludXRlcyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAgICovXG4gICAgYWJzdHJhY3Qgc2V0U2Vjb25kcyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgZGF0ZSwgaG91ciwgbWludXRlIGFuZCBzZWNvbmQuIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGVcbiAgICAgKiBtb250aCBhbmQgZGF0ZS5cbiAgICAgKi9cbiAgICBhYnN0cmFjdCBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogVDtcbiAgICBhYnN0cmFjdCBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlcixcbiAgICAgICAgbWludXRlczogbnVtYmVyLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXJcbiAgICApOiBUO1xuXG4gICAgLyoqXG4gICAgICogQ2xvbmUgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBhYnN0cmFjdCBjbG9uZShkYXRlOiBUKTogVDtcblxuICAgIC8qKlxuICAgICAqIEdldCBhIG5ldyBtb21lbnRcbiAgICAgKiAqL1xuICAgIGFic3RyYWN0IG5vdygpOiBUO1xuXG4gICAgLyoqXG4gICAgICogRm9ybWF0cyBhIGRhdGUgYXMgYSBzdHJpbmcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBmb3JtYXQuXG4gICAgICovXG4gICAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IFQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFBhcnNlIGEgdXNlci1wcm92aWRlZCB2YWx1ZSB0byBhIERhdGUgT2JqZWN0XG4gICAgICovXG4gICAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IFQgfCBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyZSB0d28gZ2l2ZW4gZGF0ZXNcbiAgICAgKiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gICAgICogLTEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmRcbiAgICAgKiAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAgICAgKiAqL1xuICAgIGNvbXBhcmUoZmlyc3Q6IFQsIHNlY29uZDogVCk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGZpcnN0KSB8fCAhdGhpcy5pc1ZhbGlkKHNlY29uZCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdKU05hdGl2ZURhdGU6IENhbm5vdCBjb21wYXJlIGludmFsaWQgZGF0ZXMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRlRmlyc3QgPSB0aGlzLmNsb25lKGZpcnN0KTtcbiAgICAgICAgY29uc3QgZGF0ZVNlY29uZCA9IHRoaXMuY2xvbmUoc2Vjb25kKTtcblxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5nZXRUaW1lKGRhdGVGaXJzdCkgLSB0aGlzLmdldFRpbWUoZGF0ZVNlY29uZCk7XG5cbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gICAgICAgICAgICByZXR1cm4gZGlmZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHR3byBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxuICAgICAqIDEgaWYgdGhlIGZpcnN0IGRhdGUncyB5ZWFyIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gICAgICogLTEgaWYgdGhlIGZpcnN0IGRhdGUncyB5ZWFyIGlzIGJlZm9yZSB0aGUgc2Vjb25kXG4gICAgICogMCBpZiB0d28gZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcbiAgICAgKiAqL1xuICAgIGNvbXBhcmVZZWFyKGZpcnN0OiBULCBzZWNvbmQ6IFQpOiBudW1iZXIge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChmaXJzdCkgfHwgIXRoaXMuaXNWYWxpZChzZWNvbmQpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSlNOYXRpdmVEYXRlOiBDYW5ub3QgY29tcGFyZSBpbnZhbGlkIGRhdGVzLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeWVhckxlZnQgPSB0aGlzLmdldFllYXIoZmlyc3QpO1xuICAgICAgICBjb25zdCB5ZWFyUmlnaHQgPSB0aGlzLmdldFllYXIoc2Vjb25kKTtcblxuICAgICAgICBjb25zdCBkaWZmID0geWVhckxlZnQgLSB5ZWFyUmlnaHQ7XG5cbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0cyB0byBkZXNlcmlhbGl6ZSBhIHZhbHVlIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3QuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gcGFyc2luZyBpbiB0aGF0XG4gICAgICogZGVzZXJpYWxpemUgc2hvdWxkIG9ubHkgYWNjZXB0IG5vbi1hbWJpZ3VvdXMsIGxvY2FsZS1pbmRlcGVuZGVudCBmb3JtYXRzIChlLmcuIGEgSVNPIDg2MDFcbiAgICAgKiBzdHJpbmcpLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBhbGxvdyBhbnkgZGVzZXJpYWxpemF0aW9uLCBpdCBzaW1wbHkgY2hlY2tzIHRoYXRcbiAgICAgKiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYWxyZWFkeSBhIHZhbGlkIGRhdGUgb2JqZWN0IG9yIG51bGwuIFRoZSBgPG1hdC1kYXRlcGlja2VyPmAgd2lsbCBjYWxsIHRoaXNcbiAgICAgKiBtZXRob2Qgb24gYWxsIG9mIGl0J3MgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRoYXQgYWNjZXB0IGRhdGVzLiBJdCBpcyB0aGVyZWZvcmUgcG9zc2libGUgdG9cbiAgICAgKiBzdXBwb3J0IHBhc3NpbmcgdmFsdWVzIGZyb20geW91ciBiYWNrZW5kIGRpcmVjdGx5IHRvIHRoZXNlIHByb3BlcnRpZXMgYnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZFxuICAgICAqIHRvIGFsc28gZGVzZXJpYWxpemUgdGhlIGZvcm1hdCB1c2VkIGJ5IHlvdXIgYmFja2VuZC5cbiAgICAgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogVCB8IG51bGwge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB2YWx1ZSA9PSBudWxsIHx8XG4gICAgICAgICAgICAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkgJiYgdGhpcy5pc1ZhbGlkKHZhbHVlKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGxvY2FsZSB1c2VkIGZvciBhbGwgZGF0ZXMuXG4gICAgICovXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogYW55KSB7XG4gICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICAgICAgICB0aGlzLl9sb2NhbGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGFtcCB0aGUgZ2l2ZW4gZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4IGRhdGVzLlxuICAgICAqL1xuICAgIGNsYW1wRGF0ZShkYXRlOiBULCBtaW4/OiBUIHwgbnVsbCwgbWF4PzogVCB8IG51bGwpOiBUIHtcbiAgICAgICAgaWYgKG1pbiAmJiB0aGlzLmNvbXBhcmUoZGF0ZSwgbWluKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtaW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heCAmJiB0aGlzLmNvbXBhcmUoZGF0ZSwgbWF4KSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxufVxuIl19