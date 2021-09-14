/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/timer.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Optional, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { take } from 'rxjs/operators';
/**
 * @template T
 */
var OwlTimerComponent = /** @class */ (function () {
    function OwlTimerComponent(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
        this.ngZone = ngZone;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.isPM = false; // a flag indicates the current timer moment is in PM or AM
        /**
         * Hours to change per step
         */
        this.stepHour = 1;
        /**
         * Minutes to change per step
         */
        this.stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this.stepSecond = 1;
        this.selectedChange = new EventEmitter();
    }
    Object.defineProperty(OwlTimerComponent.prototype, "pickerMoment", {
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
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "minDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDateTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._minDateTime = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "maxDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDateTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._maxDateTime = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hourValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getHours(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hourBoxValue", {
        /**
         * The value would be displayed in hourBox.
         * We need this because the value displayed in hourBox it not
         * the same as the hourValue when the timer is in hour12Timer mode.
         * */
        get: /**
         * The value would be displayed in hourBox.
         * We need this because the value displayed in hourBox it not
         * the same as the hourValue when the timer is in hour12Timer mode.
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hours = this.hourValue;
            if (!this.hour12Timer) {
                return hours;
            }
            else {
                if (hours === 0) {
                    hours = 12;
                    this.isPM = false;
                }
                else if (hours > 0 && hours < 12) {
                    this.isPM = false;
                }
                else if (hours === 12) {
                    this.isPM = true;
                }
                else if (hours > 12 && hours < 24) {
                    hours = hours - 12;
                    this.isPM = true;
                }
                return hours;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "minuteValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getMinutes(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "secondValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getSeconds(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upHourButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upHourLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downHourButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downHourLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upMinuteButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upMinuteLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downMinuteButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downMinuteLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upSecondButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upSecondLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downSecondButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downSecondLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hour12ButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isPM
                ? this.pickerIntl.hour12PMLabel
                : this.pickerIntl.hour12AMLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimeTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlTimerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Focus to the host element
     * */
    /**
     * Focus to the host element
     *
     * @return {?}
     */
    OwlTimerComponent.prototype.focus = /**
     * Focus to the host element
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.elmRef.nativeElement.focus();
            }));
        }));
    };
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * */
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     *
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.setHourValueViaInput = /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     *
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        }
        else if (this.hour12Timer && !this.isPM && hours === 12) {
            hours = 0;
        }
        this.setHourValue(hours);
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.setHourValue = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        console.log(hours);
        /** @type {?} */
        var m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} minutes
     * @return {?}
     */
    OwlTimerComponent.prototype.setMinuteValue = /**
     * @param {?} minutes
     * @return {?}
     */
    function (minutes) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    OwlTimerComponent.prototype.setSecondValue = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.set00 = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setHours(this.pickerMoment, 0);
        m = this.dateTimeAdapter.setMinutes(m, 0);
        m = this.dateTimeAdapter.setSeconds(m, 0);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.set24 = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setHours(this.pickerMoment, 23);
        m = this.dateTimeAdapter.setMinutes(m, 59);
        m = this.dateTimeAdapter.setSeconds(m, 59);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlTimerComponent.prototype.setMeridiem = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isPM = !this.isPM;
        /** @type {?} */
        var hours = this.hourValue;
        if (this.isPM) {
            hours = hours + 12;
        }
        else {
            hours = hours - 12;
        }
        if (hours >= 0 && hours <= 23) {
            this.setHourValue(hours);
        }
        this.cdRef.markForCheck();
        event.preventDefault();
    };
    /**
     * Check if the up hour button is enabled
     */
    /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upHourEnabled = /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareHours(this.stepHour, this.maxDateTime) < 1);
    };
    /**
     * Check if the down hour button is enabled
     */
    /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downHourEnabled = /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareHours(-this.stepHour, this.minDateTime) > -1);
    };
    /**
     * Check if the up minute button is enabled
     */
    /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upMinuteEnabled = /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareMinutes(this.stepMinute, this.maxDateTime) < 1);
    };
    /**
     * Check if the down minute button is enabled
     */
    /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downMinuteEnabled = /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareMinutes(-this.stepMinute, this.minDateTime) > -1);
    };
    /**
     * Check if the up second button is enabled
     */
    /**
     * Check if the up second button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upSecondEnabled = /**
     * Check if the up second button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareSeconds(this.stepSecond, this.maxDateTime) < 1);
    };
    /**
     * Check if the down second button is enabled
     */
    /**
     * Check if the down second button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downSecondEnabled = /**
     * Check if the down second button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareSeconds(-this.stepSecond, this.minDateTime) > -1);
    };
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareHours = /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareMinutes = /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareSeconds = /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        return this.dateTimeAdapter.compare(result, comparedDate);
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
    OwlTimerComponent.prototype.getValidDate = /**
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
    OwlTimerComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeTimer',
                    selector: 'owl-date-time-timer',
                    template: "<owl-date-time-timer-box\n        [upBtnAriaLabel]=\"upHourButtonLabel\"\n        [downBtnAriaLabel]=\"downHourButtonLabel\"\n        [upBtnDisabled]=\"!upHourEnabled()\"\n        [downBtnDisabled]=\"!downHourEnabled()\"\n        [boxValue]=\"hourBoxValue\"\n        [value]=\"hourValue\" [min]=\"0\" [max]=\"23\"\n        [step]=\"stepHour\" [inputLabel]=\"'Hour'\"\n        (inputChange)=\"setHourValueViaInput($event)\"\n        (valueChange)=\"setHourValue($event)\"></owl-date-time-timer-box>\n<owl-date-time-timer-box\n        [showDivider]=\"true\"\n        [upBtnAriaLabel]=\"upMinuteButtonLabel\"\n        [downBtnAriaLabel]=\"downMinuteButtonLabel\"\n        [upBtnDisabled]=\"!upMinuteEnabled()\"\n        [downBtnDisabled]=\"!downMinuteEnabled()\"\n        [value]=\"minuteValue\" [min]=\"0\" [max]=\"59\"\n        [step]=\"stepMinute\" [inputLabel]=\"'Minute'\"\n        (inputChange)=\"setMinuteValue($event)\"\n        (valueChange)=\"setMinuteValue($event)\"></owl-date-time-timer-box>\n<owl-date-time-timer-box\n        *ngIf=\"showSecondsTimer\"\n        [showDivider]=\"true\"\n        [upBtnAriaLabel]=\"upSecondButtonLabel\"\n        [downBtnAriaLabel]=\"downSecondButtonLabel\"\n        [upBtnDisabled]=\"!upSecondEnabled()\"\n        [downBtnDisabled]=\"!downSecondEnabled()\"\n        [value]=\"secondValue\" [min]=\"0\" [max]=\"59\"\n        [step]=\"stepSecond\" [inputLabel]=\"'Second'\"\n        (inputChange)=\"setSecondValue($event)\"\n        (valueChange)=\"setSecondValue($event)\"></owl-date-time-timer-box>\n\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\n    <button class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\n            type=\"button\" tabindex=\"0\"\n            (click)=\"setMeridiem($event)\">\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n            {{hour12ButtonLabel}}\n        </span>\n    </button>\n</div>\n",
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.owl-dt-timer]': 'owlDTTimerClass',
                        '[attr.tabindex]': 'owlDTTimeTabIndex'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlTimerComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlTimerComponent.propDecorators = {
        pickerMoment: [{ type: Input }],
        minDateTime: [{ type: Input }],
        maxDateTime: [{ type: Input }],
        showSecondsTimer: [{ type: Input }],
        hour12Timer: [{ type: Input }],
        stepHour: [{ type: Input }],
        stepMinute: [{ type: Input }],
        stepSecond: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return OwlTimerComponent;
}());
export { OwlTimerComponent };
if (false) {
    /**
     * The current picker moment
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._pickerMoment;
    /**
     * The minimum selectable date time.
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._minDateTime;
    /**
     * The maximum selectable date time.
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._maxDateTime;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.isPM;
    /**
     * Whether to show the second's timer
     * @type {?}
     */
    OwlTimerComponent.prototype.showSecondsTimer;
    /**
     * Whether the timer is in hour12 format
     * @type {?}
     */
    OwlTimerComponent.prototype.hour12Timer;
    /**
     * Hours to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepHour;
    /**
     * Minutes to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepMinute;
    /**
     * Seconds to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepSecond;
    /** @type {?} */
    OwlTimerComponent.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvdGltZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRXRDO0lBa0tJLDJCQUNZLE1BQWMsRUFDZCxNQUFrQixFQUNsQixVQUEyQixFQUMzQixLQUF3QixFQUNaLGVBQW1DO1FBSi9DLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBckhuRCxTQUFJLEdBQVksS0FBSyxDQUFDLENBQUMsMkRBQTJEOzs7O1FBa0IxRixhQUFRLEdBQUcsQ0FBQyxDQUFDOzs7O1FBTWIsZUFBVSxHQUFHLENBQUMsQ0FBQzs7OztRQU1mLGVBQVUsR0FBRyxDQUFDLENBQUM7UUF3RWYsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO0lBa0J2QyxDQUFDO0lBM0pELHNCQUNJLDJDQUFZOzs7O1FBRGhCO1lBRUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7Ozs7O1FBRUQsVUFBaUIsS0FBUTtZQUNyQixLQUFLLEdBQUcsSUFBSSxD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O2dCQVFMLGVBQWU7Z0JBVnBCLGlCQUFpQjtnQkFXWixlQUFlLHVCQTBLZixRQUFROzs7K0JBeEpaLEtBQUs7OEJBYUwsS0FBSzs4QkFZTCxLQUFLO21DQWVMLEtBQUs7OEJBTUwsS0FBSzsyQkFNTCxLQUFLOzZCQU1MLEtBQUs7NkJBTUwsS0FBSztpQ0F3RUwsTUFBTTs7SUFzTlgsd0JBQUM7Q0FBQSxBQTdXRCxJQTZXQztTQWpXWSxpQkFBaUI7Ozs7Ozs7SUFFMUIsMENBQXlCOzs7Ozs7SUFhekIseUNBQStCOzs7Ozs7SUFZL0IseUNBQStCOzs7OztJQVcvQixpQ0FBOEI7Ozs7O0lBSzlCLDZDQUMwQjs7Ozs7SUFLMUIsd0NBQ3FCOzs7OztJQUtyQixxQ0FDYTs7Ozs7SUFLYix1Q0FDZTs7Ozs7SUFLZix1Q0FDZTs7SUF1RWYsMkNBQ3VDOzs7OztJQVduQyxtQ0FBc0I7Ozs7O0lBQ3RCLG1DQUEwQjs7Ozs7SUFDMUIsdUNBQW1DOzs7OztJQUNuQyxrQ0FBZ0M7Ozs7O0lBQ2hDLDRDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGltZXIuY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgTmdab25lLFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lVGltZXInLFxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS10aW1lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lci5jb21wb25lbnQuc2NzcyddLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtdGltZXJdJzogJ293bERUVGltZXJDbGFzcycsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnb3dsRFRUaW1lVGFiSW5kZXgnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPd2xUaW1lckNvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyoqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQgKi9cbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XG4gICAgQElucHV0KClcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9tZW50O1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZSB0aW1lLiAqL1xuICAgIHByaXZhdGUgX21pbkRhdGVUaW1lOiBUIHwgbnVsbDtcbiAgICBASW5wdXQoKVxuICAgIGdldCBtaW5EYXRlVGltZSgpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlVGltZTtcbiAgICB9XG5cbiAgICBzZXQgbWluRGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgICAgICB0aGlzLl9taW5EYXRlVGltZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXG4gICAgcHJpdmF0ZSBfbWF4RGF0ZVRpbWU6IFQgfCBudWxsO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGVUaW1lO1xuICAgIH1cblxuICAgIHNldCBtYXhEYXRlVGltZSh2YWx1ZTogVCB8IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX21heERhdGVUaW1lID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNQTTogYm9vbGVhbiA9IGZhbHNlOyAvLyBhIGZsYWcgaW5kaWNhdGVzIHRoZSBjdXJyZW50IHRpbWVyIG1vbWVudCBpcyBpbiBQTSBvciBBTVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBzZWNvbmQncyB0aW1lclxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2hvd1NlY29uZHNUaW1lcjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBmb3JtYXRcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGhvdXIxMlRpbWVyOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSG91cnMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGVwSG91ciA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBNaW51dGVzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcE1pbnV0ZSA9IDE7XG5cbiAgICAvKipcbiAgICAgKiBTZWNvbmRzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RlcFNlY29uZCA9IDE7XG5cbiAgICBnZXQgaG91clZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiBob3VyQm94LlxuICAgICAqIFdlIG5lZWQgdGhpcyBiZWNhdXNlIHRoZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gaG91ckJveCBpdCBub3RcbiAgICAgKiB0aGUgc2FtZSBhcyB0aGUgaG91clZhbHVlIHdoZW4gdGhlIHRpbWVyIGlzIGluIGhvdXIxMlRpbWVyIG1vZGUuXG4gICAgICogKi9cbiAgICBnZXQgaG91ckJveFZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xuXG4gICAgICAgIGlmICghdGhpcy5ob3VyMTJUaW1lcikge1xuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGhvdXJzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaG91cnMgPSAxMjtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAwICYmIGhvdXJzIDwgMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPiAxMiAmJiBob3VycyA8IDI0KSB7XG4gICAgICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQTSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBob3VycztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBtaW51dGVWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlY29uZFZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KTtcbiAgICB9XG5cbiAgICBnZXQgdXBIb3VyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC51cEhvdXJMYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgZG93bkhvdXJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmRvd25Ib3VyTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IHVwTWludXRlQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC51cE1pbnV0ZUxhYmVsO1xuICAgIH1cblxuICAgIGdldCBkb3duTWludXRlQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5kb3duTWludXRlTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IHVwU2Vjb25kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC51cFNlY29uZExhYmVsO1xuICAgIH1cblxuICAgIGdldCBkb3duU2Vjb25kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5kb3duU2Vjb25kTGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IGhvdXIxMkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUE1cbiAgICAgICAgICAgID8gdGhpcy5waWNrZXJJbnRsLmhvdXIxMlBNTGFiZWxcbiAgICAgICAgICAgIDogdGhpcy5waWNrZXJJbnRsLmhvdXIxMkFNTGFiZWw7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpXG4gICAgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICBnZXQgb3dsRFRUaW1lckNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgb3dsRFRUaW1lVGFiSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIGVsbVJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+XG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxuXG4gICAgLyoqXG4gICAgICogRm9jdXMgdG8gdGhlIGhvc3QgZWxlbWVudFxuICAgICAqICovXG4gICAgcHVibGljIGZvY3VzKCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBob3VyIHZhbHVlIHZpYSB0eXBpbmcgaW50byB0aW1lciBib3ggaW5wdXRcbiAgICAgKiBXZSBuZWVkIHRoaXMgdG8gaGFuZGxlIHRoZSBob3VyIHZhbHVlIHdoZW4gdGhlIHRpbWVyIGlzIGluIGhvdXIxMiBtb2RlXG4gICAgICogKi9cbiAgICBwdWJsaWMgc2V0SG91clZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5ob3VyMTJUaW1lciAmJiB0aGlzLmlzUE0gJiYgaG91cnMgPj0gMSAmJiBob3VycyA8PSAxMSkge1xuICAgICAgICAgICAgaG91cnMgPSBob3VycyArIDEyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaG91cjEyVGltZXIgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXJzID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEhvdXJWYWx1ZShob3Vycyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhvdXJWYWx1ZShob3VyczogbnVtYmVyKTogdm9pZCB7XG4gICAgICBjb25zb2xlLmxvZyhob3Vycyk7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgaG91cnMpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQobSk7XG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZVZhbHVlKG1pbnV0ZXM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCwgbWludXRlcyk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChtKTtcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2Vjb25kVmFsdWUoc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50LCBzZWNvbmRzKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG0pO1xuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQwMChob3VyczogbnVtYmVyKTogdm9pZCB7XG4gICAgICB2YXIgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldEhvdXJzKHRoaXMucGlja2VyTW9tZW50LCAwKTtcbiAgICAgIG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRNaW51dGVzKG0sIDApO1xuICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldFNlY29uZHMobSwgMCk7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQobSk7XG4gICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0MjQoaG91cnM6IG51bWJlcik6IHZvaWQge1xuICAgICAgdmFyIG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgMjMpO1xuICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldE1pbnV0ZXMobSwgNTkpO1xuICAgICAgbSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldFNlY29uZHMobSwgNTkpO1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG0pO1xuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgcHVibGljIHNldE1lcmlkaWVtKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1BNID0gIXRoaXMuaXNQTTtcblxuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNQTSkge1xuICAgICAgICAgICAgaG91cnMgPSBob3VycyArIDEyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdXJzID49IDAgJiYgaG91cnMgPD0gMjMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SG91clZhbHVlKGhvdXJzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHVwIGhvdXIgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBIb3VyRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1heERhdGVUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVIb3Vycyh0aGlzLnN0ZXBIb3VyLCB0aGlzLm1heERhdGVUaW1lKSA8IDFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZG93biBob3VyIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICovXG4gICAgcHVibGljIGRvd25Ib3VyRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1pbkRhdGVUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVIb3VycygtdGhpcy5zdGVwSG91ciwgdGhpcy5taW5EYXRlVGltZSkgPiAtMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSB1cCBtaW51dGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBNaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMubWF4RGF0ZVRpbWUgfHxcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZU1pbnV0ZXModGhpcy5zdGVwTWludXRlLCB0aGlzLm1heERhdGVUaW1lKSA8IDFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZG93biBtaW51dGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZG93bk1pbnV0ZUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlVGltZSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wYXJlTWludXRlcygtdGhpcy5zdGVwTWludXRlLCB0aGlzLm1pbkRhdGVUaW1lKSA+IC0xXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIHVwIHNlY29uZCBidXR0b24gaXMgZW5hYmxlZFxuICAgICAqL1xuICAgIHB1YmxpYyB1cFNlY29uZEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhdGhpcy5tYXhEYXRlVGltZSB8fFxuICAgICAgICAgICAgdGhpcy5jb21wYXJlU2Vjb25kcyh0aGlzLnN0ZXBTZWNvbmQsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBkb3duIHNlY29uZCBidXR0b24gaXMgZW5hYmxlZFxuICAgICAqL1xuICAgIHB1YmxpYyBkb3duU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICF0aGlzLm1pbkRhdGVUaW1lIHx8XG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVTZWNvbmRzKC10aGlzLnN0ZXBTZWNvbmQsIHRoaXMubWluRGF0ZVRpbWUpID4gLTFcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQaWNrZXJNb21lbnQncyBob3VyIHZhbHVlICsvLSBjZXJ0YWluIGFtb3VudCBhbmQgY29tcGFyZSBpdCB0byB0aGUgZ2l2ZSBkYXRlXG4gICAgICogMSBpcyBhZnRlciB0aGUgY29tcGFyZWREYXRlXG4gICAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAwIGlzIGVxdWFsIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAqL1xuICAgIHByaXZhdGUgY29tcGFyZUhvdXJzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBob3VycyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSArIGFtb3VudDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0SG91cnModGhpcy5waWNrZXJNb21lbnQsIGhvdXJzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUocmVzdWx0LCBjb21wYXJlZERhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBpY2tlck1vbWVudCdzIG1pbnV0ZSB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxuICAgICAqIDEgaXMgYWZ0ZXIgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqIC0xIGlzIGJlZm9yZSB0aGUgY29tcGFyZWREYXRlXG4gICAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXG4gICAgICogKi9cbiAgICBwcml2YXRlIGNvbXBhcmVNaW51dGVzKGFtb3VudDogbnVtYmVyLCBjb21wYXJlZERhdGU6IFQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBtaW51dGVzID1cbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpICsgYW1vdW50O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRNaW51dGVzKFxuICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXG4gICAgICAgICAgICBtaW51dGVzXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHJlc3VsdCwgY29tcGFyZWREYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQaWNrZXJNb21lbnQncyBzZWNvbmQgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcbiAgICAgKiAxIGlzIGFmdGVyIHRoZSBjb21wYXJlZERhdGVcbiAgICAgKiAtMSBpcyBiZWZvcmUgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxuICAgICAqICovXG4gICAgcHJpdmF0ZSBjb21wYXJlU2Vjb25kcyhhbW91bnQ6IG51bWJlciwgY29tcGFyZWREYXRlOiBUKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9XG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KSArIGFtb3VudDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0U2Vjb25kcyhcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxuICAgICAgICAgICAgc2Vjb25kc1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShyZXN1bHQsIGNvbXBhcmVkRGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxuICAgICAgICAgICAgPyBvYmpcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG59XG4iXX0=