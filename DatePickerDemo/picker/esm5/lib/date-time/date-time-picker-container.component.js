/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time-picker-container.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var OwlDateTimeContainerComponent = /** @class */ (function () {
    function OwlDateTimeContainerComponent(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
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
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "hidePickerStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hidePicker$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "confirmSelectedStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.confirmSelected$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerOpenedStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerOpened$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._clamPickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
            }
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "cancelLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.cancelBtnLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "setLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.setBtnLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromLabel", {
        /**
         * The range 'from' label
         * */
        get: /**
         * The range 'from' label
         *
         * @return {?}
         */
        function () {
            return this.pickerIntl.rangeFromLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toLabel", {
        /**
         * The range 'to' label
         * */
        get: /**
         * The range 'to' label
         *
         * @return {?}
         */
        function () {
            return this.pickerIntl.rangeToLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromFormattedValue", {
        /**
         * The range 'from' formatted value
         * */
        get: /**
         * The range 'from' formatted value
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.picker.selecteds[0];
            return value
                ? this.dateTimeAdapter.format(value, this.picker.formatString)
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toFormattedValue", {
        /**
         * The range 'to' formatted value
         * */
        get: /**
         * The range 'to' formatted value
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.picker.selecteds[1];
            return value
                ? this.dateTimeAdapter.format(value, this.picker.formatString)
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "showControlButtons", {
        /**
         * Cases in which the control buttons show in the picker
         * 1) picker mode is 'dialog'
         * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
         * */
        get: /**
         * Cases in which the control buttons show in the picker
         * 1) picker mode is 'dialog'
         * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
         *
         * @return {?}
         */
        function () {
            return (this.picker.pickerMode === 'dialog' ||
                (this.picker.pickerType !== 'calendar' &&
                    this.picker.pickerMode !== 'inline'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "containerElm", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elmRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTPopupContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'popup';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTDialogContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'dialog';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTInlineContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'inline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerDisabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerAnimation", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'inline' ? '' : 'enter';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.initPicker();
    };
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.focusPicker();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleContainerAnimationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var toState = event.toState;
        if (toState === 'enter') {
            this.pickerOpened$.next();
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onPresetClicked = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        /** @type {?} */
        var currentDate = this.pickerMoment;
        /** @type {?} */
        var key = ev.srcElement.innerText;
        switch (key) {
            case '- M':
                /** @type {?} */
                var dt = void 0;
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
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onPresetTimerClicked = /**
     * @param {?} ev
     * @return {?}
     */
    function (ev) {
        /** @type {?} */
        var key = ev.srcElement.innerText.trim();
        switch (key) {
            case 'Now':
                /** @type {?} */
                var now = this.dateTimeAdapter.now();
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
    };
    /**
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result;
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
    };
    /**
     * @param {?} time
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.timeSelected = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
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
            var selecteds = tslib_1.__spread(this.picker.selecteds);
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
    };
    /**
     * Handle click on cancel button
     */
    /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onCancelClicked = /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.hidePicker$.next(null);
        event.preventDefault();
        return;
    };
    /**
     * Handle click on set button
     */
    /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onSetClicked = /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        }
        this.confirmSelected$.next(event);
        event.preventDefault();
        return;
    };
    /**
     * Handle click on inform radio group
     */
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleClickOnInfoGroup = /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Handle click on inform radio group
     */
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleKeydownOnInfoGroup = /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    function (event, next, index) {
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
    };
    /**
     * Set the value of activeSelectedIndex
     */
    /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.setActiveSelectedIndex = /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.picker.selectMode === 'range' &&
            this.activeSelectedIndex !== index) {
            this.activeSelectedIndex = index;
            /** @type {?} */
            var selected = this.picker.selecteds[this.activeSelectedIndex];
            if (this.picker.selecteds && selected) {
                this.pickerMoment = this.dateTimeAdapter.clone(selected);
            }
        }
        return;
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.initPicker = /**
     * @private
     * @return {?}
     */
    function () {
        this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
        this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
    };
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     */
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelectedInSingleMode = /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
            return null;
        }
        return this.updateAndCheckCalendarDate(date);
    };
    /**
     * Select dates in range Mode
     */
    /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelectedInRangeMode = /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var from = this.picker.selecteds[0];
        /** @type {?} */
        var to = this.picker.selecteds[1];
        /** @type {?} */
        var result = this.updateAndCheckCalendarDate(date);
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
    };
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     */
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
    OwlDateTimeContainerComponent.prototype.updateAndCheckCalendarDate = /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result;
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
    };
    /**
     * Focus to the picker
     * */
    /**
     * Focus to the picker
     *
     * @private
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.focusPicker = /**
     * Focus to the picker
     *
     * @private
     * @return {?}
     */
    function () {
        if (this.picker.pickerMode === 'inline') {
            return;
        }
        if (this.calendar) {
            this.calendar.focusActiveCell();
        }
        else if (this.timer) {
            this.timer.focus();
        }
    };
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
    OwlDateTimeContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlDateTimeContainerComponent.propDecorators = {
        calendar: [{ type: ViewChild, args: [OwlCalendarComponent, { static: false },] }],
        timer: [{ type: ViewChild, args: [OwlTimerComponent, { static: false },] }]
    };
    return OwlDateTimeContainerComponent;
}());
export { OwlDateTimeContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLE9BQU8sRUFHSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsUUFBUSxFQUNSLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRXBFLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUUsT0FBTyxFQUNILFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUcvQjtJQXdLSSx1Q0FBcUIsS0FBd0IsRUFDdkIsTUFBa0IsRUFDbEIsVUFBMkIsRUFDaEIsZUFBbUM7UUFIL0MsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUNoQixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUE3STdELHdCQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLDZFQUE2RTs7Ozs7O1FBS3JHLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7Ozs7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Q0FBQztDQUFBLEFBaGdCRCxJQWdnQkM7U0ExZVksNkJBQTZCOzs7SUFFdEMsaURBQ2tDOztJQUNsQyw4Q0FDNEI7O0lBRTVCLCtDQUE4Qjs7SUFDOUIsNERBQStCOzs7Ozs7O0lBSy9CLG9EQUF5Qzs7Ozs7OztJQVN6Qyx5REFBOEM7Ozs7O0lBTTlDLHNEQUEyQzs7Ozs7OztJQVUzQywwREFBNkI7Ozs7O0lBNEdoQiw4Q0FBZ0M7Ozs7O0lBQy9CLCtDQUEwQjs7Ozs7SUFDMUIsbURBQW1DOzs7OztJQUNwQyx3REFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XG5pbXBvcnQgeyBPd2xDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE93bERhdGVUaW1lLCBQaWNrZXJUeXBlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmFuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgICBET1dOX0FSUk9XLFxuICAgIExFRlRfQVJST1csXG4gICAgUklHSFRfQVJST1csXG4gICAgU1BBQ0UsXG4gICAgVVBfQVJST1dcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCAqIGFzIG10IGZyb20gJ21vbWVudC9tb21lbnQnO1xuaW1wb3J0IHsgQ3Vyc29yRXJyb3IgfSBmcm9tICdAYW5ndWxhci9jb21waWxlci9zcmMvbWxfcGFyc2VyL2xleGVyJztcbkBDb21wb25lbnQoe1xuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDb250YWluZXInLFxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucy50cmFuc2Zvcm1QaWNrZXIsXG4gICAgICAgIG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucy5mYWRlSW5QaWNrZXJcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhAdHJhbnNmb3JtUGlja2VyLmRvbmUpJzogJ2hhbmRsZUNvbnRhaW5lckFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNvbnRhaW5lcl0nOiAnb3dsRFRDb250YWluZXJDbGFzcycsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXBvcHVwLWNvbnRhaW5lcl0nOiAnb3dsRFRQb3B1cENvbnRhaW5lckNsYXNzJyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtZGlhbG9nLWNvbnRhaW5lcl0nOiAnb3dsRFREaWFsb2dDb250YWluZXJDbGFzcycsXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWlubGluZS1jb250YWluZXJdJzogJ293bERUSW5saW5lQ29udGFpbmVyQ2xhc3MnLFxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXItZGlzYWJsZWRdJzogJ293bERUQ29udGFpbmVyRGlzYWJsZWRDbGFzcycsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnb3dsRFRDb250YWluZXJJZCcsXG4gICAgICAgICdbQHRyYW5zZm9ybVBpY2tlcl0nOiAnb3dsRFRDb250YWluZXJBbmltYXRpb24nLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gICAgY2FsZW5kYXI6IE93bENhbGVuZGFyQ29tcG9uZW50PFQ+O1xuICAgIEBWaWV3Q2hpbGQoT3dsVGltZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxuICAgIHRpbWVyOiBPd2xUaW1lckNvbXBvbmVudDxUPjtcblxuICAgIHB1YmxpYyBwaWNrZXI6IE93bERhdGVUaW1lPFQ+O1xuICAgIHB1YmxpYyBhY3RpdmVTZWxlY3RlZEluZGV4ID0gMDsgLy8gVGhlIGN1cnJlbnQgYWN0aXZlIFNlbGVjdGVkSW5kZXggaW4gcmFuZ2Ugc2VsZWN0IG1vZGUgKDA6ICdmcm9tJywgMTogJ3RvJylcblxuICAgIC8qKlxuICAgICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBoaWRlIHBpY2tlclxuICAgICAqICovXG4gICAgcHJpdmF0ZSBoaWRlUGlja2VyJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIGdldCBoaWRlUGlja2VyU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGVQaWNrZXIkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0cmVhbSBlbWl0cyB3aGVuIHRyeSB0byBjb25maXJtIHRoZSBzZWxlY3RlZCB2YWx1ZVxuICAgICAqICovXG4gICAgcHJpdmF0ZSBjb25maXJtU2VsZWN0ZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgZ2V0IGNvbmZpcm1TZWxlY3RlZFN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtU2VsZWN0ZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGlja2VyT3BlbmVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIGdldCBwaWNrZXJPcGVuZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyT3BlbmVkJC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBwaWNrZXIgbW9tZW50LiBUaGlzIGRldGVybWluZXMgd2hpY2ggdGltZSBwZXJpb2QgaXMgc2hvd24gYW5kIHdoaWNoIGRhdGUgaXNcbiAgICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBfY2xhbVBpY2tlck1vbWVudDogVDtcblxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGFtUGlja2VyTW9tZW50O1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGFtUGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1pbkRhdGVUaW1lLFxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1heERhdGVUaW1lXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJUeXBlO1xuICAgIH1cblxuICAgIGdldCBjYW5jZWxMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmNhbmNlbEJ0bkxhYmVsO1xuICAgIH1cblxuICAgIGdldCBzZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnNldEJ0bkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSByYW5nZSAnZnJvbScgbGFiZWxcbiAgICAgKiAqL1xuICAgIGdldCBmcm9tTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5yYW5nZUZyb21MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmFuZ2UgJ3RvJyBsYWJlbFxuICAgICAqICovXG4gICAgZ2V0IHRvTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5yYW5nZVRvTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHJhbmdlICdmcm9tJyBmb3JtYXR0ZWQgdmFsdWVcbiAgICAgKiAqL1xuICAgIGdldCBmcm9tRm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMF07XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMucGlja2VyLmZvcm1hdFN0cmluZylcbiAgICAgICAgICAgIDogJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHJhbmdlICd0bycgZm9ybWF0dGVkIHZhbHVlXG4gICAgICogKi9cbiAgICBnZXQgdG9Gb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1sxXTtcbiAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5waWNrZXIuZm9ybWF0U3RyaW5nKVxuICAgICAgICAgICAgOiAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYXNlcyBpbiB3aGljaCB0aGUgY29udHJvbCBidXR0b25zIHNob3cgaW4gdGhlIHBpY2tlclxuICAgICAqIDEpIHBpY2tlciBtb2RlIGlzICdkaWFsb2cnXG4gICAgICogMikgcGlja2VyIHR5cGUgaXMgTk9UICdjYWxlbmRhcicgYW5kIHRoZSBwaWNrZXIgbW9kZSBpcyBOT1QgJ2lubGluZSdcbiAgICAgKiAqL1xuICAgIGdldCBzaG93Q29udHJvbEJ1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnZGlhbG9nJyB8fFxuICAgICAgICAgICAgKHRoaXMucGlja2VyLnBpY2tlclR5cGUgIT09ICdjYWxlbmRhcicgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5waWNrZXJNb2RlICE9PSAnaW5saW5lJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQgY29udGFpbmVyRWxtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFBvcHVwQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAncG9wdXAnO1xuICAgIH1cblxuICAgIGdldCBvd2xEVERpYWxvZ0NvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZyc7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUSW5saW5lQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJztcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRDb250YWluZXJEaXNhYmxlZENsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIuZGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgZ2V0IG93bERUQ29udGFpbmVySWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmlkO1xuICAgIH1cblxuICAgIGdldCBvd2xEVENvbnRhaW5lckFuaW1hdGlvbigpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZScgPyAnJyA6ICdlbnRlcic7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcbiAgICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPiApIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0UGlja2VyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1c1BpY2tlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0b1N0YXRlID0gZXZlbnQudG9TdGF0ZTtcbiAgICAgICAgaWYgKHRvU3RhdGUgPT09ICdlbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkJC5uZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25QcmVzZXRDbGlja2VkKGV2KTp2b2lke1xuICAgICAgbGV0IGN1cnJlbnREYXRlOmFueSA9IHRoaXMucGlja2VyTW9tZW50O1xuICAgICAgbGV0IGtleSA6c3RyaW5nID0gZXYuc3JjRWxlbWVudC5pbm5lclRleHQ7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJy0gTSc6XG4gICAgICAgICAgICBsZXQgZHQ6VDtcbiAgICAgICAgICAgIGlmKGN1cnJlbnREYXRlLmdldERhdGUoKSA9PSAxKXtcbiAgICAgICAgICAgICAgZHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhjdXJyZW50RGF0ZSwtMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgZHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoY3VycmVudERhdGUsIC0oY3VycmVudERhdGUuZ2V0RGF0ZSgpLTEpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5kYXRlU2VsZWN0ZWQoZHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnLSBEJzpcbiAgICAgICAgICAgIHRoaXMuZGF0ZVNlbGVjdGVkKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhjdXJyZW50RGF0ZSwtMSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnVG9kYXknOlxuICAgICAgICAgICAgdGhpcy5kYXRlU2VsZWN0ZWQodGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnKyBEJzpcbiAgICAgICAgICAgIHRoaXMuZGF0ZVNlbGVjdGVkKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhjdXJyZW50RGF0ZSwrMSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJysgTSc6XG4gICAgICAgICAgICB2YXIgZHQxOmFueSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhjdXJyZW50RGF0ZSwxKTtcbiAgICAgICAgICAgIHZhciBkYXRlRGlmZiA9ICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChkdDEpIC0gZHQxLmdldERhdGUoKTtcbiAgICAgICAgICAgIGR0MSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkdDEsZGF0ZURpZmYpO1xuICAgICAgICAgICAgdGhpcy5kYXRlU2VsZWN0ZWQoZHQxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgb25QcmVzZXRUaW1lckNsaWNrZWQoZXYpOnZvaWR7XG4gICAgICBsZXQga2V5IDpzdHJpbmcgPSBldi5zcmNFbGVtZW50LmlubmVyVGV4dC50cmltKCk7XG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdOb3cnOlxuICAgICAgICAgIGxldCBub3c6YW55ID10aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgICAgICBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0SG91cnModGhpcy5waWNrZXJNb21lbnQsbm93LmdldEhvdXJzKCkpO1xuICAgICAgICAgIG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRNaW51dGVzKG0sbm93LmdldE1pbnV0ZXMoKSk7XG4gICAgICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldE1pbnV0ZXMobSxub3cuZ2V0U2Vjb25kcygpKTtcbiAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RlZChtKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICB2YXIgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldEhvdXJzKHRoaXMucGlja2VyTW9tZW50LCAwKTtcbiAgICAgICAgICBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyhtLCAwKTtcbiAgICAgICAgICBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0U2Vjb25kcyhtLCAwKTtcbiAgICAgICAgICB0aGlzLnRpbWVTZWxlY3RlZChtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnMjQnOlxuICAgICAgICAgIHZhciBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0SG91cnModGhpcy5waWNrZXJNb21lbnQsIDIzKTtcbiAgICAgICAgICBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyhtLCA1OSk7XG4gICAgICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldFNlY29uZHMobSwgNTkpO1xuICAgICAgICAgIHRoaXMudGltZVNlbGVjdGVkKG0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfVxuICAgIHB1YmxpYyBkYXRlU2VsZWN0ZWQoZGF0ZTogVCk6IHZvaWQge1xuICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlU2VsZWN0ZWRJblNpbmdsZU1vZGUoZGF0ZSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHJlc3VsdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHdlIGNsb3NlIHRoZSBwaWNrZXIgd2hlbiByZXN1bHQgaXMgbnVsbCBhbmQgcGlja2VyVHlwZSBpcyBjYWxlbmRhci5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVBpY2tlciQubmV4dChudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5waWNrZXIuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlU2VsZWN0ZWRJblJhbmdlTW9kZShkYXRlKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHJlc3VsdFt0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVTZWxlY3RlZCh0aW1lOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUodGltZSk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlci5kYXRlVGltZUNoZWNrZXIodGhpcy5waWNrZXJNb21lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5waWNrZXIuaXNJblNpbmdsZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdCh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5waWNrZXIuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRzID0gWy4uLnRoaXMucGlja2VyLnNlbGVjdGVkc107XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSAnZnJvbScgaXMgYWZ0ZXIgJ3RvJyBvciAndG8naXMgYmVmb3JlICdmcm9tJ1xuICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBzZXQgYm90aCB0aGUgJ2Zyb20nIGFuZCAndG8nIHRoZSBzYW1lIHZhbHVlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMV0gJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzFdXG4gICAgICAgICAgICAgICAgICAgICkgPT09IDEpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9PT0gMSAmJlxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzBdXG4gICAgICAgICAgICAgICAgICAgICkgPT09IC0xKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzBdID0gdGhpcy5waWNrZXJNb21lbnQ7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzFdID0gdGhpcy5waWNrZXJNb21lbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkc1t0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXhdID0gdGhpcy5waWNrZXJNb21lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChzZWxlY3RlZHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNrIG9uIGNhbmNlbCBidXR0b25cbiAgICAgKi9cbiAgICBwdWJsaWMgb25DYW5jZWxDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNrIG9uIHNldCBidXR0b25cbiAgICAgKi9cbiAgICBwdWJsaWMgb25TZXRDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlci5kYXRlVGltZUNoZWNrZXIodGhpcy5waWNrZXJNb21lbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWQkLm5leHQoZXZlbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNrIG9uIGluZm9ybSByYWRpbyBncm91cFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVDbGlja09uSW5mb0dyb3VwKGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNrIG9uIGluZm9ybSByYWRpbyBncm91cFxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVLZXlkb3duT25JbmZvR3JvdXAoXG4gICAgICAgIGV2ZW50OiBhbnksXG4gICAgICAgIG5leHQ6IGFueSxcbiAgICAgICAgaW5kZXg6IG51bWJlclxuICAgICk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgICAgIG5leHQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXggPT09IDAgPyAxIDogMCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBvZiBhY3RpdmVTZWxlY3RlZEluZGV4XG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyAmJlxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ICE9PSBpbmRleFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1t0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXhdO1xuICAgICAgICAgICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdGVkcyAmJiBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQaWNrZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5waWNrZXIuc3RhcnRBdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcbiAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gdGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nID8gMSA6IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGNhbGVuZGFyIGRhdGUgaW4gc2luZ2xlIG1vZGUsXG4gICAgICogaXQgcmV0dXJucyBudWxsIHdoZW4gZGF0ZSBpcyBub3Qgc2VsZWN0ZWQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBkYXRlU2VsZWN0ZWRJblNpbmdsZU1vZGUoZGF0ZTogVCk6IFQgfCBudWxsIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShkYXRlLCB0aGlzLnBpY2tlci5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlQW5kQ2hlY2tDYWxlbmRhckRhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGRhdGVzIGluIHJhbmdlIE1vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGRhdGVTZWxlY3RlZEluUmFuZ2VNb2RlKGRhdGU6IFQpOiBUW10gfCBudWxsIHtcbiAgICAgICAgbGV0IGZyb20gPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMF07XG4gICAgICAgIGxldCB0byA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1sxXTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGUpO1xuXG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBnaXZlbiBjYWxlbmRhciBkYXkgaXMgYWZ0ZXIgb3IgZXF1YWwgdG8gJ2Zyb20nLFxuICAgICAgICAvLyBzZXQgdGhzIGdpdmVuIGRhdGUgYXMgJ3RvJ1xuICAgICAgICAvLyBvdGhlcndpc2UsIHNldCBpdCBhcyAnZnJvbScgYW5kIHNldCAndG8nIHRvIG51bGxcbiAgICAgICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZScpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3RlZHMgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3RlZHMubGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgIXRvICYmXG4gICAgICAgICAgICAgICAgZnJvbSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhyZXN1bHQsIGZyb20pID49IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRvID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyb20gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgdG8gPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScpIHtcbiAgICAgICAgICAgIGZyb20gPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBmcm9tIHZhbHVlIGlzIGFmdGVyIHRoZSB0byB2YWx1ZSwgc2V0IHRoZSB0byB2YWx1ZSBhcyBudWxsXG4gICAgICAgICAgICBpZiAodG8gJiYgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShmcm9tLCB0bykgPiAwKSB7XG4gICAgICAgICAgICAgICAgdG8gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xuICAgICAgICAgICAgdG8gPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBmcm9tIHZhbHVlIGlzIGFmdGVyIHRoZSB0byB2YWx1ZSwgc2V0IHRoZSBmcm9tIHZhbHVlIGFzIG51bGxcbiAgICAgICAgICAgIGlmIChmcm9tICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZnJvbSwgdG8pID4gMCkge1xuICAgICAgICAgICAgICAgIGZyb20gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtmcm9tLCB0b107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBnaXZlbiBjYWxlbmRhciBkYXRlJ3MgdGltZSBhbmQgY2hlY2sgaWYgaXQgaXMgdmFsaWRcbiAgICAgKiBCZWNhdXNlIHRoZSBjYWxlbmRhciBkYXRlIGhhcyAwMDowMDowMCBhcyBkZWZhdWx0IHRpbWUsIGlmIHRoZSBwaWNrZXIgdHlwZSBpcyAnYm90aCcsXG4gICAgICogd2UgbmVlZCB0byB1cGRhdGUgdGhlIGdpdmVuIGNhbGVuZGFyIGRhdGUncyB0aW1lIGJlZm9yZSBzZWxlY3RpbmcgaXQuXG4gICAgICogaWYgaXQgaXMgdmFsaWQsIHJldHVybiB0aGUgdXBkYXRlZCBkYXRlVGltZVxuICAgICAqIGlmIGl0IGlzIG5vdCB2YWxpZCwgcmV0dXJuIG51bGxcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGU6IFQpOiBUIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAvLyBpZiB0aGUgcGlja2VyIGlzICdib3RoJywgdXBkYXRlIHRoZSBjYWxlbmRhciBkYXRlJ3MgdGltZSB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5waWNrZXIucGlja2VyVHlwZSA9PT0gJ2JvdGgnKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZSksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbGFtcERhdGUoXG4gICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1pbkRhdGVUaW1lLFxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1heERhdGVUaW1lXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUoZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayB0aGUgdXBkYXRlZCBkYXRlVGltZVxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHJlc3VsdCkgPyByZXN1bHQgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRvIHRoZSBwaWNrZXJcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgZm9jdXNQaWNrZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuZm9jdXNBY3RpdmVDZWxsKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgdGhpcy50aW1lci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19