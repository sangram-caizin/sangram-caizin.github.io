/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/timer-box.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer-box.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
var OwlTimerBoxComponent = /** @class */ (function () {
    function OwlTimerBoxComponent() {
        this.showDivider = false;
        this.step = 1;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
    }
    Object.defineProperty(OwlTimerBoxComponent.prototype, "displayValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.boxValue || this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerBoxComponent.prototype, "owlDTTimerBoxClass", {
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
    OwlTimerBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputStreamSub = this.inputStream.pipe(debounceTime(500), distinctUntilChanged()).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                /** @type {?} */
                var inputValue = coerceNumberProperty(val, 0);
                _this.updateValueViaInput(inputValue);
            }
        }));
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.inputStreamSub.unsubscribe();
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.upBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value + this.step);
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.downBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value - this.step);
    };
    /**
     * @param {?} val
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.handleInputChange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.inputStream.next(val);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valueChange.emit(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValueViaInput = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    };
    OwlTimerBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeTimerBox',
                    selector: 'owl-date-time-timer-box',
                    template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"upBtnDisabled\"\n        [attr.aria-label]=\"upBtnAriaLabel\"\n        (click)=\"upBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n<label class=\"owl-dt-timer-content\">\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\n           [value]=\"displayValue | numberFixedLen : 2\"\n           (input)=\"handleInputChange(valueInput.value)\" #valueInput>\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\n</label>\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\n        type=\"button\" tabindex=\"-1\"\n        [disabled]=\"downBtnDisabled\"\n        [attr.aria-label]=\"downBtnAriaLabel\"\n        (click)=\"downBtnClicked()\">\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\n                 width=\"100%\" height=\"100%\">\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\n                </svg>\n        <!-- </editor-fold> -->\n    </span>\n</button>\n",
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlTimerBoxComponent.ctorParameters = function () { return []; };
    OwlTimerBoxComponent.propDecorators = {
        showDivider: [{ type: Input }],
        upBtnAriaLabel: [{ type: Input }],
        upBtnDisabled: [{ type: Input }],
        downBtnAriaLabel: [{ type: Input }],
        downBtnDisabled: [{ type: Input }],
        boxValue: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        step: [{ type: Input }],
        inputLabel: [{ type: Input }],
        valueChange: [{ type: Output }],
        inputChange: [{ type: Output }]
    };
    return OwlTimerBoxComponent;
}());
export { OwlTimerBoxComponent };
if (false) {
    /** @type {?} */
    OwlTimerBoxComponent.prototype.showDivider;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnDisabled;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnDisabled;
    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     *
     * @type {?}
     */
    OwlTimerBoxComponent.prototype.boxValue;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.value;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.min;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.max;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.step;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.valueChange;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStream;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStreamSub;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFcEU7SUF3REk7UUExQ1MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFzQnBCLFNBQUksR0FBRyxDQUFDLENBQUM7UUFJUixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFekMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTNDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUVwQyxtQkFBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFXNUMsQ0FBQztJQVRELHNCQUFJLDhDQUFZOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvREFBa0I7Ozs7UUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDOzs7T0FBQTs7OztJQUtNLHVDQUFROzs7SUFBZjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDdkMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixvQkFBb0IsRUFBRSxDQUN6QixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFFLEdBQVc7WUFDckIsSUFBSSxHQUFHLEVBQUU7O29CQUNDLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7UUFDTCxDQUFDLEVBQUMsQ0FBQTtJQUNOLENBQUM7Ozs7SUFFTSwwQ0FBVzs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRU0sMkNBQVk7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVNLDZDQUFjOzs7SUFBckI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRU0sZ0RBQWlCOzs7O0lBQXhCLFVBQTBCLEdBQVc7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRU8sMENBQVc7Ozs7O0lBQW5CLFVBQXFCLEtBQWE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7O0lBRU8sa0RBQW1COzs7OztJQUEzQixVQUE2QixLQUFhO1FBQ3RDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBaEdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUseUJBQXlCO29CQUNuQyw2cEZBQXlDO29CQUV6QyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNGLDBCQUEwQixFQUFFLG9CQUFvQjtxQkFDbkQ7O2lCQUNKOzs7Ozs4QkFJSSxLQUFLO2lDQUVMLEtBQUs7Z0NBRUwsS0FBSzttQ0FFTCxLQUFLO2tDQUVMLEtBQUs7MkJBTUwsS0FBSzt3QkFFTCxLQUFLO3NCQUVMLEtBQUs7c0JBRUwsS0FBSzt1QkFFTCxLQUFLOzZCQUVMLEtBQUs7OEJBRUwsTUFBTTs4QkFFTixNQUFNOztJQXVEWCwyQkFBQztDQUFBLEFBakdELElBaUdDO1NBckZZLG9CQUFvQjs7O0lBRTdCLDJDQUE2Qjs7SUFFN0IsOENBQWdDOztJQUVoQyw2Q0FBZ0M7O0lBRWhDLGdEQUFrQzs7SUFFbEMsK0NBQWtDOzs7Ozs7O0lBTWxDLHdDQUEwQjs7SUFFMUIscUNBQXVCOztJQUV2QixtQ0FBcUI7O0lBRXJCLG1DQUFxQjs7SUFFckIsb0NBQWtCOztJQUVsQiwwQ0FBNEI7O0lBRTVCLDJDQUFtRDs7SUFFbkQsMkNBQW1EOzs7OztJQUVuRCwyQ0FBNEM7Ozs7O0lBRTVDLDhDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogdGltZXItYm94LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gICAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZVRpbWVyQm94JyxcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtdGltZXItYm94JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZXItYm94LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lci1ib3guY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyLWJveF0nOiAnb3dsRFRUaW1lckJveENsYXNzJ1xuICAgIH1cbn0pXG5cbmV4cG9ydCBjbGFzcyBPd2xUaW1lckJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNob3dEaXZpZGVyID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB1cEJ0bkFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdXBCdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRvd25CdG5BcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRvd25CdG5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYm94XG4gICAgICogSWYgaXQgaXMgbnVsbCwgdGhlIGJveCB3b3VsZCBkaXNwbGF5IFt2YWx1ZV1cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpIGJveFZhbHVlOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHN0ZXAgPSAxO1xuXG4gICAgQElucHV0KCkgaW5wdXRMYWJlbDogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIHByaXZhdGUgaW5wdXRTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIGlucHV0U3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gICAgZ2V0IGRpc3BsYXlWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3hWYWx1ZSB8fCB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBvd2xEVFRpbWVyQm94Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dFN0cmVhbVN1YiA9IHRoaXMuaW5wdXRTdHJlYW0ucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApLnN1YnNjcmliZSgoIHZhbDogc3RyaW5nICkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWwsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWVWaWFJbnB1dChpbnB1dFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBCdG5DbGlja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMudmFsdWUgKyB0aGlzLnN0ZXApO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb3duQnRuQ2xpY2tlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0aGlzLnZhbHVlIC0gdGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlSW5wdXRDaGFuZ2UoIHZhbDogc3RyaW5nICk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0U3RyZWFtLm5leHQodmFsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZhbHVlKCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWVWaWFJbnB1dCggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy5tYXggfHwgdmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxufVxuIl19