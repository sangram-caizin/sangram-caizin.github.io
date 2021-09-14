/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time-picker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * date-time-picker.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTime } from './date-time.class';
import { OwlDialogService } from '../dialog/dialog.service';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Injection token that determines the scroll handling while the dtPicker is open.
 * @type {?}
 */
export var OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    /** @type {?} */
    var fn = (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.block(); });
    return fn;
}
/**
 * \@docs-private
 * @type {?}
 */
export var OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * @template T
 */
var OwlDateTimeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OwlDateTimeComponent, _super);
    function OwlDateTimeComponent(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
        _this.overlay = overlay;
        _this.viewContainerRef = viewContainerRef;
        _this.dialogService = dialogService;
        _this.ngZone = ngZone;
        _this.changeDetector = changeDetector;
        _this.dateTimeAdapter = dateTimeAdapter;
        _this.dateTimeFormats = dateTimeFormats;
        _this.document = document;
        /**
         * Custom class for the picker backdrop.
         */
        _this.backdropClass = [];
        /**
         * Custom class for the picker overlay pane.
         */
        _this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        _this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        _this._pickerMode = 'popup';
        /**
         * Whether the calendar is open.
         */
        _this._opened = false;
        /**
         * Callback when the picker is closed
         *
         */
        _this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         *
         */
        _this.afterPickerOpen = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         *
         */
        _this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         *
         */
        _this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         *
         */
        _this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         *
         */
        _this.disabledChange = new EventEmitter();
        _this.dtInputSub = Subscription.EMPTY;
        _this.hidePickerStreamSub = Subscription.EMPTY;
        _this.confirmSelectedStreamSub = Subscription.EMPTY;
        _this.pickerOpenedStreamSub = Subscription.EMPTY;
        /**
         * The element that was focused before the date time picker was opened.
         */
        _this.focusedElementBeforeOpen = null;
        _this._selecteds = [];
        _this.defaultScrollStrategy = defaultScrollStrategy;
        return _this;
    }
    Object.defineProperty(OwlDateTimeComponent.prototype, "startAt", {
        get: /**
         * @return {?}
         */
        function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            if (this._startAt) {
                return this._startAt;
            }
            if (this._dtInput) {
                if (this._dtInput.selectMode === 'single') {
                    return this._dtInput.value || null;
                }
                else if (this._dtInput.selectMode === 'range' ||
                    this._dtInput.selectMode === 'rangeFrom') {
                    return this._dtInput.values[0] || null;
                }
                else if (this._dtInput.selectMode === 'rangeTo') {
                    return this._dtInput.values[1] || null;
                }
            }
            else {
                return null;
            }
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "pickerType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val !== this._pickerType) {
                this._pickerType = val;
                if (this._dtInput) {
                    this._dtInput.formatNativeInputValue();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "pickerMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            if (mode === 'popup') {
                this._pickerMode = mode;
            }
            else {
                this._pickerMode = 'dialog';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined && this._dtInput
                ? this._dtInput.disabled
                : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (value !== this._disabled) {
                this._disabled = value;
                this.disabledChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            val ? this.open() : this.close();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "dtInput", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = value;
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selecteds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selecteds;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            this._selecteds = values;
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "minDateTime", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "maxDateTime", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "dateTimeFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.dateTimeFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.selectMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.isInSingleMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.isInRangeMode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OwlDateTimeComponent.prototype.registerInput = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (Array.isArray(value)) {
                _this.selecteds = value;
            }
            else {
                _this.selected = value;
            }
        }));
    };
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._dtInput) {
            throw Error('Attempted to open an DateTimePicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        // reset the picker selected value
        if (this.isInSingleMode) {
            this.selected = this._dtInput.value;
        }
        else if (this.isInRangeMode) {
            this.selecteds = this._dtInput.values;
        }
        // when the picker is open , we make sure the picker's current selected time value
        // is the same as the _startAt time value.
        if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
            this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
        }
        this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
        this.pickerContainer.picker = this;
        // Listen to picker container's hidePickerStream
        this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe((/**
         * @return {?}
         */
        function () {
            _this.close();
        }));
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.confirmSelect(event);
        }));
    };
    /**
     * Selects the given date
     */
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeComponent.prototype.select = /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (Array.isArray(date)) {
            this.selecteds = tslib_1.__spread(date);
        }
        else {
            this.selected = date;
        }
        /**
         * Cases in which automatically confirm the select when date or dates are selected:
         * 1) picker mode is NOT 'dialog'
         * 2) picker type is 'calendar' and selectMode is 'single'.
         * 3) picker type is 'calendar' and selectMode is 'range' and
         *    the 'selecteds' has 'from'(selecteds[0]) and 'to'(selecteds[1]) values.
         * 4) selectMode is 'rangeFrom' and selecteds[0] has value.
         * 5) selectMode is 'rangeTo' and selecteds[1] has value.
         * */
        if (this.pickerMode !== 'dialog' &&
            this.pickerType === 'calendar' &&
            ((this.selectMode === 'single' && this.selected) ||
                (this.selectMode === 'rangeFrom' && this.selecteds[0]) ||
                (this.selectMode === 'rangeTo' && this.selecteds[1]) ||
                (this.selectMode === 'range' &&
                    this.selecteds[0] &&
                    this.selecteds[1]))) {
            this.confirmSelect();
        }
    };
    /**
     * Emits the selected year in multi-year view
     * */
    /**
     * Emits the selected year in multi-year view
     *
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTimeComponent.prototype.selectYear = /**
     * Emits the selected year in multi-year view
     *
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /**
     * Emits selected month in year view
     * */
    /**
     * Emits selected month in year view
     *
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlDateTimeComponent.prototype.selectMonth = /**
     * Emits selected month in year view
     *
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Hide the picker
     */
    /**
     * Hide the picker
     * @return {?}
     */
    OwlDateTimeComponent.prototype.close = /**
     * Hide the picker
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.pickerContainerPortal &&
            this.pickerContainerPortal.isAttached) {
            this.pickerContainerPortal.detach();
        }
        if (this.hidePickerStreamSub) {
            this.hidePickerStreamSub.unsubscribe();
            this.hidePickerStreamSub = null;
        }
        if (this.confirmSelectedStreamSub) {
            this.confirmSelectedStreamSub.unsubscribe();
            this.confirmSelectedStreamSub = null;
        }
        if (this.pickerOpenedStreamSub) {
            this.pickerOpenedStreamSub.unsubscribe();
            this.pickerOpenedStreamSub = null;
        }
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
        /** @type {?} */
        var completeClose = (/**
         * @return {?}
         */
        function () {
            if (_this._opened) {
                _this._opened = false;
                _this.afterPickerClosed.emit(null);
                _this.focusedElementBeforeOpen = null;
            }
        });
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    };
    /**
     * Confirm the selected value
     */
    /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    OwlDateTimeComponent.prototype.confirmSelect = /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (this.isInSingleMode) {
            /** @type {?} */
            var selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    };
    /**
     * Open the picker as a dialog
     */
    /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.openAsDialog = /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: tslib_1.__spread([
                'cdk-overlay-dark-backdrop'
            ], coerceArray(this.backdropClass)),
            paneClass: tslib_1.__spread(['owl-dt-dialog'], coerceArray(this.panelClass)),
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe((/**
         * @return {?}
         */
        function () {
            _this.afterPickerOpen.emit(null);
            _this._opened = true;
        }));
        this.dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * Open the picker as popup
     */
    /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.openAsPopup = /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            /** @type {?} */
            var componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.popupRef.updatePosition();
            }));
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.afterPickerOpen.emit(null);
                _this._opened = true;
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.createPopup = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: tslib_1.__spread([
                'cdk-overlay-transparent-backdrop'
            ], coerceArray(this.backdropClass)),
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: tslib_1.__spread(['owl-dt-popup'], coerceArray(this.panelClass))
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.keyCode === ESCAPE ||
                (_this._dtInput &&
                    event.altKey &&
                    event.keyCode === UP_ARROW);
        })))).subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * Create the popup PositionStrategy.
     * */
    /**
     * Create the popup PositionStrategy.
     *
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     *
     * @private
     * @return {?}
     */
    function () {
        return this.overlay
            .position()
            .flexibleConnectedTo(this._dtInput.elementRef)
            .withTransformOriginOn('.owl-dt-container')
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -176
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -352
            }
        ]);
    };
    OwlDateTimeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time',
                    exportAs: 'owlDateTime',
                    template: "",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlDateTimeComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: ViewContainerRef },
        { type: OwlDialogService },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [OWL_DTPICKER_SCROLL_STRATEGY,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    OwlDateTimeComponent.propDecorators = {
        backdropClass: [{ type: Input }],
        panelClass: [{ type: Input }],
        startAt: [{ type: Input }],
        pickerType: [{ type: Input }],
        pickerMode: [{ type: Input }],
        disabled: [{ type: Input }],
        opened: [{ type: Input }],
        scrollStrategy: [{ type: Input }],
        afterPickerClosed: [{ type: Output }],
        afterPickerOpen: [{ type: Output }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }]
    };
    return OwlDateTimeComponent;
}(OwlDateTime));
export { OwlDateTimeComponent };
if (false) {
    /**
     * Custom class for the picker backdrop.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.backdropClass;
    /**
     * Custom class for the picker overlay pane.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.panelClass;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._startAt;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._pickerType;
    /**
     * Whether the picker open as a dialog
     * @type {?}
     */
    OwlDateTimeComponent.prototype._pickerMode;
    /**
     * Whether the date time picker should be disabled.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._disabled;
    /**
     * Whether the calendar is open.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._opened;
    /**
     * The scroll strategy when the picker is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.scrollStrategy;
    /**
     * Callback when the picker is closed
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerClosed;
    /**
     * Callback when the picker is open
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerOpen;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.yearSelected;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.monthSelected;
    /**
     * Emit when the selected value has been confirmed
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.confirmSelectedChange;
    /**
     * Emits when the date time picker is disabled.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainerPortal;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainer;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.popupRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dtInputSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.hidePickerStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.confirmSelectedStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerOpenedStreamSub;
    /**
     * The element that was focused before the date time picker was opened.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.focusedElementBeforeOpen;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._dtInput;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.defaultScrollStrategy;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogService;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeFormats;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixFQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFFSCxPQUFPLEVBQ1AsYUFBYSxFQUloQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRXZGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUNILFdBQVcsRUFJZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENB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MEM7Ozs7OztJQUcxQyx3Q0FBMkI7Ozs7Ozs7OztJQXFDM0IsMkNBQXlDOzs7OztJQWtCekMsMkNBQWtDOzs7Ozs7SUFlbEMseUNBQTJCOzs7Ozs7SUFpQjNCLHVDQUFpQzs7Ozs7OztJQWNqQyw4Q0FDc0M7Ozs7OztJQUt0QyxpREFDNEM7Ozs7OztJQUs1QywrQ0FDMEM7Ozs7Ozs7SUFNMUMsNENBQ3FDOzs7Ozs7O0lBTXJDLDZDQUNzQzs7Ozs7O0lBS3RDLHFEQUEyRDs7Ozs7O0lBSzNELDhDQUFvRDs7Ozs7SUFFcEQscURBRUU7Ozs7O0lBQ0YsK0NBQTBEOzs7OztJQUMxRCx3Q0FBNkI7Ozs7O0lBQzdCLHlDQUFrRTs7Ozs7SUFDbEUsMENBQXdDOzs7OztJQUN4QyxtREFBaUQ7Ozs7O0lBQ2pELHdEQUFzRDs7Ozs7SUFDdEQscURBQW1EOzs7Ozs7SUFHbkQsd0RBQTREOzs7OztJQUU1RCx3Q0FBK0M7Ozs7O0lBSy9DLHlDQUE0Qjs7Ozs7SUFVNUIsMENBQTZCOzs7OztJQW9DN0IscURBQW9EOzs7OztJQUdoRCx1Q0FBd0I7Ozs7O0lBQ3hCLGdEQUEwQzs7Ozs7SUFDMUMsNkNBQXVDOzs7OztJQUN2QyxzQ0FBc0I7Ozs7O0lBQ3RCLDhDQUEyQzs7Ozs7SUFDM0MsK0NBQXlEOzs7OztJQUV6RCwrQ0FFNkM7Ozs7O0lBQzdDLHdDQUVxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnRcbiAqL1xuXG5pbXBvcnQge1xuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3Rpb25Ub2tlbixcbiAgICBJbnB1dCxcbiAgICBOZ1pvbmUsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgICBCbG9ja1Njcm9sbFN0cmF0ZWd5LFxuICAgIE92ZXJsYXksXG4gICAgT3ZlcmxheUNvbmZpZyxcbiAgICBPdmVybGF5UmVmLFxuICAgIFBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgU2Nyb2xsU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRVNDQVBFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBjb2VyY2VBcnJheSwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7XG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQge1xuICAgIE93bERhdGVUaW1lLFxuICAgIFBpY2tlck1vZGUsXG4gICAgUGlja2VyVHlwZSxcbiAgICBTZWxlY3RNb2RlXG59IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1JlZiB9IGZyb20gJy4uL2RpYWxvZy9kaWFsb2ctcmVmLmNsYXNzJztcbmltcG9ydCB7IE93bERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkdFBpY2tlciBpcyBvcGVuLiAqL1xuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48XG4gICAgKCkgPT4gU2Nyb2xsU3RyYXRlZ3lcbj4oJ293bC1kdHBpY2tlci1zY3JvbGwtc3RyYXRlZ3knKTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkoXG4gICAgb3ZlcmxheTogT3ZlcmxheVxuKTogKCkgPT4gQmxvY2tTY3JvbGxTdHJhdGVneSB7XG4gICAgY29uc3QgZm4gPSAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKTtcbiAgICByZXR1cm4gZm47XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgY29uc3QgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiA9IHtcbiAgICBwcm92aWRlOiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZLFxuICAgIGRlcHM6IFtPdmVybGF5XSxcbiAgICB1c2VGYWN0b3J5OiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUllcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZScsXG4gICAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUNvbXBvbmVudDxUPiBleHRlbmRzIE93bERhdGVUaW1lPFQ+XG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIHBpY2tlciBiYWNrZHJvcC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBiYWNrZHJvcENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xuXG4gICAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIHBpY2tlciBvdmVybGF5IHBhbmUuICovXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcblxuICAgIC8qKiBUaGUgZGF0ZSB0byBvcGVuIHRoZSBjYWxlbmRhciB0byBpbml0aWFsbHkuICovXG4gICAgcHJpdmF0ZSBfc3RhcnRBdDogVCB8IG51bGw7XG4gICAgQElucHV0KClcbiAgICBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbCB7XG4gICAgICAgIC8vIElmIGFuIGV4cGxpY2l0IHN0YXJ0QXQgaXMgc2V0IHdlIHN0YXJ0IHRoZXJlLCBvdGhlcndpc2Ugd2Ugc3RhcnQgYXQgd2hhdGV2ZXIgdGhlIGN1cnJlbnRseVxuICAgICAgICAvLyBzZWxlY3RlZCB2YWx1ZSBpcy5cbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0QXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydEF0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWUgfHwgbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWVzWzBdIHx8IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWVzWzFdIHx8IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBzdGFydEF0KGRhdGU6IFQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0QXQgPSB0aGlzLmdldFZhbGlkRGF0ZShcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGRhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0eXBlIG9mIHRoZSBkYXRlVGltZSBwaWNrZXJcbiAgICAgKiAgICAgICdib3RoJyAtLSBzaG93IGJvdGggY2FsZW5kYXIgYW5kIHRpbWVyXG4gICAgICogICAgICAnY2FsZW5kYXInIC0tIHNob3cgb25seSBjYWxlbmRhclxuICAgICAqICAgICAgJ3RpbWVyJyAtLSBzaG93IG9ubHkgdGltZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIF9waWNrZXJUeXBlOiBQaWNrZXJUeXBlID0gJ2JvdGgnO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJUeXBlO1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJUeXBlKHZhbDogUGlja2VyVHlwZSkge1xuICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9waWNrZXJUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9waWNrZXJUeXBlID0gdmFsO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kdElucHV0LmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHBpY2tlciBvcGVuIGFzIGEgZGlhbG9nXG4gICAgICovXG4gICAgX3BpY2tlck1vZGU6IFBpY2tlck1vZGUgPSAncG9wdXAnO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHBpY2tlck1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb2RlO1xuICAgIH1cblxuICAgIHNldCBwaWNrZXJNb2RlKG1vZGU6IFBpY2tlck1vZGUpIHtcbiAgICAgICAgaWYgKG1vZGUgPT09ICdwb3B1cCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vZGUgPSBtb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9kZSA9ICdkaWFsb2cnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGUgdGltZSBwaWNrZXIgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgPT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kdElucHV0XG4gICAgICAgICAgICA/IHRoaXMuX2R0SW5wdXQuZGlzYWJsZWRcbiAgICAgICAgICAgIDogISF0aGlzLl9kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5uZXh0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBvcGVuLiAqL1xuICAgIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgICB9XG5cbiAgICBzZXQgb3BlbmVkKHZhbDogYm9vbGVhbikge1xuICAgICAgICB2YWwgPyB0aGlzLm9wZW4oKSA6IHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuXG4gICAgICogTGVhcm4gbW9yZSB0aGlzIGZyb20gaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2Nkay9vdmVybGF5L292ZXJ2aWV3I3Njcm9sbC1zdHJhdGVnaWVzXG4gICAgICogKi9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzY3JvbGxTdHJhdGVneTogU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB3aGVuIHRoZSBwaWNrZXIgaXMgY2xvc2VkXG4gICAgICogKi9cbiAgICBAT3V0cHV0KClcbiAgICBhZnRlclBpY2tlckNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgd2hlbiB0aGUgcGlja2VyIGlzIG9wZW5cbiAgICAgKiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGFmdGVyUGlja2VyT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICogKi9cbiAgICBAT3V0cHV0KClcbiAgICB5ZWFyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBzZWxlY3RlZCBtb250aCBpbiB5ZWFyIHZpZXdcbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXG4gICAgICogKi9cbiAgICBAT3V0cHV0KClcbiAgICBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjb25maXJtZWRcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBjb25maXJtU2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXSB8IFQ+KCk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuIHRoZSBkYXRlIHRpbWUgcGlja2VyIGlzIGRpc2FibGVkLlxuICAgICAqICovXG4gICAgcHVibGljIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgcHJpdmF0ZSBwaWNrZXJDb250YWluZXJQb3J0YWw6IENvbXBvbmVudFBvcnRhbDxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cbiAgICA+O1xuICAgIHByaXZhdGUgcGlja2VyQ29udGFpbmVyOiBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPjtcbiAgICBwcml2YXRlIHBvcHVwUmVmOiBPdmVybGF5UmVmO1xuICAgIHByaXZhdGUgZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8T3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD4+O1xuICAgIHByaXZhdGUgZHRJbnB1dFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICBwcml2YXRlIGhpZGVQaWNrZXJTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSBjb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgcHJpdmF0ZSBwaWNrZXJPcGVuZWRTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgICAvKiogVGhlIGVsZW1lbnQgdGhhdCB3YXMgZm9jdXNlZCBiZWZvcmUgdGhlIGRhdGUgdGltZSBwaWNrZXIgd2FzIG9wZW5lZC4gKi9cbiAgICBwcml2YXRlIGZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2R0SW5wdXQ6IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmU8VD47XG4gICAgZ2V0IGR0SW5wdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcbiAgICBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcbiAgICBnZXQgc2VsZWN0ZWRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRzID0gdmFsdWVzO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXG4gICAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQgJiYgdGhpcy5fZHRJbnB1dC5taW47XG4gICAgfVxuXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgICBnZXQgbWF4RGF0ZVRpbWUoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1heDtcbiAgICB9XG5cbiAgICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQgJiYgdGhpcy5fZHRJbnB1dC5kYXRlVGltZUZpbHRlcjtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0TW9kZSgpOiBTZWxlY3RNb2RlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZTtcbiAgICB9XG5cbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5TaW5nbGVNb2RlO1xuICAgIH1cblxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC5pc0luUmFuZ2VNb2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdFNjcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBPd2xEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXG4gICAgICAgIEBJbmplY3QoT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSkgZGVmYXVsdFNjcm9sbFN0cmF0ZWd5OiBhbnksXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxuICAgICAgICBwcm90ZWN0ZWQgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHMsXG4gICAgICAgIEBPcHRpb25hbCgpXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpXG4gICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICAgICkge1xuICAgICAgICBzdXBlcihkYXRlVGltZUFkYXB0ZXIsIGRhdGVUaW1lRm9ybWF0cyk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5ID0gZGVmYXVsdFNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XG5cbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5kdElucHV0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcblxuICAgICAgICBpZiAodGhpcy5wb3B1cFJlZikge1xuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJJbnB1dChpbnB1dDogT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgJ0EgT3dsIERhdGVUaW1lUGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZHRJbnB1dCA9IGlucHV0O1xuICAgICAgICB0aGlzLmR0SW5wdXRTdWIgPSB0aGlzLl9kdElucHV0LnZhbHVlQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgICAgICh2YWx1ZTogVFtdIHwgVCB8IG51bGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3BlbmVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5fZHRJbnB1dCkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICAgICAgJ0F0dGVtcHRlZCB0byBvcGVuIGFuIERhdGVUaW1lUGlja2VyIHdpdGggbm8gYXNzb2NpYXRlZCBpbnB1dC4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzZXQgdGhlIHBpY2tlciBzZWxlY3RlZCB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuX2R0SW5wdXQudmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IHRoaXMuX2R0SW5wdXQudmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gd2hlbiB0aGUgcGlja2VyIGlzIG9wZW4gLCB3ZSBtYWtlIHN1cmUgdGhlIHBpY2tlcidzIGN1cnJlbnQgc2VsZWN0ZWQgdGltZSB2YWx1ZVxuICAgICAgICAvLyBpcyB0aGUgc2FtZSBhcyB0aGUgX3N0YXJ0QXQgdGltZSB2YWx1ZS5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmIHRoaXMuX3N0YXJ0QXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5zZWxlY3RlZCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5zZWxlY3RlZCksXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnNlbGVjdGVkKSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLl9zdGFydEF0KSxcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuX3N0YXJ0QXQpLFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5fc3RhcnRBdClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBpY2tlck1vZGUgPT09ICdkaWFsb2cnID8gdGhpcy5vcGVuQXNEaWFsb2coKSA6IHRoaXMub3BlbkFzUG9wdXAoKTtcblxuICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lci5waWNrZXIgPSB0aGlzO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBwaWNrZXIgY29udGFpbmVyJ3MgaGlkZVBpY2tlclN0cmVhbVxuICAgICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIgPSB0aGlzLnBpY2tlckNvbnRhaW5lci5oaWRlUGlja2VyU3RyZWFtLnN1YnNjcmliZShcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBjb25maXJtU2VsZWN0ZWRTdHJlYW1cbiAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIgPSB0aGlzLnBpY2tlckNvbnRhaW5lci5jb25maXJtU2VsZWN0ZWRTdHJlYW0uc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0KGRhdGU6IFRbXSB8IFQpOiB2b2lkIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gWy4uLmRhdGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FzZXMgaW4gd2hpY2ggYXV0b21hdGljYWxseSBjb25maXJtIHRoZSBzZWxlY3Qgd2hlbiBkYXRlIG9yIGRhdGVzIGFyZSBzZWxlY3RlZDpcbiAgICAgICAgICogMSkgcGlja2VyIG1vZGUgaXMgTk9UICdkaWFsb2cnXG4gICAgICAgICAqIDIpIHBpY2tlciB0eXBlIGlzICdjYWxlbmRhcicgYW5kIHNlbGVjdE1vZGUgaXMgJ3NpbmdsZScuXG4gICAgICAgICAqIDMpIHBpY2tlciB0eXBlIGlzICdjYWxlbmRhcicgYW5kIHNlbGVjdE1vZGUgaXMgJ3JhbmdlJyBhbmRcbiAgICAgICAgICogICAgdGhlICdzZWxlY3RlZHMnIGhhcyAnZnJvbScoc2VsZWN0ZWRzWzBdKSBhbmQgJ3RvJyhzZWxlY3RlZHNbMV0pIHZhbHVlcy5cbiAgICAgICAgICogNCkgc2VsZWN0TW9kZSBpcyAncmFuZ2VGcm9tJyBhbmQgc2VsZWN0ZWRzWzBdIGhhcyB2YWx1ZS5cbiAgICAgICAgICogNSkgc2VsZWN0TW9kZSBpcyAncmFuZ2VUbycgYW5kIHNlbGVjdGVkc1sxXSBoYXMgdmFsdWUuXG4gICAgICAgICAqICovXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9kZSAhPT0gJ2RpYWxvZycgJiZcbiAgICAgICAgICAgIHRoaXMucGlja2VyVHlwZSA9PT0gJ2NhbGVuZGFyJyAmJlxuICAgICAgICAgICAgKCh0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnICYmIHRoaXMuc2VsZWN0ZWQpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgJiYgdGhpcy5zZWxlY3RlZHNbMF0pIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmIHRoaXMuc2VsZWN0ZWRzWzFdKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMV0pKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XG4gICAgICogKi9cbiAgICBwdWJsaWMgc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogVCk6IHZvaWQge1xuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBzZWxlY3RlZCBtb250aCBpbiB5ZWFyIHZpZXdcbiAgICAgKiAqL1xuICAgIHB1YmxpYyBzZWxlY3RNb250aChub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBwaWNrZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fb3BlbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wb3B1cFJlZiAmJiB0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCAmJlxuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwuaXNBdHRhY2hlZFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1Yikge1xuICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgdGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dSZWYgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29tcGxldGVDbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUGlja2VyQ2xvc2VkLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuICYmXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBCZWNhdXNlIElFIG1vdmVzIGZvY3VzIGFzeW5jaHJvbm91c2x5LCB3ZSBjYW4ndCBjb3VudCBvbiBpdCBiZWluZyByZXN0b3JlZCBiZWZvcmUgd2UndmVcbiAgICAgICAgICAgIC8vIG1hcmtlZCB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQuIElmIHRoZSBldmVudCBmaXJlcyBvdXQgb2Ygc2VxdWVuY2UgYW5kIHRoZSBlbGVtZW50IHRoYXRcbiAgICAgICAgICAgIC8vIHdlJ3JlIHJlZm9jdXNpbmcgb3BlbnMgdGhlIGRhdGVwaWNrZXIgb24gZm9jdXMsIHRoZSB1c2VyIGNvdWxkIGJlIHN0dWNrIHdpdGggbm90IGJlaW5nXG4gICAgICAgICAgICAvLyBhYmxlIHRvIGNsb3NlIHRoZSBjYWxlbmRhciBhdCBhbGwuIFdlIHdvcmsgYXJvdW5kIGl0IGJ5IG1ha2luZyB0aGUgbG9naWMsIHRoYXQgbWFya3NcbiAgICAgICAgICAgIC8vIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZCwgYXN5bmMgYXMgd2VsbC5cbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNvbXBsZXRlQ2xvc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcGxldGVDbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlybSB0aGUgc2VsZWN0ZWQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uZmlybVNlbGVjdChldmVudD86IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgfHwgdGhpcy5zdGFydEF0IHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhlIHBpY2tlciBhcyBhIGRpYWxvZ1xuICAgICAqL1xuICAgIHByaXZhdGUgb3BlbkFzRGlhbG9nKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nU2VydmljZS5vcGVuKFxuICAgICAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBiYWNrZHJvcENsYXNzOiBbXG4gICAgICAgICAgICAgICAgICAgICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyxcbiAgICAgICAgICAgICAgICAgICAgLi4uY29lcmNlQXJyYXkodGhpcy5iYWNrZHJvcENsYXNzKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcGFuZUNsYXNzOiBbJ293bC1kdC1kaWFsb2cnLCAuLi5jb2VyY2VBcnJheSh0aGlzLnBhbmVsQ2xhc3MpXSxcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3koKVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lciA9IHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlO1xuXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyT3BlbigpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFmdGVyUGlja2VyT3Blbi5lbWl0KG51bGwpO1xuICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbiB0aGUgcGlja2VyIGFzIHBvcHVwXG4gICAgICovXG4gICAgcHJpdmF0ZSBvcGVuQXNQb3B1cCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsPFxuICAgICAgICAgICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+XG4gICAgICAgICAgICA+KE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnBvcHVwUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8XG4gICAgICAgICAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cbiAgICAgICAgICAgID4gPSB0aGlzLnBvcHVwUmVmLmF0dGFjaCh0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCk7XG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lciA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBwb3NpdGlvbiBvbmNlIHRoZSBjYWxlbmRhciBoYXMgcmVuZGVyZWQuXG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxuICAgICAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdXBSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gZW1pdCBvcGVuIHN0cmVhbVxuICAgICAgICAgICAgdGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIgPSB0aGlzLnBpY2tlckNvbnRhaW5lci5waWNrZXJPcGVuZWRTdHJlYW1cbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFmdGVyUGlja2VyT3Blbi5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQb3B1cCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IFtcbiAgICAgICAgICAgICAgICAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxuICAgICAgICAgICAgICAgIC4uLmNvZXJjZUFycmF5KHRoaXMuYmFja2Ryb3BDbGFzcylcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSB8fCB0aGlzLmRlZmF1bHRTY3JvbGxTdHJhdGVneSgpLFxuICAgICAgICAgICAgcGFuZWxDbGFzczogWydvd2wtZHQtcG9wdXAnLCAuLi5jb2VyY2VBcnJheSh0aGlzLnBhbmVsQ2xhc3MpXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnBvcHVwUmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcblxuICAgICAgICBtZXJnZShcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuYmFja2Ryb3BDbGljaygpLFxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kZXRhY2htZW50cygpLFxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZlxuICAgICAgICAgICAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fZHRJbnB1dCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5hbHRLZXkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBwb3B1cCBQb3NpdGlvblN0cmF0ZWd5LlxuICAgICAqICovXG4gICAgcHJpdmF0ZSBjcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlcbiAgICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kdElucHV0LmVsZW1lbnRSZWYpXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcub3dsLWR0LWNvbnRhaW5lcicpXG4gICAgICAgICAgICAud2l0aEZsZXhpYmxlRGltZW5zaW9ucyhmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUHVzaChmYWxzZSlcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogLTE3NlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogLTM1MlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgIH1cbn1cbiJdfQ==