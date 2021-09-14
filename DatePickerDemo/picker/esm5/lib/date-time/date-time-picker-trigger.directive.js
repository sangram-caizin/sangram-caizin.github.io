/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time-picker-trigger.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-trigger.directive
 */
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { merge, of as observableOf, Subscription } from 'rxjs';
/**
 * @template T
 */
var OwlDateTimeTriggerDirective = /** @class */ (function () {
    function OwlDateTimeTriggerDirective(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "owlDTTriggerDisabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.watchStateChanges();
    };
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.handleClickOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.watchStateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.stateChanges.unsubscribe();
        /** @type {?} */
        var inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
            this.dtPicker.dtInput.disabledChange : observableOf();
        /** @type {?} */
        var pickerDisabled = this.dtPicker ?
            this.dtPicker.disabledChange : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.changeDetector.markForCheck();
        }));
    };
    OwlDateTimeTriggerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[owlDateTimeTrigger]',
                    host: {
                        '(click)': 'handleClickOnHost($event)',
                        '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
                    }
                },] }
    ];
    /** @nocollapse */
    OwlDateTimeTriggerDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    OwlDateTimeTriggerDirective.propDecorators = {
        dtPicker: [{ type: Input, args: ['owlDateTimeTrigger',] }],
        disabled: [{ type: Input }]
    };
    return OwlDateTimeTriggerDirective;
}());
export { OwlDateTimeTriggerDirective };
if (false) {
    /** @type {?} */
    OwlDateTimeTriggerDirective.prototype.dtPicker;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeTriggerDirective.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeTriggerDirective.prototype.stateChanges;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeTriggerDirective.prototype.changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFLQSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBS1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUUvRDtJQTJCSSxxQ0FBdUIsY0FBaUM7UUFBakMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBRmhELGlCQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUcxQyxDQUFDO0lBaEJELHNCQUNJLGlEQUFROzs7O1FBRFo7WUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDcEYsQ0FBQzs7Ozs7UUFFRCxVQUFjLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BSkE7SUFNRCxzQkFBSSxrRUFBeUI7Ozs7UUFBN0I7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7Ozs7SUFPTSw4Q0FBUTs7O0lBQWY7SUFDQSxDQUFDOzs7OztJQUVNLGlEQUFXOzs7O0lBQWxCLFVBQW9CLE9BQXNCO1FBQ3RDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7SUFFTSx3REFBa0I7OztJQUF6QjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTSxpREFBVzs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVNLHVEQUFpQjs7OztJQUF4QixVQUEwQixLQUFZO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx1REFBaUI7Ozs7SUFBekI7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBRTFCLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7O1lBRW5ELGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTtRQUVqRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDO2FBQ25ELFNBQVM7OztRQUFDO1lBQ1AsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNYLENBQUM7O2dCQW5FSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsSUFBSSxFQUFFO3dCQUNGLFNBQVMsRUFBRSwyQkFBMkI7d0JBQ3RDLGlDQUFpQyxFQUFFLDJCQUEyQjtxQkFDakU7aUJBQ0o7Ozs7Z0JBakJHLGlCQUFpQjs7OzJCQW9CaEIsS0FBSyxTQUFDLG9CQUFvQjsyQkFHMUIsS0FBSzs7SUF3RFYsa0NBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQTdEWSwyQkFBMkI7OztJQUVwQywrQ0FBK0Q7Ozs7O0lBRS9ELGdEQUEyQjs7Ozs7SUFjM0IsbURBQTBDOzs7OztJQUU3QixxREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmVcbiAqL1xuXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbb3dsRGF0ZVRpbWVUcmlnZ2VyXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGlja09uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtdHJpZ2dlci1kaXNhYmxlZF0nOiAnb3dsRFRUcmlnZ2VyRGlzYWJsZWRDbGFzcydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCdvd2xEYXRlVGltZVRyaWdnZXInKSBkdFBpY2tlcjogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD47XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmR0UGlja2VyLmRpc2FibGVkIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQoIHZhbHVlOiBib29sZWFuICkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFRyaWdnZXJEaXNhYmxlZENsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGVwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25Ib3N0KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3YXRjaFN0YXRlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcblxuICAgICAgICBjb25zdCBpbnB1dERpc2FibGVkID0gdGhpcy5kdFBpY2tlciAmJiB0aGlzLmR0UGlja2VyLmR0SW5wdXQgP1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5kdElucHV0LmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgY29uc3QgcGlja2VyRGlzYWJsZWQgPSB0aGlzLmR0UGlja2VyID9cbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcyA9IG1lcmdlKHBpY2tlckRpc2FibGVkLCBpbnB1dERpc2FibGVkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==