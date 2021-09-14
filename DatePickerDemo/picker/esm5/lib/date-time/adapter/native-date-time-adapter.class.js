/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/adapter/native-date-time-adapter.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DEFAULT_MONTH_NAMES = {
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
var DEFAULT_DAY_OF_WEEK_NAMES = {
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
var ɵ0 = /**
 * @param {?} i
 * @return {?}
 */
function (i) { return String(i + 1); };
/**
 * The default date names to use if Intl API is not available.
 * @type {?}
 */
var DEFAULT_DATE_NAMES = range(31, (ɵ0));
/**
 * Whether the browser supports the Intl API.
 * @type {?}
 */
var SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 * @type {?}
 */
var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var NativeDateTimeAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(NativeDateTimeAdapter, _super);
    function NativeDateTimeAdapter(owlDateTimeLocale, platform) {
        var _this = _super.call(this) || this;
        _this.owlDateTimeLocale = owlDateTimeLocale;
        _super.prototype.setLocale.call(_this, owlDateTimeLocale);
        // IE does its own time zone correction, so we disable this on IE.
        _this.useUtcForDisplay = !platform.TRIDENT;
        _this._clampDate = platform.TRIDENT || platform.EDGE;
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDay = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getHours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMinutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getSeconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getSeconds();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getTime();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var lastDateOfMonth = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0);
        return this.getDate(lastDateOfMonth);
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.differenceInCalendarDays = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            var dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
            /** @type {?} */
            var dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
            /** @type {?} */
            var timeStampLeft = this.getTime(dateLeftStartOfDay) -
                dateLeftStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            /** @type {?} */
            var timeStampRight = this.getTime(dateRightStartOfDay) -
                dateRightStartOfDay.getTimezoneOffset() *
                    this.milliseondsInMinute;
            return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                timeZone: 'utc'
            });
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_1 = new Intl.DateTimeFormat(this.locale, {
                month: style,
                timeZone: 'utc'
            });
            return range(12, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) {
                return _this.stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1)));
            }));
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    /**
     * @param {?} style
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_2 = new Intl.DateTimeFormat(this.locale, {
                weekday: style,
                timeZone: 'utc'
            });
            return range(7, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) {
                return _this.stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1)));
            }));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    /**
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_3 = new Intl.DateTimeFormat(this.locale, {
                day: 'numeric',
                timeZone: 'utc'
            });
            return range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) {
                return _this.stripDirectionalityCharacters(_this._format(dtf_3, new Date(2017, 0, i + 1)));
            }));
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.toISOString();
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isEqual = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            return dateLeft.getTime() === dateRight.getTime();
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isSameDay = /**
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        if (this.isValid(dateLeft) && this.isValid(dateRight)) {
            /** @type {?} */
            var dateLeftStartOfDay = this.clone(dateLeft);
            /** @type {?} */
            var dateRightStartOfDay = this.clone(dateRight);
            dateLeftStartOfDay.setHours(0, 0, 0, 0);
            dateRightStartOfDay.setHours(0, 0, 0, 0);
            return (dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime());
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && !isNaN(date.getTime());
    };
    /**
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return new Date(NaN);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return obj instanceof Date;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        return this.addCalendarMonths(date, amount * 12);
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        amount = Number(amount);
        /** @type {?} */
        var desiredMonth = result.getMonth() + amount;
        /** @type {?} */
        var dateWithDesiredMonth = new Date(0);
        dateWithDesiredMonth.setFullYear(result.getFullYear(), desiredMonth, 1);
        dateWithDesiredMonth.setHours(0, 0, 0, 0);
        /** @type {?} */
        var daysInMonth = this.getNumDaysInMonth(dateWithDesiredMonth);
        // Set the last day of the new month
        // if the original date was the last day of the longer month
        result.setMonth(desiredMonth, Math.min(daysInMonth, result.getDate()));
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        amount = Number(amount);
        result.setDate(result.getDate() + amount);
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.setHours = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        result.setHours(amount);
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.setMinutes = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        result.setMinutes(amount);
        return result;
    };
    /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.setSeconds = /**
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    function (date, amount) {
        /** @type {?} */
        var result = this.clone(date);
        result.setSeconds(amount);
        return result;
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @param {?=} seconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds) {
        if (hours === void 0) { hours = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        if (hours < 0 || hours > 23) {
            throw Error("Invalid hours \"" + hours + "\". Hours has to be between 0 and 23.");
        }
        if (minutes < 0 || minutes > 59) {
            throw Error("Invalid minutes \"" + minutes + "\". Minutes has to between 0 and 59.");
        }
        if (seconds < 0 || seconds > 59) {
            throw Error("Invalid seconds \"" + seconds + "\". Seconds has to be between 0 and 59.");
        }
        /** @type {?} */
        var result = this.createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
        if (result.getMonth() !== month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.now = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('JSNativeDate: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            if (this._clampDate &&
                (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = tslib_1.__assign({}, displayFormat, { timeZone: 'utc' });
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this.stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this.stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        // There is no way using the native JS Date to set the parse format or locale
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    };
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                /** @type {?} */
                var date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return _super.prototype.deserialize.call(this, value);
    };
    /**
     * Creates a date but allows the month and date to overflow.
     */
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
    NativeDateTimeAdapter.prototype.createDateWithOverflow = /**
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
    function (year, month, date, hours, minutes, seconds) {
        if (hours === void 0) { hours = 0; }
        if (minutes === void 0) { minutes = 0; }
        if (seconds === void 0) { seconds = 0; }
        /** @type {?} */
        var result = new Date(year, month, date, hours, minutes, seconds);
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     */
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str
     * @return {?}
     */
    NativeDateTimeAdapter.prototype.stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/[\u200e\u200f]/g, '');
    };
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     */
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
    NativeDateTimeAdapter.prototype._format = /**
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
    function (dtf, date) {
        /** @type {?} */
        var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    };
    NativeDateTimeAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NativeDateTimeAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
        { type: Platform }
    ]; };
    return NativeDateTimeAdapter;
}(DateTimeAdapter));
export { NativeDateTimeAdapter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvYWRhcHRlci9uYXRpdmUtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsZUFBZSxFQUNmLG9CQUFvQixFQUN2QixNQUFNLDJCQUEyQixDQUFDOzs7OztJQUc3QixtQkFBbUIsR0FBRztJQUN4QixJQUFJLEVBQUU7UUFDRixTQUFTO1FBQ1QsVUFBVTtRQUNWLE9BQU87UUFDUCxPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU07UUFDTixNQUFNO1FBQ04sUUFBUTtRQUNSLFdBQVc7UUFDWCxTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7S0FDYjtJQUNELEtBQUssRUFBRTtRQUNILEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztRQUNMLEtBQUs7UUFDTCxLQUFLO1FBQ0wsS0FBSztLQUNSO0lBQ0QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7Q0FDdkU7Ozs7O0lBR0sseUJBQXlCLEdBQUc7SUFDOUIsSUFBSSxFQUFFO1FBQ0YsUUFBUTtRQUNSLFFBQVE7UUFDUixTQUFTO1FBQ1QsV0FBVztRQUNYLFVBQVU7UUFDVixRQUFR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QUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7O09BTUc7Ozs7Ozs7Ozs7OztJQUNLLHVDQUFPOzs7Ozs7Ozs7OztJQUFmLFVBQWdCLEdBQXdCLEVBQUUsSUFBVTs7WUFDMUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUNkLElBQUksQ0FBQyxHQUFHLENBQ0osSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixJQUFJLENBQUMsVUFBVSxFQUFFLEVBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUN6QixDQUNKO1FBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7O2dCQTdaSixVQUFVOzs7OzZDQWNGLFFBQVEsWUFDUixNQUFNLFNBQUMsb0JBQW9CO2dCQTNGM0IsUUFBUTs7SUEwZWpCLDRCQUFDO0NBQUEsQUE5WkQsQ0FDMkMsZUFBZSxHQTZaekQ7U0E3WlkscUJBQXFCOzs7Ozs7O0lBRTlCLDJDQUFxQzs7Ozs7Ozs7SUFRckMsaURBQTBCOzs7OztJQUd0QixrREFFaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG5hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzc1xuICovXG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gICAgRGF0ZVRpbWVBZGFwdGVyLFxuICAgIE9XTF9EQVRFX1RJTUVfTE9DQUxFXG59IGZyb20gJy4vZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuXG4vKiogVGhlIGRlZmF1bHQgbW9udGggbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX01PTlRIX05BTUVTID0ge1xuICAgIGxvbmc6IFtcbiAgICAgICAgJ0phbnVhcnknLFxuICAgICAgICAnRmVicnVhcnknLFxuICAgICAgICAnTWFyY2gnLFxuICAgICAgICAnQXByaWwnLFxuICAgICAgICAnTWF5JyxcbiAgICAgICAgJ0p1bmUnLFxuICAgICAgICAnSnVseScsXG4gICAgICAgICdBdWd1c3QnLFxuICAgICAgICAnU2VwdGVtYmVyJyxcbiAgICAgICAgJ09jdG9iZXInLFxuICAgICAgICAnTm92ZW1iZXInLFxuICAgICAgICAnRGVjZW1iZXInXG4gICAgXSxcbiAgICBzaG9ydDogW1xuICAgICAgICAnSmFuJyxcbiAgICAgICAgJ0ZlYicsXG4gICAgICAgICdNYXInLFxuICAgICAgICAnQXByJyxcbiAgICAgICAgJ01heScsXG4gICAgICAgICdKdW4nLFxuICAgICAgICAnSnVsJyxcbiAgICAgICAgJ0F1ZycsXG4gICAgICAgICdTZXAnLFxuICAgICAgICAnT2N0JyxcbiAgICAgICAgJ05vdicsXG4gICAgICAgICdEZWMnXG4gICAgXSxcbiAgICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXVxufTtcblxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFZX09GX1dFRUtfTkFNRVMgPSB7XG4gICAgbG9uZzogW1xuICAgICAgICAnU3VuZGF5JyxcbiAgICAgICAgJ01vbmRheScsXG4gICAgICAgICdUdWVzZGF5JyxcbiAgICAgICAgJ1dlZG5lc2RheScsXG4gICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICdGcmlkYXknLFxuICAgICAgICAnU2F0dXJkYXknXG4gICAgXSxcbiAgICBzaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG59O1xuXG4vKiogVGhlIGRlZmF1bHQgZGF0ZSBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cbmNvbnN0IERFRkFVTFRfREFURV9OQU1FUyA9IHJhbmdlKDMxLCBpID0+IFN0cmluZyhpICsgMSkpO1xuXG4vKiogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgSW50bCBBUEkuICovXG5jb25zdCBTVVBQT1JUU19JTlRMX0FQSSA9IHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBNYXRjaGVzIHN0cmluZ3MgdGhhdCBoYXZlIHRoZSBmb3JtIG9mIGEgdmFsaWQgUkZDIDMzMzkgc3RyaW5nXG4gKiAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkpLiBOb3RlIHRoYXQgdGhlIHN0cmluZyBtYXkgbm90IGFjdHVhbGx5IGJlIGEgdmFsaWQgZGF0ZVxuICogYmVjYXVzZSB0aGUgcmVnZXggd2lsbCBtYXRjaCBzdHJpbmdzIGFuIHdpdGggb3V0IG9mIGJvdW5kcyBtb250aCwgZGF0ZSwgZXRjLlxuICovXG5jb25zdCBJU09fODYwMV9SRUdFWCA9IC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0oPzpUXFxkezJ9OlxcZHsyfTpcXGR7Mn0oPzpcXC5cXGQrKT8oPzpafCg/Oig/OlxcK3wtKVxcZHsyfTpcXGR7Mn0pKT8pPyQvO1xuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIGV4dGVuZHMgRGF0ZVRpbWVBZGFwdGVyPERhdGU+IHtcbiAgICAvKiogV2hldGhlciB0byBjbGFtcCB0aGUgZGF0ZSBiZXR3ZWVuIDEgYW5kIDk5OTkgdG8gYXZvaWQgSUUgYW5kIEVkZ2UgZXJyb3JzLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NsYW1wRGF0ZTogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGB0aW1lWm9uZTogJ3V0YydgIHdpdGggYEludGwuRGF0ZVRpbWVGb3JtYXRgIHdoZW4gZm9ybWF0dGluZyBkYXRlcy5cbiAgICAgKiBXaXRob3V0IHRoaXMgYEludGwuRGF0ZVRpbWVGb3JtYXRgIHNvbWV0aW1lcyBjaG9vc2VzIHRoZSB3cm9uZyB0aW1lWm9uZSwgd2hpY2ggY2FuIHRocm93IG9mZlxuICAgICAqIHRoZSByZXN1bHQuIChlLmcuIGluIHRoZSBlbi1VUyBsb2NhbGUgYG5ldyBEYXRlKDE4MDAsIDcsIDE0KS50b0xvY2FsZURhdGVTdHJpbmcoKWBcbiAgICAgKiB3aWxsIHByb2R1Y2UgYCc4LzEzLzE4MDAnYC5cbiAgICAgKi9cbiAgICB1c2VVdGNGb3JEaXNwbGF5OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9MT0NBTEUpXG4gICAgICAgIHByaXZhdGUgb3dsRGF0ZVRpbWVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgcGxhdGZvcm06IFBsYXRmb3JtXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShvd2xEYXRlVGltZUxvY2FsZSk7XG5cbiAgICAgICAgLy8gSUUgZG9lcyBpdHMgb3duIHRpbWUgem9uZSBjb3JyZWN0aW9uLCBzbyB3ZSBkaXNhYmxlIHRoaXMgb24gSUUuXG4gICAgICAgIHRoaXMudXNlVXRjRm9yRGlzcGxheSA9ICFwbGF0Zm9ybS5UUklERU5UO1xuICAgICAgICB0aGlzLl9jbGFtcERhdGUgPSBwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXkoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldERheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEhvdXJzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNaW51dGVzKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNlY29uZHMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldFNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VGltZShkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbGFzdERhdGVPZk1vbnRoID0gdGhpcy5jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRNb250aChkYXRlKSArIDEsXG4gICAgICAgICAgICAwXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZShsYXN0RGF0ZU9mTW9udGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoZGF0ZUxlZnQ6IERhdGUsIGRhdGVSaWdodDogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoZGF0ZUxlZnQpICYmIHRoaXMuaXNWYWxpZChkYXRlUmlnaHQpKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSB0aGlzLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRZZWFyKGRhdGVMZWZ0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVMZWZ0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGUoZGF0ZUxlZnQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHRoaXMuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmdldFllYXIoZGF0ZVJpZ2h0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1vbnRoKGRhdGVSaWdodCksXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYXRlKGRhdGVSaWdodClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFtcExlZnQgPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGltZShkYXRlTGVmdFN0YXJ0T2ZEYXkpIC1cbiAgICAgICAgICAgICAgICBkYXRlTGVmdFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFtcFJpZ2h0ID1cbiAgICAgICAgICAgICAgICB0aGlzLmdldFRpbWUoZGF0ZVJpZ2h0U3RhcnRPZkRheSkgLVxuICAgICAgICAgICAgICAgIGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlsbGlzZW9uZHNJbk1pbnV0ZTtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICAgICh0aW1lU3RhbXBMZWZ0IC0gdGltZVN0YW1wUmlnaHQpIC8gdGhpcy5taWxsaXNlY29uZHNJbkRheVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldFllYXJOYW1lKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAndXRjJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyh0aGlzLmdldFllYXIoZGF0ZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aDogc3R5bGUsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSgxMiwgaSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1hdChkdGYsIG5ldyBEYXRlKDIwMTcsIGksIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfTU9OVEhfTkFNRVNbc3R5bGVdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7XG4gICAgICAgICAgICAgICAgd2Vla2RheTogc3R5bGUsXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICd1dGMnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZSg3LCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgICAgICAgY29uc3QgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBkYXk6ICdudW1lcmljJyxcbiAgICAgICAgICAgICAgICB0aW1lWm9uZTogJ3V0YydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlKDMxLCBpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgMCwgaSArIDEpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIERFRkFVTFRfREFURV9OQU1FUztcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Jc284NjAxKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0VxdWFsKGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlTGVmdC5nZXRUaW1lKCkgPT09IGRhdGVSaWdodC5nZXRUaW1lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNTYW1lRGF5KGRhdGVMZWZ0OiBEYXRlLCBkYXRlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChkYXRlTGVmdCkgJiYgdGhpcy5pc1ZhbGlkKGRhdGVSaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZkRheSA9IHRoaXMuY2xvbmUoZGF0ZUxlZnQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHRoaXMuY2xvbmUoZGF0ZVJpZ2h0KTtcbiAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgIGRhdGVSaWdodFN0YXJ0T2ZEYXkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIGRhdGVMZWZ0U3RhcnRPZkRheS5nZXRUaW1lKCkgPT09IGRhdGVSaWdodFN0YXJ0T2ZEYXkuZ2V0VGltZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzVmFsaWQoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZGF0ZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnZhbGlkKCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2FsZW5kYXJNb250aHMoZGF0ZSwgYW1vdW50ICogMTIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBhbW91bnQgPSBOdW1iZXIoYW1vdW50KTtcblxuICAgICAgICBjb25zdCBkZXNpcmVkTW9udGggPSByZXN1bHQuZ2V0TW9udGgoKSArIGFtb3VudDtcbiAgICAgICAgY29uc3QgZGF0ZVdpdGhEZXNpcmVkTW9udGggPSBuZXcgRGF0ZSgwKTtcbiAgICAgICAgZGF0ZVdpdGhEZXNpcmVkTW9udGguc2V0RnVsbFllYXIocmVzdWx0LmdldEZ1bGxZZWFyKCksIGRlc2lyZWRNb250aCwgMSk7XG4gICAgICAgIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5nZXROdW1EYXlzSW5Nb250aChkYXRlV2l0aERlc2lyZWRNb250aCk7XG4gICAgICAgIC8vIFNldCB0aGUgbGFzdCBkYXkgb2YgdGhlIG5ldyBtb250aFxuICAgICAgICAvLyBpZiB0aGUgb3JpZ2luYWwgZGF0ZSB3YXMgdGhlIGxhc3QgZGF5IG9mIHRoZSBsb25nZXIgbW9udGhcbiAgICAgICAgcmVzdWx0LnNldE1vbnRoKGRlc2lyZWRNb250aCwgTWF0aC5taW4oZGF5c0luTW9udGgsIHJlc3VsdC5nZXREYXRlKCkpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IERhdGUsIGFtb3VudDogbnVtYmVyKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGFtb3VudCA9IE51bWJlcihhbW91bnQpO1xuICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SG91cnMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldEhvdXJzKGFtb3VudCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZXMoZGF0ZTogRGF0ZSwgYW1vdW50OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgcmVzdWx0LnNldE1pbnV0ZXMoYW1vdW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kcyhkYXRlOiBEYXRlLCBhbW91bnQ6IG51bWJlcik6IERhdGUge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICByZXN1bHQuc2V0U2Vjb25kcyhhbW91bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVEYXRlKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlciA9IDAsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlciA9IDAsXG4gICAgICAgIHNlY29uZHM6IG51bWJlciA9IDBcbiAgICApOiBEYXRlIHtcbiAgICAgICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIuIERhdGUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIGhvdXJzIFwiJHtob3Vyc31cIi4gSG91cnMgaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMjMuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW51dGVzIDwgMCB8fCBtaW51dGVzID4gNTkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1pbnV0ZXMgXCIke21pbnV0ZXN9XCIuIE1pbnV0ZXMgaGFzIHRvIGJldHdlZW4gMCBhbmQgNTkuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWNvbmRzIDwgMCB8fCBzZWNvbmRzID4gNTkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIHNlY29uZHMgXCIke3NlY29uZHN9XCIuIFNlY29uZHMgaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgNTkuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgICAgICAgIHllYXIsXG4gICAgICAgICAgICBtb250aCxcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICBob3VycyxcbiAgICAgICAgICAgIG1pbnV0ZXMsXG4gICAgICAgICAgICBzZWNvbmRzXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvIG92ZXJmbG93XG4gICAgICAgIC8vIEZvciBleGFtcGxlLCBjcmVhdGVEYXRlKDIwMTcsIDEsIDMxKSB3b3VsZCB0cnkgdG8gY3JlYXRlIGEgZGF0ZSAyMDE3LzAyLzMxIHdoaWNoIGlzIGludmFsaWRcbiAgICAgICAgaWYgKHJlc3VsdC5nZXRNb250aCgpICE9PSBtb250aCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNsb25lKGRhdGU6IERhdGUpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICAgICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRNaW51dGVzKGRhdGUpLFxuICAgICAgICAgICAgdGhpcy5nZXRTZWNvbmRzKGRhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIG5vdygpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcm1hdChkYXRlOiBEYXRlLCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0pTTmF0aXZlRGF0ZTogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGFtcERhdGUgJiZcbiAgICAgICAgICAgICAgICAoZGF0ZS5nZXRGdWxsWWVhcigpIDwgMSB8fCBkYXRlLmdldEZ1bGxZZWFyKCkgPiA5OTk5KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRGdWxsWWVhcihcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMSwgTWF0aC5taW4oOTk5OSwgZGF0ZS5nZXRGdWxsWWVhcigpKSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaXNwbGF5Rm9ybWF0ID0geyAuLi5kaXNwbGF5Rm9ybWF0LCB0aW1lWm9uZTogJ3V0YycgfTtcbiAgICAgICAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCBkaXNwbGF5Rm9ybWF0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIGRhdGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKGRhdGUudG9EYXRlU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogRGF0ZSB8IG51bGwge1xuICAgICAgICAvLyBUaGVyZSBpcyBubyB3YXkgdXNpbmcgdGhlIG5hdGl2ZSBKUyBEYXRlIHRvIHNldCB0aGUgcGFyc2UgZm9ybWF0IG9yIGxvY2FsZVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWUgPyBuZXcgRGF0ZShEYXRlLnBhcnNlKHZhbHVlKSkgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgRGF0ZSBvciBudWxsLiBEZXNlcmlhbGl6ZXMgdmFsaWQgSVNPIDg2MDEgc3RyaW5nc1xuICAgICAqIChodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQpIGludG8gdmFsaWQgRGF0ZXMgYW5kIGVtcHR5IHN0cmluZyBpbnRvIG51bGwuIFJldHVybnMgYW5cbiAgICAgKiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXG4gICAgICovXG4gICAgcHVibGljIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEYXRlIHwgbnVsbCB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgYERhdGVgIGNvbnN0cnVjdG9yIGFjY2VwdHMgZm9ybWF0cyBvdGhlciB0aGFuIElTTyA4NjAxLCBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGVcbiAgICAgICAgICAgIC8vIHN0cmluZyBpcyB0aGUgcmlnaHQgZm9ybWF0IGZpcnN0LlxuICAgICAgICAgICAgaWYgKElTT184NjAxX1JFR0VYLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkYXRlIGJ1dCBhbGxvd3MgdGhlIG1vbnRoIGFuZCBkYXRlIHRvIG92ZXJmbG93LlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIgPSAwLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIgPSAwLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIgPSAwXG4gICAgKTogRGF0ZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcywgc2Vjb25kcyk7XG5cbiAgICAgICAgaWYgKHllYXIgPj0gMCAmJiB5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICByZXN1bHQuc2V0RnVsbFllYXIodGhpcy5nZXRZZWFyKHJlc3VsdCkgLSAxOTAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0cmlwIG91dCB1bmljb2RlIExUUiBhbmQgUlRMIGNoYXJhY3RlcnMuIEVkZ2UgYW5kIElFIGluc2VydCB0aGVzZSBpbnRvIGZvcm1hdHRlZCBkYXRlcyB3aGlsZVxuICAgICAqIG90aGVyIGJyb3dzZXJzIGRvIG5vdC4gV2UgcmVtb3ZlIHRoZW0gdG8gbWFrZSBvdXRwdXQgY29uc2lzdGVudCBhbmQgYmVjYXVzZSB0aGV5IGludGVyZmVyZSB3aXRoXG4gICAgICogZGF0ZSBwYXJzaW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9bXFx1MjAwZVxcdTIwMGZdL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNvbnZlcnRpbmcgRGF0ZSBvYmplY3QgdG8gc3RyaW5nLCBqYXZhc2NyaXB0IGJ1aWx0LWluIGZ1bmN0aW9ucyBtYXkgcmV0dXJuIHdyb25nXG4gICAgICogcmVzdWx0cyBiZWNhdXNlIGl0IGFwcGxpZXMgaXRzIGludGVybmFsIERTVCBydWxlcy4gVGhlIERTVCBydWxlcyBhcm91bmQgdGhlIHdvcmxkIGNoYW5nZVxuICAgICAqIHZlcnkgZnJlcXVlbnRseSwgYW5kIHRoZSBjdXJyZW50IHZhbGlkIHJ1bGUgaXMgbm90IGFsd2F5cyB2YWxpZCBpbiBwcmV2aW91cyB5ZWFycyB0aG91Z2guXG4gICAgICogV2Ugd29yayBhcm91bmQgdGhpcyBwcm9ibGVtIGJ1aWxkaW5nIGEgbmV3IERhdGUgb2JqZWN0IHdoaWNoIGhhcyBpdHMgaW50ZXJuYWwgVVRDXG4gICAgICogcmVwcmVzZW50YXRpb24gd2l0aCB0aGUgbG9jYWwgZGF0ZSBhbmQgdGltZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9mb3JtYXQoZHRmOiBJbnRsLkRhdGVUaW1lRm9ybWF0LCBkYXRlOiBEYXRlKSB7XG4gICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgIERhdGUuVVRDKFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICBkYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgZGF0ZS5nZXRIb3VycygpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TWludXRlcygpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpLFxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGR0Zi5mb3JtYXQoZCk7XG4gICAgfVxufVxuIl19