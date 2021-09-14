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
export class NativeDateTimeModule {
}
NativeDateTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                providers: [
                    { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
                ],
            },] }
];
const ɵ0 = OWL_NATIVE_DATE_TIME_FORMATS;
export class OwlNativeDateTimeModule {
}
OwlNativeDateTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateTimeModule],
                providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: ɵ0 }],
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9hZGFwdGVyL25hdGl2ZS1kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBUS9FLE1BQU0sT0FBTyxvQkFBb0I7OztZQU5oQyxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixTQUFTLEVBQUU7b0JBQ1AsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBQztpQkFDOUQ7YUFDSjs7V0FNMEQsNEJBQTRCO0FBRXZGLE1BQU0sT0FBTyx1QkFBdUI7OztZQUpuQyxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQy9CLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsSUFBOEIsRUFBQyxDQUFDO2FBQ3hGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBuYXRpdmUtZGF0ZS10aW1lLm1vZHVsZVxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE5hdGl2ZURhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vbmF0aXZlLWRhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcbmltcG9ydCB7IE9XTF9EQVRFX1RJTUVfRk9STUFUUyB9IGZyb20gJy4vZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5pbXBvcnQgeyBPV0xfTkFUSVZFX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1BsYXRmb3JtTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IERhdGVUaW1lQWRhcHRlciwgdXNlQ2xhc3M6IE5hdGl2ZURhdGVUaW1lQWRhcHRlcn0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZVRpbWVNb2R1bGUge1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVEYXRlVGltZU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE9XTF9EQVRFX1RJTUVfRk9STUFUUywgdXNlVmFsdWU6IE9XTF9OQVRJVkVfREFURV9USU1FX0ZPUk1BVFN9XSxcbn0pXG5leHBvcnQgY2xhc3MgT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUge1xufVxuIl19