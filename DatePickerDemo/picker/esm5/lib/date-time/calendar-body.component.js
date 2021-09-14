/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/calendar-body.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-body.component
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { take } from 'rxjs/operators';
var CalendarCell = /** @class */ (function () {
    function CalendarCell(value, displayValue, ariaLabel, enabled, out, cellClass) {
        if (out === void 0) { out = false; }
        if (cellClass === void 0) { cellClass = ''; }
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.out = out;
        this.cellClass = cellClass;
    }
    return CalendarCell;
}());
export { CalendarCell };
if (false) {
    /** @type {?} */
    CalendarCell.prototype.value;
    /** @type {?} */
    CalendarCell.prototype.displayValue;
    /** @type {?} */
    CalendarCell.prototype.ariaLabel;
    /** @type {?} */
    CalendarCell.prototype.enabled;
    /** @type {?} */
    CalendarCell.prototype.out;
    /** @type {?} */
    CalendarCell.prototype.cellClass;
}
var OwlCalendarBodyComponent = /** @class */ (function () {
    function OwlCalendarBodyComponent(elmRef, ngZone) {
        this.elmRef = elmRef;
        this.ngZone = ngZone;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * The number of columns in the table.
         *
         */
        this.numCols = 7;
        /**
         * The ratio (width / height) to use for the cells in the table.
         */
        this.cellRatio = 1;
        /**
         * Emit when a calendar cell is selected
         *
         */
        this.select = new EventEmitter();
    }
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "owlDTCalendarBodyClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInRangeMode", {
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
    /**
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} cell
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.selectCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.select.emit(cell);
    };
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isActiveCell = /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    function (rowIndex, colIndex) {
        /** @type {?} */
        var cellNumber = rowIndex * this.numCols + colIndex;
        return cellNumber === this.activeCell;
    };
    /**
     * Check if the cell is selected
     */
    /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isSelected = /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.selectedValues || this.selectedValues.length === 0) {
            return false;
        }
        if (this.isInSingleMode) {
            return value === this.selectedValues[0];
        }
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            /** @type {?} */
            var toValue = this.selectedValues[1];
            return value === fromValue || value === toValue;
        }
    };
    /**
     * Check if the cell in the range
     * */
    /**
     * Check if the cell in the range
     *
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isInRange = /**
     * Check if the cell in the range
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            /** @type {?} */
            var toValue = this.selectedValues[1];
            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            }
            else {
                return value === fromValue || value === toValue;
            }
        }
    };
    /**
     * Check if the cell is the range from
     * */
    /**
     * Check if the cell is the range from
     *
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isRangeFrom = /**
     * Check if the cell is the range from
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            return fromValue !== null && value === fromValue;
        }
    };
    /**
     * Check if the cell is the range to
     * */
    /**
     * Check if the cell is the range to
     *
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isRangeTo = /**
     * Check if the cell is the range to
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var toValue = this.selectedValues[1];
            return toValue !== null && value === toValue;
        }
    };
    /**
     * Focus to a active cell
     * */
    /**
     * Focus to a active cell
     *
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.focusActiveCell = /**
     * Focus to a active cell
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
                _this.elmRef.nativeElement
                    .querySelector('.owl-dt-calendar-cell-active')
                    .focus();
            }));
        }));
    };
    OwlCalendarBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[owl-date-time-calendar-body]',
                    exportAs: 'owlDateTimeCalendarBody',
                    template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n    <td *ngFor=\"let item of row; let colIndex = index\"\n        class=\"owl-dt-calendar-cell {{item.cellClass}}\"\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\n        [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\n        [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\n        [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\n        [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\n        [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\n        [attr.aria-label]=\"item.ariaLabel\"\n        [attr.aria-disabled]=\"!item.enabled || null\"\n        [style.width.%]=\"100 / numCols\"\n        [style.paddingTop.%]=\"50 * cellRatio / numCols\"\n        [style.paddingBottom.%]=\"50 * cellRatio / numCols\"\n        (click)=\"selectCell(item)\">\n        <span class=\"owl-dt-calendar-cell-content\"\n              [ngClass]=\"{\n                'owl-dt-calendar-cell-out': item.out,\n                'owl-dt-calendar-cell-today': item.value === todayValue,\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\n              }\">\n            {{item.displayValue}}\n        </span>\n    </td>\n</tr>\n",
                    host: {
                        '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlCalendarBodyComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    OwlCalendarBodyComponent.propDecorators = {
        activeCell: [{ type: Input }],
        rows: [{ type: Input }],
        numCols: [{ type: Input }],
        cellRatio: [{ type: Input }],
        todayValue: [{ type: Input }],
        selectedValues: [{ type: Input }],
        selectMode: [{ type: Input }],
        select: [{ type: Output }]
    };
    return OwlCalendarBodyComponent;
}());
export { OwlCalendarBodyComponent };
if (false) {
    /**
     * The cell number of the active cell in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.activeCell;
    /**
     * The cells to display in the table.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.rows;
    /**
     * The number of columns in the table.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.numCols;
    /**
     * The ratio (width / height) to use for the cells in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.cellRatio;
    /**
     * The value in the table that corresponds to today.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.todayValue;
    /**
     * The value in the table that is currently selected.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.selectedValues;
    /**
     * Current picker select mode
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.selectMode;
    /**
     * Emit when a calendar cell is selected
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.select;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarBodyComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarBodyComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDO0lBQ0ksc0JBQ1csS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQWdCLEVBQ2hCLEdBQW9CLEVBQ3BCLFNBQXNCO1FBRHRCLG9CQUFBLEVBQUEsV0FBb0I7UUFDcEIsMEJBQUEsRUFBQSxjQUFzQjtRQUx0QixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFFBQUcsR0FBSCxHQUFHLENBQWlCO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQWE7SUFDOUIsQ0FBQztJQUNSLG1CQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7Ozs7SUFQTyw2QkFBb0I7O0lBQ3BCLG9DQUEyQjs7SUFDM0IsaUNBQXdCOztJQUN4QiwrQkFBdUI7O0lBQ3ZCLDJCQUEyQjs7SUFDM0IsaUNBQTZCOztBQUlyQztJQTRFSSxrQ0FBb0IsTUFBa0IsRUFBVSxNQUFjO1FBQTFDLFdBQU0sR0FBTixNQUFNLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFROzs7O1FBNUQ5RCxlQUFVLEdBQUcsQ0FBQyxDQUFDOzs7OztRQVlmLFlBQU8sR0FBRyxDQUFDLENBQUM7Ozs7UUFNWixjQUFTLEdBQUcsQ0FBQyxD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bnQiOlsiLyoqXG4gKiBjYWxlbmRhci1ib2R5LmNvbXBvbmVudFxuICovXG5cbmltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE5nWm9uZSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNlbGwge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdmFsdWU6IG51bWJlcixcbiAgICAgICAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgYXJpYUxhYmVsOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBlbmFibGVkOiBib29sZWFuLFxuICAgICAgICBwdWJsaWMgb3V0OiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgIHB1YmxpYyBjZWxsQ2xhc3M6IHN0cmluZyA9ICcnXG4gICAgKSB7fVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1tvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHldJyxcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lQ2FsZW5kYXJCb2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6e1xuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1ib2R5XSc6ICdvd2xEVENhbGVuZGFyQm9keUNsYXNzJ1xuICAgIH0sXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGFjdGl2ZUNlbGwgPSAwO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLlxuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICByb3dzOiBDYWxlbmRhckNlbGxbXVtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB0YWJsZS5cbiAgICAgKiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbnVtQ29scyA9IDc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcmF0aW8gKHdpZHRoIC8gaGVpZ2h0KSB0byB1c2UgZm9yIHRoZSBjZWxscyBpbiB0aGUgdGFibGUuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBjZWxsUmF0aW8gPSAxO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LlxuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICB0b2RheVZhbHVlOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxuICAgICAqICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZFZhbHVlczogbnVtYmVyW107XG5cbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHBpY2tlciBzZWxlY3QgbW9kZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0TW9kZTogU2VsZWN0TW9kZTtcblxuICAgIC8qKlxuICAgICAqIEVtaXQgd2hlbiBhIGNhbGVuZGFyIGNlbGwgaXMgc2VsZWN0ZWRcbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyQ2VsbD4oKTtcblxuICAgIGdldCBvd2xEVENhbGVuZGFyQm9keUNsYXNzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cblxuICAgIHB1YmxpYyBzZWxlY3RDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KGNlbGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0FjdGl2ZUNlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBjZWxsTnVtYmVyID0gcm93SW5kZXggKiB0aGlzLm51bUNvbHMgKyBjb2xJbmRleDtcbiAgICAgICAgcmV0dXJuIGNlbGxOdW1iZXIgPT09IHRoaXMuYWN0aXZlQ2VsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgY2VsbCBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIHB1YmxpYyBpc1NlbGVjdGVkKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkVmFsdWVzIHx8IHRoaXMuc2VsZWN0ZWRWYWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbVZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1swXTtcbiAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzFdO1xuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IGZyb21WYWx1ZSB8fCB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGluIHRoZSByYW5nZVxuICAgICAqICovXG4gICAgcHVibGljIGlzSW5SYW5nZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB0b1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID49IGZyb21WYWx1ZSAmJiB2YWx1ZSA8PSB0b1ZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IGZyb21WYWx1ZSB8fCB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjZWxsIGlzIHRoZSByYW5nZSBmcm9tXG4gICAgICogKi9cbiAgICBwdWJsaWMgaXNSYW5nZUZyb20odmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIGZyb21WYWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSA9PT0gZnJvbVZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgdGhlIHJhbmdlIHRvXG4gICAgICogKi9cbiAgICBwdWJsaWMgaXNSYW5nZVRvKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xuICAgICAgICAgICAgY29uc3QgdG9WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMV07XG4gICAgICAgICAgICByZXR1cm4gdG9WYWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSA9PT0gdG9WYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvY3VzIHRvIGEgYWN0aXZlIGNlbGxcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBmb2N1c0FjdGl2ZUNlbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5vd2wtZHQtY2FsZW5kYXItY2VsbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==