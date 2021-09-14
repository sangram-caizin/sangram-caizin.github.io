/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time-picker-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-container.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Optional, ViewChild } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlCalendarComponent } from './calendar.component';
import { OwlTimerComponent } from './timer.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { Subject } from 'rxjs';
import { owlDateTimePickerAnimations } from './date-time-picker.animations';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
/**
 * @template T
 */
export class OwlDateTimeContainerComponent {
    /**
     * @param {?} cdRef
     * @param {?} elmRef
     * @param {?} pickerIntl
     * @param {?} dateTimeAdapter
     */
    constructor(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
        this.cdRef = cdRef;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.dateTimeAdapter = dateTimeAdapter;
        this.activeSelectedIndex = 0; // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
        // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
        /**
         * Stream emits when try to hide picker
         *
         */
        this.hidePicker$ = new Subject();
        /**
         * Stream emits when try to confirm the selected value
         *
         */
        this.confirmSelected$ = new Subject();
        this.pickerOpened$ = new Subject();
    }
    /**
     * @return {?}
     */
    get hidePickerStream() {
        return this.hidePicker$.asObservable();
    }
    /**
     * @return {?}
     */
    get confirmSelectedStream() {
        return this.confirmSelected$.asObservable();
    }
    /**
     * @return {?}
     */
    get pickerOpenedStream() {
        return this.pickerOpened$.asObservable();
    }
    /**
     * @return {?}
     */
    get pickerMoment() {
        return this._clamPickerMoment;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set pickerMoment(value) {
        if (value) {
            this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
        }
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get pickerType() {
        return this.picker.pickerType;
    }
    /**
     * @return {?}
     */
    get cancelLabel() {
        return this.pickerIntl.cancelBtnLabel;
    }
    /**
     * @return {?}
     */
    get setLabel() {
        return this.pickerIntl.setBtnLabel;
    }
    /**
     * The range 'from' label
     *
     * @return {?}
     */
    get fromLabel() {
        return this.pickerIntl.rangeFromLabel;
    }
    /**
     * The range 'to' label
     *
     * @return {?}
     */
    get toLabel() {
        return this.pickerIntl.rangeToLabel;
    }
    /**
     * The range 'from' formatted value
     *
     * @return {?}
     */
    get fromFormattedValue() {
        /** @type {?} */
        const value = this.picker.selecteds[0];
        return value
            ? this.dateTimeAdapter.format(value, this.picker.formatString)
            : '';
    }
    /**
     * The range 'to' formatted value
     *
     * @return {?}
     */
    get toFormattedValue() {
        /** @type {?} */
        const value = this.picker.selecteds[1];
        return value
            ? this.dateTimeAdapter.format(value, this.picker.formatString)
            : '';
    }
    /**
     * Cases in which the control buttons show in the picker
     * 1) picker mode is 'dialog'
     * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
     *
     * @return {?}
     */
    get showControlButtons() {
        return (this.picker.pickerMode === 'dialog' ||
            (this.picker.pickerType !== 'calendar' &&
                this.picker.pickerMode !== 'inline'));
    }
    /**
     * @return {?}
     */
    get containerElm() {
        return this.elmRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get owlDTContainerClass() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDTPopupContainerClass() {
        return this.picker.pickerMode === 'popup';
    }
    /**
     * @return {?}
     */
    get owlDTDialogContainerClass() {
        return this.picker.pickerMode === 'dialog';
    }
    /**
     * @return {?}
     */
    get owlDTInlineContainerClass() {
        return this.picker.pickerMode === 'inline';
    }
    /**
     * @return {?}
     */
    get owlDTContainerDisabledClass() {
        return this.picker.disabled;
    }
    /**
     * @return {?}
     */
    get owlDTContainerId() {
        return this.picker.id;
    }
    /**
     * @return {?}
     */
    get owlDTContainerAnimation() {
        return this.picker.pickerMode === 'inline' ? '' : 'enter';
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.initPicker();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.focusPicker();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleContainerAnimationDone(event) {
        /** @type {?} */
        const toState = event.toState;
        if (toState === 'enter') {
            this.pickerOpened$.next();
        }
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    onPresetClicked(ev) {
        /** @type {?} */
        let currentDate = this.pickerMoment;
        /** @type {?} */
        let key = ev.srcElement.innerText;
        switch (key) {
            case '- M':
                /** @type {?} */
                let dt;
                if (currentDate.getDate() == 1) {
                    dt = this.dateTimeAdapter.addCalendarMonths(currentDate, -1);
                }
                else {
                    dt = this.dateTimeAdapter.addCalendarDays(currentDate, -(currentDate.getDate() - 1));
                }
                this.dateSelected(dt);
                break;
            case '- D':
                this.dateSelected(this.dateTimeAdapter.addCalendarDays(currentDate, -1));
                break;
            case 'Today':
                this.dateSelected(this.dateTimeAdapter.now());
                break;
            case '+ D':
                this.dateSelected(this.dateTimeAdapter.addCalendarDays(currentDate, +1));
                break;
                break;
            case '+ M':
                /** @type {?} */
                var dt1 = this.dateTimeAdapter.addCalendarDays(currentDate, 1);
                /** @type {?} */
                var dateDiff = this.dateTimeAdapter.getNumDaysInMonth(dt1) - dt1.getDate();
                dt1 = this.dateTimeAdapter.addCalendarDays(dt1, dateDiff);
                this.dateSelected(dt1);
                break;
            default:
                break;
        }
    }
    /**
     * @param {?} ev
     * @return {?}
     */
    onPresetTimerClicked(ev) {
        /** @type {?} */
        let key = ev.srcElement.innerText.trim();
        switch (key) {
            case 'Now':
                /** @type {?} */
                let now = this.dateTimeAdapter.now();
                m = this.dateTimeAdapter.setHours(this.pickerMoment, now.getHours());
                m = this.dateTimeAdapter.setMinutes(m, now.getMinutes());
                m = this.dateTimeAdapter.setMinutes(m, now.getSeconds());
                this.timeSelected(m);
                break;
            case '0':
                /** @type {?} */
                var m = this.dateTimeAdapter.setHours(this.pickerMoment, 0);
                m = this.dateTimeAdapter.setMinutes(m, 0);
                m = this.dateTimeAdapter.setSeconds(m, 0);
                this.timeSelected(m);
                break;
            case '24':
                /** @type {?} */
                var m = this.dateTimeAdapter.setHours(this.pickerMoment, 23);
                m = this.dateTimeAdapter.setMinutes(m, 59);
                m = this.dateTimeAdapter.setSeconds(m, 59);
                this.timeSelected(m);
                break;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    dateSelected(date) {
        /** @type {?} */
        let result;
        if (this.picker.isInSingleMode) {
            result = this.dateSelectedInSingleMode(date);
            if (result) {
                this.pickerMoment = result;
                this.picker.select(result);
            }
            else {
                // we close the picker when result is null and pickerType is calendar.
                if (this.pickerType === 'calendar') {
                    this.hidePicker$.next(null);
                }
            }
            return;
        }
        if (this.picker.isInRangeMode) {
            result = this.dateSelectedInRangeMode(date);
            if (result) {
                this.pickerMoment = result[this.activeSelectedIndex];
                this.picker.select(result);
            }
        }
    }
    /**
     * @param {?} time
     * @return {?}
     */
    timeSelected(time) {
        this.pickerMoment = this.dateTimeAdapter.clone(time);
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            return;
        }
        if (this.picker.isInSingleMode) {
            this.picker.select(this.pickerMoment);
            return;
        }
        if (this.picker.isInRangeMode) {
            /** @type {?} */
            const selecteds = [...this.picker.selecteds];
            // check if the 'from' is after 'to' or 'to'is before 'from'
            // In this case, we set both the 'from' and 'to' the same value
            if ((this.activeSelectedIndex === 0 &&
                selecteds[1] &&
                this.dateTimeAdapter.compare(this.pickerMoment, selecteds[1]) === 1) ||
                (this.activeSelectedIndex === 1 &&
                    selecteds[0] &&
                    this.dateTimeAdapter.compare(this.pickerMoment, selecteds[0]) === -1)) {
                selecteds[0] = this.pickerMoment;
                selecteds[1] = this.pickerMoment;
            }
            else {
                selecteds[this.activeSelectedIndex] = this.pickerMoment;
            }
            this.picker.select(selecteds);
        }
    }
    /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    onCancelClicked(event) {
        this.hidePicker$.next(null);
        event.preventDefault();
        return;
    }
    /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    onSetClicked(event) {
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        }
        this.confirmSelected$.next(event);
        event.preventDefault();
        return;
    }
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClickOnInfoGroup(event, index) {
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    handleKeydownOnInfoGroup(event, next, index) {
        switch (event.keyCode) {
            case DOWN_ARROW:
            case RIGHT_ARROW:
            case UP_ARROW:
            case LEFT_ARROW:
                next.focus();
                this.setActiveSelectedIndex(index === 0 ? 1 : 0);
                event.preventDefault();
                event.stopPropagation();
                break;
            case SPACE:
                this.setActiveSelectedIndex(index);
                event.preventDefault();
                event.stopPropagation();
                break;
            default:
                return;
        }
    }
    /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    setActiveSelectedIndex(index) {
        if (this.picker.selectMode === 'range' &&
            this.activeSelectedIndex !== index) {
            this.activeSelectedIndex = index;
            /** @type {?} */
            const selected = this.picker.selecteds[this.activeSelectedIndex];
            if (this.picker.selecteds && selected) {
                this.pickerMoment = this.dateTimeAdapter.clone(selected);
            }
        }
        return;
    }
    /**
     * @private
     * @return {?}
     */
    initPicker() {
        this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
        this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
    }
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    dateSelectedInSingleMode(date) {
        if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
            return null;
        }
        return this.updateAndCheckCalendarDate(date);
    }
    /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    dateSelectedInRangeMode(date) {
        /** @type {?} */
        let from = this.picker.selecteds[0];
        /** @type {?} */
        let to = this.picker.selecteds[1];
        /** @type {?} */
        const result = this.updateAndCheckCalendarDate(date);
        if (!result) {
            return null;
        }
        // if the given calendar day is after or equal to 'from',
        // set ths given date as 'to'
        // otherwise, set it as 'from' and set 'to' to null
        if (this.picker.selectMode === 'range') {
            if (this.picker.selecteds &&
                this.picker.selecteds.length &&
                !to &&
                from &&
                this.dateTimeAdapter.differenceInCalendarDays(result, from) >= 0) {
                to = result;
                this.activeSelectedIndex = 1;
            }
            else {
                from = result;
                to = null;
                this.activeSelectedIndex = 0;
            }
        }
        else if (this.picker.selectMode === 'rangeFrom') {
            from = result;
            // if the from value is after the to value, set the to value as null
            if (to && this.dateTimeAdapter.compare(from, to) > 0) {
                to = null;
            }
        }
        else if (this.picker.selectMode === 'rangeTo') {
            to = result;
            // if the from value is after the to value, set the from value as null
            if (from && this.dateTimeAdapter.compare(from, to) > 0) {
                from = null;
            }
        }
        return [from, to];
    }
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     * @private
     * @param {?} date
     * @return {?}
     */
    updateAndCheckCalendarDate(date) {
        /** @type {?} */
        let result;
        // if the picker is 'both', update the calendar date's time value
        if (this.picker.pickerType === 'both') {
            result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(date), this.dateTimeAdapter.getMonth(date), this.dateTimeAdapter.getDate(date), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            result = this.dateTimeAdapter.clampDate(result, this.picker.minDateTime, this.picker.maxDateTime);
        }
        else {
            result = this.dateTimeAdapter.clone(date);
        }
        // check the updated dateTime
        return this.picker.dateTimeChecker(result) ? result : null;
    }
    /**
     * Focus to the picker
     *
     * @private
     * @return {?}
     */
    focusPicker() {
        if (this.picker.pickerMode === 'inline') {
            return;
        }
        if (this.calendar) {
            this.calendar.focusActiveCell();
        }
        else if (this.timer) {
            this.timer.focus();
        }
    }
}
OwlDateTimeContainerComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'owlDateTimeContainer',
                selector: 'owl-date-time-container',
                template: "<div [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\" [@fadeInPicker]=\"picker.pickerMode === 'inline'? '' : 'enter'\"\n  class=\"owl-dt-container-inner\">\n  <owl-date-time-calendar *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\" class=\"owl-dt-container-row\"\n    [firstDayOfWeek]=\"picker.firstDayOfWeek\" [(pickerMoment)]=\"pickerMoment\" [selected]=\"picker.selected\"\n    [selecteds]=\"picker.selecteds\" [selectMode]=\"picker.selectMode\" [minDate]=\"picker.minDateTime\"\n    [maxDate]=\"picker.maxDateTime\" [dateFilter]=\"picker.dateTimeFilter\" [startView]=\"picker.startView\"\n    [hideOtherMonths]=\"picker.hideOtherMonths\" (yearSelected)=\"picker.selectYear($event)\"\n    (monthSelected)=\"picker.selectMonth($event)\" (selectedChange)=\"dateSelected($event)\"></owl-date-time-calendar>\n\n\n  <div *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\" class=\"owl-dt-calendar-main\">\n    <table class=\"owl-dt-calendar-table owl-dt-calendar-month-table\">\n      <tbody class=\"owl-dt-calendar-body\">\n        <tr class=\"ng-star-inserted\" (click)=\"onPresetClicked($event)\">\n          <td class=\"owl-dt-calendar-cell owl-dt-day-0 ng-star-inserted\"\n            style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n            <button title=\"Previous month\" class=\"owl-dt-calendar-cell-content\">- M</button>\n          </td>\n          <td class=\"owl-dt-calendar-cell owl-dt-day-1 ng-star-inserted\"\n            style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n            <button title=\"Previous day\" class=\"owl-dt-calendar-cell-content\">- D</button>\n          </td>\n          <td class=\"owl-dt-calendar-cell owl-dt-day-2 ng-star-inserted\"\n            style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n            <button title=\"Today\" class=\"owl-dt-calendar-cell-content\"> Today </button>\n          </td>\n          <td class=\"owl-dt-calendar-cell owl-dt-day-2 ng-star-inserted\"\n            style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n            <button title=\"Next day\" class=\"owl-dt-calendar-cell-content\">+ D</button>\n          </td>\n          <td class=\"owl-dt-calendar-cell owl-dt-day-3 ng-star-inserted\"\n            style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n            <button title=\"Next Month\" class=\"owl-dt-calendar-cell-content\">+ M</button>\n          </td>\n        </tr>\n\n      </tbody>\n    </table>\n\n  </div>\n  <div *ngIf=\"pickerType === 'both' || pickerType === 'timer'\">\n    <owl-date-time-timer class=\"owl-dt-container-row\" [pickerMoment]=\"pickerMoment\" [minDateTime]=\"picker.minDateTime\"\n      [maxDateTime]=\"picker.maxDateTime\" [showSecondsTimer]=\"picker.showSecondsTimer\" [hour12Timer]=\"picker.hour12Timer\"\n      [stepHour]=\"picker.stepHour\" [stepMinute]=\"picker.stepMinute\" [stepSecond]=\"picker.stepSecond\"\n      (selectedChange)=\"timeSelected($event)\"></owl-date-time-timer>\n      <table class=\"owl-dt-calendar-table owl-dt-calendar-month-table\">\n        <tbody class=\"owl-dt-calendar-body\">\n          <tr class=\"ng-star-inserted\" (click)=\"onPresetTimerClicked($event)\">\n            <td class=\"owl-dt-calendar-cell owl-dt-day-0 ng-star-inserted\"\n              style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n              <button title=\"Now\" class=\"owl-dt-calendar-cell-content\">Now</button>\n            </td>\n            <td class=\"owl-dt-calendar-cell owl-dt-day-1 ng-star-inserted\"\n              style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n              <button title=\"Set Zero day\" class=\"owl-dt-calendar-cell-content\">0</button>\n            </td>\n            <td class=\"owl-dt-calendar-cell owl-dt-day-2 ng-star-inserted\"\n              style=\"width: 14.2857%; padding-top: 7.14286%; padding-bottom: 7.14286%;\">\n              <button title=\"Set 24\" class=\"owl-dt-calendar-cell-content\">24</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n  </div>\n  <div *ngIf=\"picker.isInRangeMode\" role=\"radiogroup\" class=\"owl-dt-container-info owl-dt-container-row\">\n    <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\" [attr.aria-checked]=\"activeSelectedIndex === 0\"\n      class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\n      [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 0}\"\n      (click)=\"handleClickOnInfoGroup($event, 0)\" (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\" #from>\n      <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n        <span class=\"owl-dt-container-info-label\">{{fromLabel}}:</span>\n        <span class=\"owl-dt-container-info-value\">{{fromFormattedValue}}</span>\n      </span>\n    </div>\n    <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\" [attr.aria-checked]=\"activeSelectedIndex === 1\"\n      class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\n      [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 1}\"\n      (click)=\"handleClickOnInfoGroup($event, 1)\" (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\" #to>\n      <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\n        <span class=\"owl-dt-container-info-label\">{{toLabel}}:</span>\n        <span class=\"owl-dt-container-info-value\">{{toFormattedValue}}</span>\n      </span>\n    </div>\n  </div>\n\n  <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\" type=\"button\" tabindex=\"0\"\n      (click)=\"onCancelClicked($event)\">\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{cancelLabel}}\n      </span>\n    </button>\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\" type=\"button\" tabindex=\"0\"\n      (click)=\"onSetClicked($event)\">\n      <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\n        {{setLabel}}\n      </span>\n    </button>\n  </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                animations: [
                    owlDateTimePickerAnimations.transformPicker,
                    owlDateTimePickerAnimations.fadeInPicker
                ],
                host: {
                    '(@transformPicker.done)': 'handleContainerAnimationDone($event)',
                    '[class.owl-dt-container]': 'owlDTContainerClass',
                    '[class.owl-dt-popup-container]': 'owlDTPopupContainerClass',
                    '[class.owl-dt-dialog-container]': 'owlDTDialogContainerClass',
                    '[class.owl-dt-inline-container]': 'owlDTInlineContainerClass',
                    '[class.owl-dt-container-disabled]': 'owlDTContainerDisabledClass',
                    '[attr.id]': 'owlDTContainerId',
                    '[@transformPicker]': 'owlDTContainerAnimation',
                },
                styles: [""]
            }] }
];
/** @nocollapse */
OwlDateTimeContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: OwlDateTimeIntl },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] }
];
OwlDateTimeContainerComponent.propDecorators = {
    calendar: [{ type: ViewChild, args: [OwlCalendarComponent, { static: false },] }],
    timer: [{ type: ViewChild, args: [OwlTimerComponent, { static: false },] }]
};
if (false) {
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.calendar;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.timer;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.picker;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.activeSelectedIndex;
    /**
     * Stream emits when try to hide picker
     *
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.hidePicker$;
    /**
     * Stream emits when try to confirm the selected value
     *
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.confirmSelected$;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.pickerOpened$;
    /**
     * The current picker moment. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype._clamPickerMoment;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFFVixRQUFRLEVBQ1IsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQ0gsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDWCxNQUFNLHVCQUF1QixDQUFDOzs7O0FBeUIvQixNQUFNLE9BQU8sNkJBQTZCOzs7Ozs7O0lBa0p0QyxZQUFxQixLQUF3QixFQUN2QixNQUFrQixFQUNsQixVQUEyQixFQUNoQixlQUFtQztRQUgvQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2hCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQTdJN0Qsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkVBQTZFOzs7Ozs7UUFLckcsZ0JBQVcsR0FBRyxJ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QUM5RCxpQ0FBaUMsRUFBRSwyQkFBMkI7b0JBQzlELG1DQUFtQyxFQUFFLDZCQUE2QjtvQkFDbEUsV0FBVyxFQUFFLGtCQUFrQjtvQkFDL0Isb0JBQW9CLEVBQUUseUJBQXlCO2lCQUNsRDs7YUFDSjs7OztZQTdDRyxpQkFBaUI7WUFFakIsVUFBVTtZQU1MLGVBQWU7WUFHZixlQUFlLHVCQXdMTixRQUFROzs7dUJBbkpyQixTQUFTLFNBQUMsb0JBQW9CLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO29CQUVqRCxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7O0lBRi9DLGlEQUNrQzs7SUFDbEMsOENBQzRCOztJQUU1QiwrQ0FBOEI7O0lBQzlCLDREQUErQjs7Ozs7OztJQUsvQixvREFBeUM7Ozs7Ozs7SUFTekMseURBQThDOzs7OztJQU05QyxzREFBMkM7Ozs7Ozs7SUFVM0MsMERBQTZCOzs7OztJQTRHaEIsOENBQWdDOzs7OztJQUMvQiwrQ0FBMEI7Ozs7O0lBQzFCLG1EQUFtQzs7Ozs7SUFDcEMsd0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIEFmdGVyQ29udGVudEluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBPbkluaXQsXG4gICAgT3B0aW9uYWwsXG4gICAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xUaW1lckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXIuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZSwgUGlja2VyVHlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucyB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zJztcbmltcG9ydCB7XG4gICAgRE9XTl9BUlJPVyxcbiAgICBMRUZUX0FSUk9XLFxuICAgIFJJR0hUX0FSUk9XLFxuICAgIFNQQUNFLFxuICAgIFVQX0FSUk9XXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgKiBhcyBtdCBmcm9tICdtb21lbnQvbW9tZW50JztcbmltcG9ydCB7IEN1cnNvckVycm9yIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL21sX3BhcnNlci9sZXhlcic7XG5AQ29tcG9uZW50KHtcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lQ29udGFpbmVyJyxcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMudHJhbnNmb3JtUGlja2VyLFxuICAgICAgICBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMuZmFkZUluUGlja2VyXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoQHRyYW5zZm9ybVBpY2tlci5kb25lKSc6ICdoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKCRldmVudCknLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXJdJzogJ293bERUQ29udGFpbmVyQ2xhc3MnLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1wb3B1cC1jb250YWluZXJdJzogJ293bERUUG9wdXBDb250YWluZXJDbGFzcycsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWRpYWxvZy1jb250YWluZXJdJzogJ293bERURGlhbG9nQ29udGFpbmVyQ2xhc3MnLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1pbmxpbmUtY29udGFpbmVyXSc6ICdvd2xEVElubGluZUNvbnRhaW5lckNsYXNzJyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY29udGFpbmVyLWRpc2FibGVkXSc6ICdvd2xEVENvbnRhaW5lckRpc2FibGVkQ2xhc3MnLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ293bERUQ29udGFpbmVySWQnLFxuICAgICAgICAnW0B0cmFuc2Zvcm1QaWNrZXJdJzogJ293bERUQ29udGFpbmVyQW5pbWF0aW9uJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIGNhbGVuZGFyOiBPd2xDYWxlbmRhckNvbXBvbmVudDxUPjtcbiAgICBAVmlld0NoaWxkKE93bFRpbWVyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgICB0aW1lcjogT3dsVGltZXJDb21wb25lbnQ8VD47XG5cbiAgICBwdWJsaWMgcGlja2VyOiBPd2xEYXRlVGltZTxUPjtcbiAgICBwdWJsaWMgYWN0aXZlU2VsZWN0ZWRJbmRleCA9IDA7IC8vIFRoZSBjdXJyZW50IGFjdGl2ZSBTZWxlY3RlZEluZGV4IGluIHJhbmdlIHNlbGVjdCBtb2RlICgwOiAnZnJvbScsIDE6ICd0bycpXG5cbiAgICAvKipcbiAgICAgKiBTdHJlYW0gZW1pdHMgd2hlbiB0cnkgdG8gaGlkZSBwaWNrZXJcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgaGlkZVBpY2tlciQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBnZXQgaGlkZVBpY2tlclN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlUGlja2VyJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdHJlYW0gZW1pdHMgd2hlbiB0cnkgdG8gY29uZmlybSB0aGUgc2VsZWN0ZWQgdmFsdWVcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgY29uZmlybVNlbGVjdGVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIGdldCBjb25maXJtU2VsZWN0ZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlybVNlbGVjdGVkJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBpY2tlck9wZW5lZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBnZXQgcGlja2VyT3BlbmVkU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlck9wZW5lZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudC4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXG4gICAgICogaGlnaGxpZ2h0ZWQgd2hlbiB1c2luZyBrZXlib2FyZCBuYXZpZ2F0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2NsYW1QaWNrZXJNb21lbnQ6IFQ7XG5cbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xhbVBpY2tlck1vbWVudDtcbiAgICB9XG5cbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fY2xhbVBpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsYW1wRGF0ZShcbiAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5taW5EYXRlVGltZSxcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5tYXhEYXRlVGltZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGUge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyVHlwZTtcbiAgICB9XG5cbiAgICBnZXQgY2FuY2VsTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5jYW5jZWxCdG5MYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgc2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5zZXRCdG5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGxhYmVsXG4gICAgICogKi9cbiAgICBnZXQgZnJvbUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucmFuZ2VGcm9tTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHJhbmdlICd0bycgbGFiZWxcbiAgICAgKiAqL1xuICAgIGdldCB0b0xhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucmFuZ2VUb0xhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSAnZnJvbScgZm9ybWF0dGVkIHZhbHVlXG4gICAgICogKi9cbiAgICBnZXQgZnJvbUZvcm1hdHRlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzBdO1xuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aGlzLnBpY2tlci5mb3JtYXRTdHJpbmcpXG4gICAgICAgICAgICA6ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSAndG8nIGZvcm1hdHRlZCB2YWx1ZVxuICAgICAqICovXG4gICAgZ2V0IHRvRm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMV07XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMucGlja2VyLmZvcm1hdFN0cmluZylcbiAgICAgICAgICAgIDogJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FzZXMgaW4gd2hpY2ggdGhlIGNvbnRyb2wgYnV0dG9ucyBzaG93IGluIHRoZSBwaWNrZXJcbiAgICAgKiAxKSBwaWNrZXIgbW9kZSBpcyAnZGlhbG9nJ1xuICAgICAqIDIpIHBpY2tlciB0eXBlIGlzIE5PVCAnY2FsZW5kYXInIGFuZCB0aGUgcGlja2VyIG1vZGUgaXMgTk9UICdpbmxpbmUnXG4gICAgICogKi9cbiAgICBnZXQgc2hvd0NvbnRyb2xCdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgfHxcbiAgICAgICAgICAgICh0aGlzLnBpY2tlci5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSAhPT0gJ2lubGluZScpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbnRhaW5lckVsbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBvd2xEVENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRQb3B1cENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ3BvcHVwJztcbiAgICB9XG5cbiAgICBnZXQgb3dsRFREaWFsb2dDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdkaWFsb2cnO1xuICAgIH1cblxuICAgIGdldCBvd2xEVElubGluZUNvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZSc7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUQ29udGFpbmVyRGlzYWJsZWRDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmRpc2FibGVkO1xuICAgIH1cblxuICAgIGdldCBvd2xEVENvbnRhaW5lcklkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5pZDtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRDb250YWluZXJBbmltYXRpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnID8gJycgOiAnZW50ZXInO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICAgIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXG4gICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4gKSB7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5pdFBpY2tlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXNQaWNrZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ29udGFpbmVyQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdG9TdGF0ZSA9IGV2ZW50LnRvU3RhdGU7XG4gICAgICAgIGlmICh0b1N0YXRlID09PSAnZW50ZXInKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZCQubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uUHJlc2V0Q2xpY2tlZChldik6dm9pZHtcbiAgICAgIGxldCBjdXJyZW50RGF0ZTphbnkgPSB0aGlzLnBpY2tlck1vbWVudDtcbiAgICAgIGxldCBrZXkgOnN0cmluZyA9IGV2LnNyY0VsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICBjYXNlICctIE0nOlxuICAgICAgICAgICAgbGV0IGR0OlQ7XG4gICAgICAgICAgICBpZihjdXJyZW50RGF0ZS5nZXREYXRlKCkgPT0gMSl7XG4gICAgICAgICAgICAgIGR0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoY3VycmVudERhdGUsLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGR0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGN1cnJlbnREYXRlLCAtKGN1cnJlbnREYXRlLmdldERhdGUoKS0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuZGF0ZVNlbGVjdGVkKGR0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJy0gRCc6XG4gICAgICAgICAgICB0aGlzLmRhdGVTZWxlY3RlZCh0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoY3VycmVudERhdGUsLTEpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1RvZGF5JzpcbiAgICAgICAgICAgIHRoaXMuZGF0ZVNlbGVjdGVkKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJysgRCc6XG4gICAgICAgICAgICB0aGlzLmRhdGVTZWxlY3RlZCh0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoY3VycmVudERhdGUsKzEpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICcrIE0nOlxuICAgICAgICAgICAgdmFyIGR0MTphbnkgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoY3VycmVudERhdGUsMSk7XG4gICAgICAgICAgICB2YXIgZGF0ZURpZmYgPSAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoZHQxKSAtIGR0MS5nZXREYXRlKCk7XG4gICAgICAgICAgICBkdDEgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoZHQxLGRhdGVEaWZmKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVNlbGVjdGVkKGR0MSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIG9uUHJlc2V0VGltZXJDbGlja2VkKGV2KTp2b2lke1xuICAgICAgbGV0IGtleSA6c3RyaW5nID0gZXYuc3JjRWxlbWVudC5pbm5lclRleHQudHJpbSgpO1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnTm93JzpcbiAgICAgICAgICBsZXQgbm93OmFueSA9dGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldEhvdXJzKHRoaXMucGlja2VyTW9tZW50LG5vdy5nZXRIb3VycygpKTtcbiAgICAgICAgICBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyhtLG5vdy5nZXRNaW51dGVzKCkpO1xuICAgICAgICAgIG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRNaW51dGVzKG0sbm93LmdldFNlY29uZHMoKSk7XG4gICAgICAgICAgdGhpcy50aW1lU2VsZWN0ZWQobSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgdmFyIG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgMCk7XG4gICAgICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldE1pbnV0ZXMobSwgMCk7XG4gICAgICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldFNlY29uZHMobSwgMCk7XG4gICAgICAgICAgdGhpcy50aW1lU2VsZWN0ZWQobSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzI0JzpcbiAgICAgICAgICB2YXIgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldEhvdXJzKHRoaXMucGlja2VyTW9tZW50LCAyMyk7XG4gICAgICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldE1pbnV0ZXMobSwgNTkpO1xuICAgICAgICAgIG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRTZWNvbmRzKG0sIDU5KTtcbiAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RlZChtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIH1cbiAgICBwdWJsaWMgZGF0ZVNlbGVjdGVkKGRhdGU6IFQpOiB2b2lkIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICBpZiAodGhpcy5waWNrZXIuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVNlbGVjdGVkSW5TaW5nbGVNb2RlKGRhdGUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBjbG9zZSB0aGUgcGlja2VyIHdoZW4gcmVzdWx0IGlzIG51bGwgYW5kIHBpY2tlclR5cGUgaXMgY2FsZW5kYXIuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGlja2VyVHlwZSA9PT0gJ2NhbGVuZGFyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVNlbGVjdGVkSW5SYW5nZU1vZGUoZGF0ZSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSByZXN1bHRbdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3QocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lU2VsZWN0ZWQodGltZTogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsb25lKHRpbWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHRoaXMucGlja2VyTW9tZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5TaW5nbGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3QodGhpcy5waWNrZXJNb21lbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IFsuLi50aGlzLnBpY2tlci5zZWxlY3RlZHNdO1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgJ2Zyb20nIGlzIGFmdGVyICd0bycgb3IgJ3RvJ2lzIGJlZm9yZSAnZnJvbSdcbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2Ugc2V0IGJvdGggdGhlICdmcm9tJyBhbmQgJ3RvJyB0aGUgc2FtZSB2YWx1ZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICh0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzFdICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkc1sxXVxuICAgICAgICAgICAgICAgICAgICApID09PSAxKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPT09IDEgJiZcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzBdICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkc1swXVxuICAgICAgICAgICAgICAgICAgICApID09PSAtMSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkc1swXSA9IHRoaXMucGlja2VyTW9tZW50O1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkc1sxXSA9IHRoaXMucGlja2VyTW9tZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZHNbdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4XSA9IHRoaXMucGlja2VyTW9tZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3Qoc2VsZWN0ZWRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGljayBvbiBjYW5jZWwgYnV0dG9uXG4gICAgICovXG4gICAgcHVibGljIG9uQ2FuY2VsQ2xpY2tlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVBpY2tlciQubmV4dChudWxsKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGljayBvbiBzZXQgYnV0dG9uXG4gICAgICovXG4gICAgcHVibGljIG9uU2V0Q2xpY2tlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHRoaXMucGlja2VyTW9tZW50KSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkJC5uZXh0KGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGljayBvbiBpbmZvcm0gcmFkaW8gZ3JvdXBcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlQ2xpY2tPbkluZm9Hcm91cChldmVudDogYW55LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjbGljayBvbiBpbmZvcm0gcmFkaW8gZ3JvdXBcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlS2V5ZG93bk9uSW5mb0dyb3VwKFxuICAgICAgICBldmVudDogYW55LFxuICAgICAgICBuZXh0OiBhbnksXG4gICAgICAgIGluZGV4OiBudW1iZXJcbiAgICApOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICBuZXh0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4ID09PSAwID8gMSA6IDApO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdmFsdWUgb2YgYWN0aXZlU2VsZWN0ZWRJbmRleFxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgJiZcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSBpbmRleDtcblxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4XTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBpY2tlci5zZWxlY3RlZHMgJiYgc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsb25lKHNlbGVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGlja2VyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMucGlja2VyLnN0YXJ0QXQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyA/IDEgOiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBjYWxlbmRhciBkYXRlIGluIHNpbmdsZSBtb2RlLFxuICAgICAqIGl0IHJldHVybnMgbnVsbCB3aGVuIGRhdGUgaXMgbm90IHNlbGVjdGVkLlxuICAgICAqL1xuICAgIHByaXZhdGUgZGF0ZVNlbGVjdGVkSW5TaW5nbGVNb2RlKGRhdGU6IFQpOiBUIHwgbnVsbCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1NhbWVEYXkoZGF0ZSwgdGhpcy5waWNrZXIuc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBkYXRlcyBpbiByYW5nZSBNb2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBkYXRlU2VsZWN0ZWRJblJhbmdlTW9kZShkYXRlOiBUKTogVFtdIHwgbnVsbCB7XG4gICAgICAgIGxldCBmcm9tID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzBdO1xuICAgICAgICBsZXQgdG8gPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMV07XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy51cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlKTtcblxuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF5IGlzIGFmdGVyIG9yIGVxdWFsIHRvICdmcm9tJyxcbiAgICAgICAgLy8gc2V0IHRocyBnaXZlbiBkYXRlIGFzICd0bydcbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBzZXQgaXQgYXMgJ2Zyb20nIGFuZCBzZXQgJ3RvJyB0byBudWxsXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0ZWRzICYmXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0ZWRzLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICF0byAmJlxuICAgICAgICAgICAgICAgIGZyb20gJiZcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMocmVzdWx0LCBmcm9tKSA+PSAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB0byA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcm9tID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHRvID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nKSB7XG4gICAgICAgICAgICBmcm9tID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgZnJvbSB2YWx1ZSBpcyBhZnRlciB0aGUgdG8gdmFsdWUsIHNldCB0aGUgdG8gdmFsdWUgYXMgbnVsbFxuICAgICAgICAgICAgaWYgKHRvICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZnJvbSwgdG8pID4gMCkge1xuICAgICAgICAgICAgICAgIHRvID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcbiAgICAgICAgICAgIHRvID0gcmVzdWx0O1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgZnJvbSB2YWx1ZSBpcyBhZnRlciB0aGUgdG8gdmFsdWUsIHNldCB0aGUgZnJvbSB2YWx1ZSBhcyBudWxsXG4gICAgICAgICAgICBpZiAoZnJvbSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZyb20sIHRvKSA+IDApIHtcbiAgICAgICAgICAgICAgICBmcm9tID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbZnJvbSwgdG9dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF0ZSdzIHRpbWUgYW5kIGNoZWNrIGlmIGl0IGlzIHZhbGlkXG4gICAgICogQmVjYXVzZSB0aGUgY2FsZW5kYXIgZGF0ZSBoYXMgMDA6MDA6MDAgYXMgZGVmYXVsdCB0aW1lLCBpZiB0aGUgcGlja2VyIHR5cGUgaXMgJ2JvdGgnLFxuICAgICAqIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBnaXZlbiBjYWxlbmRhciBkYXRlJ3MgdGltZSBiZWZvcmUgc2VsZWN0aW5nIGl0LlxuICAgICAqIGlmIGl0IGlzIHZhbGlkLCByZXR1cm4gdGhlIHVwZGF0ZWQgZGF0ZVRpbWVcbiAgICAgKiBpZiBpdCBpcyBub3QgdmFsaWQsIHJldHVybiBudWxsXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlOiBUKTogVCB7XG4gICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgLy8gaWYgdGhlIHBpY2tlciBpcyAnYm90aCcsIHVwZGF0ZSB0aGUgY2FsZW5kYXIgZGF0ZSdzIHRpbWUgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMucGlja2VyLnBpY2tlclR5cGUgPT09ICdib3RoJykge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUoZGF0ZSksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxuICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5taW5EYXRlVGltZSxcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5tYXhEYXRlVGltZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsb25lKGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdGhlIHVwZGF0ZWQgZGF0ZVRpbWVcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcihyZXN1bHQpID8gcmVzdWx0IDogbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2N1cyB0byB0aGUgcGlja2VyXG4gICAgICogKi9cbiAgICBwcml2YXRlIGZvY3VzUGlja2VyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==