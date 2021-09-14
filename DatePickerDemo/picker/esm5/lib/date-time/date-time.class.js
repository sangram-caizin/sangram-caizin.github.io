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
var nextUniqueId = 0;
/**
 * @abstract
 * @template T
 */
var OwlDateTime = /** @class */ (function () {
    function OwlDateTime(dateTimeAdapter, dateTimeFormats) {
        var _this = this;
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
        function (dateTime) {
            return (!!dateTime &&
                (!_this.dateTimeFilter || _this.dateTimeFilter(dateTime)) &&
                (!_this.minDateTime ||
                    _this.dateTimeAdapter.compare(dateTime, _this.minDateTime) >=
                        0) &&
                (!_this.maxDateTime ||
                    _this.dateTimeAdapter.compare(dateTime, _this.maxDateTime) <= 0));
        });
        if (!this.dateTimeAdapter) {
            throw Error("OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        if (!this.dateTimeFormats) {
            throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        this._id = "owl-dt-picker-" + nextUniqueId++;
    }
    Object.defineProperty(OwlDateTime.prototype, "showSecondsTimer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showSecondsTimer;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._showSecondsTimer = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "hour12Timer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hour12Timer;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._hour12Timer = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "stepHour", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stepHour;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._stepHour = coerceNumberProperty(val, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "stepMinute", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stepMinute;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._stepMinute = coerceNumberProperty(val, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "stepSecond", {
        get: /**
         * @return {?}
         */
        function () {
            return this._stepSecond;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._stepSecond = coerceNumberProperty(val, 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "firstDayOfWeek", {
        get: /**
         * @return {?}
         */
        function () {
            return this._firstDayOfWeek;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceNumberProperty(value, 0);
            if (value > 6 || value < 0) {
                this._firstDayOfWeek = 0;
            }
            else {
                this._firstDayOfWeek = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "hideOtherMonths", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hideOtherMonths;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._hideOtherMonths = coerceBooleanProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "formatString", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerType === 'both'
                ? this.dateTimeFormats.fullPickerInput
                : this.pickerType === 'calendar'
                    ? this.dateTimeFormats.datePickerInput
                    : this.dateTimeFormats.timePickerInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTime.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    OwlDateTime.prototype.getValidDate = /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    };
    /** @nocollapse */
    OwlDateTime.ctorParameters = function () { return [
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
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
    return OwlDateTime;
}());
export { OwlDateTime };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0EsT0FBTyxFQUFnQixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RSxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUN2QixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7O0lBRXRDLFlBQVksR0FBRyxDQUFDOzs7OztBQVFwQjtJQXlLSSxxQkFDMEIsZUFBbUMsRUFHL0MsZUFBbUM7UUFKakQsaUJBdUJDO1FBdEJ5QixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBekt6QyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFhMUIsaUJBQVksR0FBRyxLQUFLLENBQUM7Ozs7UUFjN0IsY0FBUyxHQUFxQyxPQUFPLENBQUM7Ozs7UUFLOUMsY0FBUyxHQUFHLENBQUMsQ0FBQzs7OztRQWFkLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWhCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWhCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDOzs7O1FBa0JwQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7Ozs7UUE0RDFCLG9CQUFlOzs7O1FBQUcsVUFBQyxRQUFXO1lBQ2pDLE9BQU8sQ0FDSCxDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsS0FBSSxDQUFDLGNBQWMsSUFBSSxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDLENBQUMsS0FBSSxD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aUM7Ozs7O0lBVWpDLDBCQUFvQjs7SUErQnBCLG1DQUF1Qzs7SUFFdkMsb0NBQXdDOzs7OztJQWlCeEMsc0NBVUU7Ozs7O0lBT0Usc0NBQXlEOzs7OztJQUN6RCxzQ0FFNkM7Ozs7O0lBakVqRCxpREFBa0M7Ozs7O0lBRWxDLGtEQUFxQzs7Ozs7SUFFckMsdURBQTJEOzs7OztJQUUzRCxvREFBcUM7Ozs7O0lBRXJDLG9EQUFxQzs7Ozs7SUFFckMsbURBQXNDOzs7OztJQUV0QyxnREFBaUM7Ozs7O0lBRWpDLCtDQUErQjs7Ozs7SUFFL0IsbURBQXNDOzs7OztJQUV0QyxtREFBc0M7Ozs7O0lBRXRDLHVEQUF1Qzs7Ozs7SUFFdkMsc0RBQXNDOzs7Ozs7SUFFdEMsbURBQXFDOzs7Ozs7SUFNckMsaUVBQTZDOzs7Ozs7SUFFN0MsbUVBQStDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkYXRlLXRpbWUuY2xhc3NcbiAqL1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gICAgY29lcmNlTnVtYmVyUHJvcGVydHlcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuXG5sZXQgbmV4dFVuaXF1ZUlkID0gMDtcblxuZXhwb3J0IHR5cGUgUGlja2VyVHlwZSA9ICdib3RoJyB8ICdjYWxlbmRhcicgfCAndGltZXInO1xuXG5leHBvcnQgdHlwZSBQaWNrZXJNb2RlID0gJ3BvcHVwJyB8ICdkaWFsb2cnIHwgJ2lubGluZSc7XG5cbmV4cG9ydCB0eXBlIFNlbGVjdE1vZGUgPSAnc2luZ2xlJyB8ICdyYW5nZScgfCAncmFuZ2VGcm9tJyB8ICdyYW5nZVRvJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE93bERhdGVUaW1lPFQ+IHtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHNlY29uZCdzIHRpbWVyXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2hvd1NlY29uZHNUaW1lciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNob3dTZWNvbmRzVGltZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93U2Vjb25kc1RpbWVyO1xuICAgIH1cblxuICAgIHNldCBzaG93U2Vjb25kc1RpbWVyKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93U2Vjb25kc1RpbWVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGltZXIgaXMgaW4gaG91cjEyIGZvcm1hdFxuICAgICAqL1xuICAgIHByaXZhdGUgX2hvdXIxMlRpbWVyID0gZmFsc2U7XG4gICAgQElucHV0KClcbiAgICBnZXQgaG91cjEyVGltZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob3VyMTJUaW1lcjtcbiAgICB9XG5cbiAgICBzZXQgaG91cjEyVGltZXIodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2hvdXIxMlRpbWVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIHZpZXcgdGhhdCB0aGUgY2FsZW5kYXIgc2hvdWxkIHN0YXJ0IGluLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhcnRWaWV3OiAnbW9udGgnIHwgJ3llYXInIHwgJ211bHRpLXllYXJzJyA9ICdtb250aCc7XG5cbiAgICAvKipcbiAgICAgKiBIb3VycyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdGVwSG91ciA9IDE7XG4gICAgQElucHV0KClcbiAgICBnZXQgc3RlcEhvdXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBIb3VyO1xuICAgIH1cblxuICAgIHNldCBzdGVwSG91cih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zdGVwSG91ciA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWludXRlcyB0byBjaGFuZ2UgcGVyIHN0ZXBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zdGVwTWludXRlID0gMTtcbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwTWludXRlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwTWludXRlO1xuICAgIH1cblxuICAgIHNldCBzdGVwTWludXRlKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3N0ZXBNaW51dGUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlY29uZHMgdG8gY2hhbmdlIHBlciBzdGVwXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc3RlcFNlY29uZCA9IDE7XG4gICAgQElucHV0KClcbiAgICBnZXQgc3RlcFNlY29uZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcFNlY29uZDtcbiAgICB9XG5cbiAgICBzZXQgc3RlcFNlY29uZCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zdGVwU2Vjb25kID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGZpcnN0IGRheSBvZiB3ZWVrXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZmlyc3REYXlPZldlZWsgPSAwO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGZpcnN0RGF5T2ZXZWVrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWs7XG4gICAgfVxuXG4gICAgc2V0IGZpcnN0RGF5T2ZXZWVrKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSwgMCk7XG4gICAgICAgIGlmICh2YWx1ZSA+IDYgfHwgdmFsdWUgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBoaWRlIGRhdGVzIGluIG90aGVyIG1vbnRocyBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IG1vbnRoLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2hpZGVPdGhlck1vbnRocyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGhpZGVPdGhlck1vbnRocygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZGVPdGhlck1vbnRocztcbiAgICB9XG5cbiAgICBzZXQgaGlkZU90aGVyTW9udGhzKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9oaWRlT3RoZXJNb250aHMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICAgIGdldCBpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfVxuXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdGVkcygpOiBUW10gfCBudWxsO1xuXG4gICAgYWJzdHJhY3QgZ2V0IGRhdGVUaW1lRmlsdGVyKCk6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbDtcblxuICAgIGFic3RyYWN0IGdldCBtaW5EYXRlVGltZSgpOiBUIHwgbnVsbDtcblxuICAgIGFic3RyYWN0IGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGU7XG5cbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbDtcblxuICAgIGFic3RyYWN0IGdldCBvcGVuZWQoKTogYm9vbGVhbjtcblxuICAgIGFic3RyYWN0IGdldCBwaWNrZXJNb2RlKCk6IFBpY2tlck1vZGU7XG5cbiAgICBhYnN0cmFjdCBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlO1xuXG4gICAgYWJzdHJhY3QgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW47XG5cbiAgICBhYnN0cmFjdCBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuO1xuXG4gICAgYWJzdHJhY3Qgc2VsZWN0KGRhdGU6IFQgfCBUW10pOiB2b2lkO1xuXG4gICAgYWJzdHJhY3QgeWVhclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8VD47XG5cbiAgICBhYnN0cmFjdCBtb250aFNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8VD47XG5cbiAgICBhYnN0cmFjdCBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZDtcblxuICAgIGFic3RyYWN0IHNlbGVjdE1vbnRoKG5vcm1hbGl6ZWRNb250aDogVCk6IHZvaWQ7XG5cbiAgICBnZXQgZm9ybWF0U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlclR5cGUgPT09ICdib3RoJ1xuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lRm9ybWF0cy5mdWxsUGlja2VySW5wdXRcbiAgICAgICAgICAgIDogdGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInXG4gICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlUGlja2VySW5wdXRcbiAgICAgICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnRpbWVQaWNrZXJJbnB1dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEYXRlIFRpbWUgQ2hlY2tlciB0byBjaGVjayBpZiB0aGUgZ2l2ZSBkYXRlVGltZSBpcyBzZWxlY3RhYmxlXG4gICAgICovXG4gICAgcHVibGljIGRhdGVUaW1lQ2hlY2tlciA9IChkYXRlVGltZTogVCkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgISFkYXRlVGltZSAmJlxuICAgICAgICAgICAgKCF0aGlzLmRhdGVUaW1lRmlsdGVyIHx8IHRoaXMuZGF0ZVRpbWVGaWx0ZXIoZGF0ZVRpbWUpKSAmJlxuICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGVUaW1lIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlVGltZSwgdGhpcy5taW5EYXRlVGltZSkgPj1cbiAgICAgICAgICAgICAgICAgICAgMCkgJiZcbiAgICAgICAgICAgICghdGhpcy5tYXhEYXRlVGltZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZVRpbWUsIHRoaXMubWF4RGF0ZVRpbWUpIDw9IDApXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcm90ZWN0ZWQgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlcikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZVRpbWVBZGFwdGVyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUZvcm1hdHMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIE9XTF9EQVRFX1RJTUVfRk9STUFUUy4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlLCBPd2xNb21lbnREYXRlVGltZU1vZHVsZSwgb3IgcHJvdmlkZSBhIGAgK1xuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pZCA9IGBvd2wtZHQtcGlja2VyLSR7bmV4dFVuaXF1ZUlkKyt9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXG4gICAgICAgICAgICA/IG9ialxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==