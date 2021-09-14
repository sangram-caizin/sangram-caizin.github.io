/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/calendar-year-view.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-year-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
/** @type {?} */
const MONTHS_PER_YEAR = 12;
/** @type {?} */
const MONTHS_PER_ROW = 3;
/**
 * @template T
 */
export class OwlYearViewComponent {
    /**
     * @param {?} cdRef
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * The select mode of the picker;
         *
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' month value
         * the value is the month number in current year
         *
         */
        this.selectedMonths = [];
        /**
         * Callback to invoke when a new month is selected
         *
         */
        this.change = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         *
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when use keyboard enter to select a calendar cell
         */
        this.keyboardEnter = new EventEmitter();
        this.monthNames = this.dateTimeAdapter.getMonthNames('short');
    }
    /**
     * @return {?}
     */
    get selectMode() {
        return this._selectMode;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set selectMode(val) {
        this._selectMode = val;
        if (this.initiated) {
            this.generateMonthList();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        this.setSelectedMonths();
    }
    /**
     * @return {?}
     */
    get selecteds() {
        return this._selecteds;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set selecteds(values) {
        this._selecteds = [];
        for (let i = 0; i < values.length; i++) {
            /** @type {?} */
            const value = this.dateTimeAdapter.deserialize(values[i]);
            this._selecteds.push(this.getValidDate(value));
        }
        this.setSelectedMonths();
    }
    /**
     * @return {?}
     */
    get pickerMoment() {
        return this._pickerMoment;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set pickerMoment(value) {
        /** @type {?} */
        const oldMoment = this._pickerMoment;
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment =
            this.getValidDate(value) || this.dateTimeAdapter.now();
        if (!this.hasSameYear(oldMoment, this._pickerMoment) &&
            this.initiated) {
            this.generateMonthList();
        }
    }
    /**
     * @return {?}
     */
    get dateFilter() {
        return this._dateFilter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set dateFilter(filter) {
        this._dateFilter = filter;
        if (this.initiated) {
            this.generateMonthList();
        }
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateMonthList();
        }
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateMonthList();
        }
    }
    /**
     * @return {?}
     */
    get months() {
        return this._months;
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this._pickerMoment) {
            return this.dateTimeAdapter.getMonth(this._pickerMoment);
        }
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
    }
    /**
     * @return {?}
     */
    get owlDTCalendarView() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.generateMonthList();
            this.cdRef.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.generateMonthList();
        this.initiated = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.localeSub.unsubscribe();
    }
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    selectCalendarCell(cell) {
        this.selectMonth(cell.value);
    }
    /**
     * Handle a new month selected
     * @private
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        this.monthSelected.emit(firstDateOfMonth);
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(result);
    }
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    handleCalendarKeydown(event) {
        /** @type {?} */
        let moment;
        switch (event.keyCode) {
            // minus 1 month
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 3 months
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
                this.pickerMomentChange.emit(moment);
                break;
            // add 3 months
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first month of current year
            case HOME:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last month of current year
            case END:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year (or 10 year)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year (or 10 year)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
                this.pickerMomentChange.emit(moment);
                break;
            // Select current month
            case ENTER:
                this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.keyboardEnter.emit();
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Generate the calendar month list
     *
     * @private
     * @return {?}
     */
    generateMonthList() {
        if (!this.pickerMoment) {
            return;
        }
        this.setSelectedMonths();
        this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
        this._months = [];
        for (let i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
            /** @type {?} */
            const row = [];
            for (let j = 0; j < MONTHS_PER_ROW; j++) {
                /** @type {?} */
                const month = j + i * MONTHS_PER_ROW;
                /** @type {?} */
                const monthCell = this.createMonthCell(month);
                row.push(monthCell);
            }
            this._months.push(row);
        }
        return;
    }
    /**
     * Creates an CalendarCell for the given month.
     * @private
     * @param {?} month
     * @return {?}
     */
    createMonthCell(month) {
        /** @type {?} */
        const startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
        /** @type {?} */
        const cellClass = 'owl-dt-month-' + month;
        return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
    }
    /**
     * Check if the given month is enable
     * @private
     * @param {?} month
     * @return {?}
     */
    isMonthEnabled(month) {
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        // If any date in the month is selectable,
        // we count the month as enable
        for (let date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate ||
                    this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                (!this.maxDate ||
                    this.dateTimeAdapter.compare(date, this.maxDate) <= 0)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    getMonthInCurrentYear(date) {
        if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
            /** @type {?} */
            const result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);
            // < 0 : the given date's year is before pickerMoment's year, we return -1 as selected month value.
            // > 0 : the given date's year is after pickerMoment's year, we return 12 as selected month value.
            // 0 : the give date's year is same as the pickerMoment's year, we return the actual month value.
            if (result < 0) {
                return -1;
            }
            else if (result > 0) {
                return 12;
            }
            else {
                return this.dateTimeAdapter.getMonth(date);
            }
        }
        else {
            return null;
        }
    }
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     *
     * @private
     * @return {?}
     */
    setSelectedMonths() {
        this.selectedMonths = [];
        if (this.isInSingleMode && this.selected) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
            this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
        }
    }
    /**
     * Check the given dates are in the same year
     * @private
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    hasSameYear(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight));
    }
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    /**
     * @private
     * @return {?}
     */
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlYearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time-year-view',
                exportAs: 'owlMonthView',
                template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\n    <thead class=\"owl-dt-calendar-header\">\n    <tr>\n        <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"3\"></th>\n    </tr>\n    </thead>\n    <tbody owl-date-time-calendar-body role=\"grid\"\n           [rows]=\"months\" [numCols]=\"3\" [cellRatio]=\"3 / 7\"\n           [activeCell]=\"activeCell\"\n           [todayValue]=\"todayMonth\"\n           [selectedValues]=\"selectedMonths\"\n           [selectMode]=\"selectMode\"\n           (keydown)=\"handleCalendarKeydown($event)\"\n           (select)=\"selectCalendarCell($event)\">\n    </tbody>\n</table>\n",
                host: {
                    '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OwlYearViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlYearViewComponent.propDecorators = {
    selectMode: [{ type: Input }],
    selected: [{ type: Input }],
    selecteds: [{ type: Input }],
    pickerMoment: [{ type: Input }],
    dateFilter: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    change: [{ type: Output }],
    monthSelected: [{ type: Output }],
    pickerMomentChange: [{ type: Output }],
    keyboardEnter: [{ type: Output }],
    calendarBodyElm: [{ type: ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
};
if (false) {
    /**
     * The select mode of the picker;
     *
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     *
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.monthNames;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._months;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.initiated;
    /** @type {?} */
    OwlYearViewComponent.prototype.todayMonth;
    /**
     * An array to hold all selectedDates' month value
     * the value is the month number in current year
     *
     * @type {?}
     */
    OwlYearViewComponent.prototype.selectedMonths;
    /**
     * Callback to invoke when a new month is selected
     *
     * @type {?}
     */
    OwlYearViewComponent.prototype.change;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     *
     * @type {?}
     */
    OwlYearViewComponent.prototype.monthSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlYearViewComponent.prototype.pickerMomentChange;
    /**
     * Emits when use keyboard enter to select a calendar cell
     * @type {?}
     */
    OwlYearViewComponent.prototype.keyboardEnter;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlYearViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBRUgsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILFlBQVksRUFDWix3QkFBd0IsRUFDM0IsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUNILFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNYLE1BQU0sdUJBQXVCLENBQUM7O01BRXpCLGVBQWUsR0FBRyxFQUFFOztNQUNwQixjQUFjLEdBQUcsQ0FBQzs7OztBQWF4QixNQUFNLE9BQU8sb0JBQW9COzs7Ozs7SUFtTDdCLFlBQ1ksS0FBd0IsRUFDWixlQUFtQyxFQUcvQyxlQUFtQztRQUpuQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNaLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUcvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7Ozs7O1FBbkx2QyxnQkFBVyxHQUFlLFFBQVEsQ0FBQztRQTJCbkMsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQTJHckIsY0FBUyxHQUFpQixZQUFZLENB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Ozs7O0lBR3BFLCtDQUMwQzs7Ozs7SUFPdEMscUNBQWdDOzs7OztJQUNoQywrQ0FBdUQ7Ozs7O0lBQ3ZELCtDQUUyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE9wdGlvbmFsLFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENhbGVuZGFyQ2VsbCxcbiAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnRcbn0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xuaW1wb3J0IHtcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBFTkQsXG4gICAgRU5URVIsXG4gICAgSE9NRSxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFBBR0VfRE9XTixcbiAgICBQQUdFX1VQLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbmNvbnN0IE1PTlRIU19QRVJfWUVBUiA9IDEyO1xuY29uc3QgTU9OVEhTX1BFUl9ST1cgPSAzO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUteWVhci12aWV3JyxcbiAgICBleHBvcnRBczogJ293bE1vbnRoVmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldydcbiAgICB9LFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE93bFllYXJWaWV3Q29tcG9uZW50PFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XG4gICAgICogKi9cbiAgICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2VsZWN0TW9kZSgpOiBTZWxlY3RNb2RlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdE1vZGUodmFsOiBTZWxlY3RNb2RlKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPSB2YWw7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZXNbaV0pO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRzLnB1c2godGhpcy5nZXRWYWxpZERhdGUodmFsdWUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRNb250aHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgICAgIGNvbnN0IG9sZE1vbWVudCA9IHRoaXMuX3BpY2tlck1vbWVudDtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXRoaXMuaGFzU2FtZVllYXIob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpICYmXG4gICAgICAgICAgICB0aGlzLmluaXRpYXRlZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGVcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgX2RhdGVGaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xuICAgIH1cblxuICAgIHNldCBkYXRlRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICAgIHByaXZhdGUgX21pbkRhdGU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1pbkRhdGUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gICAgfVxuXG4gICAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVhZG9ubHkgbW9udGhOYW1lczogc3RyaW5nW107XG5cbiAgICBwcml2YXRlIF9tb250aHM6IENhbGVuZGFyQ2VsbFtdW107XG4gICAgZ2V0IG1vbnRocygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRocztcbiAgICB9XG5cbiAgICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fcGlja2VyTW9tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5fcGlja2VyTW9tZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgdG9kYXlNb250aDogbnVtYmVyIHwgbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IHRvIGhvbGQgYWxsIHNlbGVjdGVkRGF0ZXMnIG1vbnRoIHZhbHVlXG4gICAgICogdGhlIHZhbHVlIGlzIHRoZSBtb250aCBudW1iZXIgaW4gY3VycmVudCB5ZWFyXG4gICAgICogKi9cbiAgICBwdWJsaWMgc2VsZWN0ZWRNb250aHM6IG51bWJlcltdID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5ldyBtb250aCBpcyBzZWxlY3RlZFxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIuIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZVxuICAgICAqICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgbW9udGhTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBwaWNrZXJNb21lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcblxuICAgIC8qKiBFbWl0cyB3aGVuIHVzZSBrZXlib2FyZCBlbnRlciB0byBzZWxlY3QgYSBjYWxlbmRhciBjZWxsICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkga2V5Ym9hcmRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxuICAgIGNhbGVuZGFyQm9keUVsbTogT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50O1xuXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXG4gICAgKSB7XG4gICAgICAgIHRoaXMubW9udGhOYW1lcyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoTmFtZXMoJ3Nob3J0Jyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvY2FsZVN1YiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdE1vbnRoKGNlbGwudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIG5ldyBtb250aCBzZWxlY3RlZFxuICAgICAqL1xuICAgIHByaXZhdGUgc2VsZWN0TW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBmaXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQoZmlyc3REYXRlT2ZNb250aCk7XG5cbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChcbiAgICAgICAgICAgIGZpcnN0RGF0ZU9mTW9udGhcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBkYXlzSW5Nb250aCxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHJlc3VsdCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGtleWRvd24gZXZlbnQgb24gY2FsZW5kYXIgYm9keVxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVDYWxlbmRhcktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgbGV0IG1vbWVudDtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAvLyBtaW51cyAxIG1vbnRoXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMSBtb250aFxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbWludXMgMyBtb250aHNcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAtM1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBhZGQgMyBtb250aHNcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbW92ZSB0byBmaXJzdCBtb250aCBvZiBjdXJyZW50IHllYXJcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIC10aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gbW92ZSB0byBsYXN0IG1vbnRoIG9mIGN1cnJlbnQgeWVhclxuICAgICAgICAgICAgY2FzZSBFTkQ6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAxMSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBtaW51cyAxIHllYXIgKG9yIDEwIHllYXIpXG4gICAgICAgICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSA/IC0xMCA6IC0xXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIGFkZCAxIHllYXIgKG9yIDEwIHllYXIpXG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5ID8gMTAgOiAxXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIFNlbGVjdCBjdXJyZW50IG1vbnRoXG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9udGgoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgY2FsZW5kYXIgbW9udGggbGlzdFxuICAgICAqICovXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZU1vbnRoTGlzdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlck1vbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE1vbnRocygpO1xuICAgICAgICB0aGlzLnRvZGF5TW9udGggPSB0aGlzLmdldE1vbnRoSW5DdXJyZW50WWVhcihcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5fbW9udGhzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTU9OVEhTX1BFUl9ZRUFSIC8gTU9OVEhTX1BFUl9ST1c7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgcm93ID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTU9OVEhTX1BFUl9ST1c7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoID0gaiArIGkgKiBNT05USFNfUEVSX1JPVztcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aENlbGwgPSB0aGlzLmNyZWF0ZU1vbnRoQ2VsbChtb250aCk7XG4gICAgICAgICAgICAgICAgcm93LnB1c2gobW9udGhDZWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fbW9udGhzLnB1c2gocm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIENhbGVuZGFyQ2VsbCBmb3IgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9udGhDZWxsKG1vbnRoOiBudW1iZXIpOiBDYWxlbmRhckNlbGwge1xuICAgICAgICBjb25zdCBzdGFydERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcbiAgICAgICAgICAgIHN0YXJ0RGF0ZU9mTW9udGgsXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5tb250aFllYXJBMTF5TGFiZWxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY2VsbENsYXNzID0gJ293bC1kdC1tb250aC0nICsgbW9udGg7XG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxuICAgICAgICAgICAgbW9udGgsXG4gICAgICAgICAgICB0aGlzLm1vbnRoTmFtZXNbbW9udGhdLFxuICAgICAgICAgICAgYXJpYUxhYmVsLFxuICAgICAgICAgICAgdGhpcy5pc01vbnRoRW5hYmxlZChtb250aCksXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGNlbGxDbGFzc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBtb250aCBpcyBlbmFibGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzTW9udGhFbmFibGVkKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZmlyc3REYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcbiAgICAgICAgICAgIG1vbnRoLFxuICAgICAgICAgICAgMVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSBtb250aCBpcyBzZWxlY3RhYmxlLFxuICAgICAgICAvLyB3ZSBjb3VudCB0aGUgbW9udGggYXMgZW5hYmxlXG4gICAgICAgIGZvciAoXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IGZpcnN0RGF0ZU9mTW9udGg7XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlKSA9PT0gbW9udGg7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpXG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICEhZGF0ZSAmJlxuICAgICAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMubWluRGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWluRGF0ZSkgPj0gMCkgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG1vbnRoIGluIHRoaXMgeWVhciB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxuICAgICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIHllYXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRNb250aEluQ3VycmVudFllYXIoZGF0ZTogVCB8IG51bGwpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5nZXRWYWxpZERhdGUoZGF0ZSkgJiYgdGhpcy5nZXRWYWxpZERhdGUodGhpcy5fcGlja2VyTW9tZW50KSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZVllYXIoXG4gICAgICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLl9waWNrZXJNb21lbnRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIDwgMCA6IHRoZSBnaXZlbiBkYXRlJ3MgeWVhciBpcyBiZWZvcmUgcGlja2VyTW9tZW50J3MgeWVhciwgd2UgcmV0dXJuIC0xIGFzIHNlbGVjdGVkIG1vbnRoIHZhbHVlLlxuICAgICAgICAgICAgLy8gPiAwIDogdGhlIGdpdmVuIGRhdGUncyB5ZWFyIGlzIGFmdGVyIHBpY2tlck1vbWVudCdzIHllYXIsIHdlIHJldHVybiAxMiBhcyBzZWxlY3RlZCBtb250aCB2YWx1ZS5cbiAgICAgICAgICAgIC8vIDAgOiB0aGUgZ2l2ZSBkYXRlJ3MgeWVhciBpcyBzYW1lIGFzIHRoZSBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gdGhlIGFjdHVhbCBtb250aCB2YWx1ZS5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgc2VsZWN0ZWRNb250aHMgdmFsdWVcbiAgICAgKiBJbiBzaW5nbGUgbW9kZSwgaXQgaGFzIG9ubHkgb25lIHZhbHVlIHdoaWNoIHJlcHJlc2VudCB0aGUgbW9udGggdGhlIHNlbGVjdGVkIGRhdGUgaW5cbiAgICAgKiBJbiByYW5nZSBtb2RlLCBpdCB3b3VsZCBoYXMgdHdvIHZhbHVlcywgb25lIGZvciB0aGUgbW9udGggdGhlIGZyb21WYWx1ZSBpbiBhbmQgdGhlIG90aGVyIGZvciB0aGUgbW9udGggdGhlIHRvVmFsdWUgaW5cbiAgICAgKiAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0ZWRNb250aHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNb250aHMgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUgJiYgdGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoc1swXSA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoc1swXSA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKFxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzWzBdXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoc1sxXSA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKFxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzWzFdXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgdGhlIGdpdmVuIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSB5ZWFyXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYXNTYW1lWWVhcihkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKSB7XG4gICAgICAgIHJldHVybiAhIShcbiAgICAgICAgICAgIGRhdGVMZWZ0ICYmXG4gICAgICAgICAgICBkYXRlUmlnaHQgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZUxlZnQpID09PVxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZVJpZ2h0KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0FjdGl2ZUNlbGwoKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJCb2R5RWxtLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIH1cbn1cbiJdfQ==