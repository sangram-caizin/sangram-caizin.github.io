/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/adapter/native-date-time-adapter.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * native-date-time-adapter.class
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE } from './date-time-adapter.class';
/**
 * The default month names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_MONTH_NAMES = {
    long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    short: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/**
 * The default day of the week names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    long: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
const ɵ0 = /**
 * @param {?} i
 * @return {?}
 */
i => String(i + 1);
/**
 * The default date names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_DATE_NAMES = range(31, (ɵ0));
/**
 * Whether the browser supports the Intl API.
 * @type {?}
 */
const SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 * @type {?}
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
export class NativeDateTimeAdapter extends DateTimeAdapter {
    /**
     * @param {?} owlDateTimeLocale
     * @param {?} platform
     */
    constructor(owlDateTimeLocale, platform) {
        super();
        this.owlDateTimeLocale = owlDateTimeLocale;
        super.setLocale(owlDateTimeLocale);
        // IE does its own time zone correction, so we disable this on IE.
        this.useUtcForDisplay = !platform.TRIDENT;
        this._clampDate = platform.TRIDENT || platform.EDGE;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDay(date) {
        return date.getDay();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return date.getHours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return date.getMinutes();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getSeconds(date) {
        return date.getSeconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTime(date) {
        return date.getTime();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        /** @type {?} */
        const lastDateOfMonth = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0);
        return this.getDate(lastDateOfMonth);
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    differenceInCalendarDays(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            const dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
            /** @type {?} */
            const dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
            /** @type {?} */
            const timeStampLeft = this.getTime(dateLeftStartOfDay) -
                dateLeftStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            /** @type {?} */
            const timeStampRight = this.getTime(dateRightStartOfDay) -
                dateRightStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                timeZone: 'utc'
            });
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, {
                month: style,
                timeZone: 'utc'
            });
            return range(12, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1)))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, {
                weekday: style,
                timeZone: 'utc'
            });
            return range(7, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1)))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    /**
     * @return {?}
     */
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, {
                day: 'numeric',
                timeZone: 'utc'
            });
            return range(31, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1)))));
        }
        return DEFAULT_DATE_NAMES;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return date.toISOString();
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isEqual(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            return dateLeft.getTime() === dateRight.getTime();
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isSameDay(dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            const dateLeftStartOfDay = this.clone(dateLeft);
            /** @type {?} */
            const dateRightStartOfDay = this.clone(dateRight);
            dateLeftStartOfDay.setHours(0, 0, 0, 0);
            dateRightStartOfDay.setHours(0, 0, 0, 0);
            return (dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime());
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return date && !isNaN(date.getTime());
    }
    /**
     * @return {?}
     */
    invalid() {
        return new Date(NaN);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarYears(date, amount) {
        return this.addCalendarMonths(date, amount * 12);
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarMonths(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        amount = Number(amount);
        /** @type {?} */
        const desiredMonth = result.getMonth() + amount;
        /** @type {?} */
        const dateWithDesiredMonth = new Date(0);
        dateWithDesiredMonth.setFullYear(result.getFullYear(), desiredMonth, 1);
        dateWithDesiredMonth.setHours(0, 0, 0, 0);
        /** @type {?} */
        const daysInMonth = this.getNumDaysInMonth(dateWithDesiredMonth);
        // Set the last day of the new month
        // if the original date was the last day of the longer month
        result.setMonth(desiredMonth, Math.min(daysInMonth, result.getDate()));
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    addCalendarDays(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        amount = Number(amount);
        result.setDate(result.getDate() + amount);
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setHours(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        result.setHours(amount);
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setMinutes(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        result.setMinutes(amount);
        return result;
    }
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    setSeconds(date, amount) {
        /** @type {?} */
        const result = this.clone(date);
        result.setSeconds(amount);
        return result;
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    createDate(year, month, date, hours = 0, minutes = 0, seconds = 0) {
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        if (hours < 0 || hours > 23) {
            throw Error(`Invalid hours "${hours}". Hours has to be between 0 and 23.`);
        }
        if (minutes < 0 || minutes > 59) {
            throw Error(`Invalid minutes "${minutes}". Minutes has to between 0 and 59.`);
        }
        if (seconds < 0 || seconds > 59) {
            throw Error(`Invalid seconds "${seconds}". Seconds has to be between 0 and 59.`);
        }
        /** @type {?} */
        const result = this.createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    }
    /**
     * @return {?}
     */
    now() {
        return new Date();
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('JSNativeDate: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            if (this._clampDate &&
                (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this.stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
        // There is no way using the native JS Date to set the parse format or locale
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                /** @type {?} */
                const date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return super.deserialize(value);
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    createDateWithOverflow(year, month, date, hours = 0, minutes = 0, seconds = 0) {
        /** @type {?} */
        const result = new Date(year, month, date, hours, minutes, seconds);
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str
     * @return {?}
     */
    stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @private
     * @param {?} dtf
     * @param {?} date
     * @return {?}
     */
    _format(dtf, date) {
        /** @type {?} */
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    }
}
NativeDateTimeAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NativeDateTimeAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
    { type: Platform }
];
if (false) {
    /**
     * Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors.
     * @type {?}
     * @private
     */
    NativeDateTimeAdapter.prototype._clampDate;
    /**
     * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
     * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
     * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
     * will produce `'8/13/1800'`.
     * @type {?}
     */
    NativeDateTimeAdapter.prototype.useUtcForDisplay;
    /**
     * @type {?}
     * @private
     */
    NativeDateTimeAdapter.prototype.owlDateTimeLocale;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvYWRhcHRlci9uYXRpdmUtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxlQUFlLEVBQ2Ysb0JBQW9CLEVBQ3ZCLE1BQU0sMkJBQTJCLENBQUM7Ozs7O01BRzdCLG1CQUFtQixHQUFHO0lBQ3hCLElBQUksRUFBRTtRQUNGLFNBQVM7UUFDVCxVQUFVO1FBQ1YsT0FBTztRQUNQLE9BQU87UUFDUCxLQUFLO1FBQ0wsTUFBTTtRQUNOLE1BQU07UUFDTixRQUFRO1FBQ1IsV0FBVztRQUNYLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtLQUNiO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO0tBQ1I7SUFDRCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztDQUN2RTs7Ozs7TUFHSyx5QkFBeUIsR0FBRztJQUM5QixJQUFJLEVBQUU7UUFDRixRQUFRO1FBQ1IsUUFBUTtRQUNSLFNBQVM7UUFDVCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFFBQVE7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QUNuQixVQUFrQixDQUFDOztjQUViLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUVuRSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtZQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7Ozs7Ozs7SUFPTyw2QkFBNkIsQ0FBQyxHQUFXO1FBQzdDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7Ozs7Ozs7SUFTTyxPQUFPLENBQUMsR0FBd0IsRUFBRSxJQUFVOztjQUMxQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FDSixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQ3pCLENBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7O1lBN1pKLFVBQVU7Ozs7eUNBY0YsUUFBUSxZQUNSLE1BQU0sU0FBQyxvQkFBb0I7WUEzRjNCLFFBQVE7Ozs7Ozs7O0lBK0ViLDJDQUFxQzs7Ozs7Ozs7SUFRckMsaURBQTBCOzs7OztJQUd0QixrREFFaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzc1xuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gICAgRGF0ZVRpbWVBZGFwdGVyLFxuICAgIE9XTF9EQVRFX1RJTUVfTE9DQUxFXG59IGZyb20gJy4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuXG4vKiogVGhlIGRlZmF1bHQgbW9udGggbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX01PTlRIX05BTUVTID0ge1xuICAgIGxvbmc6IFtcbiAgICAgICAgJ0phbnVhcnknLFxuICAgICAgICAnRmVicnVhcnknLFxuICAgICAgICAnTWFyY2gnLFxuICAgICAgICAnQXByaWwnLFxuICAgICAgICAnTWF5JyxcbiAgICAgICAgJ0p1bmUnLFxuICAgICAgICAnSnVseScsXG4gICAgICAgICdBdWd1c3QnLFxuICAgICAgICAnU2VwdGVtYmVyJyxcbiAgICAgICAgJ09jdG9iZXInLFxuICAgICAgICAnTm92ZW1iZXInLFxuICAgICAgICAnRGVjZW1iZXInXG4gICAgXSxcbiAgICBzaG9ydDogW1xuICAgICAgICAnSmFuJyxcbiAgICAgICAgJ0ZlYicsXG4gICAgICAgICdNYXInLFxuICAgICAgICAnQXByJyxcbiAgICAgICAgJ01heScsXG4gICAgICAgICdKdW4nLFxuICAgICAgICAnSnVsJyxcbiAgICAgICAgJ0F1ZycsXG4gICAgICAgICdTZXAnLFxuICAgICAgICAnT2N0JyxcbiAgICAgICAgJ05vdicsXG4gICAgICAgICdEZWMnXG4gICAgXSxcbiAgICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXVxufTtcblxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVMgPSB7XG4gICAgbG9uZzogW1xuICAgICAgICAnU3VuZGF5JyxcbiAgICAgICAgJ01vbmRheScsXG4gICAgICAgICdUdWVzZGF5JyxcbiAgICAgICAgJ1dlZG5lc2RheScsXG4gICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICdGcmlkYXknLFxuICAgICAgICAnU2F0dXJkYXknXG4gICAgXSxcbiAgICBzaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG59O1xuXG4vKiogVGhlIGRlZmF1bHQgZGF0ZSBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFURV9OQU1FUyA9IHJhbmdlKDMxLCBpID0+IFN0cmluZyhpICsgMSkpO1xuXG4vKiogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgSW50bCBBUEkuICovXG5jb25zdCBTVVBQT1JUU19JTlRMX0FQSSA9IHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBNYXRjaGVzIHN0cmluZ3MgdGhhdCBoYXZlIHRoZSBmb3JtIG9mIGEgdmFsaWQgUkZDIDMzMzkgc3RyaW5nXG4gKiAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkpLiBOb3RlIHRoYXQgdGhlIHN0cmluZyBtYXkgbm90IGFjdHVhbGx5IGJlIGEgdmFsaWQgZGF0ZVxuICogYmVjYXVzZSB0aGUgcmVnZXggd2lsbCBtYXRjaCBzdHJpbmdzIGFuIHdpdGggb3V0IG9mIGJvdW5kcyBtb250aCwgZGF0ZSwgZXRjLlxuICovXG5jb25zdCBJU09fODYwMV9SRUdFWCA9IC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0oPzpUXFxkezJ9OlxcZHsyfTpcXGR7Mn0oPzpcXC5cXGQrKT8oPzpafCg/Oig/OlxcK3wtKVxcZHsyfTpcXGR7Mn0pKT8pPyQvO1xuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIGV4dGVuZHMgRGF0ZVRpbWVBZGFwdGVyPERhdGU+IHtcbiAgICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsYW1wRGF0ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGB0aW1lWm9uZTogJ3V0YydgIHdpdGggYEludGwuRGF0ZVRpbWVGb3JtYXRgIHdoZW4gZm9ybWF0dGluZyBkYXRlcy5cbiAgICAgKiBXaXRob3V0IHRoaXMgYEludGwuRGF0ZVRpbWVGb3JtYXRgIHNvbWV0aW1lcyBjaG9vc2VzIHRoZSB3cm9uZyB0aW1lWm9uZSwgd2hpY2ggY2FuIHRocm93IG9mZlxuICAgICAqIHRoZSByZXN1bHQuIChlLmcuIGluIHRoZSBlbi1VUyBsb2NhbGUgYG5ldyBEYXRlKDE4MDAsIDcsIDE0KS50b0xvY2FsZURhdGVTdHJpbmcoKWBcbiAgICAgKiB3aWxsIHByb2R1Y2UgYCc4LzEzLzE4MDAnYC5cbiAgICAgKi9cbiAgICB1c2VVdGNGb3JEaXNwbGF5OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9MT0NBTEUpXG4gICAgICAgIHByaXZhdGUgb3dsRGF0ZVRpbWVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShvd2xEYXRlVGltZUxvY2FsZSk7XG5cbiAgICAgICAgLy8gSUUgZG9lcyBpdHMgb3duIHRpbWUgem9uZSBjb3JyZWN0aW9uLCBzbyB3ZSBkaXNhYmxlIHRoaXMgb24gSUUuXG4gICAgICAgIHRoaXMudXNlVXRjRm9yRGlzcGxheSA9ICFwbGF0Zm9ybS5UUklERU5UO1xuICAgICAgICB0aGlzLl9jbGFtcERhdGUgPSBwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXkoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldERheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhvdXJzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNaW51dGVzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbGFzdERhdGVPZk1vbnRoID0gdGhpcy5jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChkYXRlKSArIDEsXG4gICAgICAgICAgICAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZShsYXN0RGF0ZU9mTW9udGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQ6IERhdGUsIGRhdGVSaWdodDogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZUxlZnQpICYmIHRoaXMuaXNWYWxpZChkYXRlUmlnaHQpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGVMZWZ0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVMZWZ0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGUoZGF0ZUxlZnQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHRoaXMuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZVJpZ2h0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVSaWdodCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRlKGRhdGVSaWdodClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFtcExlZnQgPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZShkYXRlTGVmdFN0YXJ0T2ZEYXkpIC1cbiAgICAgICAgICAgICAgICBkYXRlTGVmdFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFtcFJpZ2h0ID1cbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWUoZGF0ZVJpZ2h0U3RhcnRPZkRheSkgLVxuICAgICAgICAgICAgICAgIGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICAgICh0aW1lU3RhbXBMZWZ0IC0gdGltZVN0YW1wUmlnaHQpIC8gdGhpcy5taWxsaXNlY29uZHNJbkRheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXJOYW1lKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAndXRjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLmdldFllYXIoZGF0ZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aDogc3R5bGUsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSgxMiwgaSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIGksIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfTU9OVEhfTkFNRVNbc3R5bGVdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgICAgICAgICAgd2Vla2RheTogc3R5bGUsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSg3LCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlKDMxLCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfREFURV9OQU1FUztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Jc284NjAxKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VxdWFsKGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlTGVmdC5nZXRUaW1lKCkgPT09IGRhdGVSaWdodC5nZXRUaW1lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTYW1lRGF5KGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZkRheSA9IHRoaXMuY2xvbmUoZGF0ZUxlZnQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHRoaXMuY2xvbmUoZGF0ZVJpZ2h0KTtcbiAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIGRhdGVSaWdodFN0YXJ0T2ZEYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmFsaWQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZGF0ZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnZhbGlkKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2FsZW5kYXJNb250aHMoZGF0ZSwgYW1vdW50ICogMTIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBhbW91bnQgPSBOdW1iZXIoYW1vdW50KTtcblxuICAgICAgICBjb25zdCBkZXNpcmVkTW9udGggPSByZXN1bHQuZ2V0TW9udGgoKSArIGFtb3VudDtcbiAgICAgICAgY29uc3QgZGF0ZVdpdGhEZXNpcmVkTW9udGggPSBuZXcgRGF0ZSgwKTtcbiAgICAgICAgZGF0ZVdpdGhEZXNpcmVkTW9udGguc2V0RnVsbFllYXIocmVzdWx0LmdldEZ1bGxZZWFyKCksIGRlc2lyZWRNb250aCwgMSk7XG4gICAgICAgIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5nZXROdW1EYXlzSW5Nb250aChkYXRlV2l0aERlc2lyZWRNb250aCk7XG4gICAgICAgIC8vIFNldCB0aGUgbGFzdCBkYXkgb2YgdGhlIG5ldyBtb250aFxuICAgICAgICAvLyBpZiB0aGUgb3JpZ2luYWwgZGF0ZSB3YXMgdGhlIGxhc3QgZGF5IG9mIHRoZSBsb25nZXIgbW9udGhcbiAgICAgICAgcmVzdWx0LnNldE1vbnRoKGRlc2lyZWRNb250aCwgTWF0aC5taW4oZGF5c0luTW9udGgsIHJlc3VsdC5nZXREYXRlKCkpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGFtb3VudCA9IE51bWJlcihhbW91bnQpO1xuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SG91cnMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldEhvdXJzKGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZXMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldE1pbnV0ZXMoYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kcyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0U2Vjb25kcyhhbW91bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgIHNlY29uZHM6IG51bWJlciA9IDBcbiAgICApOiBEYXRlIHtcbiAgICAgICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIuIERhdGUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIGhvdXJzIFwiJHtob3Vyc31cIi4gSG91cnMgaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMjMuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCB8fCBtaW51dGVzID4gNTkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1pbnV0ZXMgXCIke21pbnV0ZXN9XCIuIE1pbnV0ZXMgaGFzIHRvIGJldHdlZW4gMCBhbmQgNTkuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRzIDwgMCB8fCBzZWNvbmRzID4gNTkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIHNlY29uZHMgXCIke3NlY29uZHN9XCIuIFNlY29uZHMgaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgNTkuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvIG92ZXJmbG93XG4gICAgICAgIC8vIEZvciBleGFtcGxlLCBjcmVhdGVEYXRlKDIwMTcsIDEsIDMxKSB3b3VsZCB0cnkgdG8gY3JlYXRlIGEgZGF0ZSAyMDE3LzAyLzMxIHdoaWNoIGlzIGludmFsaWRcbiAgICAgICAgaWYgKHJlc3VsdC5nZXRNb250aCgpICE9PSBtb250aCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRTZWNvbmRzKGRhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5vdygpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdChkYXRlOiBEYXRlLCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0pTTmF0aXZlRGF0ZTogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGFtcERhdGUgJiZcbiAgICAgICAgICAgICAgICAoZGF0ZS5nZXRGdWxsWWVhcigpIDwgMSB8fCBkYXRlLmdldEZ1bGxZZWFyKCkgPiA5OTk5KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMSwgTWF0aC5taW4oOTk5OSwgZGF0ZS5nZXRGdWxsWWVhcigpKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXNwbGF5Rm9ybWF0ID0geyAuLi5kaXNwbGF5Rm9ybWF0LCB0aW1lWm9uZTogJ3V0YycgfTtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCBkaXNwbGF5Rm9ybWF0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIGRhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKGRhdGUudG9EYXRlU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogRGF0ZSB8IG51bGwge1xuICAgICAgICAvLyBUaGVyZSBpcyBubyB3YXkgdXNpbmcgdGhlIG5hdGl2ZSBKUyBEYXRlIHRvIHNldCB0aGUgcGFyc2UgZm9ybWF0IG9yIGxvY2FsZVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgPyBuZXcgRGF0ZShEYXRlLnBhcnNlKHZhbHVlKSkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgRGF0ZSBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xuICAgICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGludG8gdmFsaWQgRGF0ZXMgYW5kIGVtcHR5IHN0cmluZyBpbnRvIG51bGwuIFJldHVybnMgYW5cbiAgICAgKiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAgICovXG4gICAgcHVibGljIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEYXRlIHwgbnVsbCB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgYERhdGVgIGNvbnN0cnVjdG9yIGFjY2VwdHMgZm9ybWF0cyBvdGhlciB0aGFuIElTTyA4NjAxLCBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGVcbiAgICAgICAgICAgIC8vIHN0cmluZyBpcyB0aGUgcmlnaHQgZm9ybWF0IGZpcnN0LlxuICAgICAgICAgICAgaWYgKElTT184NjAxX1JFR0VYLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkYXRlIGJ1dCBhbGxvd3MgdGhlIG1vbnRoIGFuZCBkYXRlIHRvIG92ZXJmbG93LlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIgPSAwLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwXG4gICAgKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcywgc2Vjb25kcyk7XG5cbiAgICAgICAgaWYgKHllYXIgPj0gMCAmJiB5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0RnVsbFllYXIodGhpcy5nZXRZZWFyKHJlc3VsdCkgLSAxOTAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0cmlwIG91dCB1bmljb2RlIExUUiBhbmQgUlRMIGNoYXJhY3RlcnMuIEVkZ2UgYW5kIElFIGluc2VydCB0aGVzZSBpbnRvIGZvcm1hdHRlZCBkYXRlcyB3aGlsZVxuICAgICAqIG90aGVyIGJyb3dzZXJzIGRvIG5vdC4gV2UgcmVtb3ZlIHRoZW0gdG8gbWFrZSBvdXRwdXQgY29uc2lzdGVudCBhbmQgYmVjYXVzZSB0aGV5IGludGVyZmVyZSB3aXRoXG4gICAgICogZGF0ZSBwYXJzaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFx1MjAwZVxcdTIwMGZdL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNvbnZlcnRpbmcgRGF0ZSBvYmplY3QgdG8gc3RyaW5nLCBqYXZhc2NyaXB0IGJ1aWx0LWluIGZ1bmN0aW9ucyBtYXkgcmV0dXJuIHdyb25nXG4gICAgICogcmVzdWx0cyBiZWNhdXNlIGl0IGFwcGxpZXMgaXRzIGludGVybmFsIERTVCBydWxlcy4gVGhlIERTVCBydWxlcyBhcm91bmQgdGhlIHdvcmxkIGNoYW5nZVxuICAgICAqIHZlcnkgZnJlcXVlbnRseSwgYW5kIHRoZSBjdXJyZW50IHZhbGlkIHJ1bGUgaXMgbm90IGFsd2F5cyB2YWxpZCBpbiBwcmV2aW91cyB5ZWFycyB0aG91Z2guXG4gICAgICogV2Ugd29yayBhcm91bmQgdGhpcyBwcm9ibGVtIGJ1aWxkaW5nIGEgbmV3IERhdGUgb2JqZWN0IHdoaWNoIGhhcyBpdHMgaW50ZXJuYWwgVVRDXG4gICAgICogcmVwcmVzZW50YXRpb24gd2l0aCB0aGUgbG9jYWwgZGF0ZSBhbmQgdGltZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9mb3JtYXQoZHRmOiBJbnRsLkRhdGVUaW1lRm9ybWF0LCBkYXRlOiBEYXRlKSB7XG4gICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgIERhdGUuVVRDKFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRIb3VycygpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TWludXRlcygpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGR0Zi5mb3JtYXQoZCk7XG4gICAgfVxufVxuIl19