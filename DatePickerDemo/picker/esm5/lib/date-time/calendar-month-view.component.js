/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/calendar-month-view.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-month-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceNumberProperty } from '@angular/cdk/coercion';
/** @type {?} */
var DAYS_PER_WEEK = 7;
/** @type {?} */
var WEEKS_PER_VIEW = 6;
/**
 * @template T
 */
var OwlMonthViewComponent = /** @class */ (function () {
    function OwlMonthViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         *
         */
        this.hideOtherMonths = false;
        /**
         * Define the first day of a week
         * Sunday: 0 ~ Saturday: 6
         *
         */
        this._firstDayOfWeek = 0;
        /**
         * The select mode of the picker;
         *
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' value
         * the value is the day number in current month
         *
         */
        this.selectedDates = [];
        /**
         * Callback to invoke when a new date is selected
         *
         */
        this.selectedChange = new EventEmitter();
        /**
         * Callback to invoke when any date is selected.
         *
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
    }
    Object.defineProperty(OwlMonthViewComponent.prototype, "firstDayOfWeek", {
        get: /**
         * @return {?}
         */
        function () {
            return this._firstDayOfWeek;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            val = coerceNumberProperty(val);
            if (val >= 0 && val <= 6 && val !== this._firstDayOfWeek) {
                this._firstDayOfWeek = val;
                if (this.initiated) {
                    this.generateWeekDays();
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._selectMode = val;
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldSelected = this._selected;
            value = this.dateTimeAdapter.deserialize(value);
            this._selected = this.getValidDate(value);
            if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                this.setSelectedDates();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selecteds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selecteds;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            this._selecteds = values.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                v = _this.dateTimeAdapter.deserialize(v);
                return _this.getValidDate(v);
            }));
            this.setSelectedDates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldMoment = this._pickerMoment;
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
            this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
            if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
                this.initiated) {
                this.generateCalendar();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "dateFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateFilter;
        },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateFilter = filter;
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "minDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._minDate = this.getValidDate(value);
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "maxDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._maxDate = this.getValidDate(value);
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "weekdays", {
        get: /**
         * @return {?}
         */
        function () {
            return this._weekdays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "days", {
        get: /**
         * @return {?}
         */
        function () {
            return this._days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "activeCell", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.pickerMoment) {
                return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                    this.firstRowOffset -
                    1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.selectMode === 'range' ||
                this.selectMode === 'rangeFrom' ||
                this.selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "owlDTCalendarView", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.generateWeekDays();
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.generateWeekDays();
            _this.generateCalendar();
            _this.cdRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.generateCalendar();
        this.initiated = true;
    };
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.localeSub.unsubscribe();
    };
    /**
     * Handle a calendarCell selected
     */
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    OwlMonthViewComponent.prototype.selectCalendarCell = /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        // Cases in which the date would not be selected
        // 1, the calendar cell is NOT enabled (is NOT valid)
        // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
        if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
            return;
        }
        this.selectDate(cell.value);
    };
    /**
     * Handle a new date selected
     */
    /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlMonthViewComponent.prototype.selectDate = /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var daysDiff = date - 1;
        /** @type {?} */
        var selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        this.selectedChange.emit(selected);
        this.userSelection.emit();
    };
    /**
     * Handle keydown event on calendar body
     */
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    OwlMonthViewComponent.prototype.handleCalendarKeydown = /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moment;
        switch (event.keyCode) {
            // minus 1 day
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 day
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 week
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 week
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first day of current month
            case HOME:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last day of current month
            case END:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) -
                    this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 month (or 1 year)
            case PAGE_UP:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month (or 1 year)
            case PAGE_DOWN:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // select the pickerMoment
            case ENTER:
                if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
                    this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
                }
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    };
    /**
     * Generate the calendar weekdays array
     * */
    /**
     * Generate the calendar weekdays array
     *
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.generateWeekDays = /**
     * Generate the calendar weekdays array
     *
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
        /** @type {?} */
        var shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
        /** @type {?} */
        var narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        /** @type {?} */
        var weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        function (long, i) {
            return { long: long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays
            .slice(firstDayOfWeek)
            .concat(weekdays.slice(0, firstDayOfWeek));
        this.dateNames = this.dateTimeAdapter.getDateNames();
        return;
    };
    /**
     * Generate the calendar days array
     * */
    /**
     * Generate the calendar days array
     *
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.generateCalendar = /**
     * Generate the calendar days array
     *
     * @private
     * @return {?}
     */
    function () {
        if (!this.pickerMoment) {
            return;
        }
        this.todayDate = null;
        // the first weekday of the month
        /** @type {?} */
        var startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        // the amount of days from the first date of the month
        // if it is < 0, it means the date is in previous month
        /** @type {?} */
        var daysDiff = 0 -
            ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                DAYS_PER_WEEK);
        // the index of cell that contains the first date of the month
        this.firstRowOffset = Math.abs(daysDiff);
        this._days = [];
        for (var i = 0; i < WEEKS_PER_VIEW; i++) {
            /** @type {?} */
            var week = [];
            for (var j = 0; j < DAYS_PER_WEEK; j++) {
                /** @type {?} */
                var date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                /** @type {?} */
                var dateCell = this.createDateCell(date, daysDiff);
                // check if the date is today
                if (this.dateTimeAdapter.isSameDay(this.dateTimeAdapter.now(), date)) {
                    this.todayDate = daysDiff + 1;
                }
                week.push(dateCell);
                daysDiff += 1;
            }
            this._days.push(week);
        }
        this.setSelectedDates();
    };
    /**
     * Creates CalendarCell for days.
     */
    /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    OwlMonthViewComponent.prototype.createDateCell = /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    function (date, daysDiff) {
        // total days of the month
        /** @type {?} */
        var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
        /** @type {?} */
        var dateNum = this.dateTimeAdapter.getDate(date);
        // const dateName = this.dateNames[dateNum - 1];
        /** @type {?} */
        var dateName = dateNum.toString();
        /** @type {?} */
        var ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
        // check if the date if selectable
        /** @type {?} */
        var enabled = this.isDateEnabled(date);
        // check if date is not in current month
        /** @type {?} */
        var dayValue = daysDiff + 1;
        /** @type {?} */
        var out = dayValue < 1 || dayValue > daysInMonth;
        /** @type {?} */
        var cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
        return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
    };
    /**
     * Check if the date is valid
     */
    /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlMonthViewComponent.prototype.isDateEnabled = /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate ||
                this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
            (!this.maxDate ||
                this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
    };
    /**
     * Get a valid date object
     */
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    OwlMonthViewComponent.prototype.getValidDate = /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    };
    /**
     * Check if the give dates are none-null and in the same month
     */
    /**
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    OwlMonthViewComponent.prototype.isSameMonth = /**
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.isValid(dateLeft) &&
            this.dateTimeAdapter.isValid(dateRight) &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight) &&
            this.dateTimeAdapter.getMonth(dateLeft) ===
                this.dateTimeAdapter.getMonth(dateRight));
    };
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     * */
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     *
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.setSelectedDates = /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     *
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedDates = [];
        if (!this.firstDateOfMonth) {
            return;
        }
        if (this.isInSingleMode && this.selected) {
            /** @type {?} */
            var dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
            this.selectedDates[0] = dayDiff + 1;
            return;
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedDates = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                if (_this.dateTimeAdapter.isValid(selected)) {
                    /** @type {?} */
                    var dayDiff = _this.dateTimeAdapter.differenceInCalendarDays(selected, _this.firstDateOfMonth);
                    return dayDiff + 1;
                }
                else {
                    return null;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.focusActiveCell = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarBodyElm.focusActiveCell();
    };
    OwlMonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time-month-view',
                    exportAs: 'owlYearView',
                    template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\n       [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\">\n    <thead class=\"owl-dt-calendar-header\">\n    <tr class=\"owl-dt-weekdays\">\n        <th *ngFor=\"let weekday of weekdays\"\n            [attr.aria-label]=\"weekday.long\"\n            class=\"owl-dt-weekday\" scope=\"col\">\n            <span>{{weekday.short}}</span>\n        </th>\n    </tr>\n    <tr>\n        <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"7\"></th>\n    </tr>\n    </thead>\n    <tbody owl-date-time-calendar-body role=\"grid\"\n           [rows]=\"days\" [todayValue]=\"todayDate\"\n           [selectedValues]=\"selectedDates\"\n           [selectMode]=\"selectMode\"\n           [activeCell]=\"activeCell\"\n           (keydown)=\"handleCalendarKeydown($event)\"\n           (select)=\"selectCalendarCell($event)\">\n    </tbody>\n</table>\n",
                    host: {
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlMonthViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
    OwlMonthViewComponent.propDecorators = {
        hideOtherMonths: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        selectMode: [{ type: Input }],
        selected: [{ type: Input }],
        selecteds: [{ type: Input }],
        pickerMoment: [{ type: Input }],
        dateFilter: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        selectedChange: [{ type: Output }],
        userSelection: [{ type: Output }],
        pickerMomentChange: [{ type: Output }],
        calendarBodyElm: [{ type: ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
    };
    return OwlMonthViewComponent;
}());
export { OwlMonthViewComponent };
if (false) {
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.hideOtherMonths;
    /**
     * Define the first day of a week
     * Sunday: 0 ~ Saturday: 6
     *
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._firstDayOfWeek;
    /**
     * The select mode of the picker;
     *
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     *
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._weekdays;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._days;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.firstDateOfMonth;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.initiated;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateNames;
    /**
     * The date of the month that today falls on.
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.todayDate;
    /**
     * An array to hold all selectedDates' value
     * the value is the day number in current month
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.selectedDates;
    /** @type {?} */
    OwlMonthViewComponent.prototype.firstRowOffset;
    /**
     * Callback to invoke when a new date is selected
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.selectedChange;
    /**
     * Callback to invoke when any date is selected.
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.userSelection;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlMonthViewComponent.prototype.pickerMomentChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlMonthViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUNaLHdCQUF3QixFQUMzQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFFdkQsYUFBYSxHQUFHLENBQUM7O0lBQ2pCLGNBQWMsR0FBRyxDQUFDOzs7O0FBRXhCO0lBb1BJLCtCQUNZLEtBQXdCLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFKbkMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7OztRQXhPL0Msb0JBQWUsR0FBWSxLQUFLLENBQUM7Ozs7OztRQU16QixvQkFBZSxHQUFXLENBQUMs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SUFNakMsZ0RBQW9DOzs7Ozs7O0lBc0JwQyw0Q0FBMkM7Ozs7OztJQWUzQywwQ0FBNEI7Ozs7O0lBZ0I1QiwyQ0FBNkI7Ozs7O0lBYzdCLDhDQUF5Qjs7Ozs7OztJQTZCekIsNENBQTBDOzs7Ozs7SUFlMUMseUNBQTJCOzs7Ozs7SUFnQjNCLHlDQUEyQjs7Ozs7SUFnQjNCLDBDQUEwRTs7Ozs7SUFLMUUsc0NBQWdDOzs7OztJQTJCaEMsaURBQTRCOzs7OztJQUU1QiwwQ0FBcUQ7Ozs7O0lBRXJELDBDQUEwQjs7Ozs7SUFFMUIsMENBQTRCOzs7Ozs7SUFLNUIsMENBQWdDOzs7Ozs7O0lBTWhDLDhDQUFvQzs7SUFHcEMsK0NBQThCOzs7Ozs7SUFLOUIsK0NBQ3VEOzs7Ozs7SUFLdkQsOENBQ2tEOzs7OztJQUdsRCxtREFDcUU7Ozs7O0lBR3JFLGdEQUMwQzs7Ozs7SUFPdEMsc0NBQWdDOzs7OztJQUNoQyxnREFBdUQ7Ozs7O0lBQ3ZELGdEQUUyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDYWxlbmRhckNlbGwsXG4gICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50XG59IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XG5pbXBvcnQge1xuICAgIERPV05fQVJST1csXG4gICAgRU5ELFxuICAgIEVOVEVSLFxuICAgIEhPTUUsXG4gICAgTEVGVF9BUlJPVyxcbiAgICBQQUdFX0RPV04sXG4gICAgUEFHRV9VUCxcbiAgICBSSUdIVF9BUlJPVyxcbiAgICBVUF9BUlJPV1xufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5jb25zdCBEQVlTX1BFUl9XRUVLID0gNztcbmNvbnN0IFdFRUtTX1BFUl9WSUVXID0gNjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLW1vbnRoLXZpZXcnLFxuICAgIGV4cG9ydEFzOiAnb3dsWWVhclZpZXcnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldydcbiAgICB9LFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE93bE1vbnRoVmlld0NvbXBvbmVudDxUPlxuICAgIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlkZU90aGVyTW9udGhzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmUgdGhlIGZpcnN0IGRheSBvZiBhIHdlZWtcbiAgICAgKiBTdW5kYXk6IDAgfiBTYXR1cmRheTogNlxuICAgICAqICovXG4gICAgcHJpdmF0ZSBfZmlyc3REYXlPZldlZWs6IG51bWJlciA9IDA7XG4gICAgQElucHV0KClcbiAgICBnZXQgZmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cblxuICAgIHNldCBmaXJzdERheU9mV2Vlayh2YWw6IG51bWJlcikge1xuICAgICAgICB2YWwgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwpO1xuICAgICAgICBpZiAodmFsID49IDAgJiYgdmFsIDw9IDYgJiYgdmFsICE9PSB0aGlzLl9maXJzdERheU9mV2Vlaykge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB2YWw7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2VsZWN0IG1vZGUgb2YgdGhlIHBpY2tlcjtcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0TW9kZSh2YWw6IFNlbGVjdE1vZGUpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShvbGRTZWxlY3RlZCwgdGhpcy5fc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkRGF0ZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgICAgIGNvbnN0IG9sZE1vbWVudCA9IHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG5cbiAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX3BpY2tlck1vbWVudCksXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lTW9udGgob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpICYmXG4gICAgICAgICAgICB0aGlzLmluaXRpYXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxuICAgICAqICovXG4gICAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XG4gICAgQElucHV0KClcbiAgICBnZXQgZGF0ZUZpbHRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XG4gICAgfVxuXG4gICAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9kYXRlRmlsdGVyID0gZmlsdGVyO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICAgIH1cblxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF93ZWVrZGF5czogQXJyYXk8eyBsb25nOiBzdHJpbmc7IHNob3J0OiBzdHJpbmc7IG5hcnJvdzogc3RyaW5nIH0+O1xuICAgIGdldCB3ZWVrZGF5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RheXM6IENhbGVuZGFyQ2VsbFtdW107XG4gICAgZ2V0IGRheXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXlzO1xuICAgIH1cblxuICAgIGdldCBhY3RpdmVDZWxsKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnBpY2tlck1vbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSArXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdFJvd09mZnNldCAtXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaXJzdERhdGVPZk1vbnRoOiBUO1xuXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGRhdGVOYW1lczogc3RyaW5nW107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0b2RheSBmYWxscyBvbi5cbiAgICAgKiAqL1xuICAgIHB1YmxpYyB0b2RheURhdGU6IG51bWJlciB8IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSB0byBob2xkIGFsbCBzZWxlY3RlZERhdGVzJyB2YWx1ZVxuICAgICAqIHRoZSB2YWx1ZSBpcyB0aGUgZGF5IG51bWJlciBpbiBjdXJyZW50IG1vbnRoXG4gICAgICogKi9cbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlczogbnVtYmVyW10gPSBbXTtcblxuICAgIC8vIHRoZSBpbmRleCBvZiBjZWxsIHRoYXQgY29udGFpbnMgdGhlIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXG4gICAgcHVibGljIGZpcnN0Um93T2Zmc2V0OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkXG4gICAgICogKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VCB8IG51bGw+KCk7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC5cbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHVzZXJTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgcGlja2VyTW9tZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cbiAgICBAVmlld0NoaWxkKE93bENhbGVuZGFyQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcbiAgICBjYWxlbmRhckJvZHlFbG06IE93bENhbGVuZGFyQm9keUNvbXBvbmVudDtcblxuICAgIGdldCBvd2xEVENhbGVuZGFyVmlldygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxuICAgICAgICBAT3B0aW9uYWwoKVxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcbiAgICAgICAgcHJpdmF0ZSBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge31cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XG5cbiAgICAgICAgdGhpcy5sb2NhbGVTdWIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlV2Vla0RheXMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9jYWxlU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2FsZW5kYXJDZWxsIHNlbGVjdGVkXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdENhbGVuZGFyQ2VsbChjZWxsOiBDYWxlbmRhckNlbGwpOiB2b2lkIHtcbiAgICAgICAgLy8gQ2FzZXMgaW4gd2hpY2ggdGhlIGRhdGUgd291bGQgbm90IGJlIHNlbGVjdGVkXG4gICAgICAgIC8vIDEsIHRoZSBjYWxlbmRhciBjZWxsIGlzIE5PVCBlbmFibGVkIChpcyBOT1QgdmFsaWQpXG4gICAgICAgIC8vIDIsIHRoZSBzZWxlY3RlZCBkYXRlIGlzIE5PVCBpbiBjdXJyZW50IHBpY2tlcidzIG1vbnRoIGFuZCB0aGUgaGlkZU90aGVyTW9udGhzIGlzIGVuYWJsZWRcbiAgICAgICAgaWYgKCFjZWxsLmVuYWJsZWQgfHwgKHRoaXMuaGlkZU90aGVyTW9udGhzICYmIGNlbGwub3V0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWxlY3REYXRlKGNlbGwudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIG5ldyBkYXRlIHNlbGVjdGVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3REYXRlKGRhdGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBkYXlzRGlmZiA9IGRhdGUgLSAxO1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aCxcbiAgICAgICAgICAgIGRheXNEaWZmXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUga2V5ZG93biBldmVudCBvbiBjYWxlbmRhciBib2R5XG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZUNhbGVuZGFyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBsZXQgbW9tZW50O1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgZGF5XG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgLTFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gYWRkIDEgZGF5XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbWludXMgMSB3ZWVrXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC03XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAxIHdlZWtcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICA3XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIG1vdmUgdG8gZmlyc3QgZGF5IG9mIGN1cnJlbnQgbW9udGhcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAxIC0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbW92ZSB0byBsYXN0IGRheSBvZiBjdXJyZW50IG1vbnRoXG4gICAgICAgICAgICBjYXNlIEVORDpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aCh0aGlzLnBpY2tlck1vbWVudCkgLVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbWludXMgMSBtb250aCAob3IgMSB5ZWFyKVxuICAgICAgICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICAgICAgICAgIG1vbWVudCA9IGV2ZW50LmFsdEtleVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC0xXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAxIG1vbnRoIChvciAxIHllYXIpXG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSBldmVudC5hbHRLZXlcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBwaWNrZXJNb21lbnRcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKHRoaXMucGlja2VyTW9tZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgY2FsZW5kYXIgd2Vla2RheXMgYXJyYXlcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgZ2VuZXJhdGVXZWVrRGF5cygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ2xvbmcnKTtcbiAgICAgICAgY29uc3Qgc2hvcnRXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdzaG9ydCcpO1xuICAgICAgICBjb25zdCBuYXJyb3dXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCduYXJyb3cnKTtcbiAgICAgICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgICAgIGNvbnN0IHdlZWtkYXlzID0gbG9uZ1dlZWtkYXlzLm1hcCgobG9uZywgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgbG9uZywgc2hvcnQ6IHNob3J0V2Vla2RheXNbaV0sIG5hcnJvdzogbmFycm93V2Vla2RheXNbaV0gfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fd2Vla2RheXMgPSB3ZWVrZGF5c1xuICAgICAgICAgICAgLnNsaWNlKGZpcnN0RGF5T2ZXZWVrKVxuICAgICAgICAgICAgLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBmaXJzdERheU9mV2VlaykpO1xuXG4gICAgICAgIHRoaXMuZGF0ZU5hbWVzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZU5hbWVzKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBkYXlzIGFycmF5XG4gICAgICogKi9cbiAgICBwcml2YXRlIGdlbmVyYXRlQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9kYXlEYXRlID0gbnVsbDtcblxuICAgICAgICAvLyB0aGUgZmlyc3Qgd2Vla2RheSBvZiB0aGUgbW9udGhcbiAgICAgICAgY29uc3Qgc3RhcnRXZWVrZGF5T2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheShcbiAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XG5cbiAgICAgICAgLy8gdGhlIGFtb3VudCBvZiBkYXlzIGZyb20gdGhlIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXG4gICAgICAgIC8vIGlmIGl0IGlzIDwgMCwgaXQgbWVhbnMgdGhlIGRhdGUgaXMgaW4gcHJldmlvdXMgbW9udGhcbiAgICAgICAgbGV0IGRheXNEaWZmID1cbiAgICAgICAgICAgIDAgLVxuICAgICAgICAgICAgKChzdGFydFdlZWtkYXlPZk1vbnRoICsgKERBWVNfUEVSX1dFRUsgLSBmaXJzdERheU9mV2VlaykpICVcbiAgICAgICAgICAgICAgICBEQVlTX1BFUl9XRUVLKTtcblxuICAgICAgICAvLyB0aGUgaW5kZXggb2YgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxuICAgICAgICB0aGlzLmZpcnN0Um93T2Zmc2V0ID0gTWF0aC5hYnMoZGF5c0RpZmYpO1xuXG4gICAgICAgIHRoaXMuX2RheXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBXRUVLU19QRVJfVklFVzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB3ZWVrID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IERBWVNfUEVSX1dFRUs7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aCxcbiAgICAgICAgICAgICAgICAgICAgZGF5c0RpZmZcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVDZWxsID0gdGhpcy5jcmVhdGVEYXRlQ2VsbChkYXRlLCBkYXlzRGlmZik7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZGF0ZSBpcyB0b2RheVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheURhdGUgPSBkYXlzRGlmZiArIDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgd2Vlay5wdXNoKGRhdGVDZWxsKTtcbiAgICAgICAgICAgICAgICBkYXlzRGlmZiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGF5cy5wdXNoKHdlZWspO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBDYWxlbmRhckNlbGwgZm9yIGRheXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRlQ2VsbChkYXRlOiBULCBkYXlzRGlmZjogbnVtYmVyKTogQ2FsZW5kYXJDZWxsIHtcbiAgICAgICAgLy8gdG90YWwgZGF5cyBvZiB0aGUgbW9udGhcbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGRhdGVOdW0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKGRhdGUpO1xuICAgICAgICAvLyBjb25zdCBkYXRlTmFtZSA9IHRoaXMuZGF0ZU5hbWVzW2RhdGVOdW0gLSAxXTtcbiAgICAgICAgY29uc3QgZGF0ZU5hbWUgPSBkYXRlTnVtLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlQTExeUxhYmVsXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgaWYgc2VsZWN0YWJsZVxuICAgICAgICBjb25zdCBlbmFibGVkID0gdGhpcy5pc0RhdGVFbmFibGVkKGRhdGUpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGUgaXMgbm90IGluIGN1cnJlbnQgbW9udGhcbiAgICAgICAgY29uc3QgZGF5VmFsdWUgPSBkYXlzRGlmZiArIDE7XG4gICAgICAgIGNvbnN0IG91dCA9IGRheVZhbHVlIDwgMSB8fCBkYXlWYWx1ZSA+IGRheXNJbk1vbnRoO1xuICAgICAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LWRheS0nICsgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5KGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxuICAgICAgICAgICAgZGF5VmFsdWUsXG4gICAgICAgICAgICBkYXRlTmFtZSxcbiAgICAgICAgICAgIGFyaWFMYWJlbCxcbiAgICAgICAgICAgIGVuYWJsZWQsXG4gICAgICAgICAgICBvdXQsXG4gICAgICAgICAgICBjZWxsQ2xhc3NcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZGF0ZSBpcyB2YWxpZFxuICAgICAqL1xuICAgIHByaXZhdGUgaXNEYXRlRW5hYmxlZChkYXRlOiBUKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhIWRhdGUgJiZcbiAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcbiAgICAgICAgICAgICghdGhpcy5taW5EYXRlIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXG4gICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZSwgdGhpcy5tYXhEYXRlKSA8PSAwKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIG5vbmUtbnVsbCBhbmQgaW4gdGhlIHNhbWUgbW9udGhcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNTYW1lTW9udGgoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISEoXG4gICAgICAgICAgICBkYXRlTGVmdCAmJlxuICAgICAgICAgICAgZGF0ZVJpZ2h0ICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKGRhdGVMZWZ0KSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChkYXRlUmlnaHQpICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVMZWZ0KSA9PT1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVSaWdodCkgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGVMZWZ0KSA9PT1cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlUmlnaHQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzZWxlY3RlZERhdGVzIHZhbHVlLlxuICAgICAqIEluIHNpbmdsZSBtb2RlLCBpdCBoYXMgb25seSBvbmUgdmFsdWUgd2hpY2ggcmVwcmVzZW50IHRoZSBzZWxlY3RlZCBkYXRlXG4gICAgICogSW4gcmFuZ2UgbW9kZSwgaXQgd291bGQgaGFzIHR3byB2YWx1ZXMsIG9uZSBmb3IgdGhlIGZyb21WYWx1ZSBhbmQgdGhlIG90aGVyIGZvciB0aGUgdG9WYWx1ZVxuICAgICAqICovXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3RlZERhdGVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZXMgPSBbXTtcblxuICAgICAgICBpZiAoIXRoaXMuZmlyc3REYXRlT2ZNb250aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUgJiYgdGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgZGF5RGlmZiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLFxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlc1swXSA9IGRheURpZmYgKyAxO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZHMubWFwKHNlbGVjdGVkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChzZWxlY3RlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF5RGlmZiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXlEaWZmICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNBY3RpdmVDZWxsKCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICB9XG59XG4iXX0=