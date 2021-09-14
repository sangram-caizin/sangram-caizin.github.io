/**
 * @fileoverview added by tsickle
 * Generated from: lib/date-time/adapter/native-date-time.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * native-date-time.module
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter } from './date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';
var NativeDateTimeModule = /** @class */ (function () {
    function NativeDateTimeModule() {
    }
    NativeDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    providers: [
                        { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
                    ],
                },] }
    ];
    return NativeDateTimeModule;
}());
export { NativeDateTimeModule };
var ɵ0 = OWL_NATIVE_DATE_TIME_FORMATS;
var OwlNativeDateTimeModule = /** @class */ (function () {
    function OwlNativeDateTimeModule() {
    }
    OwlNativeDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateTimeModule],
                    providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: ɵ0 }],
                },] }
    ];
    return OwlNativeDateTimeModule;
}());
export { OwlNativeDateTimeModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9hZGFwdGVyL25hdGl2ZS1kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRS9FO0lBQUE7SUFPQSxDQUFDOztnQkFQQSxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixTQUFTLEVBQUU7d0JBQ1AsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBQztxQkFDOUQ7aUJBQ0o7O0lBRUQsMkJBQUM7Q0FBQSxBQVBELElBT0M7U0FEWSxvQkFBb0I7U0FLMEIsNEJBQTRCO0FBRnZGO0lBQUE7SUFLQSxDQUFDOztnQkFMQSxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsSUFBOEIsRUFBQyxDQUFDO2lCQUN4Rjs7SUFFRCw4QkFBQztDQUFBLEFBTEQsSUFLQztTQURZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogbmF0aXZlLWRhdGUtdGltZS5tb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBOYXRpdmVEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL25hdGl2ZS1kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XG5pbXBvcnQgeyBPV0xfREFURV9USU1FX0ZPUk1BVFMgfSBmcm9tICcuL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuaW1wb3J0IHsgT1dMX05BVElWRV9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4vbmF0aXZlLWRhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtQbGF0Zm9ybU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBEYXRlVGltZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlVGltZUFkYXB0ZXJ9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVUaW1lTW9kdWxlIHtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTmF0aXZlRGF0ZVRpbWVNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBPV0xfREFURV9USU1FX0ZPUk1BVFMsIHVzZVZhbHVlOiBPV0xfTkFUSVZFX0RBVEVfVElNRV9GT1JNQVRTfV0sXG59KVxuZXhwb3J0IGNsYXNzIE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlIHtcbn1cbiJdfQ==