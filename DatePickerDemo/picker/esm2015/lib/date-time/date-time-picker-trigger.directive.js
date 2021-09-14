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
export class OwlDateTimeTriggerDirective {
    /**
     * @param {?} changeDetector
     */
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get owlDTTriggerDisabledClass() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClickOnHost(event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    watchStateChanges() {
        this.stateChanges.unsubscribe();
        /** @type {?} */
        const inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
            this.dtPicker.dtInput.disabledChange : observableOf();
        /** @type {?} */
        const pickerDisabled = this.dtPicker ?
            this.dtPicker.disabledChange : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled)
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.changeDetector.markForCheck();
        }));
    }
}
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
OwlDateTimeTriggerDirective.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OwlDateTimeTriggerDirective.propDecorators = {
    dtPicker: [{ type: Input, args: ['owlDateTimeTrigger',] }],
    disabled: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFLQSxPQUFPLEVBRUgsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBS1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQVMvRCxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBb0JwQyxZQUF1QixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFGaEQsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBRzFDLENBQUM7Ozs7SUFoQkQsSUFDSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3BGLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUUsS0FBYztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBSSx5QkFBeUI7UUFDekIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFPTSxRQUFRO0lBQ2YsQ0FBQzs7Ozs7SUFFTSxXQUFXLENBQUUsT0FBc0I7UUFDdEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUVNLGtCQUFrQjtRQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRU0sV0FBVztRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTSxpQkFBaUIsQ0FBRSxLQUFZO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Y0FFMUIsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTs7Y0FFbkQsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO1FBRWpELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUM7YUFDbkQsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNYLENBQUM7OztZQW5FSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSwyQkFBMkI7b0JBQ3RDLGlDQUFpQyxFQUFFLDJCQUEyQjtpQkFDakU7YUFDSjs7OztZQWpCRyxpQkFBaUI7Ozt1QkFvQmhCLEtBQUssU0FBQyxvQkFBb0I7dUJBRzFCLEtBQUs7Ozs7SUFITiwrQ0FBK0Q7Ozs7O0lBRS9ELGdEQUEyQjs7Ozs7SUFjM0IsbURBQTBDOzs7OztJQUU3QixxREFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmVcbiAqL1xuXG5cbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbb3dsRGF0ZVRpbWVUcmlnZ2VyXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGNsaWNrKSc6ICdoYW5kbGVDbGlja09uSG9zdCgkZXZlbnQpJyxcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtdHJpZ2dlci1kaXNhYmxlZF0nOiAnb3dsRFRUcmlnZ2VyRGlzYWJsZWRDbGFzcydcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lVHJpZ2dlckRpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCdvd2xEYXRlVGltZVRyaWdnZXInKSBkdFBpY2tlcjogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD47XG5cbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmR0UGlja2VyLmRpc2FibGVkIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQoIHZhbHVlOiBib29sZWFuICkge1xuICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFRyaWdnZXJEaXNhYmxlZENsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAgIGNvbnN0cnVjdG9yKCBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkNoYW5nZXMoIGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmRhdGVwaWNrZXIpIHtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25Ib3N0KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyKSB7XG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLm9wZW4oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB3YXRjaFN0YXRlQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcblxuICAgICAgICBjb25zdCBpbnB1dERpc2FibGVkID0gdGhpcy5kdFBpY2tlciAmJiB0aGlzLmR0UGlja2VyLmR0SW5wdXQgP1xuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5kdElucHV0LmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XG5cbiAgICAgICAgY29uc3QgcGlja2VyRGlzYWJsZWQgPSB0aGlzLmR0UGlja2VyID9cbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZGlzYWJsZWRDaGFuZ2UgOiBvYnNlcnZhYmxlT2YoKTtcblxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcyA9IG1lcmdlKHBpY2tlckRpc2FibGVkLCBpbnB1dERpc2FibGVkKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==