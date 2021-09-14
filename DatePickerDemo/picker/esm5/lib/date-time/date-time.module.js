/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/date-time.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { OwlDateTimeTriggerDirective } from './date-time-picker-trigger.directive';
import { OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER, OwlDateTimeComponent } from './date-time-picker.component';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTimeInputDirective } from './date-time-picker-input.directive';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlMonthViewComponent } from './calendar-month-view.component';
import { OwlCalendarBodyComponent } from './calendar-body.component';
import { OwlYearViewComponent } from './calendar-year-view.component';
import { OwlMultiYearViewComponent } from './calendar-multi-year-view.component';
import { OwlTimerBoxComponent } from './timer-box.component';
import { OwlTimerComponent } from './timer.component';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import { OwlCalendarComponent } from './calendar.component';
import { OwlDateTimeInlineComponent } from './date-time-inline.component';
import { OwlDialogModule } from '../dialog/dialog.module';
var OwlDateTimeModule = /** @class */ (function () {
    function OwlDateTimeModule() {
    }
    OwlDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule],
                    exports: [
                        OwlCalendarComponent,
                        OwlTimerComponent,
                        OwlDateTimeTriggerDirective,
                        OwlDateTimeInputDirective,
                        OwlDateTimeComponent,
                        OwlDateTimeInlineComponent,
                        OwlMultiYearViewComponent,
                        OwlYearViewComponent,
                        OwlMonthViewComponent,
                    ],
                    declarations: [
                        OwlDateTimeTriggerDirective,
                        OwlDateTimeInputDirective,
                        OwlDateTimeComponent,
                        OwlDateTimeContainerComponent,
                        OwlMultiYearViewComponent,
                        OwlYearViewComponent,
                        OwlMonthViewComponent,
                        OwlTimerComponent,
                        OwlTimerBoxComponent,
                        OwlCalendarComponent,
                        OwlCalendarBodyComponent,
                        NumberFixedLenPipe,
                        OwlDateTimeInlineComponent,
                    ],
                    providers: [
                        OwlDateTimeIntl,
                        OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
                    ],
                    entryComponents: [
                        OwlDateTimeContainerComponent,
                    ]
                },] }
    ];
    return OwlDateTimeModule;
}());
export { OwlDateTimeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNqRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFMUQ7SUFBQTtJQXFDQSxDQUFDOztnQkFyQ0EsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVUsQ0FBQztvQkFDbkUsT0FBTyxFQUFFO3dCQUNMLG9CQUFvQjt3QkFDcEIsaUJBQWlCO3dCQUNqQiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiwwQkFBMEI7d0JBQzFCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQ3hCO29CQUNELFlBQVksRUFBRTt3QkFDViwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQiw2QkFBNkI7d0JBQzdCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixvQkFBb0I7d0JBQ3BCLHdCQUF3Qjt3QkFDeEIsa0JBQWtCO3dCQUNsQiwwQkFBMEI7cUJBQzdCO29CQUNELFNBQVMsRUFBRTt3QkFDUCxlQUFlO3dCQUNmLHFDQUFxQztxQkFDeEM7b0JBQ0QsZUFBZSxFQUFFO3dCQUNiLDZCQUE2QjtxQkFDaEM7aUJBQ0o7O0lBRUQsd0JBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQURZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZGF0ZS10aW1lLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiwgT3dsRGF0ZVRpbWVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XG5pbXBvcnQgeyBPd2xNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE93bENhbGVuZGFyQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xUaW1lckJveENvbXBvbmVudCB9IGZyb20gJy4vdGltZXItYm94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xUaW1lckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE51bWJlckZpeGVkTGVuUGlwZSB9IGZyb20gJy4vbnVtYmVyZWRGaXhMZW4ucGlwZSc7XG5pbXBvcnQgeyBPd2xDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE93bERhdGVUaW1lSW5saW5lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtaW5saW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPd2xEaWFsb2dNb2R1bGUgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgT3dsRGlhbG9nTW9kdWxlLCBBMTF5TW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE93bENhbGVuZGFyQ29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckNvbXBvbmVudCxcbiAgICAgICAgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlLFxuICAgICAgICBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlLFxuICAgICAgICBPd2xEYXRlVGltZUNvbXBvbmVudCxcbiAgICAgICAgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQsXG4gICAgICAgIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQsXG4gICAgICAgIE93bFllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xNb250aFZpZXdDb21wb25lbnQsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlLFxuICAgICAgICBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlLFxuICAgICAgICBPd2xEYXRlVGltZUNvbXBvbmVudCxcbiAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQsXG4gICAgICAgIE93bFllYXJWaWV3Q29tcG9uZW50LFxuICAgICAgICBPd2xNb250aFZpZXdDb21wb25lbnQsXG4gICAgICAgIE93bFRpbWVyQ29tcG9uZW50LFxuICAgICAgICBPd2xUaW1lckJveENvbXBvbmVudCxcbiAgICAgICAgT3dsQ2FsZW5kYXJDb21wb25lbnQsXG4gICAgICAgIE93bENhbGVuZGFyQm9keUNvbXBvbmVudCxcbiAgICAgICAgTnVtYmVyRml4ZWRMZW5QaXBlLFxuICAgICAgICBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBPd2xEYXRlVGltZUludGwsXG4gICAgICAgIE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIsXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZU1vZHVsZSB7XG59XG4iXX0=