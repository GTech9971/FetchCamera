import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CameraCtrlComponent } from "./CameraCtrl.component";

@NgModule({
    declarations: [
        CameraCtrlComponent,
    ], exports: [
        CameraCtrlComponent
    ],
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
})
export class ShareComponentsModule {

}