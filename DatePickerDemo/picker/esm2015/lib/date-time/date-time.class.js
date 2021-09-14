/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time.class.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time.class
 */
import { Inject, Input, Optional } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
/** @type {?} */
let nextUniqueId = 0;
/**
 * @abstract
 * @template T
 */
export class OwlDateTime {
    /**
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(dateTimeAdapter, dateTimeFormats) {
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to show the second's timer
         */
        this._showSecondsTimer = false;
        /**
         * Whether the timer is in hour12 format
         */
        this._hour12Timer = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Hours to change per step
         */
        this._stepHour = 1;
        /**
         * Minutes to change per step
         */
        this._stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this._stepSecond = 1;
        /**
         * Set the first day of week
         */
        this._firstDayOfWeek = 0;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this._hideOtherMonths = false;
        /**
         * Date Time Checker to check if the give dateTime is selectable
         */
        this.dateTimeChecker = (/**
         * @param {?} dateTime
         * @return {?}
         */
        (dateTime) => {
            return (!!dateTime &&
                (!this.dateTimeFilter || this.dateTimeFilter(dateTime)) &&
                (!this.minDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.minDateTime) >=
                        0) &&
                (!this.maxDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.maxDateTime) <= 0));
        });
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this._id = `owl-dt-picker-${nextUniqueId++}`;
    }
    /**
     * @return {?}
     */
    get showSecondsTimer() {
        return this._showSecondsTimer;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set showSecondsTimer(val) {
        this._showSecondsTimer = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get hour12Timer() {
        return this._hour12Timer;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hour12Timer(val) {
        this._hour12Timer = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get stepHour() {
        return this._stepHour;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepHour(val) {
        this._stepHour = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get stepMinute() {
        return this._stepMinute;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepMinute(val) {
        this._stepMinute = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get stepSecond() {
        return this._stepSecond;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepSecond(val) {
        this._stepSecond = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set firstDayOfWeek(value) {
        value = coerceNumberProperty(value, 0);
        if (value > 6 || value < 0) {
            this._firstDayOfWeek = 0;
        }
        else {
            this._firstDayOfWeek = value;
        }
    }
    /**
     * @return {?}
     */
    get hideOtherMonths() {
        return this._hideOtherMonths;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hideOtherMonths(val) {
        this._hideOtherMonths = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @return {?}
     */
    get formatString() {
        return this.pickerType === 'both'
            ? this.dateTimeFormats.fullPickerInput
            : this.pickerType === 'calendar'
                ? this.dateTimeFormats.datePickerInput
                : this.dateTimeFormats.timePickerInput;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return false;
    }
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
/** @nocollapse */
OwlDateTime.ctorParameters = () => [
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlDateTime.propDecorators = {
    showSecondsTimer: [{ type: Input }],
    hour12Timer: [{ type: Input }],
    startView: [{ type: Input }],
    stepHour: [{ type: Input }],
    stepMinute: [{ type: Input }],
    stepSecond: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    hideOtherMonths: [{ type: Input }]
};
if (false) {
    /**
     * Whether to show the second's timer
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._showSecondsTimer;
    /**
     * Whether the timer is in hour12 format
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._hour12Timer;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    OwlDateTime.prototype.startView;
    /**
     * Hours to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepHour;
    /**
     * Minutes to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepMinute;
    /**
     * Seconds to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepSecond;
    /**
     * Set the first day of week
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._firstDayOfWeek;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._hideOtherMonths;
    /**
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._id;
    /** @type {?} */
    OwlDateTime.prototype.yearSelected;
    /** @type {?} */
    OwlDateTime.prototype.monthSelected;
    /**
     * Date Time Checker to check if the give dateTime is selectable
     * @type {?}
     */
    OwlDateTime.prototype.dateTimeChecker;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTime.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTime.prototype.dateTimeFormats;
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selected = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selecteds = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.dateTimeFilter = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.maxDateTime = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.minDateTime = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selectMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.startAt = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.opened = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.pickerMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.pickerType = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.isInSingleMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.isInRangeMode = function () { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    OwlDateTime.prototype.select = function (date) { };
    /**
     * @abstract
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTime.prototype.selectYear = function (normalizedYear) { };
    /**
     * @abstract
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlDateTime.prototype.selectMonth = function (normalizedMonth) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFnQixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUN2QixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7O0lBRXRDLFlBQVksR0FBRyxDQUFDOzs7OztBQVFwQixNQUFNLE9BQWdCLFdBQVc7Ozs7O0lBeUs3QixZQUMwQixlQUFtQyxFQUcvQyxlQUFtQztRQUh2QixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBekt6QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFhMUIsaUJBQVksR0FBRyxLQUFLLENBQUM7Ozs7UUFjN0IsY0FBUyxHQUFxQyxPQUFPLENBQUM7Ozs7UUFLOUMsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQWFkLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWhCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWhCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDOzs7O1FBa0JwQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7Ozs7UUE0RDFCLG9CQUFlOzs7O1FBQUcsQ0FBQyxRQUFXLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQ0gsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXO29CQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO3dCQUNwRCxDQUFDLENBQUM7Z0JBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXO29CQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3JFLENBQUM7UUFDTixDQUFDLEVBQUM7UUFZRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN2QixNQUFNLEtBQUssQ0FDUCxpR0FBaUc7Z0JBQzdGLG1HQUFtRztnQkFDbkcsd0JBQXdCLENBQy9CLENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLE1BQU0sS0FBSyxDQUNQLHVHQUF1RztnQkFDbkcsbUdBQW1HO2dCQUNuRyx3QkFBd0IsQ0FDL0IsQ0FBQztTQUNMO1FBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUNqRCxDQUFDOzs7O0lBM0xELElBQ0ksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFZO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7O0lBTUQsSUFDSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsSUFBSSxXQUFXLENBQUMsR0FBWTtRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFZRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxHQUFXO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFNRCxJQUNJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFVBQVUsQ0FBQyxHQUFXO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7SUFNRCxJQUNJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFVBQVUsQ0FBQyxHQUFXO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7SUFNRCxJQUNJLGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxJQUFJLGNBQWMsQ0FBQyxLQUFhO1FBQzVCLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQzs7OztJQU1ELElBQ0ksZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsSUFBSSxlQUFlLENBQUMsR0FBWTtRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OztJQUdELElBQUksRUFBRTtRQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDOzs7O0lBb0NELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNO1lBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWU7WUFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVTtnQkFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZTtnQkFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDO0lBQ25ELENBQUM7Ozs7SUFpQkQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBMkJTLFlBQVksQ0FBQyxHQUFRO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNqQyxDQUFDLENBQUMsR0FBRztZQUNMLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDZixDQUFDOzs7O1lBck5JLGVBQWUsdUJBd0xmLFFBQVE7NENBQ1IsUUFBUSxZQUNSLE1BQU0sU0FBQyxxQkFBcUI7OzsrQkF2S2hDLEtBQUs7MEJBYUwsS0FBSzt3QkFZTCxLQUFLO3VCQU9MLEtBQUs7eUJBYUwsS0FBSzt5QkFhTCxLQUFLOzZCQWFMLEtBQUs7OEJBa0JMLEtBQUs7Ozs7Ozs7O0lBMUZOLHdDQUFrQzs7Ozs7O0lBYWxDLG1DQUE2Qjs7Ozs7SUFhN0IsZ0NBQ3NEOzs7Ozs7SUFLdEQsZ0NBQXNCOzs7Ozs7SUFhdEIsa0NBQXdCOzs7Ozs7SUFheEIsa0NBQXdCOzs7Ozs7SUFheEIsc0NBQTRCOzs7Ozs7SUFrQjVCLHVDQUFpQzs7Ozs7SUFVakMsMEJBQW9COztJQStCcEIsbUNBQXVDOztJQUV2QyxvQ0FBd0M7Ozs7O0lBaUJ4QyxzQ0FVRTs7Ozs7SUFPRSxzQ0FBeUQ7Ozs7O0lBQ3pELHNDQUU2Qzs7Ozs7SUFqRWpELGlEQUFrQzs7Ozs7SUFFbEMsa0RBQXFDOzs7OztJQUVyQyx1REFBMkQ7Ozs7O0lBRTNELG9EQUFxQzs7Ozs7SUFFckMsb0RBQXFDOzs7OztJQUVyQyxtREFBc0M7Ozs7O0lBRXRDLGdEQUFpQzs7Ozs7SUFFakMsK0NBQStCOzs7OztJQUUvQixtREFBc0M7Ozs7O0lBRXRDLG1EQUFzQzs7Ozs7SUFFdEMsdURBQXVDOzs7OztJQUV2QyxzREFBc0M7Ozs7OztJQUV0QyxtREFBcUM7Ozs7OztJQU1yQyxpRUFBNkM7Ozs7OztJQUU3QyxtRUFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS5jbGFzc1xuICovXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgICBjb2VyY2VOdW1iZXJQcm9wZXJ0eVxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5leHBvcnQgdHlwZSBQaWNrZXJUeXBlID0gJ2JvdGgnIHwgJ2NhbGVuZGFyJyB8ICd0aW1lcic7XG5cbmV4cG9ydCB0eXBlIFBpY2tlck1vZGUgPSAncG9wdXAnIHwgJ2RpYWxvZycgfCAnaW5saW5lJztcblxuZXhwb3J0IHR5cGUgU2VsZWN0TW9kZSA9ICdzaW5nbGUnIHwgJ3JhbmdlJyB8ICdyYW5nZUZyb20nIHwgJ3JhbmdlVG8nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3dsRGF0ZVRpbWU8VD4ge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgc2Vjb25kJ3MgdGltZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaG93U2Vjb25kc1RpbWVyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgc2hvd1NlY29uZHNUaW1lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dTZWNvbmRzVGltZXI7XG4gICAgfVxuXG4gICAgc2V0IHNob3dTZWNvbmRzVGltZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dTZWNvbmRzVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0aW1lciBpcyBpbiBob3VyMTIgZm9ybWF0XG4gICAgICovXG4gICAgcHJpdmF0ZSBfaG91cjEyVGltZXIgPSBmYWxzZTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBob3VyMTJUaW1lcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvdXIxMlRpbWVyO1xuICAgIH1cblxuICAgIHNldCBob3VyMTJUaW1lcih2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faG91cjEyVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnID0gJ21vbnRoJztcblxuICAgIC8qKlxuICAgICAqIEhvdXJzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBIb3VyID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwSG91cigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcEhvdXI7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBIb3VyKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBIb3VyID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNaW51dGVzIHRvIGNoYW5nZSBwZXIgc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgX3N0ZXBNaW51dGUgPSAxO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXBNaW51dGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBNaW51dGU7XG4gICAgfVxuXG4gICAgc2V0IHN0ZXBNaW51dGUodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RlcE1pbnV0ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Vjb25kcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdGVwU2Vjb25kID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwU2Vjb25kKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwU2Vjb25kO1xuICAgIH1cblxuICAgIHNldCBzdGVwU2Vjb25kKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBTZWNvbmQgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcbiAgICAgKi9cbiAgICBwcml2YXRlIF9maXJzdERheU9mV2VlayA9IDA7XG4gICAgQElucHV0KClcbiAgICBnZXQgZmlyc3REYXlPZldlZWsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBzZXQgZmlyc3REYXlPZldlZWsodmFsdWU6IG51bWJlcikge1xuICAgICAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCAwKTtcbiAgICAgICAgaWYgKHZhbHVlID4gNiB8fCB2YWx1ZSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaGlkZU90aGVyTW9udGhzID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgaGlkZU90aGVyTW9udGhzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faGlkZU90aGVyTW9udGhzO1xuICAgIH1cblxuICAgIHNldCBoaWRlT3RoZXJNb250aHModmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hpZGVPdGhlck1vbnRocyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gICAgZ2V0IGlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB8IG51bGw7XG5cbiAgICBhYnN0cmFjdCBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZTtcblxuICAgIGFic3RyYWN0IGdldCBzdGFydEF0KCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IG9wZW5lZCgpOiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZTtcblxuICAgIGFic3RyYWN0IGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGU7XG5cbiAgICBhYnN0cmFjdCBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBzZWxlY3QoZGF0ZTogVCB8IFRbXSk6IHZvaWQ7XG5cbiAgICBhYnN0cmFjdCB5ZWFyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICAgIGFic3RyYWN0IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcblxuICAgIGFic3RyYWN0IHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZDtcblxuICAgIGdldCBmb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyVHlwZSA9PT0gJ2JvdGgnXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmZ1bGxQaWNrZXJJbnB1dFxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcidcbiAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRhdGVQaWNrZXJJbnB1dFxuICAgICAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUZvcm1hdHMudGltZVBpY2tlcklucHV0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERhdGUgVGltZSBDaGVja2VyIHRvIGNoZWNrIGlmIHRoZSBnaXZlIGRhdGVUaW1lIGlzIHNlbGVjdGFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0ZVRpbWVDaGVja2VyID0gKGRhdGVUaW1lOiBUKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAhIWRhdGVUaW1lICYmXG4gICAgICAgICAgICAoIXRoaXMuZGF0ZVRpbWVGaWx0ZXIgfHwgdGhpcy5kYXRlVGltZUZpbHRlcihkYXRlVGltZSkpICYmXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZVRpbWUgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGVUaW1lLCB0aGlzLm1pbkRhdGVUaW1lKSA+PVxuICAgICAgICAgICAgICAgICAgICAwKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGVUaW1lIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlVGltZSwgdGhpcy5tYXhEYXRlVGltZSkgPD0gMClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcbiAgICAgICAgQE9wdGlvbmFsKClcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xuICAgICkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlVGltZUFkYXB0ZXIuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lRm9ybWF0cykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgT1dMX0RBVEVfVElNRV9GT1JNQVRTLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lkID0gYG93bC1kdC1waWNrZXItJHtuZXh0VW5pcXVlSWQrK31gO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcbiAgICAgICAgICAgID8gb2JqXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxufVxuIl19