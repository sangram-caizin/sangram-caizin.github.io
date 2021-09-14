/**
 * @fileoverview added by tsickle
 * Generated from: lib/dialog/dialog.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * dialog.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, OwlDialogService } from './dialog.service';
import { OwlDialogContainerComponent } from './dialog-container.component';
export class OwlDialogModule {
}
OwlDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, A11yModule, OverlayModule, PortalModule],
                exports: [],
                declarations: [
                    OwlDialogContainerComponent,
                ],
                providers: [
                    OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    OwlDialogService,
                ],
                entryComponents: [
                    OwlDialogContainerComponent,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWdCM0UsTUFBTSxPQUFPLGVBQWU7OztZQWQzQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUNoRSxPQUFPLEVBQUUsRUFBRTtnQkFDWCxZQUFZLEVBQUU7b0JBQ1YsMkJBQTJCO2lCQUM5QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsbUNBQW1DO29CQUNuQyxnQkFBZ0I7aUJBQ25CO2dCQUNELGVBQWUsRUFBRTtvQkFDYiwyQkFBMkI7aUJBQzlCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGRpYWxvZy5tb2R1bGVcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiwgT3dsRGlhbG9nU2VydmljZSB9IGZyb20gJy4vZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQTExeU1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLFxuICAgICAgICBPd2xEaWFsb2dTZXJ2aWNlLFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ01vZHVsZSB7XG59XG4iXX0=