import { Component, Injectable, Input } from "@angular/core";
import { Direction } from "../model/Direction";

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-CameraCtrl',
    templateUrl: './CameraCtrl.component.html',
    styleUrls: ['./CameraCtrl.component.scss']
})
export class CameraCtrlComponent {
    @Input() Direction: Direction;

    getIconName(): string {
        switch (this.Direction) {
            case Direction.forward: {
                return "chevron-up-outline";
            } case Direction.back: {
                return "chevron-down-outline";
            } case Direction.left: {
                return "chevron-back-outline";
            } case Direction.right: {
                return "chevron-forward-outline";
            }
        }
    }
}